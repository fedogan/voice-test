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

const rooms = new Map(); // roomId -> { createdAt, users: Map<socketId, nickname> }

function ensureRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { createdAt: Date.now(), users: new Map() });
  }
  return rooms.get(roomId);
}

function getRoomsList() {
  return Array.from(rooms.entries())
    .map(([roomId, info]) => ({ roomId, count: info.users.size, createdAt: info.createdAt }))
    .filter((room) => room.count > 0);
}

function broadcastRoomsUpdate() {
  io.emit('rooms-updated', getRoomsList());
}

function removeFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.users.delete(socketId);
  if (room.users.size === 0) rooms.delete(roomId);
}

function resolveNickname(input, socketId) {
  if (typeof input === 'string' && input.trim().length > 0) {
    return input.trim().slice(0, 32);
  }
  return `Kullanıcı${socketId.slice(0, 4)}`;
}

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, nickname } = {}) => {
    if (typeof roomId !== 'string' || roomId.trim().length === 0) {
      socket.emit('users-in-room', { roomId: null, users: [] });
      return;
    }

    const cleanRoomId = roomId.trim();
    const cleanNickname = resolveNickname(nickname, socket.id);

    if (socket.data.roomId && socket.data.roomId !== cleanRoomId) {
      const prevRoom = socket.data.roomId;
      socket.leave(prevRoom);
      removeFromRoom(prevRoom, socket.id);
      socket.to(prevRoom).emit('user-left', { id: socket.id });
      broadcastRoomsUpdate();
    }

    socket.data.roomId = cleanRoomId;
    socket.data.nickname = cleanNickname;
    socket.join(cleanRoomId);

    const room = ensureRoom(cleanRoomId);
    room.users.set(socket.id, cleanNickname);

    const users = Array.from(room.users.entries())
      .filter(([id]) => id !== socket.id)
      .map(([id, name]) => ({ id, nickname: name }));
    socket.emit('users-in-room', { roomId: cleanRoomId, users });

    socket.to(cleanRoomId).emit('user-joined', { id: socket.id, nickname: cleanNickname });
    broadcastRoomsUpdate();
  });

  socket.on('signal', ({ to, data } = {}) => {
    const roomId = socket.data.roomId;
    if (!roomId || typeof to !== 'string' || !data) return;

    const members = rooms.get(roomId);
    if (!members || !members.has(to)) return;

    io.to(to).emit('signal', { to, from: socket.id, data });
  });

  socket.on('list-rooms', () => {
    socket.emit('rooms-list', getRoomsList());
  });

  socket.on('chat-message', ({ roomId, text } = {}) => {
    const activeRoom = socket.data.roomId;
    if (!activeRoom || activeRoom !== roomId) return;
    if (typeof text !== 'string' || text.trim().length === 0) return;
    const payload = {
      fromId: socket.id,
      nickname: socket.data.nickname || resolveNickname(null, socket.id),
      text: text.trim().slice(0, 500),
      ts: Date.now()
    };
    io.to(activeRoom).emit('chat-message', payload);
  });

  socket.on('set-nickname', ({ roomId, nickname } = {}) => {
    const activeRoom = socket.data.roomId;
    if (!activeRoom || activeRoom !== roomId) return;
    const cleanNickname = resolveNickname(nickname, socket.id);
    socket.data.nickname = cleanNickname;
    const room = rooms.get(activeRoom);
    if (room) room.users.set(socket.id, cleanNickname);
    io.to(activeRoom).emit('nickname-updated', { id: socket.id, nickname: cleanNickname });
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    removeFromRoom(roomId, socket.id);
    socket.to(roomId).emit('user-left', { id: socket.id });
    broadcastRoomsUpdate();
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[mini-voice] signaling server listening on http://localhost:${PORT}`);
});

