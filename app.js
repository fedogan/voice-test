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
  screenQualitySelect: document.getElementById('screenQuality'),
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
  softRefreshBtn: document.getElementById('softRefreshBtn'),
  hardRefreshBtn: document.getElementById('hardRefreshBtn'),
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

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' }
];

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
let roomJoinAcked = false;
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
const SCREEN_QUALITY_KEY = 'screen_quality_preset';
const LEGACY_SCREEN_QUALITY_KEY = 'voice-screen-quality';
const CLIENT_ID_KEY = 'voice-client-id';
const VIEW_SETTINGS_KEY = 'voice-view-settings';

const SCREEN_QUALITY_PRESETS = {
  low: {
    key: 'low',
    capture: {
      width: { ideal: 1280, max: 1280 },
      height: { ideal: 720, max: 720 },
      frameRate: { ideal: 15, max: 20 }
    },
    sender: {
      maxBitrate: 900_000,
      maxFramerate: 15,
      scaleResolutionDownBy: 2.0,
      priority: 'low',
      networkPriority: 'low'
    },
    trackMaxFramerate: 15
  },
  medium: {
    key: 'medium',
    capture: {
      width: { ideal: 1280, max: 1280 },
      height: { ideal: 720, max: 720 },
      frameRate: { ideal: 20, max: 20 }
    },
    sender: {
      maxBitrate: 1_500_000,
      maxFramerate: 20,
      scaleResolutionDownBy: 1.8,
      priority: 'low',
      networkPriority: 'low'
    },
    trackMaxFramerate: 20
  },
  high: {
    key: 'high',
    capture: {
      width: { ideal: 1600, max: 1600 },
      height: { ideal: 900, max: 900 },
      frameRate: { ideal: 24, max: 24 }
    },
    sender: {
      maxBitrate: 2_200_000,
      maxFramerate: 24,
      scaleResolutionDownBy: 1.5,
      priority: 'low',
      networkPriority: 'low'
    },
    trackMaxFramerate: 24
  }
};

const SCREEN_PRESET_ORDER = ['low', 'medium', 'high'];
const SCREEN_ADAPTIVE_COOLDOWN_MS = 10_000;
const SCREEN_ADAPTIVE_STABLE_UP_MS = 12_000;
let screenQualityMode = 'low';
let activeScreenQualityPreset = 'low';
let lastScreenAdaptiveChangeAt = 0;
let stableScreenSinceAt = 0;
let lastScreenAdaptiveStats = null;
let watchStreamsEnabled = true;
let isTogglingWatch = false;
const remoteScreenStreams = new Map();
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

const peers = new Map(); // peerId -> { pc, audioEl, pendingIce: [] }
const participants = new Map(); // id -> nickname
const participantViewEnabled = new Map(); // id -> viewEnabled
const participantPresence = new Map(); // id -> { muted, speakerMuted, listenOnly, updatedAt }
const PRESENCE_PREFIX = '__PRESENCE__';
const speakerAnalysers = new Map(); // peerId -> { analyser, data, sourceNode, lastSpokeAt, speaking }
const peerDisconnectTimers = new Map(); // peerId -> timeoutId
const peerUiStates = new Map(); // peerId -> connecting | connected | recovering
const PEER_DISCONNECT_GRACE_MS = 12000;
const PEER_CONNECTING_TIMEOUT_MS = 10_000;
const NEGOTIATION_DEBOUNCE_MS = 100;
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
const iceLogCounts = new Map();

function createClientId() {
  return `c-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function getOrCreateClientId() {
  const stored = localStorage.getItem(CLIENT_ID_KEY);
  if (stored && /^[A-Za-z0-9:_-]{4,64}$/.test(stored)) return stored;
  const created = createClientId();
  localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

const localClientId = getOrCreateClientId();

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

function getPeerUiLabel(state) {
  if (state === 'connected') return 'bağlı';
  if (state === 'recovering') return 'yeniden bağlanıyor';
  return 'bağlanıyor';
}

function setPeerUiState(peerId, nextState, reason = '') {
  if (!peerId) return;
  const prev = peerUiStates.get(peerId);
  if (prev === nextState) return;
  peerUiStates.set(peerId, nextState);
  if (reason) {
    log(`Peer durum: ${peerId} -> ${nextState} (${reason})`);
  } else {
    log(`Peer durum: ${peerId} -> ${nextState}`);
  }
  renderParticipants();
  updatePeerConnectionStatusBanner();
}

function updatePeerConnectionStatusBanner() {
  if (!roomJoinAcked || !currentRoomId) return;
  const remoteIds = Array.from(participants.keys()).filter((id) => id !== localClientId);
  if (remoteIds.length === 0) {
    setStatus([`Odaya katıldın: ${currentRoomId}`, 'Peer beklenmiyor']);
    return;
  }
  const connecting = remoteIds.filter((id) => (peerUiStates.get(id) || 'connecting') !== 'connected');
  if (connecting.length === 0) {
    setStatus([`Odaya katıldın: ${currentRoomId}`, `Tüm peer bağlantıları hazır (${remoteIds.length}/${remoteIds.length})`]);
    return;
  }
  const preview = connecting.slice(0, 3).join(', ');
  const suffix = connecting.length > 3 ? ', ...' : '';
  setStatus([
    `Odaya katıldın: ${currentRoomId}`,
    `Peer bağlantısı bekleniyor: ${connecting.length}/${remoteIds.length}`,
    `Bekleyen peer: ${preview}${suffix}`
  ]);
}

function markRoomJoined({ roomId, participantCount = 0, source = 'users-in-room' } = {}) {
  if (!roomId) return;
  roomJoinAcked = true;
  setStatus([`Odaya katıldın: ${roomId}`, `Katılımcı: ${participantCount}`]);
  log(`Join ACK alındı (${source}): ${roomId}`);
  updatePeerConnectionStatusBanner();
}

function isPeerConnected(pc) {
  if (!pc) return false;
  return pc.connectionState === 'connected'
    || pc.iceConnectionState === 'connected'
    || pc.iceConnectionState === 'completed';
}

function logPeerSummary(peerId, info, reason = 'state') {
  const meta = info || peers.get(peerId);
  if (!meta || !meta.pc) {
    log(`[peer:${peerId}] ${reason} | peer-info-yok`);
    return;
  }
  const { pc } = meta;
  const pendingIceCount = Array.isArray(meta.pendingIce) ? meta.pendingIce.length : 0;
  log(
    `[peer:${peerId}] ${reason} | sig=${pc.signalingState} conn=${pc.connectionState} ice=${pc.iceConnectionState}`
    + ` local=${Boolean(pc.localDescription)} remote=${Boolean(pc.remoteDescription)} pendingIce=${pendingIceCount}`
  );
}

function clearPeerConnectingTimer(info) {
  if (!info || !info.connectingTimeoutId) return;
  clearTimeout(info.connectingTimeoutId);
  info.connectingTimeoutId = null;
}

function recoverPeerConnection(peerId, reason = 'connecting-timeout') {
  const info = peers.get(peerId);
  if (!info) return;
  if (isPeerConnected(info.pc)) return;
  const nextRecoverCount = (info.recoverCount || 0) + 1;
  log(`Peer recover tetiklendi (${reason}): ${peerId} (deneme ${nextRecoverCount})`);
  setPeerUiState(peerId, 'recovering', reason);
  cleanupPeer(peerId);
  createPeerConnection(peerId, true, { forceRecreate: true, recoverCount: nextRecoverCount });
}

function startPeerConnectingTimer(peerId, info) {
  if (!info) return;
  clearPeerConnectingTimer(info);
  info.connectingTimeoutId = setTimeout(() => {
    const latest = peers.get(peerId);
    if (!latest || latest !== info) return;
    if (isPeerConnected(latest.pc)) return;
    logPeerSummary(peerId, latest, 'connecting-timeout');
    recoverPeerConnection(peerId, 'connecting-timeout');
  }, PEER_CONNECTING_TIMEOUT_MS);
}

function getSelfPresence() {
  return {
    muted: Boolean(isMuted),
    speakerMuted: Boolean(isSpeakerMuted),
    listenOnly: Boolean(listenOnly)
  };
}

function getPresenceForParticipant(id) {
  if (id === localClientId) return getSelfPresence();
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
    sid: localClientId,
    ...getSelfPresence(),
    ts: Date.now()
  };
  socket.emit('chat-message', { roomId: currentRoomId, text: `${PRESENCE_PREFIX}${JSON.stringify(payload)}` });
}

function isHiddenRoomId(roomId) {
  const value = typeof roomId === 'string' ? roomId.trim() : '';
  if (!value) return false;
  const lowered = value.toLowerCase();
  if (lowered.startsWith('private-') || lowered.startsWith('hidden-') || lowered.startsWith('code:')) {
    return true;
  }
  return /^(?=.{10,20}$)[A-Za-z0-9:_-]+$/.test(value) && !/\s/.test(value);
}

function getDirection({ send, recv }) {
  if (send && recv) return 'sendrecv';
  if (send) return 'sendonly';
  if (recv) return 'recvonly';
  return 'inactive';
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
        try { osc.disconnect(); } catch (_) { }
        try { g.disconnect(); } catch (_) { }
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
  const raw = localStorage.getItem(SCREEN_QUALITY_KEY) || localStorage.getItem(LEGACY_SCREEN_QUALITY_KEY);
  if (!raw) return;
  const clean = String(raw).trim();
  if (clean === 'low' || clean === 'medium' || clean === 'high') {
    screenQualityMode = clean;
    activeScreenQualityPreset = clean;
  }
}

function saveScreenQualityMode() {
  localStorage.setItem(SCREEN_QUALITY_KEY, String(screenQualityMode));
}

function getEffectiveScreenPreset() {
  return SCREEN_QUALITY_PRESETS[activeScreenQualityPreset] || SCREEN_QUALITY_PRESETS.low;
}

function applyScreenTrackConstraints(preset) {
  if (!screenTrack || !screenTrack.applyConstraints) return;
  const maxFps = preset && preset.trackMaxFramerate ? preset.trackMaxFramerate : 30;
  screenTrack.applyConstraints({ frameRate: { max: maxFps } }).catch(() => { });
}

function getScreenCaptureConstraints() {
  const preset = SCREEN_QUALITY_PRESETS[screenQualityMode] || SCREEN_QUALITY_PRESETS.low;
  if (!preset || !preset.capture) return true;
  return {
    width: preset.capture.width,
    height: preset.capture.height,
    frameRate: preset.capture.frameRate
  };
}

function resetScreenAdaptiveState() {
  lastScreenAdaptiveChangeAt = 0;
  stableScreenSinceAt = 0;
  lastScreenAdaptiveStats = null;
}

function getScreenPresetIndex(presetKey) {
  return SCREEN_PRESET_ORDER.indexOf(presetKey);
}

function bumpScreenPreset(presetKey, direction) {
  const currentIndex = getScreenPresetIndex(presetKey);
  if (currentIndex < 0) return presetKey;
  const nextIndex = Math.max(0, Math.min(SCREEN_PRESET_ORDER.length - 1, currentIndex + direction));
  return SCREEN_PRESET_ORDER[nextIndex];
}

function getVisibleRemoteScreenEntry() {
  for (const [peerId, stream] of remoteScreenStreams.entries()) {
    if (stream) return { peerId, stream };
  }
  return null;
}

function renderRemoteScreenIfAllowed() {
  if (!watchStreamsEnabled) return;
  const entry = getVisibleRemoteScreenEntry();
  if (!entry) return;
  setScreenVideoStream(entry.stream, entry.peerId);
  const displayName = getDisplayNickname(participants.get(entry.peerId) || entry.peerId) || entry.peerId;
  setScreenStatusText(`Ekran paylaşımı: ${displayName}`);
}

function detachRemoteScreenRendering(message) {
  if (activeScreenPeerId && activeScreenPeerId !== localClientId) {
    if (els.screenVideo) {
      try { els.screenVideo.pause(); } catch (_) { }
    }
    if (els.screenModalVideo) {
      try { els.screenModalVideo.pause(); } catch (_) { }
    }
    clearScreenVideo(message || 'Yayın izleme kapalı.');
  }
}

async function setWatchStreamsEnabled(nextEnabled, { reason = 'manual' } = {}) {
  if (isTogglingWatch) return false;
  isTogglingWatch = true;
  try {
    const normalized = Boolean(nextEnabled);
    if (watchStreamsEnabled === normalized) {
      showToast(`Yayın izleme zaten ${normalized ? 'açık' : 'kapalı'}.`, normalized ? 'success' : 'warn');
      return true;
    }
    watchStreamsEnabled = normalized;
    localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify({ enabled: watchStreamsEnabled }));
    if (!watchStreamsEnabled) {
      detachRemoteScreenRendering('Yayın izleme kapalı.');
      showToast('Yayın izleme kapatıldı. CPU ve internet kullanımı düşer; yayıncı tarafı da daha az zorlanabilir.', 'warn');
    } else {
      renderRemoteScreenIfAllowed();
      showToast('Yayın izleme açıldı.', 'success');
    }
    log(`[screen-watch] ${watchStreamsEnabled ? 'on' : 'off'} (${reason})`);
    return true;
  } catch (err) {
    log(`[screen-watch] toggle error: ${err.message || err}`);
    return false;
  } finally {
    isTogglingWatch = false;
  }
}

async function configureScreenSender(sender, peerId, options = {}) {
  if (!sender || typeof sender.getParameters !== 'function') return false;
  try {
    const presetKey = options.presetKey || activeScreenQualityPreset;
    const preset = SCREEN_QUALITY_PRESETS[presetKey] || SCREEN_QUALITY_PRESETS.low;
    if (!preset || !preset.sender) return false;
    const params = sender.getParameters() || {};
    if (!Array.isArray(params.encodings) || params.encodings.length === 0) {
      params.encodings = [{}];
    }
    const baseEncoding = params.encodings[0] || {};
    const nextEncoding = {
      ...baseEncoding,
      maxBitrate: preset.sender.maxBitrate,
      maxFramerate: preset.sender.maxFramerate,
      scaleResolutionDownBy: preset.sender.scaleResolutionDownBy
    };
    if (preset.sender.priority) nextEncoding.priority = preset.sender.priority;
    if (preset.sender.networkPriority) nextEncoding.networkPriority = preset.sender.networkPriority;
    params.encodings[0] = nextEncoding;
    params.degradationPreference = 'maintain-framerate';
    if (sender.track) {
      try {
        sender.track.contentHint = 'detail';
      } catch (hintErr) {
        log(`[screen] contentHint warning (${peerId || 'local'}): ${hintErr.message || hintErr}`);
      }
    }
    await sender.setParameters(params);
    log(`[screen] sender parameters (${peerId || 'local'}, ${preset.key}): ${JSON.stringify(nextEncoding)}`);
    return true;
  } catch (err) {
    log(`[screen] sender parameter error (${peerId || 'local'}): ${err.message || err}`);
    return false;
  }
}

async function applyScreenPresetToActiveSenders({ reason = '', allowRenegotiate = false } = {}) {
  const failedPeers = [];
  const tasks = [];
  peers.forEach((info, peerId) => {
    const sender = info && info.videoTransceiver && info.videoTransceiver.sender;
    if (!sender) return;
    tasks.push((async () => {
      const ok = await configureScreenSender(sender, peerId, { presetKey: activeScreenQualityPreset });
      if (!ok) failedPeers.push(peerId);
    })());
  });
  await Promise.allSettled(tasks);
  if (allowRenegotiate) {
    failedPeers.forEach((peerId) => {
      try {
        renegotiatePeer(peerId, reason || 'screen-sender-apply-fallback');
      } catch (err) {
        log(`[screen] renegotiation fallback failed (${peerId}): ${err.message || err}`);
      }
    });
  }
}

async function applyManualScreenPreset(nextPresetKey, { reason = 'manual', resetAdaptive = true } = {}) {
  if (!SCREEN_QUALITY_PRESETS[nextPresetKey]) return;
  activeScreenQualityPreset = nextPresetKey;
  if (resetAdaptive) resetScreenAdaptiveState();
  if (!isScreenSharing) return;
  const preset = getEffectiveScreenPreset();
  applyScreenTrackConstraints(preset);
  await applyScreenPresetToActiveSenders({ reason, allowRenegotiate: true });
}

function maybeAutoAdjustScreenPreset({ fps = 0, limitationReason = '', framesDropped = 0, now = Date.now() } = {}) {
  if (!isScreenSharing) return;
  const currentPreset = activeScreenQualityPreset;
  const manualIndex = getScreenPresetIndex(screenQualityMode);
  const currentIndex = getScreenPresetIndex(currentPreset);
  if (manualIndex < 0 || currentIndex < 0) return;
  const currentPresetConfig = SCREEN_QUALITY_PRESETS[currentPreset] || SCREEN_QUALITY_PRESETS.low;
  const targetFps = currentPresetConfig.sender && currentPresetConfig.sender.maxFramerate
    ? currentPresetConfig.sender.maxFramerate
    : 15;
  const prevDropped = lastScreenAdaptiveStats ? lastScreenAdaptiveStats.framesDropped : framesDropped;
  const dropDelta = Math.max(0, framesDropped - prevDropped);
  const lowFps = fps > 0 && fps < Math.max(8, Math.round(targetFps * 0.65));
  const limited = limitationReason === 'cpu' || limitationReason === 'bandwidth';
  const isCooldown = now - lastScreenAdaptiveChangeAt < SCREEN_ADAPTIVE_COOLDOWN_MS;

  lastScreenAdaptiveStats = { framesDropped, fps, now, limitationReason };

  if ((limited || lowFps || dropDelta >= 8) && !isCooldown) {
    const nextDown = bumpScreenPreset(currentPreset, -1);
    if (nextDown !== currentPreset) {
      activeScreenQualityPreset = nextDown;
      lastScreenAdaptiveChangeAt = now;
      stableScreenSinceAt = 0;
      void applyManualScreenPreset(nextDown, {
        reason: `auto-down:${limitationReason || 'fps'}`,
        resetAdaptive: false
      });
      log(`[screen] auto quality down ${currentPreset} -> ${nextDown} (${limitationReason || `fps:${fps.toFixed(1)}`})`);
    }
    return;
  }

  const healthy = !limited && dropDelta === 0 && fps >= Math.max(10, Math.round(targetFps * 0.85));
  if (!healthy) {
    stableScreenSinceAt = 0;
    return;
  }

  if (!stableScreenSinceAt) stableScreenSinceAt = now;
  const stableFor = now - stableScreenSinceAt;
  const canRaise = stableFor >= SCREEN_ADAPTIVE_STABLE_UP_MS && !isCooldown;
  if (!canRaise) return;

  const maxAutoPreset = 'medium';
  const maxAutoIndex = getScreenPresetIndex(maxAutoPreset);
  if (currentIndex >= maxAutoIndex) return;
  const nextUp = bumpScreenPreset(currentPreset, 1);
  if (getScreenPresetIndex(nextUp) > maxAutoIndex) return;
  activeScreenQualityPreset = nextUp;
  lastScreenAdaptiveChangeAt = now;
  stableScreenSinceAt = 0;
  void applyManualScreenPreset(nextUp, { reason: 'auto-up:stable', resetAdaptive: false });
  log(`[screen] auto quality up ${currentPreset} -> ${nextUp}`);
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
    try { micAnalyserSource.disconnect(); } catch (_) { }
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
    els.micLoopback.setSinkId(deviceSettings.outputId).catch(() => { });
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
      try { micTestAnalyser._source.disconnect(); } catch (_) { }
      micTestAnalyser._source = null;
    }
    try { micTestAnalyser.disconnect(); } catch (_) { }
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
    let screenFramesDropped = 0;
    let qualityLimitationReason = '';
    for (const [peerId, info] of peers.entries()) {
      let stats;
      try {
        stats = await info.pc.getStats();
      } catch (err) {
        log(`[stats] getStats error (${peerId}): ${err.message || err}`);
        continue;
      }
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
          screenFramesDropped += report.framesDropped || 0;
          if (typeof report.framesPerSecond === 'number') {
            videoFpsFromStats = Math.max(videoFpsFromStats, report.framesPerSecond);
          }
          if (typeof report.qualityLimitationReason === 'string') {
            const reason = report.qualityLimitationReason.trim();
            if (reason === 'cpu' || reason === 'bandwidth') qualityLimitationReason = reason;
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
      maybeAutoAdjustScreenPreset({
        fps: estimatedFps,
        limitationReason: qualityLimitationReason,
        framesDropped: screenFramesDropped,
        now
      });
    }
  }, 1500);
}

function stopStatsLoop() {
  if (statsIntervalId) {
    clearInterval(statsIntervalId);
    statsIntervalId = null;
  }
  lastStatsSample = null;
  lastScreenStatsSample = null;
  resetScreenAdaptiveState();
}

function ensureAudioNodes({ resetSource = false } = {}) {
  if (!audioCtx || !rawMicStream) return;
  if (!audioSourceNode || resetSource) {
    if (audioSourceNode) {
      try { audioSourceNode.disconnect(); } catch (_) { }
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

  try { highPassNode && highPassNode.disconnect(); } catch (_) { }
  try { gateNode && gateNode.disconnect(); } catch (_) { }
  try { compressorNode && compressorNode.disconnect(); } catch (_) { }
  try { gainNode && gainNode.disconnect(); } catch (_) { }

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

function isPrivilegedNickname(nickname) {
  return String(nickname || '').trim().toLowerCase().endsWith('-emre');
}

function getDisplayNickname(nickname) {
  const raw = String(nickname || '').trim();
  if (!raw) return '';
  if (!isPrivilegedNickname(raw)) return raw;
  const trimmed = raw.slice(0, -5).trimEnd();
  return trimmed || raw;
}

function updateModerationTargets() {
  if (!els.moderationTarget) return;
  els.moderationTarget.innerHTML = '';
  const options = Array.from(participants.entries())
    .filter(([id]) => id !== localClientId)
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
    option.textContent = `${getDisplayNickname(user.nickname) || user.nickname} (${user.id.slice(0, 4)})`;
    els.moderationTarget.appendChild(option);
  });
}

function updateModerationUI() {
  const isHost = Boolean(currentHostId && localClientId === currentHostId);
  const canModerate = isHost || isPrivilegedNickname(currentNickname);
  const canRefreshConnections = Boolean(currentRoomId);
  if (els.muteOtherBtn) els.muteOtherBtn.disabled = !canModerate;
  if (els.unmuteOtherBtn) els.unmuteOtherBtn.disabled = !canModerate;
  if (els.kickBtn) els.kickBtn.disabled = !canModerate;
  if (els.banBtn) els.banBtn.disabled = !canModerate;
  if (els.slowModeBtn) els.slowModeBtn.disabled = !canModerate;
  if (els.softRefreshBtn) els.softRefreshBtn.disabled = !canRefreshConnections;
  if (els.hardRefreshBtn) els.hardRefreshBtn.disabled = !canRefreshConnections;
  if (els.moderationTarget) els.moderationTarget.disabled = !canModerate;
  if (els.slowModeSelect) els.slowModeSelect.disabled = !canModerate;
  if (els.moderationPanel) {
    els.moderationPanel.style.display = 'block';
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
    els.screenVideo.setSinkId(deviceSettings.outputId).catch(() => { });
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

function attachRemoteScreen(peerId, stream) {
  if (!peerId || !stream) return;
  remoteScreenStreams.set(peerId, stream);
  if (!watchStreamsEnabled) return;
  setScreenVideoStream(stream, peerId);
  const displayName = getDisplayNickname(participants.get(peerId) || peerId) || peerId;
  setScreenStatusText(`Ekran paylaşımı: ${displayName}`);
}

function detachRemoteScreen(peerId) {
  if (!peerId) return;
  remoteScreenStreams.delete(peerId);
  if (activeScreenPeerId === peerId) {
    const fallback = getVisibleRemoteScreenEntry();
    if (watchStreamsEnabled && fallback) {
      setScreenVideoStream(fallback.stream, fallback.peerId);
      const displayName = getDisplayNickname(participants.get(fallback.peerId) || fallback.peerId) || fallback.peerId;
      setScreenStatusText(`Ekran paylaşımı: ${displayName}`);
    } else {
      clearScreenVideo(t.screenShareEnded);
    }
  }
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
    const isSelf = id === localClientId;
    const indicators = getParticipantIndicators(id);
    const peerState = isSelf ? '' : (peerUiStates.get(id) || (peers.has(id) ? 'connecting' : ''));
    const peerSuffix = peerState ? ` [${getPeerUiLabel(peerState)}]` : '';
    const suffix = indicators ? ` ${indicators}` : '';
    const displayName = getDisplayNickname(nickname) || nickname;
    li.textContent = isSelf ? `${displayName} (sen)${suffix}` : `${displayName}${peerSuffix}${suffix}`;
    els.usersList.appendChild(li);
  });
}

function renderRoomsList(rooms) {
  if (!els.roomsList) return;
  els.roomsList.innerHTML = '';
  const list = (Array.isArray(rooms) ? rooms : []).filter((room) => room && !isHiddenRoomId(room.roomId));
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

function setupMicForPeer(peerId) {
  applyPeerMediaPolicy(peerId, { renegotiate: false, reason: 'mikrofon güncellendi' });
}

function setupMicForAllPeers() {
  peers.forEach((_info, peerId) => {
    applyPeerMediaPolicy(peerId, { renegotiate: false, reason: 'mikrofon güncellendi (toplu)' });
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
  if (pc.signalingState !== 'stable') return;
  if (info.isNegotiating || info.isMakingOffer) return;
  const token = (info.negotiationToken || 0) + 1;
  info.negotiationToken = token;
  info.isNegotiating = true;
  info.isMakingOffer = true;
  try {
    const latest = peers.get(peerId);
    if (!latest || latest !== info) return;
    if (pc.signalingState !== 'stable') return;

    const offer = await pc.createOffer();
    if (info.negotiationToken !== token) return;
    if (pc.signalingState !== 'stable') return;

    await pc.setLocalDescription(offer);
    if (info.negotiationToken !== token) return;
    if (!socket || !pc.localDescription) return;

    socket.emit('signal', { to: peerId, data: pc.localDescription });
    if (reason) log(`Yeniden pazarlık (${reason}): ${peerId}`);
  } catch (err) {
    log(`Yeniden pazarlık hatası ${peerId}: ${err.message || err}`);
  } finally {
    info.isNegotiating = false;
    info.isMakingOffer = false;
  }
}

async function tryIceRestart(peerId, reason = 'ice-restart') {
  const info = peers.get(peerId);
  if (!info || !socket) return;
  if (!info.isNegotiationReady) return;
  const { pc } = info;
  if (info.isNegotiating || info.isMakingOffer || pc.signalingState !== 'stable') return;
  info.isNegotiating = true;
  info.isMakingOffer = true;
  try {
    await pc.setLocalDescription(await pc.createOffer({ iceRestart: true }));
    socket.emit('signal', { to: peerId, data: pc.localDescription });
    log(`ICE restart teklifi gönderildi (${reason}): ${peerId}`);
  } catch (err) {
    log(`ICE restart hatası ${peerId}: ${err.message || err}`);
  } finally {
    info.isNegotiating = false;
    info.isMakingOffer = false;
  }
}

async function flushPendingIceQueue(info, pc, peerId, reason) {
  if (!info || !pc) return;
  const queue = Array.isArray(info.pendingIce) ? info.pendingIce : [];
  if (queue.length === 0) return;
  for (const candidate of queue) {
    try {
      await pc.addIceCandidate(candidate);
    } catch (err) {
      log(`ICE ekleme hatası (${reason || 'pending'}): ${peerId} -> ${err.message || err}`);
    }
  }
  info.pendingIce = [];
  logPeerSummary(peerId, info, 'pending-ice-flush');
}

function queueNegotiation(peerId, reason) {
  const info = peers.get(peerId);
  if (!info) return;
  info.negotiationQueued = true;
  if (reason) {
    info.pendingNegotiationReason = reason;
  }
  if (info.negotiationDebounceTimer) {
    clearTimeout(info.negotiationDebounceTimer);
  }
  info.negotiationDebounceTimer = setTimeout(() => {
    const latest = peers.get(peerId);
    if (!latest) return;
    latest.negotiationDebounceTimer = null;
    latest.negotiationQueued = false;
    if (latest.pc.signalingState === 'closed') return;
    if (latest.isNegotiating || latest.isMakingOffer || latest.pc.signalingState !== 'stable') {
      queueNegotiation(peerId, latest.pendingNegotiationReason || reason || 'negotiation-retry');
      return;
    }
    const nextReason = latest.pendingNegotiationReason || reason;
    latest.pendingNegotiationReason = '';
    void renegotiatePeer(peerId, nextReason);
  }, NEGOTIATION_DEBOUNCE_MS);
}

function applyPeerMediaPolicy(peerId, { renegotiate = false, reason = '' } = {}) {
  const info = peers.get(peerId);
  if (!info) return;
  const remoteWantsView = participantViewEnabled.get(peerId) !== false;

  if (info.audioTransceiver) {
    info.audioTransceiver.direction = 'sendrecv';
    info.audioTransceiver.sender.replaceTrack(currentMicTrack || null);
  }

  if (info.videoTransceiver) {
    const shouldSendVideo = remoteWantsView && Boolean(screenTrack && screenStream);
    const videoDirection = getDirection({ send: shouldSendVideo, recv: true });
    info.videoTransceiver.direction = videoDirection;
    info.videoTransceiver.sender.replaceTrack(shouldSendVideo ? screenTrack : null);
    if (shouldSendVideo) {
      void configureScreenSender(info.videoTransceiver.sender, peerId, { presetKey: activeScreenQualityPreset });
    }
  }

  if (renegotiate) {
    queueNegotiation(peerId, reason || 'medya politika güncellendi');
  }
}

function applyMediaPolicyToAllPeers(reason) {
  peers.forEach((_info, peerId) => {
    applyPeerMediaPolicy(peerId, { renegotiate: true, reason });
  });
}

function setSelfViewEnabled(nextEnabled, { fromRemote = false } = {}) {
  const normalized = nextEnabled !== false;
  void setWatchStreamsEnabled(normalized, { reason: fromRemote ? 'remote-sync' : 'legacy-api' });
}

function attachScreenTrackToPeer(peerId) {
  const info = peers.get(peerId);
  if (!info || !screenTrack) return;
  applyPeerMediaPolicy(peerId, { renegotiate: true, reason: 'ekran paylaşımı' });
}

function detachScreenTrackFromPeer(peerId) {
  const info = peers.get(peerId);
  if (!info) return;
  applyPeerMediaPolicy(peerId, { renegotiate: true, reason: 'ekran paylaşımı durdurma' });
}

async function startScreenShare() {
  // Screen broadcast lifecycle:
  // 1) Capture display stream using selected quality preset.
  // 2) Attach only video track to each peer's screen sender.
  // 3) Keep voice chat path untouched (mic stream/transceivers stay active).
  if (!isScreenShareSupported()) {
    setStatus(t.screenShareUnsupported);
    return;
  }
  if (isScreenSharing) return;
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: getScreenCaptureConstraints(),
      audio: false
    });
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
    activeScreenQualityPreset = screenQualityMode;
    resetScreenAdaptiveState();
    applyScreenTrackConstraints(getEffectiveScreenPreset());
    screenTrack.onended = () => stopScreenShare('ended');
    isScreenSharing = true;
    updateScreenShareButton();
    updateStatusBar();
    setScreenVideoStream(screenStream, localClientId);
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
  // Stop only display broadcast:
  // - stop screen tracks
  // - detach video sender track with renegotiation
  // - do NOT stop mic stream / audio senders / peer connections
  if (!screenStream) return;
  screenStream.getTracks().forEach((track) => track.stop());
  screenStream = null;
  screenTrack = null;
  isScreenSharing = false;
  resetScreenAdaptiveState();
  updateScreenShareButton();
  updateStatusBar();
  if (activeScreenPeerId === localClientId) {
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
    audio.setSinkId(deviceSettings.outputId).catch(() => { });
  }
  return audio;
}

function ensureAudioPlayback(audio, peerId) {
  if (!audio || typeof audio.play !== 'function') return;
  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch((err) => {
      log(`Ses otomatik başlatılamadı (${peerId}): ${err && err.message ? err.message : err}`);
    });
  }
}

function removeAudioElement(peerId) {
  const audio = audioContainer.querySelector(`audio[data-peer-id="${peerId}"]`);
  if (audio) audio.remove();
}

function cleanupPeer(peerId) {
  const info = peers.get(peerId);
  if (!info) return;
  clearPeerConnectingTimer(info);
  const disconnectTimer = peerDisconnectTimers.get(peerId);
  if (disconnectTimer) {
    clearTimeout(disconnectTimer);
    peerDisconnectTimers.delete(peerId);
  }
  if (info.negotiationDebounceTimer) {
    clearTimeout(info.negotiationDebounceTimer);
    info.negotiationDebounceTimer = null;
  }
  info.pendingNegotiationReason = '';
  info.negotiationQueued = false;
  info.isNegotiationReady = false;
  info.isNegotiating = false;
  info.isMakingOffer = false;
  try {
    if (info.videoTransceiver && info.videoTransceiver.sender) {
      info.videoTransceiver.sender.replaceTrack(null).catch(() => { });
    }
    info.pc.onicecandidate = null;
    info.pc.ontrack = null;
    info.pc.onnegotiationneeded = null;
    info.pc.onconnectionstatechange = null;
    info.pc.oniceconnectionstatechange = null;
    info.pc.close();
  } catch (_) {
    // ignore cleanup errors
  }
  removeAudioElement(peerId);
  cleanupSpeakingAnalyser(peerId);
  peers.delete(peerId);
  peerUiStates.delete(peerId);
  iceLogCounts.delete(`in:${peerId}`);
  iceLogCounts.delete(`out:${peerId}`);
  if (activeScreenPeerId === peerId) {
    clearScreenVideo(t.screenShareEnded);
  }
  remoteScreenStreams.delete(peerId);
}

function cleanupAllPeers() {
  Array.from(peers.keys()).forEach(cleanupPeer);
}

function emitJoinCurrentRoom(reason) {
  if (!socket || !currentRoomId) return;
  pendingJoin = {
    roomId: currentRoomId,
    nickname: currentNickname,
    clientId: localClientId
  };
  try {
    socket.emit('join-room', pendingJoin);
    if (reason) log(`Odaya tekrar katılım gönderildi (${reason}).`);
  } catch (err) {
    log(`Tekrar katılım hatası: ${err.message || err}`);
  }
}

function handleHardReconnect(roomId, reason) {
  if (!roomId || roomId !== currentRoomId) return;
  roomJoinAcked = false;
  try {
    Array.from(peers.keys()).forEach(cleanupPeer);
  } catch (err) {
    log(`Hard reconnect temizleme hatası: ${err.message || err}`);
  }
  participants.clear();
  participantViewEnabled.clear();
  participantPresence.clear();
  renderParticipants();
  renderAudioControls();
  updateModerationTargets();
  setStatus('Bağlantılar sıfırlanıyor, odaya tekrar bağlanılıyor...');
  log(`Hard reconnect tetiklendi: ${reason || 'manual'}`);
  emitJoinCurrentRoom(reason || 'hard-reconnect');
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
    nameEl.textContent = getDisplayNickname(nickname) || nickname;
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
  const fromName = getDisplayNickname(nickname || fromId || 'Bilinmeyen') || 'Bilinmeyen';
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
    log(`Socket bağlandı: ${socket.id} (clientId: ${localClientId})`);
    if (pendingJoin && pendingJoin.roomId) {
      setStatus([`Sunucu bağlandı`, `Odaya katılım onayı bekleniyor: ${pendingJoin.roomId}`]);
    } else {
      setStatus('Bağlandı.');
    }
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
    roomJoinAcked = false;
    updateStatusBar();
    if (isScreenSharing) stopScreenShare('disconnect');
    cleanupAllPeers();
    participants.clear();
    participantViewEnabled.clear();
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

  socket.on('join-room-ack', ({ roomId, users, hostId } = {}) => {
    if (!roomId) return;
    currentRoomId = roomId;
    localStorage.setItem(LAST_ROOM_KEY, roomId);
    currentHostId = hostId || null;
    manualLeave = false;
    setUiState({ inRoom: true });
    setView('room');
    participants.clear();
    participantViewEnabled.clear();
    participants.set(localClientId, currentNickname || 'Ben');
    participantViewEnabled.set(localClientId, true);
    const peersInRoom = Array.isArray(users) ? users : [];
    peersInRoom.forEach((user) => {
      if (user && user.id) {
        participants.set(user.id, user.nickname || user.id);
        participantViewEnabled.set(user.id, user.viewEnabled !== false);
      }
    });
    renderParticipants();
    renderAudioControls();
    updateModerationTargets();
    updateModerationUI();
    clearChat();
    markRoomJoined({ roomId, participantCount: participants.size, source: 'join-room-ack' });
    log(`Kullanıcı listesi alındı: ${peersInRoom.length}`);
    peersInRoom.forEach((peer) => {
      createPeerConnection(peer.id, true);
    });
    sendPresenceUpdate();
    socket.emit('list-rooms');
    startStatsLoop();
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
    participantViewEnabled.clear();
    participants.set(localClientId, currentNickname || 'Ben');
    participantViewEnabled.set(localClientId, true);
    const peersInRoom = Array.isArray(users) ? users : [];
    peersInRoom.forEach((user) => {
      if (user && user.id) {
        participants.set(user.id, user.nickname || user.id);
        participantViewEnabled.set(user.id, user.viewEnabled !== false);
      }
    });
    renderParticipants();
    renderAudioControls();
    updateModerationTargets();
    updateModerationUI();
    clearChat();
    markRoomJoined({ roomId: currentRoomId, participantCount: participants.size, source: 'users-in-room' });
    log(`Kullanıcı listesi alındı: ${peersInRoom.length}`);

    peersInRoom.forEach((peer) => {
      createPeerConnection(peer.id, true);
    });
    sendPresenceUpdate();
    socket.emit('list-rooms');
    startStatsLoop();
  });

  socket.on('user-joined', ({ id, nickname, viewEnabled } = {}) => {
    if (!id) return;
    if (id === localClientId) return;
    participants.set(id, nickname || id);
    participantViewEnabled.set(id, viewEnabled !== false);
    renderParticipants();
    updateModerationTargets();
    createPeerConnection(id, false);
    setStatus([`Yeni katılımcı: ${nickname || id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Yeni katılımcı: ${nickname || id}`);
    updatePeerConnectionStatusBanner();
    showToast(`${nickname || id} odaya katıldı`, 'success');
    playUiBeep({ freq: 740, durationMs: 80 });
    // Adaptive quality is stats-driven; no immediate action needed here.
  });

  socket.on('user-left', ({ id } = {}) => {
    if (!id) return;
    cleanupPeer(id);
    participants.delete(id);
    participantViewEnabled.delete(id);
    participantPresence.delete(id);
    renderParticipants();
    renderAudioControls();
    updateModerationTargets();
    setStatus([`Kullanıcı ayrıldı: ${id}`, `Oda: ${currentRoomId || '-'}`]);
    log(`Kullanıcı ayrıldı: ${id}`);
    updatePeerConnectionStatusBanner();
    showToast(`${id} odadan çıktı`, 'warn');
    playUiBeep({ freq: 440, durationMs: 90 });
    // Adaptive quality is stats-driven; no immediate action needed here.
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
    if (id === localClientId) {
      currentNickname = nickname;
      if (els.nicknameInput) els.nicknameInput.value = nickname;
      localStorage.setItem('voice-nickname', nickname);
    }
    renderParticipants();
    renderAudioControls();
    updateModerationUI();
  });

  socket.on('viewer-updated', ({ roomId, clientId, viewEnabled } = {}) => {
    if (!roomId || roomId !== currentRoomId || !clientId) return;
    participantViewEnabled.set(clientId, viewEnabled !== false);
    if (clientId === localClientId) {
      if (watchStreamsEnabled !== (viewEnabled !== false)) {
        setSelfViewEnabled(viewEnabled !== false, { fromRemote: true });
      }
      return;
    }
    if (clientId !== localClientId && peers.has(clientId)) {
      applyPeerMediaPolicy(clientId, { renegotiate: true, reason: 'viewer-updated' });
    }
  });

  socket.on('renegotiate-now', ({ roomId, reason } = {}) => {
    if (!roomId || roomId !== currentRoomId) return;
    peers.forEach((_info, peerId) => {
      try {
        queueNegotiation(peerId, reason || 'host-refresh');
      } catch (err) {
        log(`Yeniden pazarlık kuyruğu hatası ${peerId}: ${err.message || err}`);
      }
    });
    log(`Toplu yeniden pazarlık tetiklendi (${reason || 'host-refresh'}).`);
  });

  socket.on('hard-reconnect', ({ roomId, reason } = {}) => {
    if (!roomId || roomId !== currentRoomId) return;
    handleHardReconnect(roomId, reason || 'host-hard-refresh');
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
        logPeerSummary(from, info, 'offer-recv');
        const offerCollision = info.isNegotiating || info.isMakingOffer || pc.signalingState !== 'stable';
        info.ignoreOffer = !info.isPolite && offerCollision;
        if (info.ignoreOffer) return;
        if (offerCollision) {
          try {
            await pc.setLocalDescription({ type: 'rollback' });
          } catch (_) {
            // rollback may fail on some stacks, continue best-effort
          }
        }
        await pc.setRemoteDescription(data);
        await flushPendingIceQueue(info, pc, from, 'offer-sonrası');
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('signal', { to: from, data: pc.localDescription });
        info.isNegotiationReady = true;
        logPeerSummary(from, info, 'answer-send');
        log(`Yanıt gönderildi: ${from}`);
      } else if (data.type === 'answer') {
        log(`Yanıt alındı: ${from}`);
        await pc.setRemoteDescription(data);
        info.isNegotiationReady = true;
        await flushPendingIceQueue(info, pc, from, 'answer-sonrası');
        logPeerSummary(from, info, 'answer-recv');
      } else if (data.candidate) {
        const receivedCount = (iceLogCounts.get(`in:${from}`) || 0) + 1;
        iceLogCounts.set(`in:${from}`, receivedCount);
        if (receivedCount <= 1) log(`ICE candidate alındı: ${from}`);
        if (pc.remoteDescription) {
          try {
            await pc.addIceCandidate(data);
          } catch (err) {
            log(`ICE add hatası: ${from} -> ${err.message || err}`);
          }
        } else {
          info.pendingIce.push(data);
          logPeerSummary(from, info, 'ice-queued');
        }
      }
    } catch (err) {
      logPeerSummary(from, info, 'signal-error');
      setStatus([`WebRTC hatası: ${err.message || err}`, `Peer: ${from}`]);
    }
  });

  return socket;
}

function createPeerConnection(peerId, shouldCreateOffer, options = {}) {
  const { forceRecreate = false, recoverCount = 0 } = options;
  if (peers.has(peerId)) {
    const existing = peers.get(peerId);
    const state = existing && existing.pc ? existing.pc.connectionState : 'closed';
    if (!forceRecreate && (state === 'connected' || state === 'connecting')) {
      return existing;
    }
    log(`Aynı peer yeniden bağlandı, eski bağlantı force-close ediliyor: ${peerId}`);
    cleanupPeer(peerId);
  }

  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  const info = {
    pc,
    audioEl: createAudioElement(peerId),
    pendingIce: [],
    isNegotiating: false,
    isMakingOffer: false,
    isPolite: localClientId.localeCompare(peerId) > 0,
    ignoreOffer: false,
    negotiationQueued: false,
    pendingNegotiationReason: '',
    negotiationDebounceTimer: null,
    negotiationToken: 0,
    connectingTimeoutId: null,
    recoverCount,
    isNegotiationReady: false,
    audioTransceiver: null,
    videoTransceiver: null
  };

  info.audioTransceiver = pc.addTransceiver('audio', { direction: 'sendrecv' });
  info.videoTransceiver = pc.addTransceiver('video', { direction: 'recvonly' });

  pc.onicecandidate = (event) => {
    if (!event.candidate) return;
    if (!socket) return;
    socket.emit('signal', { to: peerId, data: event.candidate });
    const sentCount = (iceLogCounts.get(`out:${peerId}`) || 0) + 1;
    iceLogCounts.set(`out:${peerId}`, sentCount);
    if (sentCount <= 1) log(`ICE candidate gönderildi: ${peerId}`);
    logPeerSummary(peerId, info, 'ice-send');
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    if (event.track.kind === 'video') {
      const videoStream = stream || new MediaStream([event.track]);
      attachRemoteScreen(peerId, videoStream);
      if (watchStreamsEnabled) {
        const displayName = getDisplayNickname(participants.get(peerId) || peerId) || peerId;
        showToast(`${displayName} ekran paylaşımı başlattı`, 'success');
      }
      event.track.onended = () => {
        detachRemoteScreen(peerId);
        setStatus(t.screenShareEnded);
      };
      return;
    }
    if (stream) {
      info.audioEl.srcObject = stream;
    } else {
      const fallback = new MediaStream([event.track]);
      info.audioEl.srcObject = fallback;
    }
    ensureAudioPlayback(info.audioEl, peerId);
    ensureSpeakingAnalyser(peerId);
    applyRemoteAudioSettings(peerId);
  };

  pc.onconnectionstatechange = () => {
    log(`PC durumu ${peerId}: ${pc.connectionState}`);
    logPeerSummary(peerId, info, 'connectionstatechange');
    if (isPeerConnected(pc)) {
      clearPeerConnectingTimer(info);
      setPeerUiState(peerId, 'connected', 'connection-ready');
      updatePeerConnectionStatusBanner();
      return;
    }
    setPeerUiState(peerId, info.recoverCount > 0 ? 'recovering' : 'connecting', 'connection-waiting');
    startPeerConnectingTimer(peerId, info);
    if (pc.connectionState === 'connected') {
      const disconnectTimer = peerDisconnectTimers.get(peerId);
      if (disconnectTimer) {
        clearTimeout(disconnectTimer);
        peerDisconnectTimers.delete(peerId);
      }
      return;
    }
    if (pc.connectionState === 'disconnected') {
      if (peerDisconnectTimers.has(peerId)) return;
      const timer = setTimeout(() => {
        peerDisconnectTimers.delete(peerId);
        const latest = peers.get(peerId);
        if (!latest) return;
        const latestState = latest.pc.connectionState;
        if (latestState === 'disconnected' || latestState === 'failed') {
          void tryIceRestart(peerId, 'disconnected-timeout');
        }
      }, PEER_DISCONNECT_GRACE_MS);
      peerDisconnectTimers.set(peerId, timer);
      return;
    }
    if (pc.connectionState === 'failed') {
      recoverPeerConnection(peerId, 'connection-failed');
      void tryIceRestart(peerId, 'connection-failed');
      return;
    }
    if (pc.connectionState === 'closed') {
      cleanupPeer(peerId);
      participants.delete(peerId);
      renderParticipants();
      renderAudioControls();
    }
  };

  pc.oniceconnectionstatechange = () => {
    log(`ICE durumu ${peerId}: ${pc.iceConnectionState}`);
    logPeerSummary(peerId, info, 'iceconnectionstatechange');
    if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
      clearPeerConnectingTimer(info);
      setPeerUiState(peerId, 'connected', 'ice-ready');
      updatePeerConnectionStatusBanner();
      return;
    }
    if (pc.iceConnectionState === 'failed') {
      recoverPeerConnection(peerId, 'ice-failed');
    }
  };

  pc.onnegotiationneeded = () => {
    if (!info.isNegotiationReady) return;
    try {
      queueNegotiation(peerId, 'negotiationneeded');
    } catch (err) {
      log(`negotiationneeded hatası ${peerId}: ${err.message || err}`);
    }
  };

  peers.set(peerId, info);
  setPeerUiState(peerId, recoverCount > 0 ? 'recovering' : 'connecting', 'peer-created');
  startPeerConnectingTimer(peerId, info);
  renderAudioControls();
  applyPeerMediaPolicy(peerId, { renegotiate: false });
  logPeerSenders(peerId, pc);
  logPeerSummary(peerId, info, 'pc-created');

  if (shouldCreateOffer) {
    info.isNegotiationReady = true;
    queueNegotiation(peerId, 'ilk teklif');
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
  roomJoinAcked = false;
  manualLeave = false;
  pendingJoin = { roomId: clean, nickname: currentNickname, clientId: localClientId };
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
  roomJoinAcked = false;
  pendingJoin = null;
  if (isScreenSharing) stopScreenShare('manual');
  cleanupAllPeers();
  stopStatsLoop();

  stopVoiceChat();

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  currentRoomId = null;
  isMuted = false;
  participants.clear();
  participantViewEnabled.clear();
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

function stopVoiceChat() {
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
}

function updateNickname(nextName) {
  const clean = String(nextName || '').trim();
  if (!clean) return;
  currentNickname = clean.slice(0, 32);
  if (els.nicknameInput) els.nicknameInput.value = currentNickname;
  localStorage.setItem('voice-nickname', currentNickname);
  updateModerationUI();
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

  if (text === '/mute') {
    if (!currentMicTrack) return;
    isMuted = !isMuted;
    applyMuteToTrack(currentMicTrack);
    setupMicForAllPeers();
    updateMuteButton();
    setVuLevel(0, -60);
    updateStatusBar();
    sendPresenceUpdate();
    appendChatMessage({ nickname: 'Sistem', text: `Mikrofon ${isMuted ? 'sessize alındı' : 'açıldı'}.` });
    return;
  }

  if (text === '/yayın kapa') {
    void setWatchStreamsEnabled(false, { reason: 'chat-command' });

    if (socket && currentRoomId) {
      socket.emit('set-view-enabled', {
        roomId: currentRoomId,
        enabled: false
      });
    }

    return;
  }

  if (text === '/yayın aç') {
    void setWatchStreamsEnabled(true, { reason: 'chat-command' });

    if (socket && currentRoomId) {
      socket.emit('set-view-enabled', {
        roomId: currentRoomId,
        enabled: true
      });
    }
    return;
  }

  if (text === '/yayın') {
    showToast(`Yayın izleme: ${watchStreamsEnabled ? 'AÇIK' : 'KAPALI'}.`, 'success');
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

function requestRoomRefresh(mode) {
  if (!socket || !currentRoomId) return;
  try {
    socket.emit('refresh-room', { roomId: currentRoomId, mode });
    log(`Oda yenileme istendi: ${mode}`);
  } catch (err) {
    log(`Oda yenileme hatası (${mode}): ${err.message || err}`);
  }
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
if (els.softRefreshBtn) {
  els.softRefreshBtn.addEventListener('click', () => {
    requestRoomRefresh('soft');
  });
}
if (els.hardRefreshBtn) {
  els.hardRefreshBtn.addEventListener('click', () => {
    requestRoomRefresh('hard');
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
loadScreenQualityMode();
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

const storedViewSettings = localStorage.getItem(VIEW_SETTINGS_KEY);
if (storedViewSettings) {
  try {
    const parsed = JSON.parse(storedViewSettings);
    if (typeof parsed.enabled === 'boolean') {
      watchStreamsEnabled = parsed.enabled;
    }
  } catch (_) {
    // ignore parse errors
  }
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

if (els.screenQualitySelect) {
  if (!['low', 'medium', 'high'].includes(screenQualityMode)) {
    screenQualityMode = 'low';
  }
  activeScreenQualityPreset = screenQualityMode;
  els.screenQualitySelect.value = screenQualityMode;
  els.screenQualitySelect.addEventListener('change', () => {
    const next = String(els.screenQualitySelect.value || 'low').trim();
    if (!['low', 'medium', 'high'].includes(next)) return;
    screenQualityMode = next;
    saveScreenQualityMode();
    void applyManualScreenPreset(next, { reason: 'manual-select' });
    log(`[screen] quality mode: ${screenQualityMode}`);
  });
}

ensureSocket();
setInterval(() => {
  updateStatusBar();
}, 1000);
