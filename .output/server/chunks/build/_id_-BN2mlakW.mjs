import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const form = ref(null);
    const answers = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 p-6" }, _attrs))}>`);
      if (form.value) {
        _push(`<div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow"><h1 class="text-2xl font-bold">${ssrInterpolate(form.value.title)}</h1><p class="text-gray-500 mb-6">${ssrInterpolate(form.value.description)}</p><!--[-->`);
        ssrRenderList(form.value.questions, (q) => {
          _push(`<div class="mb-6"><p class="font-medium mb-2">${ssrInterpolate(q.title)}</p>`);
          if (q.type === "Short Answer") {
            _push(`<input${ssrRenderAttr("value", answers.value[q.id])} class="w-full border p-2 rounded">`);
          } else if (q.type === "Paragraph") {
            _push(`<textarea class="w-full border p-2 rounded">${ssrInterpolate(answers.value[q.id])}</textarea>`);
          } else if (q.type === "Multiple Choice") {
            _push(`<div><!--[-->`);
            ssrRenderList(q.options, (opt) => {
              _push(`<label class="block"><input type="radio"${ssrRenderAttr("name", q.id)}${ssrRenderAttr("value", opt.text)}${ssrIncludeBooleanAttr(ssrLooseEqual(answers.value[q.id], opt.text)) ? " checked" : ""}> ${ssrInterpolate(opt.text)}</label>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><button class="bg-orange-600 text-white px-4 py-2 rounded"> Submit </button></div>`);
      } else {
        _push(`<div class="text-center text-gray-500"> Loading... </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/f/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BN2mlakW.mjs.map
