import { c as create_ssr_component } from "./ssr.js";
import "devalue";
import "./client.js";
const Health_xml = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<form method="POST" action="/apple?/upload" enctype="multipart/form-data" data-svelte-h="svelte-2mpj99"><label>Apple Health &quot;export.xml&quot;
    <input name="file" type="file" accept="xml"></label> <button type="submit">Load data</button></form>`;
});
export {
  Health_xml as H
};
