

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CqAYY2gM.js","_app/immutable/chunks/scheduler.BLLGogQX.js","_app/immutable/chunks/index.D6vEREbN.js"];
export const stylesheets = [];
export const fonts = [];
