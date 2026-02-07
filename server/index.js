require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN,
    credentials: false
  })
);

const clientDir = path.join(__dirname, '..', 'client');
app.use(express.static(clientDir));

app.get('/', (_req, res) => {
  res.send('OK - signaling server running');
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: false
  }
});

const rooms = new Map(); // roomId -> { members: Map<string, { nickname }>, createdAt, hostId, banned:Set, slowModeMs }
const socketToRoom = new Map(); // socketId -> roomId
const socketToNick = new Map(); // socketId -> nickname

function resolveNickname(input, socketId) {
  if (typeof input === 'string' && input.trim().length > 0) {
    return input.trim().slice(0, 32);
  }
  return `Kullanıcı${socketId.slice(0, 4)}`;
}

function normalizeMembers(roomId) {
  const room = rooms.get(roomId);
  if (!room) return null;
  if (room.members instanceof Map) return room.members;
  const raw = room.members;
  const members = new Map();
  if (raw instanceof Set) {
    raw.forEach((id) => {
      const nickname = socketToNick.get(id) || resolveNickname(null, id);
      members.set(id, { nickname });
    });
  } else if (Array.isArray(raw)) {
    raw.forEach((id) => {
      const nickname = socketToNick.get(id) || resolveNickname(null, String(id));
      members.set(String(id), { nickname });
    });
  } else if (raw && typeof raw === 'object') {
    Object.keys(raw).forEach((id) => {
      const val = raw[id];
      const nickname = val && val.nickname ? val.nickname : socketToNick.get(id) || resolveNickname(null, id);
      members.set(id, { nickname });
    });
  }
  room.members = members;
  return members;
}

function ensureRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      createdAt: Date.now(),
      members: new Map(),
      hostId: null,
      banned: new Set(),
      slowModeMs: 0
    });
  }
  const room = rooms.get(roomId);
  normalizeMembers(roomId);
  return room;
}

function getRoomsList() {
  return Array.from(rooms.entries())
    .map(([roomId, info]) => {
      const members = info.members instanceof Map ? info.members : normalizeMembers(roomId);
      return { roomId, count: members ? members.size : 0, createdAt: info.createdAt };
    })
    .filter((room) => room.count > 0);
}

function broadcastRoomsUpdate() {
  io.emit('rooms-updated', getRoomsList());
}

function removeFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const members = normalizeMembers(roomId);
  if (members) members.delete(socketId);
  if (room.hostId === socketId) {
    const nextHost = members && members.size > 0 ? Array.from(members.keys())[0] : null;
    room.hostId = nextHost;
    if (nextHost) {
      io.to(roomId).emit('host-changed', { hostId: nextHost });
    }
  }
  if (!members || members.size === 0) rooms.delete(roomId);
}

function isHost(room, socketId) {
  return room && room.hostId === socketId;
}

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, nickname } = {}) => {
    if (typeof roomId !== 'string' || roomId.trim().length === 0) {
      socket.emit('users-in-room', { roomId: null, users: [] });
      return;
    }

    const cleanRoomId = roomId.trim();
    const cleanNickname = resolveNickname(nickname, socket.id);

    const prevRoom = socketToRoom.get(socket.id);
    if (prevRoom && prevRoom !== cleanRoomId) {
      socket.leave(prevRoom);
      removeFromRoom(prevRoom, socket.id);
      socket.to(prevRoom).emit('user-left', { id: socket.id });
      broadcastRoomsUpdate();
    }

    socketToRoom.set(socket.id, cleanRoomId);
    socketToNick.set(socket.id, cleanNickname);
    socket.join(cleanRoomId);

    const room = ensureRoom(cleanRoomId);
    if (room.banned && room.banned.has(socket.id)) {
      socket.emit('join-denied', { reason: 'Bu odadan yasaklandın.' });
      return;
    }
    room.members.set(socket.id, { nickname: cleanNickname });
    if (!room.hostId) {
      room.hostId = socket.id;
    }

    const users = Array.from(room.members.entries())
      .filter(([id]) => id !== socket.id)
      .map(([id, data]) => ({ id, nickname: data.nickname }));
    socket.emit('users-in-room', { roomId: cleanRoomId, users, hostId: room.hostId });

    socket.to(cleanRoomId).emit('user-joined', { id: socket.id, nickname: cleanNickname });
    io.to(cleanRoomId).emit('host-changed', { hostId: room.hostId });
    broadcastRoomsUpdate();
  });

  socket.on('signal', ({ roomId, to, data } = {}) => {
    if (typeof to !== 'string' || !data) return;
    const activeRoom = typeof roomId === 'string' && roomId.trim().length > 0
      ? roomId.trim()
      : socketToRoom.get(socket.id);
    if (!activeRoom) return;
    const room = rooms.get(activeRoom);
    if (!room) return;
    const members = normalizeMembers(activeRoom);
    if (!members || !members.has(to)) return;
    io.to(to).emit('signal', { to, from: socket.id, data });
  });

  socket.on('list-rooms', () => {
    socket.emit('rooms-list', getRoomsList());
  });

  socket.on('chat-message', ({ roomId, text } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    if (typeof text !== 'string') return;
    const cleanText = text.trim();
    if (cleanText.length === 0 || cleanText.length > 500) return;
    const room = rooms.get(activeRoom);
    if (room && room.slowModeMs && room.slowModeMs > 0) {
      const lastAt = socket.data.lastMessageAt || 0;
      if (Date.now() - lastAt < room.slowModeMs) {
        socket.emit('slowmode-warn', { ms: room.slowModeMs });
        return;
      }
      socket.data.lastMessageAt = Date.now();
    }
    const payload = {
      fromId: socket.id,
      nickname: socketToNick.get(socket.id) || resolveNickname(null, socket.id),
      text: cleanText,
      ts: Date.now()
    };
    io.to(activeRoom).emit('chat-message', payload);
  });

  socket.on('set-nickname', ({ roomId, nickname } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    const cleanNickname = resolveNickname(nickname, socket.id);
    socketToNick.set(socket.id, cleanNickname);
    const room = rooms.get(activeRoom);
    if (room) {
      const members = normalizeMembers(activeRoom);
      if (members) members.set(socket.id, { nickname: cleanNickname });
    }
    io.to(activeRoom).emit('nickname-updated', { id: socket.id, nickname: cleanNickname });
  });

  socket.on('moderation-action', ({ roomId, action, targetId, slowModeMs } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    const room = rooms.get(activeRoom);
    if (!isHost(room, socket.id)) {
      socket.emit('moderation-error', { message: 'Bu işlem için yetkin yok.' });
      return;
    }
    if (!room) return;
    if (action === 'slowmode') {
      const ms = Number(slowModeMs);
      room.slowModeMs = Number.isFinite(ms) ? Math.max(0, ms) : 0;
      io.to(activeRoom).emit('slowmode-updated', { ms: room.slowModeMs });
      return;
    }
    if (typeof targetId !== 'string' || targetId.trim().length === 0) return;
    const target = targetId.trim();
    if (!room.members.has(target)) return;
    if (action === 'mute') {
      io.to(target).emit('force-mute', { reason: 'Host tarafından sessize alındın.' });
      return;
    }
    if (action === 'unmute') {
      io.to(target).emit('force-unmute', { reason: 'Host mikrofonu açtı.' });
      return;
    }
    if (action === 'kick') {
      io.to(target).emit('kicked', { reason: 'Host tarafından odadan çıkarıldın.' });
      io.sockets.sockets.get(target)?.disconnect(true);
      return;
    }
    if (action === 'ban') {
      room.banned.add(target);
      io.to(target).emit('banned', { reason: 'Host tarafından yasaklandın.' });
      io.sockets.sockets.get(target)?.disconnect(true);
    }
  });

  socket.on('disconnect', () => {
    const roomId = socketToRoom.get(socket.id);
    if (!roomId) return;

    removeFromRoom(roomId, socket.id);
    socket.to(roomId).emit('user-left', { id: socket.id });
    broadcastRoomsUpdate();
    socketToRoom.delete(socket.id);
    socketToNick.delete(socket.id);
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[mini-voice] signaling server listening on http://localhost:${PORT}`);
});

