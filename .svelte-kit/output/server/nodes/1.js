

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5fAeRKLa.js","_app/immutable/chunks/scheduler.BLLGogQX.js","_app/immutable/chunks/index.D6vEREbN.js","_app/immutable/chunks/entry.DpGjMBpA.js"];
export const stylesheets = [];
export const fonts = [];
