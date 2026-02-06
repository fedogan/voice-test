require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const PORT = Number(process.env.PORT || 3001);
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

const rooms = new Map(); // roomId -> Set<socketId>

function ensureRoom(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  return rooms.get(roomId);
}

function removeFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.delete(socketId);
  if (room.size === 0) rooms.delete(roomId);
}

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId } = {}) => {
    if (typeof roomId !== 'string' || roomId.trim().length === 0) {
      socket.emit('users-in-room', { roomId: null, users: [] });
      return;
    }

    const cleanRoomId = roomId.trim();

    if (socket.data.roomId && socket.data.roomId !== cleanRoomId) {
      const prevRoom = socket.data.roomId;
      socket.leave(prevRoom);
      removeFromRoom(prevRoom, socket.id);
      socket.to(prevRoom).emit('user-left', { id: socket.id });
    }

    socket.data.roomId = cleanRoomId;
    socket.join(cleanRoomId);

    const members = ensureRoom(cleanRoomId);
    members.add(socket.id);

    const users = Array.from(members).filter((id) => id !== socket.id);
    socket.emit('users-in-room', { roomId: cleanRoomId, users });

    socket.to(cleanRoomId).emit('user-joined', { id: socket.id });
  });

  socket.on('signal', ({ to, data } = {}) => {
    const roomId = socket.data.roomId;
    if (!roomId || typeof to !== 'string' || !data) return;

    const members = rooms.get(roomId);
    if (!members || !members.has(to)) return;

    io.to(to).emit('signal', { to, from: socket.id, data });
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    removeFromRoom(roomId, socket.id);
    socket.to(roomId).emit('user-left', { id: socket.id });
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[mini-voice] signaling server listening on http://localhost:${PORT}`);
});

