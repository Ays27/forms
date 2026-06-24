import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { e as useSession } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LogoutButton",
  __ssrInlineRender: true,
  setup(__props) {
    const { session } = useSession();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(session)?.user) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600" }, _attrs))}> Logout </button>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LogoutButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "LogoutButton" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=LogoutButton-C4zzSgmN.mjs.map
