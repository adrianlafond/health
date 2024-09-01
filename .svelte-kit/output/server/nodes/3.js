import * as server from '../entries/pages/apple/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/apple/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/apple/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.Cel0RvlO.js","_app/immutable/chunks/scheduler.BLLGogQX.js","_app/immutable/chunks/index.D6vEREbN.js","_app/immutable/chunks/health-xml.B6k92dVV.js","_app/immutable/chunks/entry.DpGjMBpA.js"];
export const stylesheets = [];
export const fonts = [];
