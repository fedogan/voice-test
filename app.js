/* global io */

const t = {
  subtitle: 'Minimal signaling demo',
  roomsTitle: 'Odalar',
  refreshRooms: 'Yenile',
  roomIdLabel: 'Oda ID',
  roomIdPlaceholder: 'örn: abc123',
  nicknameLabel: 'Takma ad',
  nicknamePlaceholder: 'örn: Kullanıcı1234',
  serverUrlLabel: 'Signaling Server URL',
  serverUrlPlaceholder: 'örn: https://your-signal-server.com',
  noiseToggle: 'Gürültü azaltma',
  joinBtn: 'Katıl',
  createBtn: 'Oda oluştur',
  muteBtn: 'Mikrofonu Sessize Al',
  unmuteBtn: 'Mikrofonu Aç',
  leaveBtn: 'Çık',
  statusTitle: 'Durum',
  participantsTitle: 'Katılımcılar',
  logTitle: 'Log',
  chatTitle: 'Sohbet',
  sendBtn: 'Gönder',
  chatPlaceholder: 'Mesaj yaz...',
  audioTitle: 'Ses Kontrolleri',
  speakerOn: 'Sesi Kapat',
  speakerOff: 'Sesi Aç',
  serverUrlFooter: 'Server URL:',
  roomsEmpty: 'Aktif oda yok.',
  participantsEmpty: 'Henüz kimse yok.',
  audioEmpty: 'Henüz bağlantı yok.'
};

function setText() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.setAttribute('placeholder', t[key]);
  });
}

const els = {
  roomId: document.getElementById('roomId'),
  nicknameInput: document.getElementById('nicknameInput'),
  joinBtn: document.getElementById('joinBtn'),
  createBtn: document.getElementById('createBtn'),
  muteBtn: document.getElementById('muteBtn'),
  leaveBtn: document.getElementById('leaveBtn'),
  statusText: document.getElementById('statusText'),
  usersList: document.getElementById('usersList'),
  serverUrlInput: document.getElementById('serverUrlInput'),
  serverUrl: document.getElementById('serverUrl'),
  log: document.getElementById('log'),
  roomsList: document.getElementById('roomsList'),
  refreshRoomsBtn: document.getElementById('refreshRoomsBtn'),
  chatMessages: document.getElementById('chatMessages'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  noiseToggle: document.getElementById('noiseToggle'),
  speakerBtn: document.getElementById('speakerBtn'),
  audioList: document.getElementById('audioList')
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
let isSpeakerMuted = false;
let noiseEnabled = true;
let manualLeave = false;
let pendingJoin = null;
let currentNickname = null;

const peers = new Map(); // peerId -> { pc, audioEl, pendingCandidates: [] }
const participants = new Map(); // id -> nickname

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

function updateMuteButton() {
  if (!els.muteBtn) return;
  els.muteBtn.textContent = isMuted ? t.unmuteBtn : t.muteBtn;
}

function updateSpeakerButton() {
  if (!els.speakerBtn) return;
  els.speakerBtn.textContent = isSpeakerMuted ? t.speakerOff : t.speakerOn;
}

function setUiState({ inRoom }) {
  els.roomId.disabled = inRoom;
  els.joinBtn.disabled = inRoom;
  els.createBtn.disabled = inRoom;
  els.leaveBtn.disabled = !inRoom;
  els.muteBtn.disabled = !inRoom;
  if (els.serverUrlInput) els.serverUrlInput.disabled = inRoom;
  if (els.nicknameInput) els.nicknameInput.disabled = inRoom;
  if (els.chatInput) els.chatInput.disabled = !inRoom;
  if (els.chatSendBtn) els.chatSendBtn.disabled = !inRoom;
}

function renderParticipants() {
  if (!els.usersList) return;
  els.usersList.innerHTML = '';
  if (participants.size === 0) {
    const li = document.createElement('li');
    li.textContent = t.participantsEmpty;
    els.usersList.appendChild(li);
    return;
  }
  participants.forEach((nickname, id) => {
    const li = document.createElement('li');
    const isSelf = socket && id === socket.id;
    li.textContent = isSelf ? `${nickname} (sen)` : nickname;
    els.usersList.appendChild(li);
  });
}

function renderRoomsList(rooms) {
  if (!els.roomsList) return;
  els.roomsList.innerHTML = '';
  const list = Array.isArray(rooms) ? rooms : [];
  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'mutedText';
    empty.textContent = t.roomsEmpty;
    els.roomsList.appendChild(empty);
    return;
  }
  list.forEach((room) => {
    const item = document.createElement('div');
    item.className = 'roomItem';
    const name = document.createElement('div');
    name.className = 'roomName';
    name.textContent = room.roomId;
    const count = document.createElement('div');
    count.className = 'roomCount';
    count.textContent = `${room.count} kişi`;
    item.appendChild(name);
    item.appendChild(count);
    item.addEventListener('click', () => {
      if (els.roomId) els.roomId.value = room.roomId;
      startJoinFlow(room.roomId);
    });
    els.roomsList.appendChild(item);
  });
}

function randomRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

function getAudioConstraints() {
  return {
    audio: {
      echoCancellation: noiseEnabled,
      noiseSuppression: noiseEnabled,
      autoGainControl: noiseEnabled
    }
  };
}

function applyMuteToTrack(track) {
  if (!track) return;
  track.enabled = !isMuted;
}

function replaceAudioTrack(newTrack) {
  peers.forEach((info) => {
    info.pc.getSenders().forEach((sender) => {
      if (sender.track && sender.track.kind === 'audio') {
        sender.replaceTrack(newTrack);
      }
    });
  });
}

async function ensureLocalStream({ forceNew = false } = {}) {
  if (localStream && !forceNew) return localStream;
  try {
    const newStream = await navigator.mediaDevices.getUserMedia(getAudioConstraints());
    const [newTrack] = newStream.getAudioTracks();
    applyMuteToTrack(newTrack);
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    localStream = newStream;
    if (newTrack) replaceAudioTrack(newTrack);
    return localStream;
  } catch (err) {
    if (err && err.name === 'NotAllowedError') {
      setStatus('Mikrofon izni gerekli. Lütfen izin verip tekrar deneyin.');
    } else {
      setStatus(`Mikrofon erişimi başarısız: ${err.message || err}`);
    }
    log(`Mikrofon hatası: ${err.message || err}`);
    return null;
  }
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

function getSettingsKey(nickname) {
  return `voice-settings:${nickname}`;
}

function loadRemoteSettings(nickname) {
  if (!nickname) return { volume: 1, muted: false };
  const raw = localStorage.getItem(getSettingsKey(nickname));
  if (!raw) return { volume: 1, muted: false };
  try {
    const parsed = JSON.parse(raw);
    const volume = typeof parsed.volume === 'number' ? parsed.volume : 1;
    const muted = Boolean(parsed.muted);
    return { volume: Math.max(0, Math.min(2, volume)), muted };
  } catch (_) {
    return { volume: 1, muted: false };
  }
}

function saveRemoteSettings(nickname, settings) {
  if (!nickname) return;
  localStorage.setItem(getSettingsKey(nickname), JSON.stringify(settings));
}

function applyRemoteAudioSettings(peerId) {
  const info = peers.get(peerId);
  if (!info) return;
  const nickname = participants.get(peerId) || peerId;
  const settings = loadRemoteSettings(nickname);
  info.audioEl.volume = settings.volume;
  info.audioEl.muted = isSpeakerMuted || settings.muted;
}

function renderAudioControls() {
  if (!els.audioList) return;
  els.audioList.innerHTML = '';
  const ids = Array.from(peers.keys());
  if (ids.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'mutedText';
    empty.textContent = t.audioEmpty;
    els.audioList.appendChild(empty);
    return;
  }
  ids.forEach((peerId) => {
    const nickname = participants.get(peerId) || peerId;
    const settings = loadRemoteSettings(nickname);
    const card = document.createElement('div');
    card.className = 'audioCard';

    const header = document.createElement('div');
    header.className = 'audioHeader';
    const nameEl = document.createElement('div');
    nameEl.textContent = nickname;
    const badge = document.createElement('div');
    badge.className = 'mutedBadge';
    badge.textContent = settings.muted ? 'Sessiz' : 'Açık';
    header.appendChild(nameEl);
    header.appendChild(badge);

    const controls = document.createElement('div');
    controls.className = 'audioControls';
    const sliderRow = document.createElement('div');
    sliderRow.className = 'sliderRow';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '200';
    slider.value = String(Math.round(settings.volume * 100));
    const sliderValue = document.createElement('div');
    sliderValue.textContent = `${slider.value}%`;
    sliderRow.appendChild(slider);
    sliderRow.appendChild(sliderValue);

    const muteBtn = document.createElement('button');
    muteBtn.className = 'btn';
    muteBtn.textContent = settings.muted ? 'Sesi Aç' : 'Sessize Al';

    slider.addEventListener('input', () => {
      const volume = Math.max(0, Math.min(2, Number(slider.value) / 100));
      sliderValue.textContent = `${slider.value}%`;
      const next = { ...settings, volume };
      saveRemoteSettings(nickname, next);
      settings.volume = volume;
      applyRemoteAudioSettings(peerId);
    });

    muteBtn.addEventListener('click', () => {
      settings.muted = !settings.muted;
      muteBtn.textContent = settings.muted ? 'Sesi Aç' : 'Sessize Al';
      badge.textContent = settings.muted ? 'Sessiz' : 'Açık';
      saveRemoteSettings(nickname, settings);
      applyRemoteAudioSettings(peerId);
    });

    controls.appendChild(sliderRow);
    controls.appendChild(muteBtn);
    card.appendChild(header);
    card.appendChild(controls);
    els.audioList.appendChild(card);

    applyRemoteAudioSettings(peerId);
  });
}

function appendChatMessage({ fromId, nickname, text, ts } = {}) {
  if (!els.chatMessages || !text) return;
  const message = document.createElement('div');
  message.className = 'chatMessage';
  const time = new Date(ts || Date.now()).toLocaleTimeString();
  const fromName = nickname || fromId || 'Bilinmeyen';
  const trimmed = String(text);
  if (trimmed.startsWith('/me ')) {
    message.classList.add('me');
    const action = document.createElement('div');
    action.textContent = `* ${fromName} ${trimmed.slice(4).trim()}`;
    message.appendChild(action);
  } else {
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${fromName} · ${time}`;
    const body = document.createElement('div');
    body.textContent = trimmed;
    message.appendChild(meta);
    message.appendChild(body);
  }
  els.chatMessages.appendChild(message);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function clearChat() {
  if (els.chatMessages) els.chatMessages.innerHTML = '';
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
      'Socket.io client yüklenemedi.',
      'İnternet bağlantını kontrol et veya CDN yerine local kopya kullan.'
    ]);
    return null;
  }

  socket = io(desiredUrl, {
    transports: ['websocket', 'polling']
  });
  currentSocketUrl = desiredUrl;

  socket.on('connect', () => {
    updateServerUrlDisplay();
    log(`Socket bağlandı: ${socket.id}`);
    setStatus('Bağlandı.');
    socket.emit('list-rooms');
    if (pendingJoin) {
      socket.emit('join-room', pendingJoin);
    }
  });

  socket.on('disconnect', () => {
    const wasInRoom = Boolean(currentRoomId);
    cleanupAllPeers();
    participants.clear();
    renderParticipants();
    renderAudioControls();
    currentRoomId = null;
    setUiState({ inRoom: false });
    isMuted = false;
    updateMuteButton();
    if (wasInRoom && !manualLeave) {
      setStatus('Bağlantı koptu. Yeniden bağlanınca odaya tekrar katılacağım.');
    } else {
      setStatus('Bağlantı koptu.');
    }
    log('Bağlantı kesildi.');
  });

  socket.on('connect_error', (err) => {
    setStatus(`Bağlantı hatası: ${err.message || err}`);
  });

  socket.on('rooms-list', (rooms = []) => {
    renderRoomsList(rooms);
  });

  socket.on('rooms-updated', (rooms = []) => {
    renderRoomsList(rooms);
  });

  socket.on('users-in-room', ({ roomId, users } = {}) => {
    if (!roomId) {
      setStatus('Oda ID gerekli.');
      return;
    }
    currentRoomId = roomId;
    manualLeave = false;
    setUiState({ inRoom: true });
    participants.clear();
    if (socket && socket.id) {
      participants.set(socket.id, currentNickname || 'Ben');
    }
    const peersInRoom = Array.isArray(users) ? users : [];
    peersInRoom.forEach((user) => {
      if (user && user.id) participants.set(user.id, user.nickname || user.id);
    });
    renderParticipants();
    renderAudioControls();
    clearChat();
    setStatus([`Odaya katılındı: ${currentRoomId}`, `Katılımcı: ${participants.size}`]);
    log(`Odaya katılındı: ${currentRoomId}`);
    log(`Kullanıcı listesi alındı: ${peersInRoom.length}`);

    peersInRoom.forEach((peer) => {
      createPeerConnection(peer.id, true);
    });
  });

  socket.on('user-joined', ({ id, nickname } = {}) => {
    if (!id) return;
    participants.set(id, nickname || id);
    renderParticipants();
    createPeerConnection(id, false);
    setStatus([`Yeni katılımcı: ${nickname || id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Yeni katılımcı: ${nickname || id}`);
  });

  socket.on('user-left', ({ id } = {}) => {
    if (!id) return;
    cleanupPeer(id);
    participants.delete(id);
    renderParticipants();
    renderAudioControls();
    setStatus([`Kullanıcı ayrıldı: ${id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Kullanıcı ayrıldı: ${id}`);
  });

  socket.on('chat-message', (payload) => {
    appendChatMessage(payload);
  });

  socket.on('nickname-updated', ({ id, nickname } = {}) => {
    if (!id || !nickname) return;
    participants.set(id, nickname);
    if (socket && id === socket.id) {
      currentNickname = nickname;
      if (els.nicknameInput) els.nicknameInput.value = nickname;
      localStorage.setItem('voice-nickname', nickname);
    }
    renderParticipants();
    renderAudioControls();
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
        log(`Teklif alındı: ${from}`);
        await pc.setRemoteDescription(data);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('signal', { to: from, from: socket.id, data: pc.localDescription });
        log(`Yanıt gönderildi: ${from}`);
      } else if (data.type === 'answer') {
        log(`Yanıt alındı: ${from}`);
        await pc.setRemoteDescription(data);
        if (info.pendingCandidates.length > 0) {
          for (const candidate of info.pendingCandidates) {
            await pc.addIceCandidate(candidate);
          }
          info.pendingCandidates = [];
        }
      } else if (data.candidate) {
        log(`ICE alındı: ${from}`);
        if (pc.remoteDescription) {
          await pc.addIceCandidate(data);
        } else {
          info.pendingCandidates.push(data);
        }
      }
    } catch (err) {
      setStatus([`WebRTC hatası: ${err.message || err}`, `Peer: ${from}`]);
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
    log(`ICE gönderildi: ${peerId}`);
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    if (stream) {
      info.audioEl.srcObject = stream;
    } else {
      const fallback = new MediaStream([event.track]);
      info.audioEl.srcObject = fallback;
    }
    applyRemoteAudioSettings(peerId);
  };

  pc.onconnectionstatechange = () => {
    log(`PC durumu ${peerId}: ${pc.connectionState}`);
    if (['failed', 'disconnected', 'closed'].includes(pc.connectionState)) {
      cleanupPeer(peerId);
      participants.delete(peerId);
      renderParticipants();
      renderAudioControls();
    }
  };

  pc.oniceconnectionstatechange = () => {
    log(`ICE durumu ${peerId}: ${pc.iceConnectionState}`);
  };

  peers.set(peerId, info);
  renderAudioControls();

  if (shouldCreateOffer) {
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        if (!socket) return;
        socket.emit('signal', { to: peerId, from: socket.id, data: pc.localDescription });
        log(`Teklif gönderildi: ${peerId}`);
      })
      .catch((err) => {
        setStatus([`Teklif hatası: ${err.message || err}`, `Peer: ${peerId}`]);
        log(`Teklif hatası ${peerId}: ${err.message || err}`);
      });
  }

  return info;
}

async function startJoinFlow(roomId) {
  const clean = String(roomId || '').trim();
  if (!clean) {
    setStatus('Oda ID gerekli.');
    return;
  }
  if (els.nicknameInput) {
    updateNickname(els.nicknameInput.value);
  }

  const stream = await ensureLocalStream();
  if (!stream) return;

  currentRoomId = clean;
  manualLeave = false;
  pendingJoin = { roomId: clean, nickname: currentNickname };
  setUiState({ inRoom: true });
  setStatus([`Bağlanılıyor...`, `Oda: ${currentRoomId}`]);

  const s = ensureSocket();
  if (s && s.connected) {
    s.emit('join-room', pendingJoin);
  }
}

function leaveRoom() {
  manualLeave = true;
  pendingJoin = null;
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
  participants.clear();
  renderParticipants();
  renderAudioControls();
  clearChat();
  setUiState({ inRoom: false });
  updateMuteButton();
  setStatus('Odadan çıkıldı.');
  ensureSocket();
}

function updateNickname(nextName) {
  const clean = String(nextName || '').trim();
  if (!clean) return;
  currentNickname = clean.slice(0, 32);
  if (els.nicknameInput) els.nicknameInput.value = currentNickname;
  localStorage.setItem('voice-nickname', currentNickname);
  if (socket && socket.connected && currentRoomId) {
    socket.emit('set-nickname', { roomId: currentRoomId, nickname: currentNickname });
  }
}

function handleChatSubmit() {
  if (!els.chatInput) return;
  const text = els.chatInput.value.trim();
  if (!text) return;
  els.chatInput.value = '';

  if (text.startsWith('/nick ')) {
    const next = text.replace('/nick', '').trim();
    if (next) {
      updateNickname(next);
      appendChatMessage({
        nickname: currentNickname,
        text: `/me takma adını "${next}" olarak güncelledi.`
      });
    }
    return;
  }

  if (!socket || !currentRoomId) return;
  socket.emit('chat-message', { roomId: currentRoomId, text });
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
    applyMuteToTrack(track);
  });
  updateMuteButton();
  setStatus([`Oda: ${currentRoomId || '-'}`, `Mikrofon: ${isMuted ? 'Sessiz' : 'Açık'}`]);
  log(`Mikrofon: ${isMuted ? 'Sessiz' : 'Açık'}`);
});

if (els.noiseToggle) {
  els.noiseToggle.addEventListener('change', async (event) => {
    noiseEnabled = Boolean(event.target.checked);
    if (currentRoomId) {
      await ensureLocalStream({ forceNew: true });
      log(`Gürültü azaltma ${noiseEnabled ? 'açıldı' : 'kapandı'}.`);
    }
  });
}

if (els.speakerBtn) {
  els.speakerBtn.addEventListener('click', () => {
    isSpeakerMuted = !isSpeakerMuted;
    updateSpeakerButton();
    Array.from(peers.keys()).forEach(applyRemoteAudioSettings);
  });
}

if (els.refreshRoomsBtn) {
  els.refreshRoomsBtn.addEventListener('click', () => {
    const s = ensureSocket();
    if (s && s.connected) s.emit('list-rooms');
  });
}

if (els.chatSendBtn) {
  els.chatSendBtn.addEventListener('click', handleChatSubmit);
}

if (els.chatInput) {
  els.chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChatSubmit();
    }
  });
}

setText();
setUiState({ inRoom: false });
setStatus('Hazır. Oda ID girip katılabilirsin.');
log('Hazır.');
updateServerUrlDisplay();
updateMuteButton();
updateSpeakerButton();

const storedNickname = localStorage.getItem('voice-nickname');
if (els.nicknameInput) {
  if (storedNickname) {
    currentNickname = storedNickname;
  } else {
    currentNickname = `Kullanıcı${Math.floor(Math.random() * 9000 + 1000)}`;
  }
  els.nicknameInput.value = currentNickname;
}

if (els.nicknameInput) {
  els.nicknameInput.addEventListener('change', () => {
    updateNickname(els.nicknameInput.value);
  });
}

if (els.serverUrlInput) {
  els.serverUrlInput.addEventListener('input', () => {
    updateServerUrlDisplay();
  });
}

ensureSocket();
