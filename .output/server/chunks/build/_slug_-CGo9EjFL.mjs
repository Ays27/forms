import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const form = ref(null);
    const answer = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F3F4F6] p-6" }, _attrs))}>`);
      if (form.value) {
        _push(`<div class="mx-auto max-w-xl bg-white p-6 rounded-xl shadow"><h1 class="text-2xl font-bold mb-2">${ssrInterpolate(form.value.title)}</h1><p class="text-gray-600 mb-6">${ssrInterpolate(form.value.description)}</p><textarea placeholder="Your answer..." class="w-full border rounded-lg p-3">${ssrInterpolate(answer.value)}</textarea><button class="mt-4 bg-[#C2410C] text-white px-4 py-2 rounded-lg"> Submit </button></div>`);
      } else {
        _push(`<p class="text-center mt-10"> Loading form... </p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forms/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CGo9EjFL.mjs.map
