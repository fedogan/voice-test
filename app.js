/* global io */

const t = {
  subtitle: 'Gürültü azaltma dışında her şey düzgün çalışıyor.',
  roomsTitle: 'Odalar',
  refreshRooms: 'Yenile',
  roomIdLabel: 'Oda İsmi',
  roomIdPlaceholder: 'örn: LoL odası',
  nicknameLabel: 'Takma ad',
  nicknamePlaceholder: 'örn: Caryx',
  serverUrlLabel: 'Signaling Server URL (bunla işin yok %99 ihtimalle)',
  serverUrlPlaceholder: 'örn: ?server=https://diye-olan-bi-link.com',
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
  highPassLabel: 'High-pass (Hz)',
  compressorToggle: 'Compressor',
  gateThresholdLabel: 'Gate Threshold (dB)',
  gateAttackLabel: 'Gate Attack (ms)',
  gateReleaseLabel: 'Gate Release (ms)',
  gateFloorLabel: 'Gate Floor (dB)',
  advancedAudioOn: 'Gürültü azaltma açıldı.',
  advancedAudioOff: 'Gürültü azaltma kapatıldı.',
  advancedAudioError: 'Gürültü azaltma işlem hattı başlatılamadı. Normal mikrofon kullanılıyor.',
  fullscreenEnter: 'Tam Ekran',
  fullscreenExit: 'Tam ekrandan çık',
  fullscreenUnsupported: 'Tam ekran desteklenmiyor.',
  fullscreenFailed: 'Tam ekran açılamadı.'
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
  titlebar: document.getElementById('titlebar'),
  winMinimize: document.getElementById('winMinimize'),
  winMaximize: document.getElementById('winMaximize'),
  winFullscreen: document.getElementById('winFullscreen'),
  winClose: document.getElementById('winClose'),
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
  modeSelect: document.getElementById('modeSelect'),
  screenQualitySelect: document.getElementById('screenQualitySelect'),
  log: document.getElementById('log'),
  roomsList: document.getElementById('roomsList'),
  refreshRoomsBtn: document.getElementById('refreshRoomsBtn'),
  chatMessages: document.getElementById('chatMessages'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  noiseToggle: document.getElementById('noiseToggle'),
  agcToggle: document.getElementById('agcToggle'),
  listenOnlyToggle: document.getElementById('listenOnlyToggle'),
  deafToggle: document.getElementById('deafToggle'),
  micSelect: document.getElementById('micSelect'),
  outputSelect: document.getElementById('outputSelect'),
  speakerBtn: document.getElementById('speakerBtn'),
  audioList: document.getElementById('audioList'),
  screenShareBtn: document.getElementById('screenShareBtn'),
  screenStopBtn: document.getElementById('screenStopBtn'),
  screenVideo: document.getElementById('screenVideo'),
  screenStatus: document.getElementById('screenStatus'),
  screenFullscreenBtn: document.getElementById('screenFullscreenBtn'),
  screenPreview: document.getElementById('screenPreview'),
  statusConn: document.getElementById('statusConn'),
  statusPing: document.getElementById('statusPing'),
  statusMic: document.getElementById('statusMic'),
  statusScreen: document.getElementById('statusScreen'),
  vuFill: document.getElementById('vuFill'),
  micDb: document.getElementById('micDb'),
  micTestBtn: document.getElementById('micTestBtn'),
  echoTestBtn: document.getElementById('echoTestBtn'),
  micTestModal: document.getElementById('micTestModal'),
  micTestClose: document.getElementById('micTestClose'),
  screenModal: document.getElementById('screenModal'),
  screenModalClose: document.getElementById('screenModalClose'),
  screenModalVideo: document.getElementById('screenModalVideo'),
  screenModalStatus: document.getElementById('screenModalStatus'),
  micTestVuFill: document.getElementById('micTestVuFill'),
  micTestDb: document.getElementById('micTestDb'),
  micLoopback: document.getElementById('micLoopback'),
  micTestStart: document.getElementById('micTestStart'),
  micTestStop: document.getElementById('micTestStop'),
  echoResult: document.getElementById('echoResult'),
  statOut: document.getElementById('statOut'),
  statIn: document.getElementById('statIn'),
  statJitter: document.getElementById('statJitter'),
  statLoss: document.getElementById('statLoss'),
  statRtt: document.getElementById('statRtt'),
  moderationTarget: document.getElementById('moderationTarget'),
  muteOtherBtn: document.getElementById('muteOtherBtn'),
  unmuteOtherBtn: document.getElementById('unmuteOtherBtn'),
  kickBtn: document.getElementById('kickBtn'),
  banBtn: document.getElementById('banBtn'),
  slowModeSelect: document.getElementById('slowModeSelect'),
  slowModeBtn: document.getElementById('slowModeBtn'),
  moderationPanel: document.getElementById('moderationPanel'),
  moderationToggle: document.getElementById('moderationToggle'),
  logCopyBtn: document.getElementById('logCopyBtn'),
  logClearBtn: document.getElementById('logClearBtn'),
  lobbyView: document.getElementById('lobbyView'),
  roomView: document.getElementById('roomView'),
  settingsBtn: document.getElementById('settingsBtn'),
  settingsDrawer: document.getElementById('settingsDrawer'),
  settingsClose: document.getElementById('settingsClose'),
  toastContainer: document.getElementById('toastContainer'),
  micGain: document.getElementById('micGain'),
  micGainValue: document.getElementById('micGainValue'),
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
let agcEnabled = true;
let listenOnly = false;
let isDeaf = false;
let manualLeave = false;
let pendingJoin = null;
let currentNickname = null;
let currentHostId = null;
let screenStream = null;
let screenTrack = null;
let isScreenSharing = false;
let activeScreenPeerId = null;
let screenPopout = null;
let screenPopoutVideo = null;
let currentMicTrack = null;
let windowState = { isMaximized: false, isFullScreen: false };
let videoRequestedWindowFullscreen = false;
let isScreenModalOpen = false;
let rawMicStream = null;
let rawMicTrack = null;
let audioCtx = null;
let audioWorkletLoaded = false;
let audioSourceNode = null;
let highPassNode = null;
let compressorNode = null;
let gateNode = null;
let gainNode = null;
let destinationNode = null;
let processedStream = null;
let processedTrack = null;

const AUDIO_SETTINGS_KEY = 'voice-advanced-audio';
const DEVICE_SETTINGS_KEY = 'voice-devices';
const TAB_SETTINGS_KEY = 'voice-right-tab';
const LAST_ROOM_KEY = 'voice-last-room';
const SCREEN_QUALITY_KEY = 'voice-screen-quality';

const SCREEN_QUALITY_PRESETS = {
  quality: { key: 'quality', maxBitrate: 3_000_000, maxFramerate: 30, scaleResolutionDownBy: 1.0, trackMaxFramerate: 30 },
  balanced: { key: 'balanced', maxBitrate: 2_250_000, maxFramerate: 30, scaleResolutionDownBy: 1.5, trackMaxFramerate: 30 },
  performance: { key: 'performance', maxBitrate: 1_250_000, maxFramerate: 20, scaleResolutionDownBy: 2.0, trackMaxFramerate: 20 }
};

let screenQualityMode = 'auto'; // 'auto' | 'quality' | 'balanced' | 'performance'
const audioSettings = {
  gateThreshold: -40,
  gateAttack: 5,
  gateRelease: 150,
  gateFloor: -60,
  gateHysteresis: 6,
  highPass: 90,
  compressor: false,
  micGain: 1
};

const deviceSettings = {
  micId: null,
  outputId: null
};

const AUDIO_GATE_DEBUG = false;
const SPEAKING_THRESHOLD_DB = -45;
const SPEAKING_HOLD_MS = 200;
const SPEAKING_POLL_MS = 100;

const peers = new Map(); // peerId -> { pc, audioEl, pendingCandidates: [] }
const participants = new Map(); // id -> nickname
const participantPresence = new Map(); // id -> { muted, speakerMuted, listenOnly, updatedAt }
const PRESENCE_PREFIX = '__PRESENCE__';
const speakerAnalysers = new Map(); // peerId -> { analyser, data, sourceNode, lastSpokeAt, speaking }
let speakerLoopRunning = false;
let lastSpeakerCheck = 0;
let micAnalyser = null;
let micAnalyserData = null;
let micAnalyserSource = null;
let micLoopRunning = false;
let lastMicCheck = 0;
let pingListenerAttached = false;
let micTestStream = null;
let micTestAnalyser = null;
let micTestData = null;
let micTestLoopRunning = false;
let statsIntervalId = null;
let lastStatsSample = null;
let lastScreenStatsSample = null;
let activeTab = 'chat';
let currentView = 'lobby';

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

function getSelfPresence() {
  return {
    muted: Boolean(isMuted),
    speakerMuted: Boolean(isSpeakerMuted),
    listenOnly: Boolean(listenOnly)
  };
}

function getPresenceForParticipant(id) {
  if (socket && id === socket.id) return getSelfPresence();
  return participantPresence.get(id) || { muted: false, speakerMuted: false, listenOnly: false };
}

function getParticipantIndicators(id) {
  const p = getPresenceForParticipant(id);
  const indicators = [];
  if (p.muted || p.listenOnly) indicators.push('🔇');
  if (p.speakerMuted) indicators.push('🎧');
  return indicators.join('');
}

function sendPresenceUpdate() {
  if (!socket || !socket.connected || !currentRoomId) return;
  const payload = {
    t: 'presence',
    sid: socket.id,
    ...getSelfPresence(),
    ts: Date.now()
  };
  socket.emit('chat-message', { roomId: currentRoomId, text: `${PRESENCE_PREFIX}${JSON.stringify(payload)}` });
}

function tryHandlePresenceMessage(payload) {
  const text = payload && typeof payload.text === 'string' ? payload.text : '';
  if (!text.startsWith(PRESENCE_PREFIX)) return false;
  const raw = text.slice(PRESENCE_PREFIX.length);
  try {
    const msg = JSON.parse(raw);
    if (!msg || msg.t !== 'presence') return true;
    const senderId = payload.fromId || payload.id || payload.from || msg.sid;
    if (!senderId) return true;
    participantPresence.set(senderId, {
      muted: Boolean(msg.muted),
      speakerMuted: Boolean(msg.speakerMuted),
      listenOnly: Boolean(msg.listenOnly),
      updatedAt: typeof msg.ts === 'number' ? msg.ts : Date.now()
    });
    renderParticipants();
  } catch (_) {
    // ignore parse errors, but swallow message (do not show in chat)
  }
  return true;
}

function playUiBeep({ freq = 660, durationMs = 90, gain = 0.04 } = {}) {
  void ensureAudioContext().then(() => {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(gain, audioCtx.currentTime);
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.type = 'sine';
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + durationMs / 1000);
      osc.onended = () => {
        try { osc.disconnect(); } catch (_) {}
        try { g.disconnect(); } catch (_) {}
      };
    } catch (_) {
      // ignore audio errors
    }
  });
}

function showToast(message, type = 'success') {
  if (!els.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  els.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
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
    if (typeof parsed.micGain === 'number') {
      audioSettings.micGain = Math.max(0, Math.min(2, parsed.micGain));
    }
  } catch (_) {
    // ignore settings parse errors
  }
}

function saveAudioSettings() {
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
}

function loadDeviceSettings() {
  const raw = localStorage.getItem(DEVICE_SETTINGS_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.micId === 'string') deviceSettings.micId = parsed.micId;
    if (typeof parsed.outputId === 'string') deviceSettings.outputId = parsed.outputId;
  } catch (_) {
    // ignore parse errors
  }
}

function loadScreenQualityMode() {
  const raw = localStorage.getItem(SCREEN_QUALITY_KEY);
  if (!raw) return;
  const clean = String(raw).trim();
  if (clean === 'auto' || clean === 'quality' || clean === 'balanced' || clean === 'performance') {
    screenQualityMode = clean;
  }
}

function saveScreenQualityMode() {
  localStorage.setItem(SCREEN_QUALITY_KEY, String(screenQualityMode));
}

function pickAutoScreenPreset() {
  const viewers = peers.size;
  if (viewers <= 2) return SCREEN_QUALITY_PRESETS.quality;
  if (viewers <= 5) return SCREEN_QUALITY_PRESETS.balanced;
  return SCREEN_QUALITY_PRESETS.performance;
}

function getEffectiveScreenPreset() {
  if (screenQualityMode === 'quality') return SCREEN_QUALITY_PRESETS.quality;
  if (screenQualityMode === 'balanced') return SCREEN_QUALITY_PRESETS.balanced;
  if (screenQualityMode === 'performance') return SCREEN_QUALITY_PRESETS.performance;
  return pickAutoScreenPreset();
}

function applyScreenTrackConstraints(preset) {
  if (!screenTrack || !screenTrack.applyConstraints) return;
  const maxFps = preset && preset.trackMaxFramerate ? preset.trackMaxFramerate : 30;
  screenTrack.applyConstraints({ frameRate: { max: maxFps } }).catch(() => {});
}

function saveDeviceSettings() {
  localStorage.setItem(DEVICE_SETTINGS_KEY, JSON.stringify(deviceSettings));
}

function updateAudioSettingsUI() {
  if (els.micGain) els.micGain.value = String(Math.round(audioSettings.micGain * 100));
  if (els.micGainValue) els.micGainValue.textContent = `${Math.round(audioSettings.micGain * 100)}%`;
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
}

async function updateDeviceLists() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  if (els.micSelect) {
    els.micSelect.innerHTML = '';
    devices.filter((d) => d.kind === 'audioinput').forEach((device) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.textContent = device.label || `Mikrofon ${els.micSelect.length + 1}`;
      els.micSelect.appendChild(option);
    });
    if (deviceSettings.micId) els.micSelect.value = deviceSettings.micId;
  }
  if (els.outputSelect) {
    els.outputSelect.innerHTML = '';
    devices.filter((d) => d.kind === 'audiooutput').forEach((device) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.textContent = device.label || `Hoparlör ${els.outputSelect.length + 1}`;
      els.outputSelect.appendChild(option);
    });
    if (deviceSettings.outputId) els.outputSelect.value = deviceSettings.outputId;
  }
}

async function applyOutputDevice(deviceId) {
  if (!deviceId || !HTMLMediaElement.prototype.setSinkId) return;
  const audioEls = Array.from(document.querySelectorAll('audio')).concat(els.screenVideo ? [els.screenVideo] : []);
  for (const el of audioEls) {
    try {
      await el.setSinkId(deviceId);
    } catch (_) {
      // ignore unsupported sink errors
    }
  }
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

function updateGainParams() {
  if (!gainNode || !audioCtx) return;
  gainNode.gain.setValueAtTime(audioSettings.micGain, audioCtx.currentTime);
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
  if (processedStream && currentMicTrack === processedTrack) return processedStream;
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

function openMicTestModal() {
  if (!els.micTestModal) return;
  els.micTestModal.classList.remove('hidden');
}

function closeMicTestModal() {
  if (!els.micTestModal) return;
  els.micTestModal.classList.add('hidden');
  stopMicTest();
}

function startMicTest() {
  stopMicTest();
  if (!els.micLoopback) return;
  const stream = getActiveMicStream();
  if (!stream) {
    setStatus('Mikrofon akışı bulunamadı.');
    return;
  }
  if (!audioCtx) return;
  micTestStream = stream;
  els.micLoopback.srcObject = stream;
  if (deviceSettings.outputId && els.micLoopback.setSinkId) {
    els.micLoopback.setSinkId(deviceSettings.outputId).catch(() => {});
  }
  if (!audioCtx) return;
  micTestAnalyser = audioCtx.createAnalyser();
  micTestAnalyser.fftSize = 512;
  micTestData = new Uint8Array(micTestAnalyser.fftSize);
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(micTestAnalyser);
  micTestAnalyser._source = source;
  micTestLoopRunning = true;
  const loop = () => {
    if (!micTestLoopRunning) return;
    micTestAnalyser.getByteTimeDomainData(micTestData);
    let sum = 0;
    for (let i = 0; i < micTestData.length; i += 1) {
      const v = (micTestData[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / micTestData.length);
    const db = 20 * Math.log10(rms + 1e-9);
    const normalized = Math.max(0, Math.min(100, ((db + 60) / 50) * 100));
    if (els.micTestVuFill) els.micTestVuFill.style.width = `${normalized}%`;
    if (els.micTestDb) els.micTestDb.textContent = `${db.toFixed(0)} dB`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function stopMicTest() {
  micTestLoopRunning = false;
  if (micTestAnalyser) {
    if (micTestAnalyser._source) {
      try { micTestAnalyser._source.disconnect(); } catch (_) {}
      micTestAnalyser._source = null;
    }
    try { micTestAnalyser.disconnect(); } catch (_) {}
    micTestAnalyser = null;
  }
  if (micTestStream) {
    micTestStream = null;
  }
  if (els.micLoopback) els.micLoopback.srcObject = null;
  if (els.micTestVuFill) els.micTestVuFill.style.width = '0%';
  if (els.micTestDb) els.micTestDb.textContent = '- dB';
}

async function runEchoTest() {
  if (!audioCtx) return;
  if (!els.echoResult) return;
  els.echoResult.textContent = 'Ölçülüyor...';
  const stream = getActiveMicStream();
  if (!stream) {
    els.echoResult.textContent = 'Mikrofon yok';
    return;
  }
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  const data = new Uint8Array(analyser.fftSize);
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  gain.gain.value = 0.3;
  osc.frequency.value = 880;
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const startAt = performance.now();
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);

  let detected = false;
  const detectLoop = () => {
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i += 1) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    const db = 20 * Math.log10(rms + 1e-9);
    if (db > -35) {
      detected = true;
      const ms = Math.round(performance.now() - startAt);
      els.echoResult.textContent = `${ms} ms`;
      return;
    }
    if (performance.now() - startAt < 2000) {
      requestAnimationFrame(detectLoop);
    } else if (!detected) {
      els.echoResult.textContent = 'Algılanamadı';
    }
  };
  requestAnimationFrame(detectLoop);
}

function startStatsLoop() {
  if (statsIntervalId) return;
  statsIntervalId = setInterval(async () => {
    if (peers.size === 0) return;
    let outBytes = 0;
    let inBytes = 0;
    let jitter = 0;
    let loss = 0;
    let reports = 0;
    let videoFramesEncoded = 0;
    let videoFpsFromStats = 0;
    for (const [peerId, info] of peers.entries()) {
      const stats = await info.pc.getStats();
      stats.forEach((report) => {
        if (report.type === 'outbound-rtp' && report.kind === 'audio') {
          outBytes += report.bytesSent || 0;
        }
        if (report.type === 'inbound-rtp' && report.kind === 'audio') {
          inBytes += report.bytesReceived || 0;
          jitter += report.jitter || 0;
          loss += report.packetsLost || 0;
          reports += 1;
        }
        if (report.type === 'outbound-rtp' && report.kind === 'video') {
          videoFramesEncoded += report.framesEncoded || 0;
          if (typeof report.framesPerSecond === 'number') {
            videoFpsFromStats = Math.max(videoFpsFromStats, report.framesPerSecond);
          }
        }
      });
    }
    const now = Date.now();
    if (!lastStatsSample) {
      lastStatsSample = { outBytes, inBytes, now, loss };
      return;
    }
    const dt = (now - lastStatsSample.now) / 1000;
    const outRate = dt > 0 ? ((outBytes - lastStatsSample.outBytes) * 8) / 1000 / dt : 0;
    const inRate = dt > 0 ? ((inBytes - lastStatsSample.inBytes) * 8) / 1000 / dt : 0;
    const jitterAvg = reports ? (jitter / reports) * 1000 : 0;
    const lossDiff = Math.max(0, loss - lastStatsSample.loss);
    if (els.statOut) els.statOut.textContent = `${outRate.toFixed(0)} kbps`;
    if (els.statIn) els.statIn.textContent = `${inRate.toFixed(0)} kbps`;
    if (els.statJitter) els.statJitter.textContent = `${jitterAvg.toFixed(0)} ms`;
    if (els.statLoss) els.statLoss.textContent = `${lossDiff}`;
    if (els.statRtt) {
      const rtt = socket && socket.io && typeof socket.io.engine?.ping === 'number'
        ? `${Math.round(socket.io.engine.ping)} ms`
        : '-';
      els.statRtt.textContent = rtt;
    }
    lastStatsSample = { outBytes, inBytes, now, loss };

    if (videoFramesEncoded > 0) {
      let estimatedFps = videoFpsFromStats || 0;
      if (!estimatedFps && lastScreenStatsSample && dt > 0) {
        const frameDelta = videoFramesEncoded - lastScreenStatsSample.framesEncoded;
        estimatedFps = frameDelta > 0 ? frameDelta / dt : 0;
      }
      lastScreenStatsSample = { framesEncoded: videoFramesEncoded, now };
    }
  }, 1500);
}

function stopStatsLoop() {
  if (statsIntervalId) {
    clearInterval(statsIntervalId);
    statsIntervalId = null;
  }
  lastStatsSample = null;
}

function ensureAudioNodes({ resetSource = false } = {}) {
  if (!audioCtx || !rawMicStream) return;
  if (!audioSourceNode || resetSource) {
    if (audioSourceNode) {
      try { audioSourceNode.disconnect(); } catch (_) {}
    }
    audioSourceNode = audioCtx.createMediaStreamSource(rawMicStream);
  }
  if (!gainNode) {
    gainNode = audioCtx.createGain();
  }
  if (!destinationNode) {
    destinationNode = audioCtx.createMediaStreamDestination();
  }
  if (noiseEnabled) {
    if (!highPassNode) {
      highPassNode = audioCtx.createBiquadFilter();
      highPassNode.type = 'highpass';
    }
    if (!compressorNode) {
      compressorNode = audioCtx.createDynamicsCompressor();
    }
    if (!gateNode && audioWorkletLoaded) {
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
  }

  try { highPassNode && highPassNode.disconnect(); } catch (_) {}
  try { gateNode && gateNode.disconnect(); } catch (_) {}
  try { compressorNode && compressorNode.disconnect(); } catch (_) {}
  try { gainNode && gainNode.disconnect(); } catch (_) {}

  if (noiseEnabled && gateNode && highPassNode) {
    audioSourceNode.connect(highPassNode);
    highPassNode.connect(gateNode);
    if (audioSettings.compressor && compressorNode) {
      gateNode.connect(compressorNode);
      compressorNode.connect(gainNode);
    } else {
      gateNode.connect(gainNode);
    }
  } else {
    audioSourceNode.connect(gainNode);
  }
  gainNode.connect(destinationNode);

  processedStream = destinationNode.stream;
  processedTrack = processedStream.getAudioTracks()[0] || null;
  if (highPassNode) {
    highPassNode.frequency.setValueAtTime(audioSettings.highPass, audioCtx.currentTime);
  }
  updateCompressorParams();
  updateGateParams();
  updateGainParams();
}

function updateAudioParams() {
  if (!audioCtx) return;
  if (highPassNode) {
    highPassNode.frequency.setValueAtTime(audioSettings.highPass, audioCtx.currentTime);
  }
  updateCompressorParams();
  updateGateParams();
  updateGainParams();
  ensureAudioNodes();
}

async function updateProcessedTrack() {
  try {
    await ensureAudioContext();
    if (noiseEnabled) {
      await ensureAudioWorklet();
    }
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
    log(`Gürültü azaltma hatası: ${err.message || err}`);
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
  els.screenShareBtn.textContent = t.screenShareStart;
  els.screenShareBtn.style.display = isScreenSharing ? 'none' : 'inline-flex';
  if (els.screenStopBtn) {
    els.screenStopBtn.textContent = t.screenShareStop;
    els.screenStopBtn.style.display = isScreenSharing ? 'inline-flex' : 'none';
    els.screenStopBtn.disabled = !isScreenSharing;
  }
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

function setView(nextView) {
  currentView = nextView;
  if (els.lobbyView) {
    els.lobbyView.classList.toggle('active', nextView === 'lobby');
  }
  if (els.roomView) {
    els.roomView.classList.toggle('active', nextView === 'room');
  }
  if (nextView === 'lobby' && els.settingsDrawer) {
    els.settingsDrawer.classList.add('hidden');
  }
}

function updateModerationTargets() {
  if (!els.moderationTarget) return;
  els.moderationTarget.innerHTML = '';
  const options = Array.from(participants.entries())
    .filter(([id]) => !socket || id !== socket.id)
    .map(([id, nickname]) => ({ id, nickname }));
  if (options.length === 0) {
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = 'Kullanıcı yok';
    els.moderationTarget.appendChild(empty);
    return;
  }
  options.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = `${user.nickname} (${user.id.slice(0, 4)})`;
    els.moderationTarget.appendChild(option);
  });
}

function updateModerationUI() {
  const isHost = socket && currentHostId && socket.id === currentHostId;
  if (els.muteOtherBtn) els.muteOtherBtn.disabled = !isHost;
  if (els.unmuteOtherBtn) els.unmuteOtherBtn.disabled = !isHost;
  if (els.kickBtn) els.kickBtn.disabled = !isHost;
  if (els.banBtn) els.banBtn.disabled = !isHost;
  if (els.slowModeBtn) els.slowModeBtn.disabled = !isHost;
  if (els.moderationTarget) els.moderationTarget.disabled = !isHost;
  if (els.slowModeSelect) els.slowModeSelect.disabled = !isHost;
  if (els.moderationPanel) {
    els.moderationPanel.style.display = isHost ? 'block' : 'none';
  }
}

function setActiveTab(tabName) {
  let target = tabName || 'chat';
  const targetPane = document.querySelector(`.tabPane[data-tab="${target}"]`);
  if (!targetPane) target = 'chat';
  activeTab = target;
  const tabs = document.querySelectorAll('.tabBtn');
  const panes = document.querySelectorAll('.tabPane');
  tabs.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === target);
  });
  panes.forEach((pane) => {
    pane.classList.toggle('active', pane.dataset.tab === target);
  });
  localStorage.setItem(TAB_SETTINGS_KEY, target);
}

function initTabs() {
  const saved = localStorage.getItem(TAB_SETTINGS_KEY);
  setActiveTab(saved || 'chat');
  const tabs = document.querySelectorAll('.tabBtn');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });
}

function setScreenStatusText(text) {
  if (!els.screenStatus) return;
  els.screenStatus.textContent = text;
}

function setScreenVideoStream(stream, ownerId) {
  if (!els.screenVideo) return;
  els.screenVideo.srcObject = stream || null;
  activeScreenPeerId = stream ? ownerId : null;
  if (els.screenPreview) {
    els.screenPreview.classList.toggle('hasStream', Boolean(stream));
  }
  if (deviceSettings.outputId && els.screenVideo.setSinkId) {
    els.screenVideo.setSinkId(deviceSettings.outputId).catch(() => {});
  }
  if (els.screenModalVideo) {
    els.screenModalVideo.srcObject = isScreenModalOpen ? (stream || null) : null;
  }
  if (els.screenModal && els.screenModalStatus) {
    els.screenModalStatus.textContent = stream ? '' : t.screenShareEmpty;
    els.screenModal.querySelector('.screenModalBody')?.classList.toggle('hasStream', Boolean(stream));
  }
  updateFullscreenButton();
}

function clearScreenVideo(message) {
  if (isScreenModalOpen) closeScreenModal();
  setScreenVideoStream(null, null);
  setScreenStatusText(message || t.screenShareEmpty);
}

function hasWindowControls() {
  return Boolean(window.windowControls && typeof window.windowControls.minimize === 'function');
}

function applyWindowState(nextState) {
  if (!nextState) return;
  windowState = {
    isMaximized: Boolean(nextState.isMaximized),
    isFullScreen: Boolean(nextState.isFullScreen)
  };
  document.body.classList.toggle('window-maximized', windowState.isMaximized);
  document.body.classList.toggle('window-fullscreen', windowState.isFullScreen);
  updateWindowControls();
}

function updateWindowControls() {
  if (els.winMaximize) {
    els.winMaximize.textContent = windowState.isMaximized ? 'REST' : 'MAX';
    els.winMaximize.title = windowState.isMaximized ? 'Restore' : 'Maximize';
  }
  if (els.winFullscreen) {
    els.winFullscreen.textContent = windowState.isFullScreen ? 'EXIT' : 'FULL';
    els.winFullscreen.title = windowState.isFullScreen ? 'Exit Fullscreen' : 'Fullscreen';
  }
}

async function syncWindowState() {
  if (!hasWindowControls()) return;
  try {
    const [isMaximized, isFullScreen] = await Promise.all([
      window.windowControls.isMaximized(),
      window.windowControls.isFullScreen()
    ]);
    applyWindowState({ isMaximized, isFullScreen });
  } catch (_) {
    // ignore state sync errors
  }
}

function initWindowControls() {
  if (!hasWindowControls()) return;
  if (els.winMinimize) {
    els.winMinimize.addEventListener('click', () => {
      window.windowControls.minimize();
    });
  }
  if (els.winMaximize) {
    els.winMaximize.addEventListener('click', async () => {
      if (windowState.isFullScreen && window.windowControls.setFullscreen) {
        await window.windowControls.setFullscreen(false);
      }
      window.windowControls.maximize();
    });
  }
  if (els.winFullscreen) {
    els.winFullscreen.addEventListener('click', () => {
      window.windowControls.toggleFullscreen();
    });
  }
  if (els.winClose) {
    els.winClose.addEventListener('click', () => {
      window.windowControls.close();
    });
  }
  if (els.titlebar) {
    els.titlebar.addEventListener('dblclick', (event) => {
      if (event.target && event.target.closest('.windowControls')) return;
      if (windowState.isFullScreen) return;
      window.windowControls.maximize();
    });
  }
  if (typeof window.windowControls.onStateChange === 'function') {
    window.windowControls.onStateChange((state) => {
      applyWindowState(state);
      if (!state.isFullScreen && isFullscreenActive() && videoRequestedWindowFullscreen) {
        void exitDomFullscreen();
        videoRequestedWindowFullscreen = false;
      }
    });
  }
  void syncWindowState();
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
}

function updateFullscreenButton() {
  if (!els.screenFullscreenBtn) return;
  const hasStream = Boolean(els.screenVideo && els.screenVideo.srcObject);
  els.screenFullscreenBtn.style.display = hasStream ? 'inline-flex' : 'none';
  els.screenFullscreenBtn.textContent = isScreenModalOpen ? t.fullscreenExit : t.fullscreenEnter;
}

function handleDomFullscreenChange() {
  const domActive = isFullscreenActive();
  updateFullscreenButton();
  if (domActive && !windowState.isFullScreen) {
    void ensureWindowFullscreen(true);
    return;
  }
  if (!domActive && videoRequestedWindowFullscreen) {
    if (hasWindowControls() && window.windowControls.setFullscreen) {
      void window.windowControls.setFullscreen(false);
    }
    videoRequestedWindowFullscreen = false;
  }
}

function getFullscreenTarget() {
  return (
    els.screenVideo ||
    els.screenPreview ||
    document.getElementById('screenPreviewVideo') ||
    document.querySelector('video#screenPreview') ||
    document.getElementById('screenVideo') ||
    document.querySelector('.screenPreview video')
  );
}

async function requestDomFullscreen(target) {
  if (!target) throw new Error('Fullscreen target missing');
  if (target.requestFullscreen) return target.requestFullscreen();
  if (target.webkitRequestFullscreen) return target.webkitRequestFullscreen();
  if (target.mozRequestFullScreen) return target.mozRequestFullScreen();
  if (target.msRequestFullscreen) return target.msRequestFullscreen();
  throw new Error('Fullscreen API unsupported');
}

async function exitDomFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  return undefined;
}

async function ensureWindowFullscreen(enabled) {
  if (!hasWindowControls() || typeof window.windowControls.setFullscreen !== 'function') {
    return false;
  }
  try {
    const next = await window.windowControls.setFullscreen(Boolean(enabled));
    if (enabled) videoRequestedWindowFullscreen = true;
    return Boolean(next);
  } catch (_) {
    return false;
  }
}

function openScreenModal() {
  if (!els.screenModal || !els.screenModalVideo) {
    log('Modal açılamadı: modal elementleri bulunamadı.');
    setStatus('Modal açılamadı: element bulunamadı.');
    return;
  }
  const stream = (els.screenVideo && els.screenVideo.srcObject) || screenStream;
  els.screenModal.classList.remove('hidden');
  els.screenModal.style.display = 'flex';
  if (els.screenPreview) {
    els.screenPreview.classList.add('modal-active');
  }
  els.screenModalVideo.srcObject = stream || null;
  if (els.screenModalStatus) {
    els.screenModalStatus.textContent = stream ? '' : t.screenShareEmpty;
  }
  els.screenModal.querySelector('.screenModalBody')?.classList.toggle('hasStream', Boolean(stream));
  isScreenModalOpen = true;
  updateFullscreenButton();
  log(`Modal açıldı. Stream var mı: ${Boolean(stream)}`);
}

function closeScreenModal() {
  if (!els.screenModal || !els.screenModalVideo) return;
  els.screenModal.classList.add('hidden');
  els.screenModal.style.removeProperty('display');
  els.screenModalVideo.srcObject = null;
  if (els.screenPreview) {
    els.screenPreview.classList.remove('modal-active');
  }
  els.screenModal.querySelector('.screenModalBody')?.classList.remove('hasStream');
  isScreenModalOpen = false;
  updateFullscreenButton();
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
  if (els.screenStopBtn) els.screenStopBtn.disabled = !inRoom;
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
    const indicators = getParticipantIndicators(id);
    const suffix = indicators ? ` ${indicators}` : '';
    li.textContent = isSelf ? `${nickname} (sen)${suffix}` : `${nickname}${suffix}`;
    els.usersList.appendChild(li);
  });
}

function renderRoomsList(rooms) {
  if (!els.roomsList) return;
  els.roomsList.innerHTML = '';
  const list = Array.isArray(rooms) ? rooms : [];
  const sorted = currentRoomId
    ? [...list].sort((a, b) => {
      if (a.roomId === currentRoomId) return -1;
      if (b.roomId === currentRoomId) return 1;
      return 0;
    })
    : list;
  if (sorted.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'mutedText';
    empty.textContent = t.roomsEmpty;
    els.roomsList.appendChild(empty);
    return;
  }
  sorted.forEach((room) => {
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
  const activeItem = els.roomsList.querySelector('.roomItem.active');
  if (activeItem) {
    activeItem.scrollIntoView({ block: 'nearest' });
  }
}

function randomRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

function getAudioConstraints() {
  const audioConstraints = {
    echoCancellation: noiseEnabled,
    noiseSuppression: noiseEnabled,
    autoGainControl: noiseEnabled && agcEnabled
  };
  if (deviceSettings.micId) {
    audioConstraints.deviceId = { exact: deviceSettings.micId };
  }
  return {
    audio: audioConstraints
  };
}

function applyMuteToTrack(track) {
  if (!track) return;
  track.enabled = !isMuted && !listenOnly;
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

function configureScreenSender(sender, peerId) {
  if (!sender || typeof sender.getParameters !== 'function') return;
  try {
    const params = sender.getParameters() || {};
    const baseEncoding = (params.encodings && params.encodings[0]) || {};
    const nextEncoding = {
      ...baseEncoding,
      maxBitrate: 2_500_000,
      maxFramerate: 30,
      scaleResolutionDownBy: 1.5
    };
    params.encodings = [nextEncoding];
    sender.setParameters(params).then(() => {
      log(`[screen] sender parameters (${peerId || 'local'}): ${JSON.stringify(nextEncoding)}`);
    }).catch((err) => {
      log(`[screen] sender parameter error (${peerId || 'local'}): ${err.message || err}`);
    });
  } catch (err) {
    log(`[screen] sender parameter error (${peerId || 'local'}): ${err.message || err}`);
  }
}

function attachScreenTrackToPeer(peerId) {
  const info = peers.get(peerId);
  if (!info || !screenTrack) return;
  if (info.videoTransceiver) {
    info.videoTransceiver.direction = 'sendrecv';
    info.videoTransceiver.sender.replaceTrack(screenTrack);
    configureScreenSender(info.videoTransceiver.sender, peerId);
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
    try {
      const settings = screenTrack.getSettings ? screenTrack.getSettings() : {};
      log(`[screen] track settings: ${JSON.stringify(settings)}`);
    } catch (err) {
      log(`[screen] track settings error: ${err.message || err}`);
    }
    screenTrack.onended = () => stopScreenShare('ended');
    isScreenSharing = true;
    updateScreenShareButton();
    updateStatusBar();
    setScreenVideoStream(screenStream, socket ? socket.id : 'local');
    setScreenStatusText(t.screenShareStarted);
    setStatus(t.screenShareStarted);
    showToast('Ekran paylaşımı başladı', 'success');
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
  if (deviceSettings.outputId && audio.setSinkId) {
    audio.setSinkId(deviceSettings.outputId).catch(() => {});
  }
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
    stopStatsLoop();
    currentHostId = null;
    setUiState({ inRoom: false });
    setView('lobby');
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

  if (socket.io) {
    socket.io.on('reconnect_attempt', (attempt) => {
      setStatus(`Yeniden bağlanılıyor... (deneme ${attempt})`);
    });
    socket.io.on('reconnect_failed', () => {
      setStatus('Yeniden bağlanma başarısız.');
    });
  }

  socket.on('rooms-list', (rooms = []) => {
    renderRoomsList(rooms);
  });

  socket.on('rooms-updated', (rooms = []) => {
    renderRoomsList(rooms);
  });

  socket.on('users-in-room', ({ roomId, users, hostId } = {}) => {
    if (!roomId) {
      setStatus('Oda ID gerekli.');
      return;
    }
    currentRoomId = roomId;
    localStorage.setItem(LAST_ROOM_KEY, roomId);
    currentHostId = hostId || null;
    manualLeave = false;
    setUiState({ inRoom: true });
    setView('room');
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
    updateModerationTargets();
    updateModerationUI();
    clearChat();
    setStatus([`Odaya katılındı: ${currentRoomId}`, `Katılımcı: ${participants.size}`]);
    log(`Odaya katılındı: ${currentRoomId}`);
    log(`Kullanıcı listesi alındı: ${peersInRoom.length}`);

    peersInRoom.forEach((peer) => {
      createPeerConnection(peer.id, true);
    });
    sendPresenceUpdate();
    socket.emit('list-rooms');
    startStatsLoop();
  });

  socket.on('user-joined', ({ id, nickname } = {}) => {
    if (!id) return;
    participants.set(id, nickname || id);
    renderParticipants();
    updateModerationTargets();
    createPeerConnection(id, false);
    setStatus([`Yeni katılımcı: ${nickname || id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Yeni katılımcı: ${nickname || id}`);
    showToast(`${nickname || id} odaya katıldı`, 'success');
    if (!socket || id !== socket.id) playUiBeep({ freq: 740, durationMs: 80 });
  });

  socket.on('user-left', ({ id } = {}) => {
    if (!id) return;
    cleanupPeer(id);
    participants.delete(id);
    participantPresence.delete(id);
    renderParticipants();
    renderAudioControls();
    updateModerationTargets();
    setStatus([`Kullanıcı ayrıldı: ${id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Kullanıcı ayrıldı: ${id}`);
    showToast(`${id} odadan çıktı`, 'warn');
    playUiBeep({ freq: 440, durationMs: 90 });
  });

  socket.on('host-changed', ({ hostId } = {}) => {
    currentHostId = hostId || null;
    updateModerationUI();
  });

  socket.on('join-denied', ({ reason } = {}) => {
    setStatus(reason || 'Odaya katılma reddedildi.');
    showToast(reason || 'Odaya katılma reddedildi.', 'warn');
    leaveRoom();
  });

  socket.on('kicked', ({ reason } = {}) => {
    showToast(reason || 'Odadan çıkarıldın.', 'warn');
    leaveRoom();
  });

  socket.on('banned', ({ reason } = {}) => {
    showToast(reason || 'Odadan yasaklandın.', 'warn');
    leaveRoom();
  });

  socket.on('force-mute', ({ reason } = {}) => {
    isMuted = true;
    applyMuteToTrack(currentMicTrack);
    updateMuteButton();
    updateStatusBar();
    showToast(reason || 'Mikrofon sessize alındı.', 'warn');
    sendPresenceUpdate();
  });

  socket.on('force-unmute', ({ reason } = {}) => {
    isMuted = false;
    applyMuteToTrack(currentMicTrack);
    updateMuteButton();
    updateStatusBar();
    showToast(reason || 'Mikrofon açıldı.', 'success');
    sendPresenceUpdate();
  });

  socket.on('slowmode-warn', ({ ms } = {}) => {
    showToast(`Slow mode aktif (${ms}ms).`, 'warn');
  });

  socket.on('slowmode-updated', ({ ms } = {}) => {
    showToast(`Slow mode ${ms ? `${ms}ms` : 'kapalı'}.`, 'success');
  });

  socket.on('chat-message', (payload) => {
    if (tryHandlePresenceMessage(payload)) return;
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
    configureScreenSender(info.videoTransceiver.sender, peerId);
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
      showToast(`${participants.get(peerId) || peerId} ekran paylaşımı başlattı`, 'success');
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
  if (!s) {
    pendingJoin = null;
    currentRoomId = null;
    setUiState({ inRoom: false });
    setView('lobby');
    setStatus('Bağlantı kurulamadı. Socket istemcisi yüklenemedi.');
    return;
  }
  if (s.connected) {
    s.emit('join-room', pendingJoin);
  }
}

function leaveRoom() {
  manualLeave = true;
  pendingJoin = null;
  if (isScreenSharing) stopScreenShare('manual');
  cleanupAllPeers();
  stopStatsLoop();

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
  rawMicStream = null;
  rawMicTrack = null;
  processedStream = null;
  processedTrack = null;
  currentMicTrack = null;
  setVuLevel(0, null);

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
  setView('lobby');
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
  sendPresenceUpdate();
});

if (els.noiseToggle) {
  els.noiseToggle.addEventListener('change', async (event) => {
    noiseEnabled = Boolean(event.target.checked);
    if (currentRoomId) {
      await ensureLocalStream({ forceNew: true });
      setStatus(noiseEnabled ? t.advancedAudioOn : t.advancedAudioOff);
      log(`Gürültü azaltma ${noiseEnabled ? 'açıldı' : 'kapandı'}.`);
    }
  });
}

if (els.agcToggle) {
  els.agcToggle.addEventListener('change', async (event) => {
    agcEnabled = Boolean(event.target.checked);
    if (currentRoomId) {
      await ensureLocalStream({ forceNew: true });
      log(`AGC ${agcEnabled ? 'açıldı' : 'kapandı'}.`);
    }
  });
}

if (els.listenOnlyToggle) {
  els.listenOnlyToggle.addEventListener('change', () => {
    listenOnly = Boolean(els.listenOnlyToggle.checked);
    applyMuteToTrack(currentMicTrack);
    setupMicForAllPeers();
    updateStatusBar();
    showToast(listenOnly ? 'Listen-only aktif.' : 'Listen-only kapalı.', 'success');
    sendPresenceUpdate();
  });
}

if (els.deafToggle) {
  els.deafToggle.addEventListener('change', () => {
    isDeaf = Boolean(els.deafToggle.checked);
    isSpeakerMuted = isDeaf;
    updateSpeakerButton();
    Array.from(peers.keys()).forEach(applyRemoteAudioSettings);
    updateStatusBar();
    showToast(isDeaf ? 'Deaf aktif.' : 'Deaf kapalı.', 'success');
    sendPresenceUpdate();
  });
}

if (els.micSelect) {
  els.micSelect.addEventListener('change', async () => {
    deviceSettings.micId = els.micSelect.value;
    saveDeviceSettings();
    if (currentRoomId) {
      await ensureLocalStream({ forceNew: true });
    }
  });
}

if (els.outputSelect) {
  els.outputSelect.addEventListener('change', async () => {
    deviceSettings.outputId = els.outputSelect.value;
    saveDeviceSettings();
    await applyOutputDevice(deviceSettings.outputId);
  });
}

  if (els.micGain) {
    els.micGain.addEventListener('input', (event) => {
      audioSettings.micGain = Math.max(0, Math.min(2, Number(event.target.value) / 100));
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.highPassFreq) {
    els.highPassFreq.addEventListener('input', (event) => {
      audioSettings.highPass = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.compressorToggle) {
    els.compressorToggle.addEventListener('change', (event) => {
      audioSettings.compressor = Boolean(event.target.checked);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.gateThreshold) {
    els.gateThreshold.addEventListener('input', (event) => {
      audioSettings.gateThreshold = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.gateAttack) {
    els.gateAttack.addEventListener('input', (event) => {
      audioSettings.gateAttack = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.gateRelease) {
    els.gateRelease.addEventListener('input', (event) => {
      audioSettings.gateRelease = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

  if (els.gateFloor) {
    els.gateFloor.addEventListener('input', (event) => {
      audioSettings.gateFloor = Number(event.target.value);
      saveAudioSettings();
      updateAudioSettingsUI();
      updateAudioParams();
    });
  }

if (els.speakerBtn) {
  els.speakerBtn.addEventListener('click', () => {
    isSpeakerMuted = !isSpeakerMuted;
    updateSpeakerButton();
    Array.from(peers.keys()).forEach(applyRemoteAudioSettings);
    sendPresenceUpdate();
  });
}

if (els.screenShareBtn) {
  els.screenShareBtn.addEventListener('click', () => {
    if (!isScreenSharing) startScreenShare();
  });
}

if (els.screenStopBtn) {
  els.screenStopBtn.addEventListener('click', () => {
    if (isScreenSharing) stopScreenShare('manual');
  });
}

if (els.micTestBtn) {
  els.micTestBtn.addEventListener('click', async () => {
    await ensureAudioContext();
    openMicTestModal();
  });
}

if (els.micTestClose) {
  els.micTestClose.addEventListener('click', () => {
    closeMicTestModal();
  });
}

if (els.micTestStart) {
  els.micTestStart.addEventListener('click', async () => {
    await ensureAudioContext();
    startMicTest();
  });
}

if (els.micTestStop) {
  els.micTestStop.addEventListener('click', () => {
    stopMicTest();
  });
}

if (els.echoTestBtn) {
  els.echoTestBtn.addEventListener('click', async () => {
    await ensureAudioContext();
    runEchoTest();
  });
}

if (els.screenFullscreenBtn) {
  els.screenFullscreenBtn.addEventListener('click', () => {
    log('Tam Ekran butonu tıklandı (modal).');
    if (isScreenModalOpen) {
      closeScreenModal();
    } else {
      openScreenModal();
    }
  });
}

if (els.screenModalClose) {
  els.screenModalClose.addEventListener('click', () => {
    closeScreenModal();
  });
}

if (els.screenModal) {
  els.screenModal.addEventListener('click', (event) => {
    if (event.target === els.screenModal) {
      closeScreenModal();
    }
  });
}

if (els.settingsBtn) {
  els.settingsBtn.addEventListener('click', () => {
    if (els.settingsDrawer) els.settingsDrawer.classList.remove('hidden');
  });
}

if (els.settingsClose) {
  els.settingsClose.addEventListener('click', () => {
    if (els.settingsDrawer) els.settingsDrawer.classList.add('hidden');
  });
}

document.addEventListener('fullscreenchange', handleDomFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleDomFullscreenChange);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isScreenModalOpen) {
    closeScreenModal();
  }
});

if (els.refreshRoomsBtn) {
  els.refreshRoomsBtn.addEventListener('click', () => {
    const s = ensureSocket();
    if (s && s.connected) s.emit('list-rooms');
  });
}

function sendModeration(action) {
  if (!socket || !currentRoomId || !els.moderationTarget) return;
  const targetId = els.moderationTarget.value;
  if (!targetId) return;
  socket.emit('moderation-action', { roomId: currentRoomId, action, targetId });
}

if (els.muteOtherBtn) {
  els.muteOtherBtn.addEventListener('click', () => sendModeration('mute'));
}
if (els.unmuteOtherBtn) {
  els.unmuteOtherBtn.addEventListener('click', () => sendModeration('unmute'));
}
if (els.kickBtn) {
  els.kickBtn.addEventListener('click', () => sendModeration('kick'));
}
if (els.banBtn) {
  els.banBtn.addEventListener('click', () => sendModeration('ban'));
}
if (els.slowModeBtn) {
  els.slowModeBtn.addEventListener('click', () => {
    if (!socket || !currentRoomId || !els.slowModeSelect) return;
    const slowModeMs = Number(els.slowModeSelect.value);
    socket.emit('moderation-action', { roomId: currentRoomId, action: 'slowmode', slowModeMs });
  });
}

if (els.chatSendBtn) {
  els.chatSendBtn.addEventListener('click', handleChatSubmit);
}

if (els.logCopyBtn) {
  els.logCopyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(logLines.join('\n'));
      showToast('Log kopyalandı', 'success');
    } catch (err) {
      showToast('Log kopyalanamadı', 'warn');
    }
  });
}

if (els.logClearBtn) {
  els.logClearBtn.addEventListener('click', () => {
    logLines.length = 0;
    if (els.log) els.log.textContent = '';
    showToast('Log temizlendi', 'success');
  });
}

if (els.moderationToggle) {
  els.moderationToggle.addEventListener('click', () => {
    if (els.moderationPanel) {
      els.moderationPanel.classList.toggle('open');
    }
  });
}

if (els.chatInput) {
  els.chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChatSubmit();
    }
  });
}

initWindowControls();
setText();
loadAudioSettings();
loadDeviceSettings();
updateAudioSettingsUI();
if (els.noiseToggle) els.noiseToggle.checked = noiseEnabled;
if (els.agcToggle) els.agcToggle.checked = agcEnabled;
setUiState({ inRoom: false });
setView('lobby');
setStatus('Hazır. Oda ID girip katılabilirsin.');
log('Hazır.');
updateServerUrlDisplay();
updateMuteButton();
updateSpeakerButton();
updateScreenShareButton();
updateFullscreenButton();
updateStatusBar();
setScreenStatusText(t.screenShareEmpty);
updateDeviceLists();
if (deviceSettings.outputId) {
  applyOutputDevice(deviceSettings.outputId);
}
const lastRoom = localStorage.getItem(LAST_ROOM_KEY);
if (lastRoom && els.roomId) {
  els.roomId.value = lastRoom;
  currentRoomId = lastRoom;
}
initTabs();
if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
  navigator.mediaDevices.addEventListener('devicechange', () => {
    updateDeviceLists();
  });
}

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

if (els.modeSelect) {
  els.modeSelect.addEventListener('change', () => {
    if (els.modeSelect.value === 'sfu') {
      showToast('SFU desteği yakında. Şimdilik mesh kullanılıyor.', 'warn');
      els.modeSelect.value = 'mesh';
    }
  });
}

ensureSocket();
setInterval(() => {
  updateStatusBar();
}, 1000);