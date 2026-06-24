import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const form = ref(null);
    const responses = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const getQuestion = (id) => {
      return form.value?.questions?.find((q) => q.id === id)?.title || "Unknown Question";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 p-6" }, _attrs))}>`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-500"> Loading responses... </div>`);
      } else if (error.value) {
        _push(`<div class="text-center text-red-500">${ssrInterpolate(error.value)}</div>`);
      } else if (responses.value.length === 0) {
        _push(`<div class="text-center text-gray-500"> No responses yet </div>`);
      } else {
        _push(`<div class="max-w-3xl mx-auto space-y-6"><h1 class="text-2xl font-bold text-gray-800">${ssrInterpolate(form.value?.title)}</h1><!--[-->`);
        ssrRenderList(responses.value, (r) => {
          _push(`<div class="bg-white p-5 rounded-xl shadow"><div class="flex justify-between text-sm text-gray-500 mb-4"><span>Response #${ssrInterpolate(r.id)}</span><span>${ssrInterpolate(new Date(r.createdAt).toLocaleString())}</span></div><div class="space-y-3"><!--[-->`);
          ssrRenderList(r.answers, (value, qId) => {
            _push(`<div class="border-b pb-2"><p class="text-sm font-medium text-gray-700">${ssrInterpolate(getQuestion(Number(qId)))}</p><p class="text-gray-900">${ssrInterpolate(value)}</p></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forms/responses/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BINiu4Al.mjs.map
