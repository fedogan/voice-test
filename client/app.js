/* global io */

const els = {
  roomId: document.getElementById('roomId'),
  joinBtn: document.getElementById('joinBtn'),
  createBtn: document.getElementById('createBtn'),
  muteBtn: document.getElementById('muteBtn'),
  leaveBtn: document.getElementById('leaveBtn'),
  statusText: document.getElementById('statusText'),
  usersList: document.getElementById('usersList'),
  serverUrlInput: document.getElementById('serverUrlInput'),
  serverUrl: document.getElementById('serverUrl'),
  log: document.getElementById('log')
};

function getQueryServerUrl() {
  const url = new URL(window.location.href);
  const q = url.searchParams.get('server');
  return q || '';
}

const SIGNALING_URL = getQueryServerUrl() || 'http://localhost:3001';
let currentSocketUrl = null;

if (els.serverUrlInput) {
  els.serverUrlInput.value = SIGNALING_URL;
}

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

let socket = null;
let currentRoomId = null;
let localStream = null;
let isMuted = false;
const peers = new Map(); // peerId -> { pc, audioEl, pendingCandidates: [] }

const audioContainer = document.createElement('div');
audioContainer.style.display = 'none';
document.body.appendChild(audioContainer);

const LOG_LIMIT = 120;
const logLines = [];

function setStatus(lines) {
  els.statusText.textContent = Array.isArray(lines) ? lines.join('\n') : String(lines);
}

function getSignalingUrl() {
  const inputValue = els.serverUrlInput ? els.serverUrlInput.value.trim() : '';
  return inputValue || SIGNALING_URL;
}

function updateServerUrlDisplay() {
  if (els.serverUrl) els.serverUrl.textContent = getSignalingUrl();
}

function log(message) {
  const ts = new Date().toLocaleTimeString();
  const line = `[${ts}] ${message}`;
  logLines.push(line);
  if (logLines.length > LOG_LIMIT) logLines.shift();
  if (els.log) {
    els.log.textContent = logLines.join('\n');
    els.log.scrollTop = els.log.scrollHeight;
  }
}

function setUiState({ inRoom }) {
  els.roomId.disabled = inRoom;
  els.joinBtn.disabled = inRoom;
  els.createBtn.disabled = inRoom;
  els.leaveBtn.disabled = !inRoom;
  els.muteBtn.disabled = !inRoom;
  if (els.serverUrlInput) els.serverUrlInput.disabled = inRoom;
}

function renderUsers(userIds) {
  els.usersList.innerHTML = '';
  userIds.forEach((id) => {
    const li = document.createElement('li');
    li.textContent = id;
    els.usersList.appendChild(li);
  });
}

function randomRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

function createAudioElement(peerId) {
  const audio = document.createElement('audio');
  audio.autoplay = true;
  audio.playsInline = true;
  audio.dataset.peerId = peerId;
  audioContainer.appendChild(audio);
  return audio;
}

function removeAudioElement(peerId) {
  const audio = audioContainer.querySelector(`audio[data-peer-id="${peerId}"]`);
  if (audio) audio.remove();
}

function cleanupPeer(peerId) {
  const info = peers.get(peerId);
  if (!info) return;
  try {
    info.pc.onicecandidate = null;
    info.pc.ontrack = null;
    info.pc.close();
  } catch (_) {
    // ignore cleanup errors
  }
  removeAudioElement(peerId);
  peers.delete(peerId);
}

function cleanupAllPeers() {
  Array.from(peers.keys()).forEach(cleanupPeer);
}

function ensureSocket() {
  const desiredUrl = getSignalingUrl();
  if (socket && socket.connected && currentSocketUrl === desiredUrl) return socket;
  if (socket && currentSocketUrl !== desiredUrl) {
    socket.disconnect();
    socket = null;
  }

  if (typeof io !== 'function') {
    setStatus([
      'Socket.io client yuklenemedi.',
      'Internet baglantini kontrol et veya CDN yerine local bir kopya kullan.'
    ]);
    return null;
  }

  socket = io(desiredUrl, {
    transports: ['websocket', 'polling']
  });
  currentSocketUrl = desiredUrl;

  socket.on('connect', () => {
    updateServerUrlDisplay();
    log(`Socket connected: ${socket.id}`);
    if (currentRoomId) {
      socket.emit('join-room', { roomId: currentRoomId });
    }
  });

  socket.on('disconnect', () => {
    currentRoomId = null;
    cleanupAllPeers();
    renderUsers([]);
    setUiState({ inRoom: false });
    isMuted = false;
    els.muteBtn.textContent = 'Mute';
    setStatus('Disconnected.');
    log('Disconnected.');
  });

  socket.on('users-in-room', ({ roomId, users } = {}) => {
    if (!roomId) {
      setStatus('Room ID gerekli.');
      return;
    }
    currentRoomId = roomId;
    setUiState({ inRoom: true });
    const peersInRoom = Array.isArray(users) ? users : [];
    renderUsers(peersInRoom);
    setStatus([`Joined room: ${currentRoomId}`, `Peers: ${peersInRoom.length}`]);
    log(`Joined room: ${currentRoomId}`);
    log(`Got users list: ${peersInRoom.length}`);

    peersInRoom.forEach((peerId) => {
      createPeerConnection(peerId, true);
    });
  });

  socket.on('user-joined', ({ id } = {}) => {
    if (!id) return;
    renderUsers([...peers.keys(), id]);
    createPeerConnection(id, false);
    setStatus([`User joined: ${id}`, `Room: ${currentRoomId}`]);
    log(`User joined: ${id}`);
  });

  socket.on('user-left', ({ id } = {}) => {
    if (!id) return;
    cleanupPeer(id);
    renderUsers([...peers.keys()]);
    setStatus([`User left: ${id}`, `Room: ${currentRoomId}`]);
    log(`User left: ${id}`);
  });

  socket.on('signal', async ({ from, data } = {}) => {
    if (!from || !data) return;

    if (!peers.has(from)) {
      createPeerConnection(from, false);
    }

    const info = peers.get(from);
    if (!info) return;

    const pc = info.pc;
    try {
      if (data.type === 'offer') {
        log(`Received offer from ${from}`);
        await pc.setRemoteDescription(data);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('signal', { to: from, from: socket.id, data: pc.localDescription });
        log(`Sending answer to ${from}`);
      } else if (data.type === 'answer') {
        log(`Received answer from ${from}`);
        await pc.setRemoteDescription(data);
        if (info.pendingCandidates.length > 0) {
          for (const candidate of info.pendingCandidates) {
            await pc.addIceCandidate(candidate);
          }
          info.pendingCandidates = [];
        }
      } else if (data.candidate) {
        log(`ICE from ${from}`);
        if (pc.remoteDescription) {
          await pc.addIceCandidate(data);
        } else {
          info.pendingCandidates.push(data);
        }
      }
    } catch (err) {
      setStatus([`WebRTC error: ${err.message || err}`, `Peer: ${from}`]);
    }
  });

  return socket;
}

function createPeerConnection(peerId, shouldCreateOffer) {
  if (peers.has(peerId)) return peers.get(peerId);

  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  const info = {
    pc,
    audioEl: createAudioElement(peerId),
    pendingCandidates: []
  };

  if (localStream) {
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  }

  pc.onicecandidate = (event) => {
    if (!event.candidate) return;
    if (!socket) return;
    socket.emit('signal', { to: peerId, from: socket.id, data: event.candidate });
    log(`ICE to ${peerId}`);
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    if (stream) {
      info.audioEl.srcObject = stream;
    } else {
      const fallback = new MediaStream([event.track]);
      info.audioEl.srcObject = fallback;
    }
  };

  pc.onconnectionstatechange = () => {
    log(`PC state ${peerId}: ${pc.connectionState}`);
    if (['failed', 'disconnected', 'closed'].includes(pc.connectionState)) {
      cleanupPeer(peerId);
      renderUsers([...peers.keys()]);
    }
  };

  pc.oniceconnectionstatechange = () => {
    log(`ICE state ${peerId}: ${pc.iceConnectionState}`);
  };

  peers.set(peerId, info);

  if (shouldCreateOffer) {
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        if (!socket) return;
        socket.emit('signal', { to: peerId, from: socket.id, data: pc.localDescription });
        log(`Sending offer to ${peerId}`);
      })
      .catch((err) => {
        setStatus([`Offer error: ${err.message || err}`, `Peer: ${peerId}`]);
        log(`Offer error to ${peerId}: ${err.message || err}`);
      });
  }

  return info;
}

async function startJoinFlow(roomId) {
  const clean = String(roomId || '').trim();
  if (!clean) {
    setStatus('Room ID gerekli.');
    return;
  }

  try {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    if (err && err.name === 'NotAllowedError') {
      setStatus('Mikrofon izni reddedildi. Lütfen izin verip tekrar deneyin.');
    } else {
      setStatus(`Mikrofon erişimi başarısız: ${err.message || err}`);
    }
    log(`Mic error: ${err.message || err}`);
    return;
  }

  currentRoomId = clean;
  setUiState({ inRoom: true });
  setStatus([`Joining room: ${currentRoomId}...`]);

  const s = ensureSocket();
  if (s && s.connected) {
    s.emit('join-room', { roomId: currentRoomId });
  }
}

function leaveRoom() {
  cleanupAllPeers();

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  currentRoomId = null;
  isMuted = false;
  renderUsers([]);
  setUiState({ inRoom: false });
  els.muteBtn.textContent = 'Mute';
  setStatus('Left room.');
}

els.joinBtn.addEventListener('click', () => {
  startJoinFlow(els.roomId.value);
});

els.createBtn.addEventListener('click', () => {
  if (!els.roomId.value.trim()) els.roomId.value = randomRoomId();
  startJoinFlow(els.roomId.value);
});

els.leaveBtn.addEventListener('click', () => {
  leaveRoom();
});

els.muteBtn.addEventListener('click', () => {
  if (!localStream) return;
  isMuted = !isMuted;
  localStream.getAudioTracks().forEach((track) => {
    track.enabled = !isMuted;
  });
  els.muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
  setStatus([`Room: ${currentRoomId || '-'}`, `Local mute: ${isMuted ? 'ON' : 'OFF'}`]);
  log(`Local mute: ${isMuted ? 'ON' : 'OFF'}`);
});

setUiState({ inRoom: false });
setStatus('Hazir. Room ID girip Join/Create tikla.');
log('Ready.');
updateServerUrlDisplay();

if (els.serverUrlInput) {
  els.serverUrlInput.addEventListener('input', () => {
    updateServerUrlDisplay();
  });
}

