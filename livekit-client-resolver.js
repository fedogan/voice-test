let livekitModule = null;

try {
  livekitModule = await import('./desktop/node_modules/livekit-client/dist/livekit-client.esm.mjs');
} catch (_devErr) {
  try {
    livekitModule = await import('./node_modules/livekit-client/dist/livekit-client.esm.mjs');
  } catch (_rootErr) {
    try {
      livekitModule = await import('../node_modules/livekit-client/dist/livekit-client.esm.mjs');
    } catch (_desktopErr) {
livekitModule = await import('https://cdn.jsdelivr.net/npm/livekit-client@2.17.2/dist/livekit-client.esm.mjs');    }
  }
}

export const { Room, RoomEvent, createLocalAudioTrack, createLocalScreenTracks } = livekitModule;
