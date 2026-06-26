import { _ as __nuxt_component_0 } from './nuxt-link-DnGR-eTn.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useSession, L as LogoutButton } from './LogoutButton-CIlaFGdL.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'better-auth/client';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const forms = ref([]);
    useSession();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F3F4F6]" }, _attrs))}><nav class="border-b bg-white px-6 py-3"><div class="flex items-center justify-between"><h1 class="bg-gradient-to-r from-[#F97316] to-[#C2410C] bg-clip-text text-3xl font-bold text-transparent"> Forms </h1><div class="relative mx-8 w-full max-w-xl"><svg class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 106.05 6.05a7.5 7.5 0 0010.6 10.6z"></path></svg><input type="text" placeholder="Search" class="w-full rounded-xl bg-[#F3F4F6] py-2 pl-10 pr-4 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F97316]"></div>`);
      _push(ssrRenderComponent(LogoutButton, null, null, _parent));
      _push(`</div></nav><main class="mx-auto max-w-6xl px-6 py-8 space-y-8"><div><h2 class="mb-6 text-xl font-semibold text-gray-800"> Start a new form </h2></div><div class="grid grid-cols-2 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forms/new",
        class: "block w-40 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-40 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm transition hover:shadow-md"${_scopeId}><span class="text-8xl font-light text-[#C2410C] -mt-6"${_scopeId}> + </span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-40 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm transition hover:shadow-md" }, [
                createVNode("span", { class: "text-8xl font-light text-[#C2410C] -mt-6" }, " + ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(forms.value, (form) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: form.id,
          to: `/forms/${form.id}`,
          class: "block w-40"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-40 rounded-xl border bg-white p-3 shadow-sm hover:shadow-md"${_scopeId}><h3 class="font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(form.title)}</h3><p class="text-xs text-gray-500 mt-2"${_scopeId}>${ssrInterpolate(form.description)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "h-40 rounded-xl border bg-white p-3 shadow-sm hover:shadow-md" }, [
                  createVNode("h3", { class: "font-semibold text-gray-800" }, toDisplayString(form.title), 1),
                  createVNode("p", { class: "text-xs text-gray-500 mt-2" }, toDisplayString(form.description), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BtdISbIM.mjs.map
