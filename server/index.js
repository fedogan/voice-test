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

const rooms = new Map(); // roomId -> { members: Map<clientId, member>, createdAt, isHidden, publicName, hostId, banned:Set<clientId>, slowModeMs }
const socketToRoom = new Map(); // socketId -> roomId
const socketToClientId = new Map(); // socketId -> clientId
const clientToNick = new Map(); // clientId -> nickname

function resolveNickname(input, clientId, socketId) {
  if (typeof input === 'string' && input.trim().length > 0) {
    return input.trim().slice(0, 32);
  }
  if (typeof clientId === 'string' && clientId.trim().length > 0) {
    return `Kullanıcı${clientId.trim().slice(0, 4)}`;
  }
  return `Kullanıcı${socketId.slice(0, 4)}`;
}

function resolveClientId(input, socketId) {
  if (typeof input === 'string') {
    const clean = input.trim().slice(0, 64);
    if (/^[A-Za-z0-9:_-]{4,64}$/.test(clean)) {
      return clean;
    }
  }
  return `guest-${socketId.slice(0, 12)}`;
}

function isHiddenRoomId(roomId) {
  const value = typeof roomId === 'string' ? roomId.trim() : '';
  if (!value) return false;
  const lowered = value.toLowerCase();
  if (lowered.startsWith('private-') || lowered.startsWith('hidden-') || lowered.startsWith('code:')) {
    return true;
  }
  // Invite-like compact room ids: 10-20 chars, letters/digits with optional - _ :
  if (/^(?=.{10,20}$)[A-Za-z0-9:_-]+$/.test(value) && !/\s/.test(value)) {
    return true;
  }
  return false;
}

function ensureRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      createdAt: Date.now(),
      isHidden: isHiddenRoomId(roomId),
      publicName: null,
      members: new Map(),
      hostId: null,
      banned: new Set(),
      slowModeMs: 0
    });
  }
  return rooms.get(roomId);
}

function getRoomsList() {
  return Array.from(rooms.entries())
    .map(([roomId, info]) => {
      const members = info.members instanceof Map ? info.members : new Map();
      return {
        roomId,
        count: members.size,
        createdAt: info.createdAt,
        isHidden: Boolean(info.isHidden)
      };
    })
    .filter((room) => room.count > 0 && !room.isHidden);
}

function broadcastRoomsUpdate() {
  io.emit('rooms-updated', getRoomsList());
}

function removeFromRoom(roomId, clientId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const members = room.members;
  const member = members.get(clientId);
  if (!member) return;
  if (socketId && member.socketId !== socketId) return;
  members.delete(clientId);
  if (room.hostId === clientId) {
    const nextHost = members.size > 0 ? Array.from(members.keys())[0] : null;
    room.hostId = nextHost;
    if (nextHost) {
      io.to(roomId).emit('host-changed', { hostId: nextHost });
    }
  }
  if (members.size === 0) rooms.delete(roomId);
}

function isHost(room, clientId) {
  return room && room.hostId === clientId;
}

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, nickname, clientId } = {}) => {
    if (typeof roomId !== 'string' || roomId.trim().length === 0) {
      socket.emit('users-in-room', { roomId: null, users: [] });
      return;
    }

    const cleanRoomId = roomId.trim();
    const stableClientId = resolveClientId(clientId, socket.id);
    const cleanNickname = resolveNickname(nickname, stableClientId, socket.id);

    const prevRoom = socketToRoom.get(socket.id);
    const prevClientId = socketToClientId.get(socket.id) || stableClientId;
    if (prevRoom && prevRoom !== cleanRoomId) {
      socket.leave(prevRoom);
      removeFromRoom(prevRoom, prevClientId, socket.id);
      socket.to(prevRoom).emit('user-left', { id: prevClientId });
      broadcastRoomsUpdate();
    }

    socketToRoom.set(socket.id, cleanRoomId);
    socketToClientId.set(socket.id, stableClientId);
    clientToNick.set(stableClientId, cleanNickname);
    socket.join(cleanRoomId);

    const room = ensureRoom(cleanRoomId);
    if (room.banned && room.banned.has(stableClientId)) {
      socket.emit('join-denied', { reason: 'Bu odadan yasaklandın.' });
      return;
    }

    const existing = room.members.get(stableClientId);
    if (existing && existing.socketId !== socket.id) {
      const oldSocket = io.sockets.sockets.get(existing.socketId);
      if (oldSocket) oldSocket.disconnect(true);
    }

    room.members.set(stableClientId, {
      clientId: stableClientId,
      socketId: socket.id,
      nickname: cleanNickname,
      viewEnabled: existing ? existing.viewEnabled !== false : true,
      joinedAt: existing ? existing.joinedAt : Date.now()
    });

    if (!room.hostId || !room.members.has(room.hostId)) {
      room.hostId = stableClientId;
    }

    const users = Array.from(room.members.entries())
      .filter(([id]) => id !== stableClientId)
      .map(([id, data]) => ({
        id,
        nickname: data.nickname,
        viewEnabled: data.viewEnabled !== false
      }));
    socket.emit('users-in-room', { roomId: cleanRoomId, users, hostId: room.hostId });

    if (!existing) {
      socket.to(cleanRoomId).emit('user-joined', {
        id: stableClientId,
        nickname: cleanNickname,
        viewEnabled: true
      });
    } else {
      socket.to(cleanRoomId).emit('viewer-updated', {
        roomId: cleanRoomId,
        clientId: stableClientId,
        viewEnabled: room.members.get(stableClientId).viewEnabled !== false
      });
      socket.to(cleanRoomId).emit('nickname-updated', { id: stableClientId, nickname: cleanNickname });
    }
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
    const fromClientId = socketToClientId.get(socket.id);
    if (!fromClientId || !room.members.has(fromClientId)) return;
    const targetMember = room.members.get(to);
    if (!targetMember || !targetMember.socketId) return;
    io.to(targetMember.socketId).emit('signal', { to, from: fromClientId, data });
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
      fromId: socketToClientId.get(socket.id),
      nickname: clientToNick.get(socketToClientId.get(socket.id)) || resolveNickname(null, socketToClientId.get(socket.id), socket.id),
      text: cleanText,
      ts: Date.now()
    };
    io.to(activeRoom).emit('chat-message', payload);
  });

  socket.on('set-nickname', ({ roomId, nickname } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    const clientId = socketToClientId.get(socket.id);
    if (!clientId) return;
    const cleanNickname = resolveNickname(nickname, clientId, socket.id);
    clientToNick.set(clientId, cleanNickname);
    const room = rooms.get(activeRoom);
    if (room) {
      const member = room.members.get(clientId);
      if (member) {
        member.nickname = cleanNickname;
        room.members.set(clientId, member);
      }
    }
    io.to(activeRoom).emit('nickname-updated', { id: clientId, nickname: cleanNickname });
  });

  socket.on('set-view-enabled', ({ roomId, enabled } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    const room = rooms.get(activeRoom);
    if (!room) return;
    const clientId = socketToClientId.get(socket.id);
    if (!clientId) return;
    const member = room.members.get(clientId);
    if (!member) return;
    member.viewEnabled = enabled !== false;
    room.members.set(clientId, member);
    io.to(activeRoom).emit('viewer-updated', {
      roomId: activeRoom,
      clientId,
      viewEnabled: member.viewEnabled
    });
  });

  socket.on('moderation-action', ({ roomId, action, targetId, slowModeMs } = {}) => {
    const activeRoom = socketToRoom.get(socket.id);
    if (!activeRoom || activeRoom !== roomId) return;
    const room = rooms.get(activeRoom);
    const actorClientId = socketToClientId.get(socket.id);
    if (!isHost(room, actorClientId)) {
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
    const targetMember = room.members.get(target);
    if (!targetMember || !targetMember.socketId) return;
    if (action === 'mute') {
      io.to(targetMember.socketId).emit('force-mute', { reason: 'Host tarafından sessize alındın.' });
      return;
    }
    if (action === 'unmute') {
      io.to(targetMember.socketId).emit('force-unmute', { reason: 'Host mikrofonu açtı.' });
      return;
    }
    if (action === 'kick') {
      io.to(targetMember.socketId).emit('kicked', { reason: 'Host tarafından odadan çıkarıldın.' });
      io.sockets.sockets.get(targetMember.socketId)?.disconnect(true);
      return;
    }
    if (action === 'ban') {
      room.banned.add(target);
      io.to(targetMember.socketId).emit('banned', { reason: 'Host tarafından yasaklandın.' });
      io.sockets.sockets.get(targetMember.socketId)?.disconnect(true);
    }
  });

  socket.on('disconnect', () => {
    const roomId = socketToRoom.get(socket.id);
    const clientId = socketToClientId.get(socket.id);
    if (roomId && clientId) {
      const room = rooms.get(roomId);
      const member = room && room.members ? room.members.get(clientId) : null;
      if (member && member.socketId === socket.id) {
        removeFromRoom(roomId, clientId, socket.id);
        socket.to(roomId).emit('user-left', { id: clientId });
        broadcastRoomsUpdate();
      }
    }
    socketToRoom.delete(socket.id);
    socketToClientId.delete(socket.id);
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[mini-voice] signaling server listening on http://localhost:${PORT}`);
});

