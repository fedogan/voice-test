let livekitModule = null;

try {
  livekitModule = await import('./desktop/node_modules/livekit-client/dist/livekit-client.esm.mjs');
} catch (_devErr) {
  livekitModule = await import('../node_modules/livekit-client/dist/livekit-client.esm.mjs');
}

export const { Room, RoomEvent, createLocalAudioTrack, createLocalScreenTracks } = livekitModule;
