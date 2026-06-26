import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useRoute } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const form = ref(null);
    const answers = ref({});
    const submitted = ref(false);
    const submitError = ref("");
    const currentSectionId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 p-6" }, _attrs))}>`);
      if (submitted.value) {
        _push(`<div class="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow text-center"><h2 class="text-2xl font-bold mb-2"> Response Submitted </h2><p class="text-gray-500"> Thank you for completing this form. </p></div>`);
      } else if (form.value) {
        _push(`<div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow"><h1 class="text-2xl font-bold">${ssrInterpolate(form.value.title)}</h1><p class="text-gray-500 mb-6">${ssrInterpolate(form.value.description)}</p><div class="mb-4 text-gray-500 font-medium">${ssrInterpolate(form.value.sections.find((s) => s.id === currentSectionId.value)?.title)}</div><!--[-->`);
        ssrRenderList(form.value.questions.filter(
          (q) => q.sectionId === currentSectionId.value
        ), (q) => {
          _push(`<div><p class="font-medium mb-2">${ssrInterpolate(q.title)} `);
          if (q.required) {
            _push(`<span class="text-red-500 ml-1"> * </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
          if (q.type === "Short Answer") {
            _push(`<input${ssrRenderAttr("value", answers.value[q.id])} class="w-full border p-2 rounded">`);
          } else if (q.type === "Paragraph") {
            _push(`<textarea class="w-full border p-2 rounded">${ssrInterpolate(answers.value[q.id])}</textarea>`);
          } else if (q.type === "Multiple Choice") {
            _push(`<div><!--[-->`);
            ssrRenderList(q.options, (opt) => {
              _push(`<label class="block"><input type="radio"${ssrRenderAttr("name", q.id)}${ssrIncludeBooleanAttr(answers.value[q.id] === opt.text) ? " checked" : ""}> ${ssrInterpolate(opt.text)}</label>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (submitError.value) {
          _push(`<div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">${ssrInterpolate(submitError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="bg-orange-600 text-white px-4 py-2 rounded"> Submit </button></div>`);
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
//# sourceMappingURL=_id_-CECBvTEy.mjs.map
