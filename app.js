/* global io */

const t = {
  subtitle: 'Minimal signaling demo',
  roomsTitle: 'Odalar',
  refreshRooms: 'Yenile',
  roomIdLabel: 'Oda İsmi',
  roomIdPlaceholder: 'örn: LoL odası',
  nicknameLabel: 'Takma ad',
  nicknamePlaceholder: 'örn: Caryx',
  serverUrlLabel: 'Signaling Server URL (bunla işin yok %99 ihtimalle)',
  serverUrlPlaceholder: 'örn: ?server=https://diye-olan-bi-link.com',
  noiseToggle: 'Gürültü azaltma (Bunu kapatınca bazen buglar düzeliyor)',
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
  audioEmpty: 'Henüz bağlantı yok.',
  screenShareStart: 'Ekran Paylaş',
  screenShareStop: 'Paylaşımı Durdur',
  screenShareTitle: 'Ekran Paylaşımı',
  screenShareEmpty: 'Ekran paylaşımı yok.',
  screenShareStarted: 'Ekran paylaşımı başladı.',
  screenShareStopped: 'Ekran paylaşımı durduruldu.',
  screenShareUnsupported: 'Bu cihazda ekran paylaşımı desteklenmiyor.',
  screenShareError: 'Ekran paylaşımı başlatılamadı.',
  screenShareEnded: 'Ekran paylaşımı bitti.',
  advancedAudioToggle: 'Gelişmiş Gürültü Azaltma (Bu ayarları denemek için koydum güzel değerler bulunca kaldıracağım)',
  highPassLabel: 'High-pass (Hz)',
  compressorToggle: 'Compressor',
  gateThresholdLabel: 'Gate Threshold (dB)',
  gateAttackLabel: 'Gate Attack (ms)',
  gateReleaseLabel: 'Gate Release (ms)',
  gateFloorLabel: 'Gate Floor (dB)',
  advancedAudioOn: 'Gelişmiş gürültü azaltma açıldı.',
  advancedAudioOff: 'Gelişmiş gürültü azaltma kapatıldı.',
  advancedAudioError: 'Gelişmiş gürültü azaltma başlatılamadı. Normal mikrofon kullanılıyor.',
  fullscreenEnter: 'Tam Ekran',
  fullscreenExit: 'Çık',
  fullscreenUnsupported: 'Tam ekran desteklenmiyor.'
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
  audioList: document.getElementById('audioList'),
  screenShareBtn: document.getElementById('screenShareBtn'),
  screenVideo: document.getElementById('screenVideo'),
  screenStatus: document.getElementById('screenStatus'),
  screenFullscreenBtn: document.getElementById('screenFullscreenBtn'),
  statusConn: document.getElementById('statusConn'),
  statusPing: document.getElementById('statusPing'),
  statusMic: document.getElementById('statusMic'),
  statusScreen: document.getElementById('statusScreen'),
  vuFill: document.getElementById('vuFill'),
  micDb: document.getElementById('micDb'),
  advancedAudioToggle: document.getElementById('advancedAudioToggle'),
  highPassFreq: document.getElementById('highPassFreq'),
  highPassValue: document.getElementById('highPassValue'),
  compressorToggle: document.getElementById('compressorToggle'),
  gateThreshold: document.getElementById('gateThreshold'),
  gateThresholdValue: document.getElementById('gateThresholdValue'),
  gateAttack: document.getElementById('gateAttack'),
  gateAttackValue: document.getElementById('gateAttackValue'),
  gateRelease: document.getElementById('gateRelease'),
  gateReleaseValue: document.getElementById('gateReleaseValue'),
  gateFloor: document.getElementById('gateFloor'),
  gateFloorValue: document.getElementById('gateFloorValue')
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
let screenStream = null;
let screenTrack = null;
let isScreenSharing = false;
let activeScreenPeerId = null;
let currentMicTrack = null;
let rawMicStream = null;
let rawMicTrack = null;
let audioCtx = null;
let audioWorkletLoaded = false;
let audioSourceNode = null;
let highPassNode = null;
let compressorNode = null;
let gateNode = null;
let destinationNode = null;
let processedStream = null;
let processedTrack = null;

const AUDIO_SETTINGS_KEY = 'voice-advanced-audio';
const audioSettings = {
  gateThreshold: -40,
  gateAttack: 5,
  gateRelease: 150,
  gateFloor: -60,
  gateHysteresis: 6,
  highPass: 90,
  compressor: false,
  advanced: true
};

const AUDIO_GATE_DEBUG = false;
const SPEAKING_THRESHOLD_DB = -45;
const SPEAKING_HOLD_MS = 200;
const SPEAKING_POLL_MS = 100;

const peers = new Map(); // peerId -> { pc, audioEl, pendingCandidates: [] }
const participants = new Map(); // id -> nickname
const speakerAnalysers = new Map(); // peerId -> { analyser, data, sourceNode, lastSpokeAt, speaking }
let speakerLoopRunning = false;
let lastSpeakerCheck = 0;
let micAnalyser = null;
let micAnalyserData = null;
let micAnalyserSource = null;
let micLoopRunning = false;
let lastMicCheck = 0;
let pingListenerAttached = false;

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

function loadAudioSettings() {
  const raw = localStorage.getItem(AUDIO_SETTINGS_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.gateThreshold === 'number') audioSettings.gateThreshold = parsed.gateThreshold;
    if (typeof parsed.gateAttack === 'number') audioSettings.gateAttack = parsed.gateAttack;
    if (typeof parsed.gateRelease === 'number') audioSettings.gateRelease = parsed.gateRelease;
    if (typeof parsed.gateFloor === 'number') audioSettings.gateFloor = parsed.gateFloor;
    if (typeof parsed.gateHysteresis === 'number') audioSettings.gateHysteresis = parsed.gateHysteresis;
    if (typeof parsed.highPass === 'number') audioSettings.highPass = parsed.highPass;
    if (typeof parsed.compressor === 'boolean') audioSettings.compressor = parsed.compressor;
    if (typeof parsed.advanced === 'boolean') audioSettings.advanced = parsed.advanced;
  } catch (_) {
    // ignore settings parse errors
  }
}

function saveAudioSettings() {
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
}

function updateAudioSettingsUI() {
  if (els.highPassFreq) els.highPassFreq.value = String(audioSettings.highPass);
  if (els.highPassValue) els.highPassValue.textContent = `${audioSettings.highPass} Hz`;
  if (els.gateThreshold) els.gateThreshold.value = String(audioSettings.gateThreshold);
  if (els.gateThresholdValue) els.gateThresholdValue.textContent = `${audioSettings.gateThreshold} dB`;
  if (els.gateAttack) els.gateAttack.value = String(audioSettings.gateAttack);
  if (els.gateAttackValue) els.gateAttackValue.textContent = `${audioSettings.gateAttack} ms`;
  if (els.gateRelease) els.gateRelease.value = String(audioSettings.gateRelease);
  if (els.gateReleaseValue) els.gateReleaseValue.textContent = `${audioSettings.gateRelease} ms`;
  if (els.gateFloor) els.gateFloor.value = String(audioSettings.gateFloor);
  if (els.gateFloorValue) els.gateFloorValue.textContent = `${audioSettings.gateFloor} dB`;
  if (els.compressorToggle) els.compressorToggle.checked = audioSettings.compressor;
  if (els.advancedAudioToggle) els.advancedAudioToggle.checked = audioSettings.advanced;
}

async function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }
}

async function ensureAudioWorklet() {
  if (!audioCtx || audioWorkletLoaded) return;
  await audioCtx.audioWorklet.addModule('noise-gate-worklet.js');
  audioWorkletLoaded = true;
}

function updateGateParams() {
  if (!gateNode || !audioCtx) return;
  gateNode.parameters.get('threshold').setValueAtTime(audioSettings.gateThreshold, audioCtx.currentTime);
  gateNode.parameters.get('hysteresisDb').setValueAtTime(audioSettings.gateHysteresis, audioCtx.currentTime);
  gateNode.parameters.get('attack').setValueAtTime(audioSettings.gateAttack, audioCtx.currentTime);
  gateNode.parameters.get('release').setValueAtTime(audioSettings.gateRelease, audioCtx.currentTime);
  gateNode.parameters.get('floor').setValueAtTime(audioSettings.gateFloor, audioCtx.currentTime);
  if (gateNode.port) {
    gateNode.port.postMessage({ type: 'debug', enabled: AUDIO_GATE_DEBUG });
  }
}

function updateCompressorParams() {
  if (!compressorNode) return;
  compressorNode.threshold.value = -22;
  compressorNode.ratio.value = 3;
  compressorNode.attack.value = 0.006;
  compressorNode.release.value = 0.18;
}

function ensureSpeakingAnalyser(peerId) {
  const info = peers.get(peerId);
  if (!info || speakerAnalysers.has(peerId)) return;
  void ensureAudioContext().then(() => {
    if (speakerAnalysers.has(peerId)) return;
    try {
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      const sourceNode = audioCtx.createMediaElementSource(info.audioEl);
      sourceNode.connect(analyser);
      speakerAnalysers.set(peerId, {
        analyser,
        data: new Uint8Array(analyser.fftSize),
        sourceNode,
        lastSpokeAt: 0,
        speaking: false
      });
      startSpeakerLoop();
    } catch (err) {
      log(`Konusma algilama basarisiz: ${err.message || err}`);
    }
  });
}

function cleanupSpeakingAnalyser(peerId) {
  const entry = speakerAnalysers.get(peerId);
  if (!entry) return;
  try {
    entry.sourceNode.disconnect();
    entry.analyser.disconnect();
  } catch (_) {
    // ignore cleanup errors
  }
  speakerAnalysers.delete(peerId);
}

function updateSpeakingClass(peerId, isSpeaking) {
  const card = document.querySelector(`.userCard[data-peer-id="${peerId}"]`);
  if (!card) return;
  card.classList.toggle('speaking', isSpeaking);
}

function startSpeakerLoop() {
  if (speakerLoopRunning) return;
  speakerLoopRunning = true;
  const loop = (now) => {
    if (speakerAnalysers.size === 0) {
      speakerLoopRunning = false;
      return;
    }
    if (now - lastSpeakerCheck >= SPEAKING_POLL_MS) {
      lastSpeakerCheck = now;
      speakerAnalysers.forEach((entry, peerId) => {
        entry.analyser.getByteTimeDomainData(entry.data);
        let sum = 0;
        for (let i = 0; i < entry.data.length; i += 1) {
          const v = (entry.data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / entry.data.length);
        const db = 20 * Math.log10(rms + 1e-9);
        const isActive = db > SPEAKING_THRESHOLD_DB;
        if (isActive) {
          entry.lastSpokeAt = now;
        }
        const shouldSpeak = isActive || now - entry.lastSpokeAt < SPEAKING_HOLD_MS;
        if (shouldSpeak !== entry.speaking) {
          entry.speaking = shouldSpeak;
          updateSpeakingClass(peerId, shouldSpeak);
        }
      });
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function getActiveMicStream() {
  if (audioSettings.advanced && processedStream) return processedStream;
  return rawMicStream;
}

function ensureMicAnalyser() {
  if (!audioCtx) return;
  if (!micAnalyser) {
    micAnalyser = audioCtx.createAnalyser();
    micAnalyser.fftSize = 512;
    micAnalyserData = new Uint8Array(micAnalyser.fftSize);
  }
  const stream = getActiveMicStream();
  if (!stream) return;
  if (micAnalyserSource) {
    try { micAnalyserSource.disconnect(); } catch (_) {}
  }
  micAnalyserSource = audioCtx.createMediaStreamSource(stream);
  micAnalyserSource.connect(micAnalyser);
  startMicLoop();
}

function setVuLevel(level, db) {
  if (els.vuFill) {
    els.vuFill.style.width = `${level}%`;
  }
  if (els.micDb) {
    els.micDb.textContent = Number.isFinite(db) ? `${db.toFixed(0)} dB` : '- dB';
  }
}

function startMicLoop() {
  if (micLoopRunning) return;
  micLoopRunning = true;
  const loop = (now) => {
    const stream = getActiveMicStream();
    if (!micAnalyser || !stream) {
      micLoopRunning = false;
      setVuLevel(0, null);
      return;
    }
    if (now - lastMicCheck >= SPEAKING_POLL_MS) {
      lastMicCheck = now;
      if (isMuted || !currentMicTrack) {
        setVuLevel(0, -60);
      } else {
        micAnalyser.getByteTimeDomainData(micAnalyserData);
        let sum = 0;
        for (let i = 0; i < micAnalyserData.length; i += 1) {
          const v = (micAnalyserData[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / micAnalyserData.length);
        const db = 20 * Math.log10(rms + 1e-9);
        const normalized = Math.max(0, Math.min(100, ((db + 60) / 50) * 100));
        setVuLevel(normalized, db);
      }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function ensureAudioNodes({ resetSource = false } = {}) {
  if (!audioCtx || !rawMicStream) return;
  if (!audioSourceNode || resetSource) {
    if (audioSourceNode) {
      try { audioSourceNode.disconnect(); } catch (_) {}
    }
    audioSourceNode = audioCtx.createMediaStreamSource(rawMicStream);
  }
  if (!highPassNode) {
    highPassNode = audioCtx.createBiquadFilter();
    highPassNode.type = 'highpass';
  }
  if (!compressorNode) {
    compressorNode = audioCtx.createDynamicsCompressor();
  }
  if (!gateNode) {
    gateNode = new AudioWorkletNode(audioCtx, 'noise-gate', {
      parameterData: {
        threshold: audioSettings.gateThreshold,
        hysteresisDb: audioSettings.gateHysteresis,
        attack: audioSettings.gateAttack,
        release: audioSettings.gateRelease,
        floor: audioSettings.gateFloor
      }
    });
  }
  if (!destinationNode) {
    destinationNode = audioCtx.createMediaStreamDestination();
  }

  try { highPassNode.disconnect(); } catch (_) {}
  try { gateNode.disconnect(); } catch (_) {}
  try { compressorNode.disconnect(); } catch (_) {}

  audioSourceNode.connect(highPassNode);
  highPassNode.connect(gateNode);
  if (audioSettings.compressor) {
    gateNode.connect(compressorNode);
    compressorNode.connect(destinationNode);
  } else {
    gateNode.connect(destinationNode);
  }

  processedStream = destinationNode.stream;
  processedTrack = processedStream.getAudioTracks()[0] || null;
  highPassNode.frequency.setValueAtTime(audioSettings.highPass, audioCtx.currentTime);
  updateCompressorParams();
  updateGateParams();
}

function updateAudioParams() {
  if (!audioCtx || !gateNode || !highPassNode) return;
  highPassNode.frequency.setValueAtTime(audioSettings.highPass, audioCtx.currentTime);
  updateCompressorParams();
  updateGateParams();
  ensureAudioNodes();
}

async function updateProcessedTrack() {
  if (!audioSettings.advanced) {
    currentMicTrack = rawMicTrack;
    applyMuteToTrack(currentMicTrack);
    setupMicForAllPeers();
    updateStatusBar();
    return;
  }
  try {
    await ensureAudioContext();
    await ensureAudioWorklet();
    ensureAudioNodes({ resetSource: true });
    currentMicTrack = processedTrack || rawMicTrack;
    applyMuteToTrack(currentMicTrack);
    setupMicForAllPeers();
    ensureMicAnalyser();
    updateStatusBar();
  } catch (err) {
    currentMicTrack = rawMicTrack;
    applyMuteToTrack(currentMicTrack);
    setupMicForAllPeers();
    ensureMicAnalyser();
    updateStatusBar();
    setStatus(t.advancedAudioError);
    log(`Gelişmiş gürültü azaltma hatası: ${err.message || err}`);
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

function updateScreenShareButton() {
  if (!els.screenShareBtn) return;
  els.screenShareBtn.textContent = isScreenSharing ? t.screenShareStop : t.screenShareStart;
}

function updateStatusBar() {
  if (els.statusConn) {
    const connected = socket && socket.connected;
    els.statusConn.textContent = `Bağlı: ${connected ? 'Evet' : 'Hayır'}`;
  }
  if (els.statusPing) {
    const rawPing = socket && socket.io && typeof socket.io.engine?.ping === 'number'
      ? Math.round(socket.io.engine.ping)
      : null;
    const pingText = rawPing === null
      ? (socket && socket.connected ? 'Ölçülüyor...' : '-')
      : `${rawPing} ms`;
    els.statusPing.textContent = `Ping: ${pingText}`;
  }
  if (els.statusMic) {
    const micState = currentMicTrack && !isMuted ? 'Açık' : 'Sessiz';
    els.statusMic.textContent = `Mikrofon: ${micState}`;
  }
  if (els.statusScreen) {
    els.statusScreen.textContent = `Ekran: ${isScreenSharing ? 'Açık' : 'Kapalı'}`;
  }
}

function setScreenStatusText(text) {
  if (!els.screenStatus) return;
  els.screenStatus.textContent = text;
}

function setScreenVideoStream(stream, ownerId) {
  if (!els.screenVideo) return;
  els.screenVideo.srcObject = stream || null;
  activeScreenPeerId = stream ? ownerId : null;
  updateFullscreenButton();
}

function clearScreenVideo(message) {
  setScreenVideoStream(null, null);
  setScreenStatusText(message || t.screenShareEmpty);
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
}

function updateFullscreenButton() {
  if (!els.screenFullscreenBtn) return;
  const hasStream = Boolean(els.screenVideo && els.screenVideo.srcObject);
  els.screenFullscreenBtn.style.display = hasStream ? 'inline-flex' : 'none';
  els.screenFullscreenBtn.textContent = isFullscreenActive() ? t.fullscreenExit : t.fullscreenEnter;
}

async function toggleFullscreen() {
  if (!els.screenVideo) return;
  if (!document.fullscreenEnabled && !els.screenVideo.webkitRequestFullscreen) {
    setStatus(t.fullscreenUnsupported);
    return;
  }
  if (isFullscreenActive()) {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    }
    return;
  }
  if (els.screenVideo.requestFullscreen) {
    await els.screenVideo.requestFullscreen();
  } else if (els.screenVideo.webkitRequestFullscreen) {
    await els.screenVideo.webkitRequestFullscreen();
  } else {
    setStatus(t.fullscreenUnsupported);
  }
}

function isScreenShareSupported() {
  return Boolean(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
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
  if (els.screenShareBtn) els.screenShareBtn.disabled = !inRoom;
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
    if (currentRoomId && room.roomId === currentRoomId) {
      item.classList.add('active');
    }
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

async function ensureLocalStream({ forceNew = false } = {}) {
  if (localStream && !forceNew) return localStream;
  try {
    const newStream = await navigator.mediaDevices.getUserMedia(getAudioConstraints());
    rawMicStream = newStream;
    const [micTrack] = newStream.getAudioTracks();
    rawMicTrack = micTrack || null;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    localStream = newStream;
    await updateProcessedTrack();
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

function setupMicForPeer(peerId, pc) {
  const targetPc = pc || (peers.get(peerId) && peers.get(peerId).pc);
  if (!targetPc) return;
  const info = peers.get(peerId);
  const audioTransceiver = info ? info.audioTransceiver : null;
  const sender = audioTransceiver ? audioTransceiver.sender : targetPc.getSenders().find((s) => s.track && s.track.kind === 'audio');
  if (!sender) {
    // eslint-disable-next-line no-console
    console.warn(`[mini-voice] audio sender yok: ${peerId}`);
    return;
  }
  if (!currentMicTrack) {
    // eslint-disable-next-line no-console
    console.warn(`[mini-voice] currentMicTrack yok: ${peerId}`);
    return;
  }
  sender.replaceTrack(currentMicTrack);
}

function setupMicForAllPeers() {
  peers.forEach((_info, peerId) => {
    setupMicForPeer(peerId);
  });
}

function logPeerSenders(peerId, pc) {
  const senders = pc.getSenders();
  // eslint-disable-next-line no-console
  console.log(`[mini-voice] senders (${peerId})`, senders);
  const hasAudio = senders.some((sender) => sender.track && sender.track.kind === 'audio');
  if (!hasAudio) {
    // eslint-disable-next-line no-console
    console.warn(`[mini-voice] audio sender yok: ${peerId}`);
  }
}

async function renegotiatePeer(peerId, reason) {
  const info = peers.get(peerId);
  if (!info || !socket) return;
  if (!info.isNegotiationReady) return;
  const { pc } = info;
  if (info.isMakingOffer || pc.signalingState !== 'stable') return;
  info.isMakingOffer = true;
  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('signal', { to: peerId, from: socket.id, data: pc.localDescription });
    if (reason) log(`Yeniden pazarlık (${reason}): ${peerId}`);
  } catch (err) {
    log(`Yeniden pazarlık hatası ${peerId}: ${err.message || err}`);
  } finally {
    info.isMakingOffer = false;
  }
}

function attachScreenTrackToPeer(peerId) {
  const info = peers.get(peerId);
  if (!info || !screenTrack) return;
  if (info.videoTransceiver) {
    info.videoTransceiver.direction = 'sendrecv';
    info.videoTransceiver.sender.replaceTrack(screenTrack);
  }
  renegotiatePeer(peerId, 'ekran paylaşımı');
  setupMicForPeer(peerId);
}

function detachScreenTrackFromPeer(peerId) {
  const info = peers.get(peerId);
  if (!info) return;
  if (info.videoTransceiver) {
    info.videoTransceiver.sender.replaceTrack(null);
    info.videoTransceiver.direction = 'recvonly';
    renegotiatePeer(peerId, 'ekran paylaşımı durdurma');
  }
  setupMicForPeer(peerId);
}

async function startScreenShare() {
  if (!isScreenShareSupported()) {
    setStatus(t.screenShareUnsupported);
    return;
  }
  if (isScreenSharing) return;
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    screenTrack = screenStream.getVideoTracks()[0];
    if (!screenTrack) {
      setStatus(t.screenShareError);
      return;
    }
    screenTrack.onended = () => stopScreenShare('ended');
    isScreenSharing = true;
    updateScreenShareButton();
    updateStatusBar();
    setScreenVideoStream(screenStream, socket ? socket.id : 'local');
    setScreenStatusText(t.screenShareStarted);
    setStatus(t.screenShareStarted);
    peers.forEach((_info, peerId) => attachScreenTrackToPeer(peerId));
  } catch (err) {
    if (err && err.name === 'NotAllowedError') {
      setStatus('Ekran paylaşımı reddedildi. Lütfen izin verip tekrar deneyin.');
    } else {
      setStatus(t.screenShareError);
    }
    log(`Ekran paylaşımı hatası: ${err.message || err}`);
  }
}

function stopScreenShare(reason) {
  if (!screenStream) return;
  screenStream.getTracks().forEach((track) => track.stop());
  screenStream = null;
  screenTrack = null;
  isScreenSharing = false;
  updateScreenShareButton();
  updateStatusBar();
  if (activeScreenPeerId === (socket && socket.id)) {
    clearScreenVideo(t.screenShareStopped);
  }
  peers.forEach((_info, peerId) => detachScreenTrackFromPeer(peerId));
  if (reason === 'ended') {
    setStatus(t.screenShareEnded);
    setScreenStatusText(t.screenShareEnded);
  } else {
    setStatus(t.screenShareStopped);
    setScreenStatusText(t.screenShareStopped);
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
  cleanupSpeakingAnalyser(peerId);
  peers.delete(peerId);
  if (activeScreenPeerId === peerId) {
    clearScreenVideo(t.screenShareEnded);
  }
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
    card.className = 'audioCard userCard';
    card.dataset.peerId = peerId;
    const speaking = speakerAnalysers.get(peerId);
    if (speaking && speaking.speaking) {
      card.classList.add('speaking');
    }
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
    updateStatusBar();
    if (socket.io && socket.io.engine && !pingListenerAttached) {
      pingListenerAttached = true;
      socket.io.engine.on('pong', () => {
        updateStatusBar();
      });
    }
    socket.emit('list-rooms');
    if (pendingJoin) {
      socket.emit('join-room', pendingJoin);
    }
  });

  socket.on('disconnect', () => {
    const wasInRoom = Boolean(currentRoomId);
    updateStatusBar();
    if (isScreenSharing) stopScreenShare('disconnect');
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
    updateStatusBar();
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
        info.isNegotiationReady = true;
        log(`Yanıt gönderildi: ${from}`);
      } else if (data.type === 'answer') {
        log(`Yanıt alındı: ${from}`);
        await pc.setRemoteDescription(data);
        info.isNegotiationReady = true;
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
    pendingCandidates: [],
    isMakingOffer: false,
    isNegotiationReady: false,
    audioTransceiver: null,
    videoTransceiver: null
  };

  info.audioTransceiver = pc.addTransceiver('audio', { direction: 'sendrecv' });
  info.videoTransceiver = pc.addTransceiver('video', { direction: 'recvonly' });
  if (currentMicTrack) {
    info.audioTransceiver.sender.replaceTrack(currentMicTrack);
  }
  if (screenTrack && screenStream) {
    info.videoTransceiver.direction = 'sendrecv';
    info.videoTransceiver.sender.replaceTrack(screenTrack);
  }

  pc.onicecandidate = (event) => {
    if (!event.candidate) return;
    if (!socket) return;
    socket.emit('signal', { to: peerId, from: socket.id, data: event.candidate });
    log(`ICE gönderildi: ${peerId}`);
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    if (event.track.kind === 'video') {
      const videoStream = stream || new MediaStream([event.track]);
      setScreenVideoStream(videoStream, peerId);
      setScreenStatusText(`Ekran paylaşımı: ${participants.get(peerId) || peerId}`);
      event.track.onended = () => {
        if (activeScreenPeerId === peerId) {
          clearScreenVideo(t.screenShareEnded);
          setStatus(t.screenShareEnded);
        }
      };
      return;
    }
    if (stream) {
      info.audioEl.srcObject = stream;
    } else {
      const fallback = new MediaStream([event.track]);
      info.audioEl.srcObject = fallback;
    }
    ensureSpeakingAnalyser(peerId);
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

  pc.onnegotiationneeded = () => {
    if (!info.isNegotiationReady) return;
    renegotiatePeer(peerId, 'negotiationneeded');
  };

  peers.set(peerId, info);
  renderAudioControls();
  setupMicForPeer(peerId, pc);
  logPeerSenders(peerId, pc);

  if (shouldCreateOffer) {
    info.isMakingOffer = true;
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
      })
      .finally(() => {
        info.isMakingOffer = false;
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

  await ensureAudioContext();
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
  if (isScreenSharing) stopScreenShare('manual');
  cleanupAllPeers();

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
  rawMicStream = null;
  rawMicTrack = null;
  processedStream = null;
  processedTrack = null;
  currentMicTrack = null;

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
  updateStatusBar();
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
  if (!currentMicTrack) return;
  isMuted = !isMuted;
  applyMuteToTrack(currentMicTrack);
  setupMicForAllPeers();
  updateMuteButton();
  setVuLevel(0, -60);
  updateStatusBar();
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

  if (els.advancedAudioToggle) {
    els.advancedAudioToggle.addEventListener('change', async (event) => {
      audioSettings.advanced = Boolean(event.target.checked);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (currentRoomId) {
        await updateProcessedTrack();
        setStatus(audioSettings.advanced ? t.advancedAudioOn : t.advancedAudioOff);
      }
    });
  }

  if (els.highPassFreq) {
    els.highPassFreq.addEventListener('input', (event) => {
      audioSettings.highPass = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

  if (els.compressorToggle) {
    els.compressorToggle.addEventListener('change', (event) => {
      audioSettings.compressor = Boolean(event.target.checked);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

  if (els.gateThreshold) {
    els.gateThreshold.addEventListener('input', (event) => {
      audioSettings.gateThreshold = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

  if (els.gateAttack) {
    els.gateAttack.addEventListener('input', (event) => {
      audioSettings.gateAttack = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

  if (els.gateRelease) {
    els.gateRelease.addEventListener('input', (event) => {
      audioSettings.gateRelease = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

  if (els.gateFloor) {
    els.gateFloor.addEventListener('input', (event) => {
      audioSettings.gateFloor = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      if (audioSettings.advanced) updateAudioParams();
    });
  }

if (els.speakerBtn) {
  els.speakerBtn.addEventListener('click', () => {
    isSpeakerMuted = !isSpeakerMuted;
    updateSpeakerButton();
    Array.from(peers.keys()).forEach(applyRemoteAudioSettings);
  });
}

if (els.screenShareBtn) {
  els.screenShareBtn.addEventListener('click', () => {
    if (isScreenSharing) {
      stopScreenShare('manual');
    } else {
      startScreenShare();
    }
  });
}

if (els.screenFullscreenBtn) {
  els.screenFullscreenBtn.addEventListener('click', () => {
    toggleFullscreen();
  });
}

document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

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
loadAudioSettings();
updateAudioSettingsUI();
setUiState({ inRoom: false });
setStatus('Hazır. Oda ID girip katılabilirsin.');
log('Hazır.');
updateServerUrlDisplay();
updateMuteButton();
updateSpeakerButton();
updateScreenShareButton();
updateFullscreenButton();
updateStatusBar();
setScreenStatusText(t.screenShareEmpty);

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
setInterval(() => {
  updateStatusBar();
}, 1000);
