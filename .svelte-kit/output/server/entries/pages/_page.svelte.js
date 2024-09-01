import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { H as Health_xml } from "../../chunks/health-xml.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-yyjjjs">Welcome to SvelteKit</h1> <p data-svelte-h="svelte-1vc1ga9">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> ${validate_component(Health_xml, "HealthXml").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
