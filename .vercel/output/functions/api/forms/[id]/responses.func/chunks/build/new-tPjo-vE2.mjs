import { L as LogoutButton } from './LogoutButton-CIlaFGdL.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { a as useRoute, p as pinia_prodExports } from './server.mjs';
import { u as useFormStore, P as Preview } from './Preview-BP2cyUWO.mjs';
import { PhotoIcon, PlusIcon, VideoCameraIcon } from '@heroicons/vue/24/outline';
import 'better-auth/client';
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

function useMedia() {
  const imageInput = ref(null);
  const imageQuestionId = ref(null);
  const imageOptionIndex = ref(null);
  const showVideoInput = ref(false);
  function openImagePicker(selectedQuestionId) {
    imageQuestionId.value = selectedQuestionId;
    imageInput.value?.click();
  }
  return {
    imageInput,
    imageQuestionId,
    imageOptionIndex,
    showVideoInput,
    openImagePicker
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Questions",
  __ssrInlineRender: true,
  setup(__props) {
    const formStore = useFormStore();
    const { sections, questions, formTitle, formDescription, selectedQuestionId } = pinia_prodExports.storeToRefs(formStore);
    const {
      addQuestion,
      addSection,
      deleteQuestion,
      duplicateQuestion,
      addOption
    } = formStore;
    const {
      showVideoInput
    } = useMedia();
    const showLinkInput = ref(false);
    const linkUrl = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6" }, _attrs))}><div class="flex-1 space-y-6"><div class="bg-white rounded-xl shadow-sm border-t-8 border-orange-600 p-6"><input${ssrRenderAttr("value", unref(formTitle))} class="w-full text-3xl outline-none mb-4"><input${ssrRenderAttr("value", unref(formDescription))} class="w-full text-gray-600 outline-none"></div><!--[-->`);
      ssrRenderList(unref(sections), (section) => {
        _push(`<div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500"><input${ssrRenderAttr("value", section.title)} class="text-2xl font-semibold outline-none mb-2 w-full"><p class="text-sm text-gray-500 mb-4"> Questions in this section: ${ssrInterpolate(unref(questions).filter((q) => q.sectionId === section.id).length)}</p><div class="space-y-4 mt-4"><!--[-->`);
        ssrRenderList(unref(questions).filter((q) => q.sectionId === section.id), (question) => {
          _push(`<div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"><div class="flex items-start gap-3">`);
          if (question.imageUrl) {
            _push(`<img${ssrRenderAttr("src", question.imageUrl)} class="w-12 h-12 object-cover rounded border">`);
          } else {
            _push(`<div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-xs text-gray-400"> 📷 </div>`);
          }
          _push(`<div><h3 class="font-medium text-lg">${question.title ?? ""}</h3><p class="text-sm text-gray-500">${ssrInterpolate(question.type)}</p></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(questions) || [], (question) => {
        _push(`<div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"><div class="flex flex-col md:flex-row gap-4 mb-6"><div contenteditable="true" class="flex-1 border-b border-gray-300 outline-none text-xl pb-2 min-h-[40px]">${question.title ?? ""}</div><button class="text-gray-500 hover:text-orange-600">`);
        _push(ssrRenderComponent(unref(PhotoIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button><div class="flex flex-col gap-2 w-full md:w-auto"><select class="border rounded-lg px-3 py-2"><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Short Answer</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Paragraph</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Multiple Choice</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Checkboxes</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Dropdown</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Linear Scale</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Date</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Time</option><option${ssrIncludeBooleanAttr(Array.isArray(question.type) ? ssrLooseContain(question.type, null) : ssrLooseEqual(question.type, null)) ? " selected" : ""}>Image</option></select><select class="border rounded-lg px-3 py-2 text-sm"><!--[-->`);
        ssrRenderList(unref(sections), (section) => {
          _push(`<option${ssrRenderAttr("value", section.id)}${ssrIncludeBooleanAttr(Array.isArray(question.sectionId) ? ssrLooseContain(question.sectionId, section.id) : ssrLooseEqual(question.sectionId, section.id)) ? " selected" : ""}>${ssrInterpolate(section.title)}</option>`);
        });
        _push(`<!--]--></select></div></div>`);
        if (question.type === "Multiple Choice") {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(question.options, (option, index) => {
            _push(`<div class="flex items-center gap-3"><input type="radio" disabled><input${ssrRenderAttr("value", option.text)} class="flex-1 border-b border-gray-200 outline-none"><select class="border rounded px-2 py-1 text-xs ml-2"><option${ssrRenderAttr("value", void 0)}${ssrIncludeBooleanAttr(Array.isArray(option.goToSectionId) ? ssrLooseContain(option.goToSectionId, void 0) : ssrLooseEqual(option.goToSectionId, void 0)) ? " selected" : ""}> Continue </option><!--[-->`);
            ssrRenderList(unref(sections), (section) => {
              _push(`<option${ssrRenderAttr("value", section.id)}${ssrIncludeBooleanAttr(Array.isArray(option.goToSectionId) ? ssrLooseContain(option.goToSectionId, section.id) : ssrLooseEqual(option.goToSectionId, section.id)) ? " selected" : ""}> Go to ${ssrInterpolate(section.title)}</option>`);
            });
            _push(`<!--]--></select><button class="text-red-500"> ✕ </button></div>`);
          });
          _push(`<!--]--><button class="text-orange-600 text-sm"> + Add Option </button></div>`);
        } else if (question.type === "Checkboxes") {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(question.options, (option, index) => {
            _push(`<div class="flex items-center gap-3"><input type="checkbox" disabled><input${ssrRenderAttr("value", option.text)} class="flex-1 border-b border-gray-200 outline-none"><button class="text-red-500"> ✕ </button></div>`);
          });
          _push(`<!--]--><button class="text-orange-600 text-sm"> + Add Option </button></div>`);
        } else if (question.type === "Short Answer") {
          _push(`<div><input disabled class="w-full border-b border-gray-300 py-2 outline-none" placeholder="Short answer text"></div>`);
        } else if (question.type === "Paragraph") {
          _push(`<div><textarea disabled rows="4" class="w-full border border-gray-300 rounded-lg p-3 outline-none" placeholder="Long answer text"></textarea></div>`);
        } else {
          _push(`<!---->`);
        }
        if (question.type === "Short Answer" || question.type === "Paragraph") {
          _push(`<div class="mt-3"><label class="block text-sm text-gray-600 mb-1"> Character Limit </label><input${ssrRenderAttr("value", question.maxLength)} type="number" class="border border-gray-300 rounded px-2 py-1 w-40"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedQuestionId) === question.id) {
          _push(`<div class="mt-6 pt-4 border-t flex flex-wrap gap-2"><button class="w-10 h-10 rounded hover:bg-gray-100 font-bold"> B </button><button class="w-10 h-10 rounded hover:bg-gray-100 italic"> I </button><button class="w-10 h-10 rounded hover:bg-gray-100 underline"> U </button><button type="button" class="w-10 h-10 rounded hover:bg-gray-100"> 🔗 </button><button class="w-10 h-10 rounded hover:bg-gray-100"> Tx </button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (showLinkInput.value) {
          _push(`<div class="flex gap-2 mt-2"><input${ssrRenderAttr("value", linkUrl.value)} placeholder="https://example.com" class="border rounded px-3 py-2 flex-1"><button class="px-3 py-2 bg-orange-600 text-white rounded"> Add </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between gap-4"><select class="border rounded-lg px-3 py-2 text-sm"><option${ssrRenderAttr("value", void 0)}${ssrIncludeBooleanAttr(Array.isArray(question.goToSectionId) ? ssrLooseContain(question.goToSectionId, void 0) : ssrLooseEqual(question.goToSectionId, void 0)) ? " selected" : ""}>Continue Normally</option><!--[-->`);
        ssrRenderList(unref(sections), (section) => {
          _push(`<option${ssrRenderAttr("value", section.id)}${ssrIncludeBooleanAttr(Array.isArray(question.goToSectionId) ? ssrLooseContain(question.goToSectionId, section.id) : ssrLooseEqual(question.goToSectionId, section.id)) ? " selected" : ""}> Go to ${ssrInterpolate(section.title)}</option>`);
        });
        _push(`<!--]--></select><label class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(question.required) ? ssrLooseContain(question.required, null) : question.required) ? " checked" : ""} type="checkbox"><span class="text-sm">Required</span></label><div class="flex gap-4"><button class="text-blue-500 text-sm"> Duplicate </button><button class="text-red-500 text-sm"> Delete </button></div></div></div>`);
      });
      _push(`<!--]--></div><div class="sticky top-24 h-fit bg-white rounded-xl shadow-sm p-2 flex flex-row md:flex-col gap-2"><button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(PhotoIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(VideoCameraIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center"> 📂 </button></div>`);
      if (unref(showVideoInput)) {
        _push(`<div class="fixed bottom-10 right-10 bg-white p-4 shadow-lg rounded-lg"><input placeholder="Video URL" class="border p-2 w-64"><button class="ml-2 text-red-500">✕</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input type="file" accept="image/*" class="hidden"></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Questions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Questions = Object.assign(_sfc_main$1, { __name: "Questions" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const isPreviewMode = ref(false);
    const statusMessage = ref("");
    const formStore = useFormStore();
    useRoute();
    const { published } = pinia_prodExports.storeToRefs(formStore);
    const { setPublished } = formStore;
    const handlePublish = async () => {
      try {
        if (!published.value) {
          const form = await $fetch("/api/forms/publish", {
            method: "POST",
            body: {
              title: formStore.formTitle,
              description: formStore.formDescription,
              sections: formStore.sections,
              questions: formStore.questions
            }
          });
          formStore.formId = form.id;
          formStore.shareId = form.shareId;
          setPublished(true);
        } else {
          await $fetch(`/api/forms/${formStore.formId}/unpublish`, {
            method: "POST"
          });
          formStore.shareId = null;
          setPublished(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const copyLink = async () => {
      if (!formStore.shareId) {
        statusMessage.value = "Publish the form first";
        setTimeout(() => {
          statusMessage.value = "";
        }, 3e3);
        return;
      }
      const url = `${(void 0).location.origin}/f/${formStore.shareId}`;
      await (void 0).clipboard.writeText(url);
      statusMessage.value = "Link copied successfully";
      setTimeout(() => {
        statusMessage.value = "";
      }, 3e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = resolveComponent("UButton");
      const _component_LogoutButton = LogoutButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F3F4F6]" }, _attrs))}><nav class="border-b bg-white px-6 py-3"><div class="flex items-center justify-between">`);
      if (statusMessage.value) {
        _push(`<div class="text-sm text-green-600 font-medium">${ssrInterpolate(statusMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4"><span class="font-medium text-gray-700">${ssrInterpolate(unref(formStore).formTitle)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-eye",
        color: "neutral",
        variant: "ghost",
        onClick: ($event) => isPreviewMode.value = !isPreviewMode.value
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-undo-2",
        color: "neutral",
        variant: "ghost",
        onClick: ($event) => unref(formStore).undo()
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-redo-2",
        color: "neutral",
        variant: "ghost",
        onClick: ($event) => unref(formStore).redo()
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-link",
        color: "neutral",
        variant: "ghost",
        onClick: copyLink
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        label: unref(formStore).published ? "Published" : "Publish",
        class: "rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600",
        onClick: handlePublish
      }, null, _parent));
      _push(ssrRenderComponent(_component_LogoutButton, null, null, _parent));
      _push(`</div></div><div class="flex justify-center gap-10"><button class="py-4 text-sm font-medium border-b-2 transition"> Questions </button><button> Responses </button></div></nav>`);
      if (!isPreviewMode.value) {
        _push(ssrRenderComponent(Questions, {
          "form-title": unref(formStore).formTitle,
          "onUpdate:formTitle": ($event) => unref(formStore).formTitle = $event,
          "form-description": unref(formStore).formDescription,
          "onUpdate:formDescription": ($event) => unref(formStore).formDescription = $event
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(Preview, {
          "form-title": unref(formStore).formTitle,
          "form-description": unref(formStore).formDescription,
          onExitPreview: ($event) => isPreviewMode.value = false
        }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forms/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-tPjo-vE2.mjs.map
