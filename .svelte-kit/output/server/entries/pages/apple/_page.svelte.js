import { c as create_ssr_component, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { H as Health_xml } from "../../../chunks/health-xml.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<h1 data-svelte-h="svelte-i77ctz">/apple</h1> ${validate_component(Health_xml, "HealthXml").$$render($$result, {}, {}, {})} ${form?.data.error === false ? `<p>${escape(form?.data.date)}</p> <p>${escape(form.data.user.bloodType)}</p> <p>${escape(form.data.user.gender)}</p> <p>${escape(form.data.user.dob?.year)}-${escape(form.data.user.dob?.month)}-${escape(form.data.user.dob?.date)}</p>` : ``}`;
});
export {
  Page as default
};
