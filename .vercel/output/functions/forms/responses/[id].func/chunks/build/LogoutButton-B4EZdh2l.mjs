import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { createAuthClient } from 'better-auth/client';
import { f as useState, n as navigateTo } from './server.mjs';

const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth"
});

const useSession = () => {
  const session = useState("session", () => null);
  const user = useState("user", () => null);
  const loading = useState("auth-loading", () => true);
  const fetchSession = async () => {
    try {
      loading.value = true;
      const res = await authClient.getSession();
      session.value = res?.data?.session || null;
      user.value = res?.data?.user || null;
    } finally {
      loading.value = false;
    }
  };
  const logout = async () => {
    await authClient.signOut();
    session.value = null;
    user.value = null;
    await navigateTo("/login");
  };
  return {
    session,
    user,
    loading,
    fetchSession,
    logout
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LogoutButton",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useSession();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(user)) {
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
const LogoutButton = Object.assign(_sfc_main, { __name: "LogoutButton" });

export { LogoutButton as L, useSession as u };
//# sourceMappingURL=LogoutButton-B4EZdh2l.mjs.map
