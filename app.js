import {
  Room,
  RoomEvent,
  createLocalScreenTracks
} from 'livekit-client';

const t = {
  participantsEmpty: 'Henüz kimse yok.',
  roomsEmpty: 'SFU modunda oda listesi kapalı.',
  muteBtn: 'Mikrofonu Sessize Al',
  unmuteBtn: 'Mikrofonu Aç',
  screenShareStart: 'Ekran Paylaş',
  screenShareStop: 'Paylaşımı Durdur',
  screenShareEmpty: 'Ekran paylaşımı yok.',
  screenShareStarted: 'Ekran paylaşımı başladı.',
  screenShareStopped: 'Ekran paylaşımı durduruldu.',
  screenShareError: 'Ekran paylaşımı başlatılamadı.',
  screenShareEnded: 'Ekran paylaşımı bitti.'
};

const els = {
  winMinimize: document.getElementById('winMinimize'),
  winMaximize: document.getElementById('winMaximize'),
  winFullscreen: document.getElementById('winFullscreen'),
  winClose: document.getElementById('winClose'),
  roomId: document.getElementById('roomId'),
  nicknameInput: document.getElementById('nicknameInput'),
  joinBtn: document.getElementById('joinBtn'),
  createBtn: document.getElementById('createBtn'),
  leaveBtn: document.getElementById('leaveBtn'),
  muteBtn: document.getElementById('muteBtn'),
  speakerBtn: document.getElementById('speakerBtn'),
  usersList: document.getElementById('usersList'),
  statusText: document.getElementById('statusText'),
  statusConn: document.getElementById('statusConn'),
  statusPing: document.getElementById('statusPing'),
  statusMic: document.getElementById('statusMic'),
  statusScreen: document.getElementById('statusScreen'),
  vuFill: document.getElementById('vuFill'),
  micDb: document.getElementById('micDb'),
  log: document.getElementById('log'),
  audioList: document.getElementById('audioList'),
  roomsList: document.getElementById('roomsList'),
  refreshRoomsBtn: document.getElementById('refreshRoomsBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  settingsDrawer: document.getElementById('settingsDrawer'),
  settingsClose: document.getElementById('settingsClose'),
  roomView: document.getElementById('roomView'),
  lobbyView: document.getElementById('lobbyView'),
  serverUrlInput: document.getElementById('serverUrlInput'),
  modeSelect: document.getElementById('modeSelect'),
  chatMessages: document.getElementById('chatMessages'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  noiseToggle: document.getElementById('noiseToggle'),
  agcToggle: document.getElementById('agcToggle'),
  compressorToggle: document.getElementById('compressorToggle'),
  micGain: document.getElementById('micGain'),
  micGainValue: document.getElementById('micGainValue'),
  highPassFreq: document.getElementById('highPassFreq'),
  highPassValue: document.getElementById('highPassValue'),
  gateThreshold: document.getElementById('gateThreshold'),
  gateThresholdValue: document.getElementById('gateThresholdValue'),
  gateAttack: document.getElementById('gateAttack'),
  gateAttackValue: document.getElementById('gateAttackValue'),
  gateRelease: document.getElementById('gateRelease'),
  gateReleaseValue: document.getElementById('gateReleaseValue'),
  gateFloor: document.getElementById('gateFloor'),
  gateFloorValue: document.getElementById('gateFloorValue'),
  micSelect: document.getElementById('micSelect'),
  outputSelect: document.getElementById('outputSelect'),
  listenOnlyToggle: document.getElementById('listenOnlyToggle'),
  deafToggle: document.getElementById('deafToggle'),
  screenShareBtn: document.getElementById('screenShareBtn'),
  screenStopBtn: document.getElementById('screenStopBtn'),
  screenFullscreenBtn: document.getElementById('screenFullscreenBtn'),
  screenModal: document.getElementById('screenModal'),
  screenModalClose: document.getElementById('screenModalClose'),
  screenModalVideo: document.getElementById('screenModalVideo'),
  screenModalStatus: document.getElementById('screenModalStatus'),
  screenPreview: document.getElementById('screenPreview'),
  moderationToggle: document.getElementById('moderationToggle'),
  moderationPanel: document.getElementById('moderationPanel'),
  logCopyBtn: document.getElementById('logCopyBtn'),
  logClearBtn: document.getElementById('logClearBtn'),
  micTestBtn: document.getElementById('micTestBtn'),
  echoTestBtn: document.getElementById('echoTestBtn'),
  micTestModal: document.getElementById('micTestModal'),
  micTestClose: document.getElementById('micTestClose'),
  micTestStart: document.getElementById('micTestStart'),
  micTestStop: document.getElementById('micTestStop'),
  micLoopback: document.getElementById('micLoopback'),
  micTestVuFill: document.getElementById('micTestVuFill'),
  micTestDb: document.getElementById('micTestDb'),
  echoResult: document.getElementById('echoResult'),
  muteOtherBtn: document.getElementById('muteOtherBtn'),
  unmuteOtherBtn: document.getElementById('unmuteOtherBtn'),
  kickBtn: document.getElementById('kickBtn'),
  banBtn: document.getElementById('banBtn'),
  moderationTarget: document.getElementById('moderationTarget'),
  slowModeSelect: document.getElementById('slowModeSelect'),
  slowModeBtn: document.getElementById('slowModeBtn'),
  softRefreshBtn: document.getElementById('softRefreshBtn'),
  hardRefreshBtn: document.getElementById('hardRefreshBtn'),
  screenVideo: document.getElementById('screenVideo'),
  screenStatus: document.getElementById('screenStatus'),
  statOut: document.getElementById('statOut'),
  statIn: document.getElementById('statIn'),
  statJitter: document.getElementById('statJitter'),
  statLoss: document.getElementById('statLoss'),
  statRtt: document.getElementById('statRtt')
};

const ui = {
  audioContainer: document.createElement('div'),
  remoteVideoContainer: document.createElement('div')
};
ui.audioContainer.style.display = 'none';
ui.remoteVideoContainer.style.display = 'none';
document.body.appendChild(ui.audioContainer);
document.body.appendChild(ui.remoteVideoContainer);

const query = new URL(window.location.href).searchParams;
const fallbackWsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const fallbackHttpProtocol = window.location.protocol === 'https:' ? 'https' : 'http';
const fallbackHost = window.location.hostname || 'localhost';
const DEFAULT_LIVEKIT_URL = `${fallbackWsProtocol}://${fallbackHost}:7880`;
const normalizeServerParam = (raw) => {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (/^wss?:\/\//i.test(value)) return value;
  if (/^https?:\/\//i.test(value)) return value.replace(/^http/i, 'ws');
  return `ws://${value}`;
};
const livekitFromServerParam = normalizeServerParam(query.get('server'));
const LIVEKIT_URL = query.get('livekitUrl') || livekitFromServerParam || DEFAULT_LIVEKIT_URL;
const livekitHostForToken = (() => {
  try {
    return new URL(LIVEKIT_URL).hostname || fallbackHost;
  } catch (_) {
    return fallbackHost;
  }
})();
const TOKEN_URL = query.get('tokenUrl') || `${fallbackHttpProtocol}://${livekitHostForToken}:3000/livekit-token`;
const TOKEN_BASE_URL = TOKEN_URL.replace(/\/livekit-token\/?$/, '');
const ROOMS_URL = `${TOKEN_BASE_URL}/rooms`;
const ROOMS_HEARTBEAT_URL = `${TOKEN_BASE_URL}/rooms/heartbeat`;
const CLIENT_ID_KEY = 'voice-client-id';
const USER_PREFS_KEY = 'voice-user-prefs-v1';

let room = null;
let currentRoomId = null;
let currentNickname = null;
let localAudioTrack = null;
let localAudioPublication = null;
let screenTracks = [];
let screenPublications = [];
let localScreenPreviewTrack = null;
let viewEnabled = true;
let isMuted = false;
let isDeaf = false;
let isSpeakerMuted = false;
let isJoining = false;
let roomListIntervalId = null;
let roomHeartbeatIntervalId = null;
let chatSlowModeMs = 0;
let lastChatSentAt = 0;
let micTestStream = null;
let micTestMeterTimer = null;
let mainMicMeterCtx = null;
let mainMicMeterSource = null;
let mainMicMeterAnalyser = null;
let mainMicMeterTimer = null;
let localMicInputStream = null;
let localMicProcessCtx = null;
let localMicProcessDestination = null;
let localMicProcessSource = null;
let localMicGateNode = null;
let localMicGainNode = null;
let localMicHighPassNode = null;
let localMicCompressorNode = null;
let noiseGateWorkletReady = false;
let isScreenModalOpen = false;
let uiSoundCtx = null;
let republishMicTimer = null;
let republishMicPending = false;
let republishMicBusy = false;
let statsTimer = null;
let lastStatsAt = 0;
let lastBytesSent = 0;
let lastBytesRecv = 0;
const activeSpeakerIds = new Set();
const SPEAKING_GLOW_HOLD_MS = 1200;
let localLastSpokeAt = 0;
const trackElements = new Map(); // trackSid -> { element, kind, participantSid, participantIdentity }
const participantState = new Map(); // sid -> { identity, name, isScreenSharing, isMuted, isDeaf, lastSpokeAt }
const deviceSettings = { micId: null, outputId: null };
let noiseReductionEnabled = true;
const audioSettings = {
  micGain: 100,
  highPassHz: 90,
  gateThresholdDb: -40,
  gateAttackMs: 5,
  gateReleaseMs: 150,
  gateFloorDb: -60,
  agcEnabled: true,
  compressorEnabled: false
};
const participantAudioVolume = new Map(); // volumeKey(identity|sid) -> 0..2

const LOG_LIMIT = 120;
const logs = [];
const clientId = getOrCreateClientId();

function loadUserPrefs() {
  try {
    const raw = localStorage.getItem(USER_PREFS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveUserPrefs() {
  const payload = {
    nickname: String(els.nicknameInput && els.nicknameInput.value ? els.nicknameInput.value : currentNickname || '').trim(),
    roomId: String(els.roomId && els.roomId.value ? els.roomId.value : '').trim(),
    noiseReductionEnabled: Boolean(noiseReductionEnabled),
    isDeaf: Boolean(isDeaf),
    isSpeakerMuted: Boolean(isDeaf),
    isMuted: Boolean(isMuted),
    listenOnly: Boolean(els.listenOnlyToggle && els.listenOnlyToggle.checked),
    micId: deviceSettings.micId || null,
    outputId: deviceSettings.outputId || null,
    micGain: audioSettings.micGain,
    highPassHz: audioSettings.highPassHz,
    gateThresholdDb: audioSettings.gateThresholdDb,
    gateAttackMs: audioSettings.gateAttackMs,
    gateReleaseMs: audioSettings.gateReleaseMs,
    gateFloorDb: audioSettings.gateFloorDb,
    agcEnabled: Boolean(audioSettings.agcEnabled),
    compressorEnabled: Boolean(audioSettings.compressorEnabled)
  };
  localStorage.setItem(USER_PREFS_KEY, JSON.stringify(payload));
}

function applyUserPrefs() {
  const prefs = loadUserPrefs();
  if (typeof prefs.nickname === 'string' && prefs.nickname.trim() && els.nicknameInput) {
    els.nicknameInput.value = prefs.nickname.trim();
    currentNickname = prefs.nickname.trim();
  }
  if (typeof prefs.roomId === 'string' && prefs.roomId.trim() && els.roomId) {
    els.roomId.value = prefs.roomId.trim();
  }
  if (typeof prefs.noiseReductionEnabled === 'boolean') {
    noiseReductionEnabled = prefs.noiseReductionEnabled;
  }
  if (els.noiseToggle) {
    els.noiseToggle.checked = noiseReductionEnabled;
  }
  if (typeof prefs.isDeaf === 'boolean') {
    isDeaf = prefs.isDeaf;
  } else if (typeof prefs.isSpeakerMuted === 'boolean') {
    isDeaf = prefs.isSpeakerMuted;
  }
  isSpeakerMuted = isDeaf;
  if (typeof prefs.isMuted === 'boolean') {
    isMuted = prefs.isMuted;
  }
  if (els.listenOnlyToggle && typeof prefs.listenOnly === 'boolean') {
    els.listenOnlyToggle.checked = prefs.listenOnly;
    if (prefs.listenOnly) isMuted = true;
  }
  if (els.deafToggle) {
    els.deafToggle.checked = isDeaf;
  }
  if (typeof prefs.micId === 'string' && prefs.micId.trim()) {
    deviceSettings.micId = prefs.micId.trim();
  }
  if (typeof prefs.outputId === 'string' && prefs.outputId.trim()) {
    deviceSettings.outputId = prefs.outputId.trim();
  }
  if (Number.isFinite(prefs.micGain)) audioSettings.micGain = Math.max(0, Math.min(200, Number(prefs.micGain)));
  if (Number.isFinite(prefs.highPassHz)) audioSettings.highPassHz = Math.max(60, Math.min(200, Number(prefs.highPassHz)));
  if (Number.isFinite(prefs.gateThresholdDb)) audioSettings.gateThresholdDb = Math.max(-60, Math.min(-20, Number(prefs.gateThresholdDb)));
  if (Number.isFinite(prefs.gateAttackMs)) audioSettings.gateAttackMs = Math.max(1, Math.min(50, Number(prefs.gateAttackMs)));
  if (Number.isFinite(prefs.gateReleaseMs)) audioSettings.gateReleaseMs = Math.max(20, Math.min(400, Number(prefs.gateReleaseMs)));
  if (Number.isFinite(prefs.gateFloorDb)) audioSettings.gateFloorDb = Math.max(-80, Math.min(-30, Number(prefs.gateFloorDb)));
  if (typeof prefs.agcEnabled === 'boolean') audioSettings.agcEnabled = prefs.agcEnabled;
  if (typeof prefs.compressorEnabled === 'boolean') audioSettings.compressorEnabled = prefs.compressorEnabled;
}

function getOrCreateClientId() {
  const stored = localStorage.getItem(CLIENT_ID_KEY);
  if (stored && /^[A-Za-z0-9:_-]{4,128}$/.test(stored)) return stored;
  const created = `c-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

function setStatus(lines) {
  if (!els.statusText) return;
  els.statusText.textContent = Array.isArray(lines) ? lines.join('\n') : String(lines || '');
}

function log(message) {
  if (!els.log) return;
  const line = `[${new Date().toLocaleTimeString()}] ${message}`;
  logs.push(line);
  if (logs.length > LOG_LIMIT) logs.shift();
  els.log.textContent = logs.join('\n');
  els.log.scrollTop = els.log.scrollHeight;
}

function setNetStat(el, text) {
  if (el) el.textContent = text;
}

function stopStatsLoop() {
  if (statsTimer) window.clearInterval(statsTimer);
  statsTimer = null;
  lastStatsAt = 0;
  lastBytesSent = 0;
  lastBytesRecv = 0;
  setNetStat(els.statOut, '-');
  setNetStat(els.statIn, '-');
  setNetStat(els.statJitter, '-');
  setNetStat(els.statLoss, '-');
  setNetStat(els.statRtt, '-');
}

async function getPcStatsReport() {
  // LiveKit internal best-effort. Yoksa null doner.
  const pc =
    room?.engine?.pcManager?.publisher?.pc ||
    room?.engine?.pcManager?.subscriber?.pc ||
    null;
  if (!pc || typeof pc.getStats !== 'function') return null;
  return pc.getStats();
}

function startStatsLoop() {
  stopStatsLoop();
  statsTimer = window.setInterval(async () => {
    if (!room || room.state !== 'connected') return;

    const report = await getPcStatsReport();
    if (!report) return;

    let bytesSent = null;
    let bytesRecv = null;
    let jitterMs = null;
    let packetsLost = 0;
    let packetsRecv = 0;
    let rttMs = null;

    report.forEach((s) => {
      if (s.type === 'outbound-rtp' && s.kind === 'audio') {
        if (typeof s.bytesSent === 'number') bytesSent = (bytesSent ?? 0) + s.bytesSent;
      }
      if (s.type === 'inbound-rtp' && s.kind === 'audio') {
        if (typeof s.bytesReceived === 'number') bytesRecv = (bytesRecv ?? 0) + s.bytesReceived;
        if (typeof s.jitter === 'number') jitterMs = Math.round(s.jitter * 1000);
        if (typeof s.packetsLost === 'number') packetsLost += s.packetsLost;
        if (typeof s.packetsReceived === 'number') packetsRecv += s.packetsReceived;
      }
      if (s.type === 'candidate-pair' && s.state === 'succeeded') {
        if (typeof s.currentRoundTripTime === 'number') rttMs = Math.round(s.currentRoundTripTime * 1000);
      }
    });

    const now = Date.now();
    const dt = lastStatsAt ? (now - lastStatsAt) / 1000 : 0;
    lastStatsAt = now;

    if (dt > 0 && bytesSent != null) {
      const kbps = Math.max(0, ((bytesSent - lastBytesSent) * 8) / 1000 / dt);
      setNetStat(els.statOut, `${kbps.toFixed(0)} kbps`);
      lastBytesSent = bytesSent;
    }
    if (dt > 0 && bytesRecv != null) {
      const kbps = Math.max(0, ((bytesRecv - lastBytesRecv) * 8) / 1000 / dt);
      setNetStat(els.statIn, `${kbps.toFixed(0)} kbps`);
      lastBytesRecv = bytesRecv;
    }

    setNetStat(els.statJitter, jitterMs != null ? `${jitterMs} ms` : '-');

    if (packetsRecv > 0) {
      const lossPct = (packetsLost / (packetsLost + packetsRecv)) * 100;
      setNetStat(els.statLoss, `${lossPct.toFixed(1)}%`);
    } else {
      setNetStat(els.statLoss, '-');
    }

    setNetStat(els.statRtt, rttMs != null ? `${rttMs} ms` : '-');
  }, 1000);
}

function setView(inRoom) {
  if (els.lobbyView) els.lobbyView.classList.toggle('active', !inRoom);
  if (els.roomView) els.roomView.classList.toggle('active', inRoom);
}

function getDisplayName(participant) {
  return participant?.name || participant?.identity || participant?.sid || 'Katılımcı';
}

function getLocalParticipantId() {
  if (!room || !room.localParticipant) return '';
  return room.localParticipant.sid || room.localParticipant.identity || '';
}
function setupTabs() {
  const tabButtons = Array.from(document.querySelectorAll(".tabBtn"));
  const panes = Array.from(document.querySelectorAll(".tabPane"));
  if (tabButtons.length === 0 || panes.length === 0) return;

  function setActive(tab) {
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    panes.forEach((p) => p.classList.toggle("active", p.dataset.tab === tab));
  }

  tabButtons.forEach((btn) => {
    if (btn.dataset.tabsBound === "1") return;
    btn.dataset.tabsBound = "1";
    btn.addEventListener("click", () => setActive(btn.dataset.tab));
  });

  // default
  const activeBtn = tabButtons.find((b) => b.classList.contains("active")) || tabButtons[0];
  if (activeBtn) setActive(activeBtn.dataset.tab);
}

function setupSettingsDrawer() {
  const drawer = els.settingsDrawer;
  const openBtn = els.settingsBtn;
  const closeBtn = els.settingsClose;

  if (!drawer || !openBtn || !closeBtn) return;

  const open = () => drawer.classList.remove("hidden");
  const close = () => drawer.classList.add("hidden");

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  // ESC ile kapat
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function bindWindowControls() {
  const controls = window.windowControls;
  if (!controls) return;
  els.winMinimize?.addEventListener('click', () => {
    void controls.minimize();
  });
  els.winMaximize?.addEventListener('click', () => {
    void controls.maximize();
  });
  els.winFullscreen?.addEventListener('click', () => {
    void controls.toggleFullscreen();
  });
  els.winClose?.addEventListener('click', () => {
    void controls.close();
  });
}

function updateButtons() {
  const inRoom = Boolean(room && room.state === 'connected' && currentRoomId);
  if (els.joinBtn) els.joinBtn.disabled = inRoom || isJoining;
  if (els.createBtn) els.createBtn.disabled = inRoom || isJoining;
  if (els.leaveBtn) els.leaveBtn.disabled = !inRoom || isJoining;
  if (els.muteBtn) els.muteBtn.disabled = !inRoom || !localAudioTrack;
  if (els.screenShareBtn) els.screenShareBtn.disabled = !inRoom || screenTracks.length > 0;
  if (els.screenStopBtn) els.screenStopBtn.disabled = !inRoom || screenTracks.length === 0;
  if (els.roomId) els.roomId.disabled = inRoom || isJoining;
  if (els.nicknameInput) els.nicknameInput.disabled = inRoom || isJoining;
}

function updateMuteButton() {
  if (!els.muteBtn) return;
  els.muteBtn.textContent = isMuted ? t.unmuteBtn : t.muteBtn;
}

function updateSpeakerButton() {
  if (!els.speakerBtn) return;
  els.speakerBtn.textContent = isDeaf ? 'Sesi Aç' : 'Sesi Kapat';
}

function updateStatusBar() {
  if (els.statusConn) {
    els.statusConn.textContent = `Bağlı: ${room && room.state === 'connected' ? 'Evet' : 'Hayır'}`;
  }
  if (els.statusPing) els.statusPing.textContent = 'Ping: SFU';
  if (els.statusMic) {
    const state = isMuted ? 'Sessiz' : 'Açık';
    const noise = noiseReductionEnabled ? 'Gurultu Azaltma Açık' : 'Gurultu Azaltma Kapalı';
    els.statusMic.textContent = `Mikrofon: ${state} (${noise})`;
  }
  if (els.statusScreen) els.statusScreen.textContent = `Ekran: ${screenTracks.length > 0 ? 'Açık' : 'Kapalı'}`;
}

function updateScreenStatusText(text) {
  if (els.screenStatus) els.screenStatus.textContent = text;
}

function syncAudioSettingsUi() {
  if (els.micGain) els.micGain.value = String(audioSettings.micGain);
  if (els.highPassFreq) els.highPassFreq.value = String(audioSettings.highPassHz);
  if (els.gateThreshold) els.gateThreshold.value = String(audioSettings.gateThresholdDb);
  if (els.gateAttack) els.gateAttack.value = String(audioSettings.gateAttackMs);
  if (els.gateRelease) els.gateRelease.value = String(audioSettings.gateReleaseMs);
  if (els.gateFloor) els.gateFloor.value = String(audioSettings.gateFloorDb);
  if (els.agcToggle) els.agcToggle.checked = Boolean(audioSettings.agcEnabled);
  if (els.compressorToggle) els.compressorToggle.checked = Boolean(audioSettings.compressorEnabled);

  if (els.micGainValue) els.micGainValue.textContent = `${Math.round(audioSettings.micGain)}%`;
  if (els.highPassValue) els.highPassValue.textContent = `${Math.round(audioSettings.highPassHz)} Hz`;
  if (els.gateThresholdValue) els.gateThresholdValue.textContent = `${Math.round(audioSettings.gateThresholdDb)} dB`;
  if (els.gateAttackValue) els.gateAttackValue.textContent = `${Math.round(audioSettings.gateAttackMs)} ms`;
  if (els.gateReleaseValue) els.gateReleaseValue.textContent = `${Math.round(audioSettings.gateReleaseMs)} ms`;
  if (els.gateFloorValue) els.gateFloorValue.textContent = `${Math.round(audioSettings.gateFloorDb)} dB`;
}

async function republishMicTrackSoon() {
  if (!room || room.state !== 'connected') return;
  republishMicPending = true;
  if (republishMicBusy) return;
  republishMicBusy = true;
  while (republishMicPending) {
    republishMicPending = false;
    try {
      await createAndPublishMicTrack();
    } catch (err) {
      setStatus(`Mikrofon güncellenemedi: ${err && err.message ? err.message : err}`);
    }
  }
  republishMicBusy = false;
}

function scheduleMicRepublish(delayMs = 180) {
  if (republishMicTimer) {
    window.clearTimeout(republishMicTimer);
  }
  republishMicTimer = window.setTimeout(() => {
    republishMicTimer = null;
    void republishMicTrackSoon();
  }, delayMs);
}

function ensureParticipantState(participant) {
  const sid = participant.sid;
  if (!participantState.has(sid)) {
    participantState.set(sid, {
      identity: participant.identity || sid,
      name: getDisplayName(participant),
      isScreenSharing: false,
      isMuted: false,
      isDeaf: false,
      lastSpokeAt: 0
    });
  }
  return participantState.get(sid);
}

function clearTrackElement(trackSid) {
  const info = trackElements.get(trackSid);
  if (!info) return;
  if (info.element) {
    info.element.srcObject = null;
    info.element.remove();
  }
  trackElements.delete(trackSid);
  renderAudioControls();
}

function clearParticipantTracks(participantSid) {
  const toDelete = [];
  trackElements.forEach((value, key) => {
    if (value.participantSid === participantSid) toDelete.push(key);
  });
  toDelete.forEach((sid) => clearTrackElement(sid));
}

function renderParticipants() {
  if (!els.usersList) return;
  els.usersList.innerHTML = '';

  const rows = [];
  if (room && room.localParticipant) {
    rows.push({
      sid: room.localParticipant.sid,
      name: currentNickname || getDisplayName(room.localParticipant),
      self: true,
      isScreenSharing: screenTracks.length > 0,
      isMuted,
      isDeaf,
      lastSpokeAt: localLastSpokeAt
    });
  }
  participantState.forEach((state, sid) => {
    rows.push({
      sid,
      name: state.name,
      self: false,
      isScreenSharing: state.isScreenSharing,
      isMuted: state.isMuted,
      isDeaf: state.isDeaf,
      lastSpokeAt: state.lastSpokeAt || 0
    });
  });

  if (rows.length === 0) {
    const li = document.createElement('li');
    li.textContent = t.participantsEmpty;
    els.usersList.appendChild(li);
    return;
  }

  rows.forEach((row) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const isSpeakingNow = activeSpeakerIds.has(row.sid)
      || (Date.now() - Number(row.lastSpokeAt || 0)) < SPEAKING_GLOW_HOLD_MS
      || (row.self && Boolean(room?.localParticipant?.isSpeaking));
    if (isSpeakingNow) {
      name.className = 'speakingNameGlow';
    }
    name.textContent = `${row.name}${row.self ? ' (sen)' : ''}`;
    li.appendChild(name);
    if (row.isMuted) li.appendChild(document.createTextNode(' 🙊'));
    if (row.isDeaf) li.appendChild(document.createTextNode(' 🙉'));
    if (row.isScreenSharing) li.appendChild(document.createTextNode(' 🖥️(Ekran Paylaşıyor)'));
    els.usersList.appendChild(li);
  });
  updateModerationTargets();
  renderAudioControls();
}

function appendChatMessage({ nickname, text, ts, system = false }) {
  if (!els.chatMessages) return;
  const item = document.createElement('div');
  item.className = 'chatLine';
  const time = ts ? new Date(ts).toLocaleTimeString() : new Date().toLocaleTimeString();
  item.textContent = system ? `[${time}] ${text}` : `[${time}] ${nickname}: ${text}`;
  els.chatMessages.appendChild(item);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function notifyUnavailable(featureName) {
  const text = `${featureName} bu sürümde henüz aktif değil.`;
  setStatus(text);
  appendChatMessage({ system: true, text, ts: Date.now() });
}

function getSelectedModerationTarget() {
  return String(els.moderationTarget && els.moderationTarget.value ? els.moderationTarget.value : '').trim();
}

function updateModerationTargets() {
  if (!els.moderationTarget) return;
  const previous = getSelectedModerationTarget();
  els.moderationTarget.innerHTML = '';
  participantState.forEach((state, sid) => {
    const option = document.createElement('option');
    option.value = sid;
    option.textContent = `${state.name} (${sid.slice(0, 6)})`;
    els.moderationTarget.appendChild(option);
  });
  if (previous) {
    els.moderationTarget.value = previous;
  }
}

function getParticipantVolumeKey(participantOrSid) {
  if (!participantOrSid) return '';
  if (typeof participantOrSid === 'string') return participantOrSid;
  return participantOrSid.identity || participantOrSid.sid || '';
}

function getParticipantAudioElementsByKey(volumeKey) {
  const list = [];
  trackElements.forEach((value) => {
    if (value.kind !== 'audio') return;
    const key = value.participantIdentity || value.participantSid;
    if (key === volumeKey) {
      list.push(value.element);
    }
  });
  return list;
}

function getParticipantVolume(volumeKey) {
  const value = participantAudioVolume.get(volumeKey);
  return Number.isFinite(value) ? Math.max(0, Math.min(2, value)) : 1;
}

function applyParticipantVolume(volumeKey) {
  const volume = getParticipantVolume(volumeKey);
  const audioEls = getParticipantAudioElementsByKey(volumeKey);
  const globallyMuted = isRemoteAudioMuted();
  const forceMuteByVolume = volume <= 0.0001;
  audioEls.forEach((audioEl) => {
    audioEl.volume = Math.max(0, Math.min(1, volume));
    audioEl.muted = globallyMuted || forceMuteByVolume;
  });
}

function renderAudioControls() {
  if (!els.audioList) return;
  els.audioList.innerHTML = '';
  const rows = [];
  if (room && room.remoteParticipants && room.remoteParticipants.size > 0) {
    room.remoteParticipants.forEach((participant) => {
      const participantSid = participant && participant.sid ? participant.sid : '';
      if (!participantSid) return;
      const state = participantState.get(participantSid);
      rows.push({
        sid: participantSid,
        volumeKey: getParticipantVolumeKey(participant),
        name: state ? state.name : getDisplayName(participant)
      });
    });
  } else {
    participantState.forEach((state, sid) => {
      rows.push({ sid, volumeKey: state?.identity || sid, name: state.name });
    });
  }

  if (rows.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'mutedText';
    empty.textContent = 'Henüz bağlantı yok.';
    els.audioList.appendChild(empty);
    return;
  }

  rows.forEach((rowData) => {
    const sid = rowData.sid;
    const volumeKey = rowData.volumeKey || sid;
    const row = document.createElement('div');
    row.className = 'audioCard';

    const top = document.createElement('div');
    top.className = 'audioHeader';
    top.textContent = `${rowData.name}`;
    const volumeBadge = document.createElement('span');
    volumeBadge.className = 'mutedText';
    const setVolumeBadge = (value) => {
      volumeBadge.textContent = `${Math.round(value)}%`;
    };
    setVolumeBadge(getParticipantVolume(volumeKey) * 100);
    top.appendChild(volumeBadge);
    if (isDeaf) {
      const globalMuteBadge = document.createElement('span');
      globalMuteBadge.className = 'mutedText';
      globalMuteBadge.textContent = 'global muted';
      top.appendChild(globalMuteBadge);
    }

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '200';
    slider.step = '1';
    slider.value = String(Math.round(getParticipantVolume(volumeKey) * 100));
    slider.addEventListener('input', () => {
      const next = Math.max(0, Math.min(200, Number(slider.value || 100)));
      participantAudioVolume.set(volumeKey, next / 100);
      setVolumeBadge(next);
      applyParticipantVolume(volumeKey);
    });
    slider.addEventListener('change', () => {
      const next = Math.max(0, Math.min(200, Number(slider.value || 100)));
      participantAudioVolume.set(volumeKey, next / 100);
      setVolumeBadge(next);
      applyParticipantVolume(volumeKey);
    });

    row.appendChild(top);
    row.appendChild(slider);
    els.audioList.appendChild(row);
  });
  rows.forEach((rowData) => {
    applyParticipantVolume(rowData.volumeKey || rowData.sid);
  });
}

function getNoiseConstraintProfile() {
  return {
    echoCancellation: noiseReductionEnabled,
    noiseSuppression: noiseReductionEnabled,
    autoGainControl: Boolean(audioSettings.agcEnabled),
    channelCount: 1,
    sampleRate: 48000,
    sampleSize: 16
  };
}

function getPublishedMicMediaTrack(trackLike) {
  if (!trackLike) return null;
  return trackLike.mediaStreamTrack || trackLike;
}

function cleanupLocalMicProcessing() {
  if (localMicProcessSource) {
    try {
      localMicProcessSource.disconnect();
    } catch (_) {}
    localMicProcessSource = null;
  }
  if (localMicGateNode) {
    try {
      localMicGateNode.disconnect();
    } catch (_) {}
    localMicGateNode = null;
  }
  if (localMicCompressorNode) {
    try {
      localMicCompressorNode.disconnect();
    } catch (_) {}
    localMicCompressorNode = null;
  }
  if (localMicHighPassNode) {
    try {
      localMicHighPassNode.disconnect();
    } catch (_) {}
    localMicHighPassNode = null;
  }
  if (localMicGainNode) {
    try {
      localMicGainNode.disconnect();
    } catch (_) {}
    localMicGainNode = null;
  }
  if (localMicProcessDestination) {
    localMicProcessDestination = null;
  }
  if (localMicProcessCtx) {
    try {
      localMicProcessCtx.close();
    } catch (_) {}
    localMicProcessCtx = null;
  }
  if (localMicInputStream) {
    localMicInputStream.getTracks().forEach((track) => track.stop());
    localMicInputStream = null;
  }
}

async function ensureNoiseGateWorklet(ctx) {
  if (!ctx || noiseGateWorkletReady) return;
  const candidates = [
    './noise-gate-worklet.js',
    new URL('./noise-gate-worklet.js', window.location.href).toString(),
    new URL('./renderer/noise-gate-worklet.js', window.location.href).toString()
  ];
  for (const moduleUrl of candidates) {
    try {
      await ctx.audioWorklet.addModule(moduleUrl);
      noiseGateWorkletReady = true;
      return;
    } catch (_) {}
  }
  noiseGateWorkletReady = false;
}

function applyLiveMicProcessingSettings() {
  if (localMicGainNode) {
    localMicGainNode.gain.setValueAtTime(Math.max(0, Number(audioSettings.micGain) || 0) / 100, localMicProcessCtx?.currentTime || 0);
  }
  if (localMicHighPassNode) {
    localMicHighPassNode.frequency.setValueAtTime(
      Math.max(60, Math.min(200, Number(audioSettings.highPassHz) || 90)),
      localMicProcessCtx?.currentTime || 0
    );
  }
  if (localMicGateNode && localMicProcessCtx) {
    const now = localMicProcessCtx.currentTime;
    localMicGateNode.parameters.get('threshold')?.setValueAtTime(Number(audioSettings.gateThresholdDb), now);
    localMicGateNode.parameters.get('attack')?.setValueAtTime(Number(audioSettings.gateAttackMs), now);
    localMicGateNode.parameters.get('release')?.setValueAtTime(Number(audioSettings.gateReleaseMs), now);
    localMicGateNode.parameters.get('floor')?.setValueAtTime(Number(audioSettings.gateFloorDb), now);
    return true;
  }
  return false;
}

async function createOutgoingMicTrack() {
  cleanupLocalMicProcessing();
  const constraints = getNoiseConstraintProfile();
  const audioConstraints = { ...constraints };
  if (deviceSettings.micId) {
    audioConstraints.deviceId = { exact: deviceSettings.micId };
  }
  localMicInputStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
  const rawTrack = localMicInputStream.getAudioTracks()[0];
  if (!rawTrack) throw new Error('Mikrofon track alınamadı');

  try {
    localMicProcessCtx = new AudioContext();
    if (localMicProcessCtx.state === 'suspended') {
      await localMicProcessCtx.resume().catch(() => {});
    }
    localMicProcessSource = localMicProcessCtx.createMediaStreamSource(localMicInputStream);
    localMicGainNode = localMicProcessCtx.createGain();
    localMicGainNode.gain.value = Math.max(0, Number(audioSettings.micGain) || 0) / 100;
    localMicHighPassNode = localMicProcessCtx.createBiquadFilter();
    localMicHighPassNode.type = 'highpass';
    localMicHighPassNode.frequency.value = Math.max(60, Math.min(200, Number(audioSettings.highPassHz) || 90));
    let chainTail = localMicHighPassNode;

    if (audioSettings.compressorEnabled) {
      localMicCompressorNode = localMicProcessCtx.createDynamicsCompressor();
      localMicCompressorNode.threshold.value = -22;
      localMicCompressorNode.knee.value = 18;
      localMicCompressorNode.ratio.value = 3.2;
      localMicCompressorNode.attack.value = 0.003;
      localMicCompressorNode.release.value = 0.17;
      chainTail.connect(localMicCompressorNode);
      chainTail = localMicCompressorNode;
    }

    localMicProcessDestination = localMicProcessCtx.createMediaStreamDestination();
    await ensureNoiseGateWorklet(localMicProcessCtx);

    if (noiseGateWorkletReady) {
      localMicGateNode = new AudioWorkletNode(localMicProcessCtx, 'noise-gate', {
        parameterData: {
          threshold: Number(audioSettings.gateThresholdDb),
          hysteresisDb: 6,
          attack: Number(audioSettings.gateAttackMs),
          release: Number(audioSettings.gateReleaseMs),
          floor: Number(audioSettings.gateFloorDb)
        }
      });
      localMicProcessSource.connect(localMicGainNode).connect(localMicHighPassNode);
      chainTail.connect(localMicGateNode).connect(localMicProcessDestination);
    } else {
      // Fallback: no worklet support, keep only high-pass cleanup.
      localMicProcessSource.connect(localMicGainNode).connect(localMicHighPassNode).connect(localMicProcessDestination);
    }
    applyLiveMicProcessingSettings();

    const processedTrack = localMicProcessDestination.stream.getAudioTracks()[0];
    if (processedTrack) return processedTrack;
  } catch (_) {
    // Fallback to raw track below.
  }
  return rawTrack;
}

function publishData(payload) {
  if (!room || room.state !== 'connected') return;
  const encoder = new TextEncoder();
  const binary = encoder.encode(JSON.stringify(payload));
  room.localParticipant.publishData(binary, { reliable: true }).catch((err) => {
    log(`Data publish hatası: ${err.message || err}`);
  });
}

function sendChat(text) {
  const payload = {
    type: 'chat',
    from: {
      id: getLocalParticipantId(),
      name: currentNickname || 'Ben'
    },
    text,
    ts: Date.now()
  };
  publishData(payload);
  appendChatMessage({ nickname: payload.from.name, text: payload.text, ts: payload.ts });
}

function sendCommand(name, payload = {}) {
  publishData({
    type: 'cmd',
    name,
    payload,
    ts: Date.now()
  });
}

function broadcastPresenceState() {
  sendCommand('presence', {
    isMuted,
    isDeaf,
    isScreenSharing: screenTracks.length > 0
  });
}

function isRemoteAudioMuted() {
  return Boolean(isDeaf || isSpeakerMuted);
}

function applyRemoteAudioMuteState() {
  const globallyMuted = isRemoteAudioMuted();
  trackElements.forEach((value) => {
    if (value.kind === 'audio') {
      const participantVolume = getParticipantVolume(value.participantIdentity || value.participantSid);
      const forceMuteByVolume = participantVolume <= 0.0001;
      value.element.muted = globallyMuted || forceMuteByVolume;
    }
  });
}

function openScreenModal() {
  if (!els.screenModal || !els.screenModalVideo) {
    const fallback = els.screenPreview || els.screenVideo;
    if (fallback && fallback.requestFullscreen) {
      void fallback.requestFullscreen().catch(() => {});
    }
    return;
  }
  const stream = els.screenVideo ? els.screenVideo.srcObject : null;
  els.screenModal.classList.remove('hidden');
  els.screenModal.style.display = 'flex';
  els.screenModalVideo.srcObject = stream || null;
  if (els.screenModalStatus) {
    els.screenModalStatus.textContent = stream ? '' : t.screenShareEmpty;
  }
  isScreenModalOpen = true;
}

function closeScreenModal() {
  if (!els.screenModal || !els.screenModalVideo) return;
  els.screenModal.classList.add('hidden');
  els.screenModal.style.removeProperty('display');
  els.screenModalVideo.srcObject = null;
  isScreenModalOpen = false;
}

function setScreenPreviewTrack(track, ownerName) {
  if (!els.screenVideo) return;
  if (!track || !viewEnabled) {
    els.screenVideo.srcObject = null;
    updateScreenStatusText(t.screenShareEmpty);
    return;
  }
  const mediaTrack = track.mediaStreamTrack || track;
  const stream = new MediaStream([mediaTrack]);
  els.screenVideo.srcObject = stream;
  updateScreenStatusText(`${ownerName || 'Katılımcı'} ekran paylaşıyor`);
  if (isScreenModalOpen && els.screenModalVideo) {
    els.screenModalVideo.srcObject = stream;
    if (els.screenModalStatus) els.screenModalStatus.textContent = '';
  }
}

function attachRemoteAudio(track, participant) {
  const sid = participant.sid;
  const identity = participant.identity || '';
  const audioEl = track.attach();
  audioEl.autoplay = true;
  audioEl.playsInline = true;
  audioEl.muted = isRemoteAudioMuted();
  if (deviceSettings.outputId && typeof audioEl.setSinkId === 'function') {
    audioEl.setSinkId(deviceSettings.outputId).catch(() => {});
  }
  ui.audioContainer.appendChild(audioEl);
  const trackSid = track.sid || `${sid}-audio-${Date.now()}`;
  trackElements.set(trackSid, { element: audioEl, kind: 'audio', participantSid: sid, participantIdentity: identity });
  applyParticipantVolume(identity || sid);
  if (typeof audioEl.play === 'function') {
    audioEl.play().catch(() => {});
  }
}

function attachRemoteVideo(track, participant) {
  if (!viewEnabled) return;
  const sid = participant.sid;
  const videoEl = track.attach();
  videoEl.autoplay = true;
  videoEl.playsInline = true;
  ui.remoteVideoContainer.appendChild(videoEl);
  const trackSid = track.sid || `${sid}-video-${Date.now()}`;
  trackElements.set(trackSid, { element: videoEl, kind: 'video', participantSid: sid });
  const state = participantState.get(sid);
  if (state) state.isScreenSharing = true;
  if (!localScreenPreviewTrack) {
    setScreenPreviewTrack(track, state ? state.name : getDisplayName(participant));
  }
}

function handleTrackSubscribed(track, _publication, participant) {
  if (track.kind === 'audio') {
    attachRemoteAudio(track, participant);
    return;
  }
  if (track.kind === 'video') {
    attachRemoteVideo(track, participant);
  }
}

function getCurrentRoomCount() {
  // local participant + active remote participants
  return 1 + participantState.size;
}

function renderRoomsList(rooms) {
  if (!els.roomsList) return;
  els.roomsList.innerHTML = '';
  const list = Array.isArray(rooms) ? rooms : [];
  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'mutedText';
    empty.textContent = 'Aktif oda yok.';
    els.roomsList.appendChild(empty);
    return;
  }
  list.forEach((roomInfo) => {
    const roomName = String(roomInfo && roomInfo.roomName ? roomInfo.roomName : '').trim();
    if (!roomName) return;
    const count = Number(roomInfo.count) || 0;
    const item = document.createElement('div');
    item.className = 'roomItem';
    if (currentRoomId && currentRoomId === roomName) item.classList.add('active');

    const nameEl = document.createElement('div');
    nameEl.className = 'roomName';
    nameEl.textContent = roomName;
    const countEl = document.createElement('div');
    countEl.className = 'roomCount';
    countEl.textContent = `${count} kişi`;
    item.appendChild(nameEl);
    item.appendChild(countEl);
    item.addEventListener('click', () => {
      if (els.roomId) els.roomId.value = roomName;
      void handleRoomListClick(roomName);
    });
    els.roomsList.appendChild(item);
  });
}

function getPreferredNickname() {
  const fromInput = String(els.nicknameInput && els.nicknameInput.value ? els.nicknameInput.value : '').trim();
  if (fromInput) return fromInput;
  if (currentNickname) return String(currentNickname).trim();
  const stored = String(localStorage.getItem('voice-nickname') || '').trim();
  return stored;
}

async function waitUntilRoomClosed(timeoutMs = 3000) {
  const start = Date.now();
  while (room && Date.now() - start < timeoutMs) {
    await new Promise((resolve) => window.setTimeout(resolve, 60));
  }
}

async function handleRoomListClick(targetRoomName) {
  if (!targetRoomName || isJoining) return;
  const nickname = getPreferredNickname();
  if (!nickname) {
    setStatus('Önce takma ad gir, sonra odadan birine tıkla.');
    return;
  }
  if (room && currentRoomId === targetRoomName) {
    setStatus(`Zaten bu odadasın: ${targetRoomName}`);
    return;
  }
  if (room) {
    await leaveRoom();
    await waitUntilRoomClosed();
  }
  await joinRoom(targetRoomName, nickname);
}

async function refreshRoomsList() {
  try {
    const response = await fetch(ROOMS_URL);
    if (!response.ok) throw new Error(`rooms http ${response.status}`);
    const data = await response.json();
    renderRoomsList(data && Array.isArray(data.rooms) ? data.rooms : []);
  } catch (err) {
    log(`Oda listesi alınamadı: ${err.message || err}`);
  }
}

async function sendRoomHeartbeat() {
  if (!currentRoomId) return;
  try {
    await fetch(ROOMS_HEARTBEAT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        roomName: currentRoomId,
        count: getCurrentRoomCount()
      })
    });
  } catch (err) {
    log(`Heartbeat hatası: ${err.message || err}`);
  }
}

async function sendRoomHeartbeatCount(roomName, count, options = {}) {
  const cleanRoom = String(roomName || '').trim();
  if (!cleanRoom) return;
  const payload = JSON.stringify({
    roomName: cleanRoom,
    count: Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0
  });

  if (options.useBeacon && navigator.sendBeacon) {
    try {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(ROOMS_HEARTBEAT_URL, blob);
      return;
    } catch (_) {}
  }

  try {
    await fetch(ROOMS_HEARTBEAT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: Boolean(options.keepalive)
    });
  } catch (err) {
    log(`Heartbeat gönderim hatası: ${err.message || err}`);
  }
}

async function announceRoomClosed(roomName, options = {}) {
  await sendRoomHeartbeatCount(roomName, 0, options);
}

function startRoomHeartbeatLoop() {
  stopRoomHeartbeatLoop();
  void sendRoomHeartbeat();
  roomHeartbeatIntervalId = window.setInterval(() => {
    void sendRoomHeartbeat();
  }, 10000);
}

function stopRoomHeartbeatLoop() {
  if (!roomHeartbeatIntervalId) return;
  window.clearInterval(roomHeartbeatIntervalId);
  roomHeartbeatIntervalId = null;
}

function startRoomListLoop() {
  stopRoomListLoop();
  void refreshRoomsList();
  roomListIntervalId = window.setInterval(() => {
    void refreshRoomsList();
  }, 15000);
}

function stopRoomListLoop() {
  if (!roomListIntervalId) return;
  window.clearInterval(roomListIntervalId);
  roomListIntervalId = null;
}

function handleTrackUnsubscribed(track, _publication, participant) {
  const sid = participant.sid;
  if (track.sid) {
    clearTrackElement(track.sid);
  } else {
    const maybeKey = `${sid}-${track.kind}`;
    trackElements.forEach((_value, key) => {
      if (key.includes(maybeKey)) clearTrackElement(key);
    });
  }
  if (track.kind === 'video') {
    const state = participantState.get(sid);
    if (state) state.isScreenSharing = false;
    if (!localScreenPreviewTrack) setScreenPreviewTrack(null);
  }
  renderParticipants();
}

function applyMute() {
  const mediaTrack = getPublishedMicMediaTrack(localAudioTrack);
  if (!mediaTrack) return;
  mediaTrack.enabled = !isMuted;
  updateMuteButton();
  updateStatusBar();
}

function setMutedState(nextMuted, { syncListenOnly = true, broadcast = true, persist = true, notifyLocal = false } = {}) {
  isMuted = Boolean(nextMuted);
  if (syncListenOnly && els.listenOnlyToggle) {
    els.listenOnlyToggle.checked = isMuted;
  }
  applyMute();
  if (notifyLocal) {
    void playMicToggleSound(isMuted);
  }
  renderParticipants();
  if (broadcast) broadcastPresenceState();
  if (persist) saveUserPrefs();
}

function setDeafState(nextDeaf, { syncToggle = true, broadcast = true, persist = true } = {}) {
  isDeaf = Boolean(nextDeaf);
  // Keep legacy flag in sync to avoid split behavior.
  isSpeakerMuted = isDeaf;
  if (syncToggle && els.deafToggle) {
    els.deafToggle.checked = isDeaf;
  }
  applyRemoteAudioMuteState();
  updateSpeakerButton();
  renderParticipants();
  if (broadcast) broadcastPresenceState();
  if (persist) saveUserPrefs();
}

async function createAndPublishMicTrack() {
  if (!room || room.state !== 'connected') return;
  const nextTrack = await createOutgoingMicTrack();
  const publications = Array.from(room.localParticipant.trackPublications.values());
  for (const publication of publications) {
    if (publication && publication.kind === 'audio' && publication.track) {
      try {
        await room.localParticipant.unpublishTrack(publication.track);
      } catch (_) {}
    }
  }
  localAudioPublication = await room.localParticipant.publishTrack(nextTrack);
  localAudioTrack = localAudioPublication && localAudioPublication.track ? localAudioPublication.track : nextTrack;
  const mediaTrack = getPublishedMicMediaTrack(localAudioTrack);
  if (mediaTrack) {
    startMainMicMeter(mediaTrack);
  }
  if (mediaTrack && mediaTrack.applyConstraints) {
    const constraints = getNoiseConstraintProfile();
    try {
      await mediaTrack.applyConstraints(constraints);
    } catch (_) {}
  }
  applyMute();
  broadcastPresenceState();
  saveUserPrefs();
}

async function fetchToken(roomName, nickname) {
  const url = new URL(TOKEN_URL);
  url.searchParams.set('roomName', roomName);
  url.searchParams.set('nickname', nickname);
  url.searchParams.set('id', clientId);
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Token alınamadı (${response.status})`);
  const json = await response.json();
  if (!json || typeof json.token !== 'string') throw new Error('Token cevabı geçersiz');
  return json.token;
}

function resetRoomState() {
  participantState.clear();
  activeSpeakerIds.clear();
  localLastSpokeAt = 0;
  const existingTrackIds = Array.from(trackElements.keys());
  existingTrackIds.forEach((trackSid) => clearTrackElement(trackSid));
  localScreenPreviewTrack = null;
  setScreenPreviewTrack(null);
  renderParticipants();
}

function stopMainMicMeter() {
  if (mainMicMeterTimer) {
    window.clearInterval(mainMicMeterTimer);
    mainMicMeterTimer = null;
  }
  if (mainMicMeterSource) {
    try {
      mainMicMeterSource.disconnect();
    } catch (_) {}
    mainMicMeterSource = null;
  }
  mainMicMeterAnalyser = null;
  if (mainMicMeterCtx) {
    try {
      mainMicMeterCtx.close();
    } catch (_) {}
    mainMicMeterCtx = null;
  }
  if (els.vuFill) els.vuFill.style.width = '0%';
  if (els.micDb) els.micDb.textContent = '- dB';
}

function startMainMicMeter(track) {
  stopMainMicMeter();
  if (!track) return;
  try {
    const stream = new MediaStream([track]);
    mainMicMeterCtx = new AudioContext();
    mainMicMeterSource = mainMicMeterCtx.createMediaStreamSource(stream);
    mainMicMeterAnalyser = mainMicMeterCtx.createAnalyser();
    mainMicMeterAnalyser.fftSize = 1024;
    mainMicMeterSource.connect(mainMicMeterAnalyser);
    const buffer = new Uint8Array(mainMicMeterAnalyser.fftSize);
    mainMicMeterTimer = window.setInterval(() => {
      if (!mainMicMeterAnalyser) return;
      mainMicMeterAnalyser.getByteTimeDomainData(buffer);
      let peak = 0;
      for (let i = 0; i < buffer.length; i += 1) {
        const v = Math.abs(buffer[i] - 128) / 128;
        if (v > peak) peak = v;
      }
      const pct = Math.max(0, Math.min(100, Math.round(peak * 180)));
      if (els.vuFill) els.vuFill.style.width = `${pct}%`;
      if (els.micDb) {
        const db = peak > 0 ? (20 * Math.log10(peak)).toFixed(1) : '-60.0';
        els.micDb.textContent = `${db} dB`;
      }
    }, 120);
  } catch (_) {
    if (els.micDb) els.micDb.textContent = '- dB';
  }
}

async function playJoinLeaveSound(joined) {
  try {
    if (!uiSoundCtx) uiSoundCtx = new AudioContext();
    if (uiSoundCtx.state === 'suspended') await uiSoundCtx.resume();

    const now = uiSoundCtx.currentTime;

    // master gain (ses seviyesi buradan)
    const master = uiSoundCtx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.30, now + 0.015); // Discord benzeri volume
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    master.connect(uiSoundCtx.destination);

    // 2 notalı küçük arpej hissi
    const freqs = joined ? [880, 1175] : [1175, 880]; // join yukarı, leave aşağı
    const gaps = [0.0, 0.075];
    const dur = 0.15;

    freqs.forEach((f, i) => {
      const t0 = now + gaps[i];

      // ana ton
      const osc1 = uiSoundCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(f, t0);
      // mini pitch slide (daha doğal)
      osc1.frequency.exponentialRampToValueAtTime(f * (joined ? 1.03 : 0.97), t0 + 0.06);

      // hafif parlaklık (çok düşük)
      const osc2 = uiSoundCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(f * 2, t0);

      const g = uiSoundCtx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(1.0, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc1.connect(g);
      osc2.connect(g);
      g.connect(master);

      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(t0 + dur);
      osc2.stop(t0 + dur);
    });
  } catch (_) {}
}

async function playMicToggleSound(nowMuted) {
  try {
    if (!uiSoundCtx) uiSoundCtx = new AudioContext();
    if (uiSoundCtx.state === 'suspended') {
      await uiSoundCtx.resume();
    }
    const osc = uiSoundCtx.createOscillator();
    const gain = uiSoundCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(nowMuted ? 360 : 920, uiSoundCtx.currentTime);
    gain.gain.value = 0.0001;
    osc.connect(gain).connect(uiSoundCtx.destination);
    const now = uiSoundCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.09);
  } catch (_) {}
}

function announceJoinLeave(participant, joined) {
  const name = getDisplayName(participant);
  const text = joined ? `${name} odaya katıldı` : `${name} odadan ayrıldı`;
  log(text);
  appendChatMessage({ system: true, text, ts: Date.now() });
  void playJoinLeaveSound(joined);
}

function hydrateParticipantAndTracks(participant) {
  ensureParticipantState(participant);
  participant.trackPublications.forEach((publication) => {
    if (publication.track) {
      handleTrackSubscribed(publication.track, publication, participant);
    }
  });
}

function handleDataReceived(payload, participant) {
  let parsed = null;
  try {
    const text = new TextDecoder().decode(payload);
    parsed = JSON.parse(text);
  } catch (_) {
    return;
  }
  if (!parsed || typeof parsed !== 'object') return;

  if (parsed.type === 'chat') {
    appendChatMessage({
      nickname: parsed.from && parsed.from.name ? parsed.from.name : (participant ? getDisplayName(participant) : 'Katılımcı'),
      text: parsed.text || '',
      ts: parsed.ts || Date.now()
    });
    return;
  }

  if (parsed.type === 'cmd') {
    if (parsed.name === 'view_off' || parsed.name === 'view_on') {
      const targetId = parsed.payload && parsed.payload.targetId ? parsed.payload.targetId : null;
      const me = getLocalParticipantId();
      if (!targetId || targetId === me) {
        void setViewEnabled(parsed.name === 'view_on');
      }
    }
    if (parsed.name === 'share_quality') {
      const fromSid = participant ? participant.sid : null;
      if (fromSid && participantState.has(fromSid)) {
        const state = participantState.get(fromSid);
        if (parsed.payload && typeof parsed.payload.isScreenSharing === 'boolean') {
          state.isScreenSharing = parsed.payload.isScreenSharing;
          renderParticipants();
        }
      }
    }
    if (parsed.name === 'presence') {
      const fromSid = participant ? participant.sid : null;
      if (fromSid) {
        if (!participantState.has(fromSid) && participant) {
          ensureParticipantState(participant);
        }
        const state = participantState.get(fromSid);
        if (state) {
          const payload = parsed.payload || {};
          state.isMuted = Boolean(payload.isMuted);
          state.isDeaf = Boolean(payload.isDeaf);
          if (typeof payload.isScreenSharing === 'boolean') {
            state.isScreenSharing = payload.isScreenSharing;
          }
          renderParticipants();
        }
      }
    }
    if (parsed.name === 'moderation') {
      const payload = parsed.payload || {};
      const targetId = String(payload.targetId || '');
      const action = String(payload.action || '');
      if (targetId && targetId === getLocalParticipantId()) {
        if (action === 'mute') {
          setMutedState(true);
          appendChatMessage({ system: true, text: 'Moderasyon: sessize alındın.', ts: Date.now() });
        } else if (action === 'unmute') {
          setMutedState(false);
          appendChatMessage({ system: true, text: 'Moderasyon: sesin açıldı.', ts: Date.now() });
        } else if (action === 'kick' || action === 'ban') {
          appendChatMessage({ system: true, text: `Moderasyon: ${action} işlemi uygulandı.`, ts: Date.now() });
          void leaveRoom();
        }
      }
    }
    if (parsed.name === 'slowmode') {
      const payload = parsed.payload || {};
      const nextMs = Number(payload.ms);
      chatSlowModeMs = Number.isFinite(nextMs) ? Math.max(0, Math.floor(nextMs)) : 0;
      appendChatMessage({ system: true, text: `Slow mode: ${chatSlowModeMs}ms`, ts: Date.now() });
    }
    if (parsed.name === 'refresh_soft') {
      if (room) {
        void createAndPublishMicTrack();
      }
    }
    if (parsed.name === 'refresh_hard') {
      if (room) {
        const targetRoom = currentRoomId;
        const targetNick = currentNickname;
        void (async () => {
          await leaveRoom();
          if (targetRoom && targetNick) await joinRoom(targetRoom, targetNick);
        })();
      }
    }
  }
}

function bindRoomEvents(activeRoom) {
  activeRoom.on(RoomEvent.ParticipantConnected, (participant) => {
    ensureParticipantState(participant);
    announceJoinLeave(participant, true);
    renderParticipants();
    void sendRoomHeartbeat();
    broadcastPresenceState();
  });

  activeRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
    participantState.delete(participant.sid);
    activeSpeakerIds.delete(participant.sid);
    if (room?.localParticipant?.sid === participant.sid) {
      localLastSpokeAt = 0;
    }
    clearParticipantTracks(participant.sid);
    announceJoinLeave(participant, false);
    renderParticipants();
    if (!localScreenPreviewTrack) setScreenPreviewTrack(null);
    void sendRoomHeartbeat();
  });

  activeRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    handleTrackSubscribed(track, publication, participant);
    renderParticipants();
  });

  activeRoom.on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
    handleTrackUnsubscribed(track, publication, participant);
  });

  activeRoom.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
    activeSpeakerIds.clear();
    const now = Date.now();
    speakers.forEach((speaker) => {
      const speakerSid = String((speaker && (speaker.sid || speaker.participantSid)) || '');
      if (!speakerSid) return;
      activeSpeakerIds.add(speakerSid);
      if (room?.localParticipant?.sid === speakerSid) {
        localLastSpokeAt = now;
      }
      const state = participantState.get(speakerSid);
      if (state) state.lastSpokeAt = now;
    });
    renderParticipants();
  });

  activeRoom.on(RoomEvent.DataReceived, (payload, participant) => {
    handleDataReceived(payload, participant || null);
  });

  activeRoom.on(RoomEvent.Disconnected, () => {
    stopMainMicMeter();
    cleanupLocalMicProcessing();
    stopStatsLoop();
    const roomNameOnDisconnect = currentRoomId;
    if (roomNameOnDisconnect) {
      void announceRoomClosed(roomNameOnDisconnect, { keepalive: true });
    }
    stopRoomHeartbeatLoop();
    room = null;
    localLastSpokeAt = 0;
    currentRoomId = null;
    localAudioTrack = null;
    localAudioPublication = null;
    screenTracks = [];
    screenPublications = [];
    resetRoomState();
    setView(false);
    setStatus('Bağlantı kapandı.');
    updateButtons();
    updateStatusBar();
    void refreshRoomsList();
  });
}

async function joinRoom(roomName, nickname) {
  const cleanRoom = String(roomName || '').trim();
  const cleanNick = String(nickname || '').trim();
  if (!cleanRoom || !cleanNick) {
    setStatus('Oda adı ve takma ad gerekli.');
    return;
  }
  if (room || isJoining) return;

  isJoining = true;
  updateButtons();
  setStatus('Katılım başlatılıyor...');
  try {
    const token = await fetchToken(cleanRoom, cleanNick);
    const nextRoom = new Room();
    bindRoomEvents(nextRoom);
    await nextRoom.connect(LIVEKIT_URL, token);
    room = nextRoom;
    currentRoomId = cleanRoom;
    currentNickname = cleanNick;
    saveUserPrefs();

    await createAndPublishMicTrack();
    room.remoteParticipants.forEach((participant) => {
      hydrateParticipantAndTracks(participant);
    });

    renderParticipants();
    setView(true);
    setStatus([`Odaya katıldın: ${cleanRoom}`, 'SFU bağlantısı hazır']);
    appendChatMessage({ system: true, text: `${cleanNick} odaya katıldı`, ts: Date.now() });
    log(`Room connect başarılı: ${cleanRoom}`);
    broadcastPresenceState();
    startRoomHeartbeatLoop();
    startStatsLoop();
    void refreshRoomsList();
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    setStatus(`Katılım hatası: ${message}`);
    appendChatMessage({ system: true, text: `Katılım hatası: ${message}`, ts: Date.now() });
    log(`Join hatası: ${message}`);
    if (room) {
      room.disconnect();
      room = null;
    }
  } finally {
    isJoining = false;
    updateButtons();
    updateStatusBar();
  }
}

async function leaveRoom() {
  stopStatsLoop();
  if (!room) return;
  stopMainMicMeter();
  cleanupLocalMicProcessing();
  const roomNameOnLeave = currentRoomId;
  stopRoomHeartbeatLoop();
  saveUserPrefs();
  if (roomNameOnLeave) {
    await announceRoomClosed(roomNameOnLeave, { keepalive: true });
  }
  try {
    if (screenTracks.length > 0) await stopScreenShare();
    if (room.localParticipant) {
      const publications = Array.from(room.localParticipant.trackPublications.values());
      for (const publication of publications) {
        if (publication && publication.kind === 'audio' && publication.track) {
          try {
            await room.localParticipant.unpublishTrack(publication.track);
          } catch (_) {}
          try {
            publication.track.stop();
          } catch (_) {}
        }
      }
    }
  } catch (_) {}
  room.disconnect();
  void refreshRoomsList();
}

async function startScreenShare() {
  if (!room || screenTracks.length > 0) return;
  try {
    const tracks = await createLocalScreenTracks({
      resolution: { width: 1280, height: 720 }
    });
    screenTracks = tracks;
    screenPublications = [];
    tracks.forEach((track) => {
      if (track.kind === 'video') localScreenPreviewTrack = track;
    });
    for (const track of tracks) {
      const publication = await room.localParticipant.publishTrack(track);
      screenPublications.push(publication);
      track.onEnded = () => {
        void stopScreenShare(true);
      };
    }
    if (localScreenPreviewTrack) {
      setScreenPreviewTrack(localScreenPreviewTrack, currentNickname || 'Sen');
    }
    sendCommand('share_quality', { quality: '720p', isScreenSharing: true });
    broadcastPresenceState();
    setStatus(t.screenShareStarted);
    renderParticipants();
    updateButtons();
    updateStatusBar();
  } catch (err) {
    setStatus(`${t.screenShareError}: ${err.message || err}`);
    log(`Ekran paylaşım hatası: ${err.message || err}`);
  }
}

async function stopScreenShare(fromEnded = false) {
  if (!room || screenTracks.length === 0) return;
  const tracksToStop = [...screenTracks];
  const pubsToUnpublish = [...screenPublications];
  screenTracks = [];
  screenPublications = [];
  localScreenPreviewTrack = null;
  for (const publication of pubsToUnpublish) {
    try {
      await room.localParticipant.unpublishTrack(publication.track);
    } catch (_) {}
  }
  tracksToStop.forEach((track) => track.stop());
  sendCommand('share_quality', { quality: 'none', isScreenSharing: false });
  broadcastPresenceState();
  setScreenPreviewTrack(null);
  setStatus(fromEnded ? t.screenShareEnded : t.screenShareStopped);
  renderParticipants();
  updateButtons();
  updateStatusBar();
}

async function setViewEnabled(enabled) {
  viewEnabled = Boolean(enabled);
  if (!viewEnabled) {
    const toDelete = [];
    trackElements.forEach((value, key) => {
      if (value.kind === 'video') toDelete.push(key);
    });
    toDelete.forEach((trackSid) => clearTrackElement(trackSid));
    if (!localScreenPreviewTrack) setScreenPreviewTrack(null);
    return;
  }
  if (!room) return;
  room.remoteParticipants.forEach((participant) => {
    participant.trackPublications.forEach((publication) => {
      if (publication.track && publication.track.kind === 'video') {
        attachRemoteVideo(publication.track, participant);
      }
    });
  });
}

function handleCommandInput(raw) {
  const text = String(raw || '').trim();
  if (!text) return true;

  if (text === '/mute') {
    setMutedState(!isMuted, { notifyLocal: true });
    return true;
  }

  if (text === '/yayın' || text === '/view') {
    appendChatMessage({
      system: true,
      text: `Video izleme: ${viewEnabled ? 'Açık' : 'Kapalı'}`,
      ts: Date.now()
    });
    return true;
  }

  if (text === '/yayın kapa' || text === '/view_off') {
    void setViewEnabled(false);
    sendCommand('view_off', { targetId: getLocalParticipantId() });
    appendChatMessage({ system: true, text: 'Video izleme kapatıldı. Ses akışı devam ediyor.', ts: Date.now() });
    return true;
  }

  if (text === '/yayın aç' || text === '/view_on') {
    void setViewEnabled(true);
    sendCommand('view_on', { targetId: getLocalParticipantId() });
    appendChatMessage({ system: true, text: 'Video izleme açıldı.', ts: Date.now() });
    return true;
  }

  if (text.startsWith('/share_quality')) {
    const quality = text.split(/\s+/)[1] || '720p';
    sendCommand('share_quality', {
      quality,
      isScreenSharing: screenTracks.length > 0
    });
    appendChatMessage({ system: true, text: `Paylaşım kalite bildirimi gönderildi: ${quality}`, ts: Date.now() });
    return true;
  }

  return false;
}

async function populateDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  if (els.micSelect) {
    els.micSelect.innerHTML = '';
    const mics = devices.filter((d) => d.kind === 'audioinput');
    mics.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d.deviceId;
      opt.textContent = d.label || `Mikrofon ${els.micSelect.options.length + 1}`;
      els.micSelect.appendChild(opt);
    });
  }
  if (els.outputSelect) {
    els.outputSelect.innerHTML = '';
    const outputs = devices.filter((d) => d.kind === 'audiooutput');
    outputs.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d.deviceId;
      opt.textContent = d.label || `Çıkış ${els.outputSelect.options.length + 1}`;
      els.outputSelect.appendChild(opt);
    });
    if (deviceSettings.outputId) {
      const hasOutput = outputs.some((d) => d.deviceId === deviceSettings.outputId);
      if (hasOutput) {
        els.outputSelect.value = deviceSettings.outputId;
      }
    }
  }
  if (els.micSelect && deviceSettings.micId) {
    const mics = devices.filter((d) => d.kind === 'audioinput');
    const hasMic = mics.some((d) => d.deviceId === deviceSettings.micId);
    if (hasMic) {
      els.micSelect.value = deviceSettings.micId;
    }
  }
}

function randomRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

function wireUi() {
  if (els.serverUrlInput) {
    els.serverUrlInput.value = `${LIVEKIT_URL} | ${TOKEN_URL}`;
    els.serverUrlInput.disabled = true;
  }
  if (els.modeSelect) {
    els.modeSelect.value = 'sfu';
    els.modeSelect.disabled = true;
  }
  syncAudioSettingsUi();
  if (els.roomsList) els.roomsList.textContent = 'Oda listesi yükleniyor...';

  els.joinBtn?.addEventListener('click', () => {
    saveUserPrefs();
    void joinRoom(els.roomId?.value, els.nicknameInput?.value);
  });

  els.createBtn?.addEventListener('click', () => {
    if (els.roomId && !els.roomId.value.trim()) els.roomId.value = randomRoomId();
    saveUserPrefs();
    void joinRoom(els.roomId?.value, els.nicknameInput?.value);
  });

  els.leaveBtn?.addEventListener('click', () => {
    void leaveRoom();
  });

  els.muteBtn?.addEventListener('click', () => {
    if (!localAudioTrack) return;
    setMutedState(!isMuted, { notifyLocal: true });
  });

  els.screenShareBtn?.addEventListener('click', () => {
    void startScreenShare();
  });

  els.screenStopBtn?.addEventListener('click', () => {
    void stopScreenShare(false);
  });

  els.refreshRoomsBtn?.addEventListener('click', () => {
    void refreshRoomsList();
  });

  els.chatSendBtn?.addEventListener('click', () => {
    const text = String(els.chatInput?.value || '').trim();
    if (!text) return;
    const now = Date.now();
    if (chatSlowModeMs > 0 && now - lastChatSentAt < chatSlowModeMs) {
      appendChatMessage({ system: true, text: `Slow mode aktif. ${chatSlowModeMs}ms bekle.`, ts: now });
      return;
    }
    lastChatSentAt = now;
    if (els.chatInput) els.chatInput.value = '';
    const handled = handleCommandInput(text);
    if (!handled) sendChat(text);
  });

  els.chatInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      els.chatSendBtn?.click();
    }
  });

  els.micSelect?.addEventListener('change', async () => {
    deviceSettings.micId = els.micSelect.value || null;
    saveUserPrefs();
    if (room) await createAndPublishMicTrack();
  });

  els.outputSelect?.addEventListener('change', () => {
    deviceSettings.outputId = els.outputSelect.value || null;
    saveUserPrefs();
    trackElements.forEach((value) => {
      if (value.kind !== 'audio') return;
      const audioEl = value.element;
      if (typeof audioEl.setSinkId === 'function' && deviceSettings.outputId) {
        audioEl.setSinkId(deviceSettings.outputId).catch(() => {});
      }
    });
  });

  els.listenOnlyToggle?.addEventListener('change', () => {
    setMutedState(Boolean(els.listenOnlyToggle.checked), { syncListenOnly: false });
  });

  els.deafToggle?.addEventListener('change', () => {
    setDeafState(Boolean(els.deafToggle.checked), { syncToggle: false });
  });

  els.speakerBtn?.addEventListener('click', () => {
    setDeafState(!isDeaf);
  });

  els.noiseToggle?.addEventListener('change', async () => {
    noiseReductionEnabled = Boolean(els.noiseToggle.checked);
    updateStatusBar();
    setStatus(noiseReductionEnabled ? 'Gürültü azaltma açıldı.' : 'Gürültü azaltma kapatıldı.');
    saveUserPrefs();
    if (room) {
      scheduleMicRepublish(0);
    }
  });

  const bindAudioSettingRange = (el, updater) => {
    if (!el) return;
    const onChange = () => {
      updater(Number(el.value));
      syncAudioSettingsUi();
      saveUserPrefs();
      const appliedLive = applyLiveMicProcessingSettings();
      if (room && !appliedLive) scheduleMicRepublish();
    };
    el.addEventListener('input', onChange);
    el.addEventListener('change', onChange);
  };

  bindAudioSettingRange(els.micGain, (value) => {
    audioSettings.micGain = Math.max(0, Math.min(200, Number.isFinite(value) ? value : 100));
  });
  bindAudioSettingRange(els.highPassFreq, (value) => {
    audioSettings.highPassHz = Math.max(60, Math.min(200, Number.isFinite(value) ? value : 90));
  });
  bindAudioSettingRange(els.gateThreshold, (value) => {
    audioSettings.gateThresholdDb = Math.max(-60, Math.min(-20, Number.isFinite(value) ? value : -40));
  });
  bindAudioSettingRange(els.gateAttack, (value) => {
    audioSettings.gateAttackMs = Math.max(1, Math.min(50, Number.isFinite(value) ? value : 5));
  });
  bindAudioSettingRange(els.gateRelease, (value) => {
    audioSettings.gateReleaseMs = Math.max(20, Math.min(400, Number.isFinite(value) ? value : 150));
  });
  bindAudioSettingRange(els.gateFloor, (value) => {
    audioSettings.gateFloorDb = Math.max(-80, Math.min(-30, Number.isFinite(value) ? value : -60));
  });

  const bindAudioSettingToggle = (el, updater, republishDelay = 180) => {
    if (!el) return;
    el.addEventListener('change', () => {
      updater(Boolean(el.checked));
      syncAudioSettingsUi();
      saveUserPrefs();
      if (room) scheduleMicRepublish(republishDelay);
    });
  };

  bindAudioSettingToggle(els.agcToggle, (checked) => {
    audioSettings.agcEnabled = checked;
  }, 0);
  bindAudioSettingToggle(els.compressorToggle, (checked) => {
    audioSettings.compressorEnabled = checked;
  });

  els.screenFullscreenBtn?.addEventListener('click', async () => {
    if (isScreenModalOpen) {
      closeScreenModal();
      return;
    }
    openScreenModal();
  });

  els.screenModalClose?.addEventListener('click', () => {
    closeScreenModal();
  });
  els.screenModal?.addEventListener('click', (event) => {
    if (event.target === els.screenModal) closeScreenModal();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isScreenModalOpen) {
      closeScreenModal();
    }
  });

  els.moderationToggle?.addEventListener('click', () => {
    if (!els.moderationPanel) return;
    els.moderationPanel.classList.toggle('open');
  });

  els.logCopyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText((els.log && els.log.textContent) || '');
      setStatus('Log panoya kopyalandı.');
    } catch (_) {
      setStatus('Log kopyalanamadı.');
    }
  });

  els.logClearBtn?.addEventListener('click', () => {
    logs.length = 0;
    if (els.log) els.log.textContent = '';
    setStatus('Log temizlendi.');
  });

  async function startMicTest() {
    if (micTestStream) return;
    micTestStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: noiseReductionEnabled,
        noiseSuppression: noiseReductionEnabled,
        autoGainControl: noiseReductionEnabled
      }
    });
    if (els.micLoopback) {
      els.micLoopback.srcObject = micTestStream;
      els.micLoopback.muted = false;
      if (typeof els.micLoopback.play === 'function') {
        els.micLoopback.play().catch(() => {});
      }
    }
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(micTestStream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    source.connect(analyser);
    const buffer = new Uint8Array(analyser.fftSize);
    micTestMeterTimer = window.setInterval(() => {
      analyser.getByteTimeDomainData(buffer);
      let peak = 0;
      for (let i = 0; i < buffer.length; i += 1) {
        const v = Math.abs(buffer[i] - 128) / 128;
        if (v > peak) peak = v;
      }
      const pct = Math.max(0, Math.min(100, Math.round(peak * 180)));
      if (els.micTestVuFill) els.micTestVuFill.style.width = `${pct}%`;
      if (els.micTestDb) {
        const db = peak > 0 ? (20 * Math.log10(peak)).toFixed(1) : '-60.0';
        els.micTestDb.textContent = `${db} dB`;
      }
    }, 120);
  }

  function stopMicTest() {
    if (micTestMeterTimer) {
      window.clearInterval(micTestMeterTimer);
      micTestMeterTimer = null;
    }
    if (micTestStream) {
      micTestStream.getTracks().forEach((track) => track.stop());
      micTestStream = null;
    }
    if (els.micLoopback) {
      els.micLoopback.srcObject = null;
    }
    if (els.micTestVuFill) els.micTestVuFill.style.width = '0%';
    if (els.micTestDb) els.micTestDb.textContent = '- dB';
  }

  els.micTestBtn?.addEventListener('click', async () => {
    if (els.micTestModal) els.micTestModal.classList.remove('hidden');
    try {
      await startMicTest();
    } catch (err) {
      setStatus(`Mikrofon testi başlatılamadı: ${err && err.message ? err.message : err}`);
    }
  });
  els.micTestClose?.addEventListener('click', () => {
    stopMicTest();
    if (els.micTestModal) els.micTestModal.classList.add('hidden');
  });
  els.micTestStart?.addEventListener('click', () => {
    void startMicTest();
  });
  els.micTestStop?.addEventListener('click', () => {
    stopMicTest();
  });

  els.echoTestBtn?.addEventListener('click', () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 660;
      gain.gain.value = 0.05;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      window.setTimeout(() => {
        osc.stop();
        ctx.close().catch(() => {});
      }, 200);
      if (els.echoResult) els.echoResult.textContent = 'Test sesi çalındı';
    } catch (_) {
      if (els.echoResult) els.echoResult.textContent = 'Test başarısız';
    }
  });

  function sendModerationAction(action) {
    const targetId = getSelectedModerationTarget();
    if (!targetId) {
      setStatus('Önce moderasyon hedefi seç.');
      return;
    }
    sendCommand('moderation', { action, targetId });
    appendChatMessage({ system: true, text: `Moderasyon komutu gönderildi: ${action}`, ts: Date.now() });
  }

  els.muteOtherBtn?.addEventListener('click', () => sendModerationAction('mute'));
  els.unmuteOtherBtn?.addEventListener('click', () => sendModerationAction('unmute'));
  els.kickBtn?.addEventListener('click', () => sendModerationAction('kick'));
  els.banBtn?.addEventListener('click', () => sendModerationAction('ban'));

  els.slowModeBtn?.addEventListener('click', () => {
    const ms = Number(els.slowModeSelect && els.slowModeSelect.value ? els.slowModeSelect.value : 0);
    chatSlowModeMs = Number.isFinite(ms) ? Math.max(0, Math.floor(ms)) : 0;
    sendCommand('slowmode', { ms: chatSlowModeMs });
    appendChatMessage({ system: true, text: `Slow mode ayarlandı: ${chatSlowModeMs}ms`, ts: Date.now() });
  });

  els.softRefreshBtn?.addEventListener('click', async () => {
    try {
      if (room) await createAndPublishMicTrack();
      sendCommand('refresh_soft', {});
      setStatus('Soft refresh uygulandı.');
    } catch (err) {
      setStatus(`Soft refresh hatası: ${err && err.message ? err.message : err}`);
    }
  });

  els.hardRefreshBtn?.addEventListener('click', async () => {
    const targetRoom = currentRoomId;
    const targetNick = currentNickname;
    sendCommand('refresh_hard', {});
    if (!targetRoom || !targetNick) return;
    await leaveRoom();
    await joinRoom(targetRoom, targetNick);
  });

  const onWindowLeave = () => {
    const roomName = currentRoomId;
    if (!roomName) return;
    void announceRoomClosed(roomName, { useBeacon: true, keepalive: true });
  };
  window.addEventListener('beforeunload', onWindowLeave);
  window.addEventListener('pagehide', onWindowLeave);
}

async function init() {
  setupTabs();
  setupSettingsDrawer();
  bindWindowControls();
  applyUserPrefs();
  wireUi();
  setView(false);
  updateButtons();
  updateMuteButton();
  if (els.vuFill) els.vuFill.style.width = '0%';
  if (els.micDb) els.micDb.textContent = '- dB';
  updateSpeakerButton();
  updateStatusBar();
  renderAudioControls();
  setStatus('Hazır. Odaya katılabilirsin.');
  updateScreenStatusText(t.screenShareEmpty);
  startRoomListLoop();
  await populateDevices();
}

void init();
