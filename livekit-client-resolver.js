let livekitModule = null;


livekitModule = await import('https://cdn.jsdelivr.net/npm/livekit-client@2.17.2/dist/livekit-client.esm.mjs');   


export const { Room, RoomEvent, createLocalAudioTrack, createLocalScreenTracks } = livekitModule;
