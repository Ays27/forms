import { _ as __nuxt_component_0 } from './nuxt-link-DnGR-eTn.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const nameError = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const confirmPasswordError = ref("");
    const generalError = ref("");
    const successMessage = ref("");
    const validateEmail = (email2) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email2);
    };
    const validatePassword = (password2) => {
      return /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password2);
    };
    watch(name, (val) => {
      nameError.value = val.trim().length < 3 ? "Name must be at least 3 characters" : "";
    });
    watch(email, (val) => {
      emailError.value = validateEmail(val) ? "" : "Invalid email format";
    });
    watch(password, (val) => {
      passwordError.value = validatePassword(val) ? "" : "Password must be 8+ chars, 1 uppercase, 1 special character";
    });
    watch(confirmPassword, (val) => {
      confirmPasswordError.value = val === password.value ? "" : "Passwords do not match";
    });
    const isFormValid = computed(() => {
      return name.value.trim().length >= 3 && validateEmail(email.value) && validatePassword(password.value) && password.value === confirmPassword.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F3F4F6]" }, _attrs))}><nav class="border-b bg-white px-4 sm:px-6 py-3"><h1 class="text-2xl sm:text-3xl font-bold text-[#C2410C]"> Forms </h1></nav><main class="flex min-h-[calc(100vh-64px)] justify-center px-4 pt-12 sm:pt-20 md:pt-24"><div class="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-md"><div class="mx-auto flex w-full max-w-sm flex-col items-center"><h1 class="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-semibold text-gray-800"> Welcome, register to Forms </h1><div class="w-full space-y-3 sm:space-y-4"><input${ssrRenderAttr("value", name.value)} type="text" placeholder="Name" class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base">`);
      if (nameError.value) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(nameError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", email.value)} type="email" placeholder="Email" class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base">`);
      if (emailError.value) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(emailError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", password.value)} type="password" placeholder="Password" class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base">`);
      if (passwordError.value) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(passwordError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", confirmPassword.value)} type="password" placeholder="Confirm Password" class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base">`);
      if (confirmPasswordError.value) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(confirmPasswordError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (generalError.value) {
        _push(`<p class="mt-4 text-center text-sm text-red-500">${ssrInterpolate(generalError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<p class="mt-4 text-center text-sm text-green-600">${ssrInterpolate(successMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button"${ssrIncludeBooleanAttr(!isFormValid.value) ? " disabled" : ""} class="${ssrRenderClass([isFormValid.value ? "bg-[#C2410C] hover:bg-white hover:text-[#C2410C] hover:ring-1 hover:ring-[#C2410C]" : "bg-gray-400 cursor-not-allowed", "mt-6 w-full sm:w-64 rounded-xl py-3 text-white transition"])}"> Sign up </button><p class="mt-6 text-sm text-gray-600 text-center"> Already a member? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-[#C2410C] hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-1K9cK0pr.mjs.map
