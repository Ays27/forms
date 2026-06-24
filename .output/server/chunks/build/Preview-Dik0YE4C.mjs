import { ref, defineComponent, mergeProps, unref, computed, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr } from 'vue/server-renderer';
import { p as pinia_prodExports, _ as _export_sfc } from './server.mjs';

const useFormStore = pinia_prodExports.defineStore("form", () => {
  const history = ref([]);
  const future = ref([]);
  const formTitle = ref("Untitled Form");
  const formDescription = ref("Form description");
  const formId = ref(null);
  const shareId = ref(null);
  const selectedQuestionId = ref(1);
  const sections = ref([
    {
      id: 1,
      title: "Section 1"
    }
  ]);
  const questions = ref([
    {
      id: 1,
      title: "Untitled Question",
      type: "Multiple Choice",
      required: false,
      options: [
        {
          text: "Option 1"
        }
      ],
      sectionId: 1,
      goToSectionId: void 0,
      maxLength: void 0
    }
  ]);
  function saveState() {
    history.value.push(
      JSON.parse(
        JSON.stringify({
          formTitle: formTitle.value,
          formDescription: formDescription.value,
          sections: sections.value,
          questions: questions.value
        })
      )
    );
    future.value = [];
  }
  function addQuestion() {
    saveState();
    const newQuestion = {
      id: Date.now(),
      title: "Untitled Question",
      type: "Multiple Choice",
      required: false,
      options: [
        {
          text: "Option 1"
        }
      ],
      sectionId: sections.value[sections.value.length - 1].id,
      goToSectionId: void 0,
      maxLength: void 0
    };
    questions.value.push(newQuestion);
    selectedQuestionId.value = newQuestion.id;
  }
  function addSection() {
    saveState();
    sections.value.push({
      id: Date.now(),
      title: `Section ${sections.value.length + 1}`
    });
  }
  function deleteQuestion(id) {
    saveState();
    questions.value = questions.value.filter(
      (question) => question.id !== id
    );
  }
  function duplicateQuestion(question) {
    saveState();
    const clonedQuestion = {
      ...question,
      id: Date.now(),
      options: question.options.map((option) => ({
        ...option
      }))
    };
    questions.value.push(clonedQuestion);
  }
  function addOption(question) {
    saveState();
    question.options.push({
      text: `Option ${question.options.length + 1}`
    });
  }
  function undo() {
    console.log("UNDO CLICKED");
    if (history.value.length === 0) return;
    const current = {
      formTitle: formTitle.value,
      formDescription: formDescription.value,
      sections: sections.value,
      questions: questions.value
    };
    future.value.push(
      JSON.parse(JSON.stringify(current))
    );
    const previous = history.value.pop();
    formTitle.value = previous.formTitle;
    formDescription.value = previous.formDescription;
    sections.value = previous.sections;
    questions.value = previous.questions;
  }
  function redo() {
    if (future.value.length === 0) return;
    const current = {
      formTitle: formTitle.value,
      formDescription: formDescription.value,
      sections: sections.value,
      questions: questions.value
    };
    history.value.push(
      JSON.parse(JSON.stringify(current))
    );
    const next = future.value.pop();
    formTitle.value = next.formTitle;
    formDescription.value = next.formDescription;
    sections.value = next.sections;
    questions.value = next.questions;
  }
  async function loadForm(formId2) {
    const data = await $fetch(`/api/forms/${formId2}`);
    formTitle.value = data.form.title;
    formDescription.value = data.form.description;
    formId2.value = data.form.id;
    shareId.value = data.form.shareId;
    sections.value = data.sections;
    questions.value = data.questions.map((q) => ({
      ...q,
      options: data.options.filter((o) => o.questionId === q.id).map((o) => ({
        text: o.text,
        imageUrl: o.imageUrl
      }))
    }));
    saveState();
  }
  return {
    formTitle,
    formDescription,
    formId,
    shareId,
    selectedQuestionId,
    sections,
    questions,
    addQuestion,
    addSection,
    deleteQuestion,
    duplicateQuestion,
    addOption,
    loadForm,
    undo,
    redo,
    saveState
  };
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ShortAnswer",
  __ssrInlineRender: true,
  props: {
    question: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><input type="text"${ssrRenderAttr("maxlength", __props.question.maxLength)} class="w-full border-b border-gray-300 py-2 outline-none" placeholder="Your answer">`);
      if (__props.question.maxLength) {
        _push(`<p class="text-xs text-gray-500 mt-1"> Maximum ${ssrInterpolate(__props.question.maxLength)} characters </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/ShortAnswer.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ShortAnswer = Object.assign(_sfc_main$8, { __name: "PreviewInputsShortAnswer" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Paragraph",
  __ssrInlineRender: true,
  props: {
    question: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><textarea rows="4"${ssrRenderAttr("maxlength", __props.question.maxLength)} placeholder="Your answer" class="w-full border rounded-lg p-3"></textarea>`);
      if (__props.question.maxLength) {
        _push(`<p class="text-xs text-gray-500 mt-1"> Maximum ${ssrInterpolate(__props.question.maxLength)} characters </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/Paragraph.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Paragraph = Object.assign(_sfc_main$7, { __name: "PreviewInputsParagraph" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MultipleChoice",
  __ssrInlineRender: true,
  props: {
    question: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.question.options, (opt, i) => {
        _push(`<label class="flex items-center gap-2"><input type="radio" name="mcq"><span>${ssrInterpolate(opt.text)}</span></label>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/MultipleChoice.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MultipleChoice = Object.assign(_sfc_main$6, { __name: "PreviewInputsMultipleChoice" });
const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.question.options, (opt, i) => {
    _push(`<label class="flex items-center gap-2"><input type="checkbox"><span>${ssrInterpolate(opt.text)}</span></label>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/Checkboxes.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Checkboxes = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]), { __name: "PreviewInputsCheckboxes" });
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<select${ssrRenderAttrs(mergeProps({ class: "border p-2 rounded w-full" }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.question.options, (opt, i) => {
    _push(`<option>${ssrInterpolate(opt.text)}</option>`);
  });
  _push(`<!--]--></select>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Dropdown = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]), { __name: "PreviewInputsDropdown" });
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<input${ssrRenderAttrs(mergeProps({
    type: "date",
    class: "border p-2 rounded w-full"
  }, _attrs))}>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/Date.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Date$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]), { __name: "PreviewInputsDate" });
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<input${ssrRenderAttrs(mergeProps({
    type: "time",
    class: "border p-2 rounded w-full"
  }, _attrs))}>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/inputs/Time.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Time = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "PreviewInputsTime" });
const questionRegistry = {
  "Short Answer": ShortAnswer,
  Paragraph,
  "Multiple Choice": MultipleChoice,
  Checkboxes,
  Dropdown,
  Date: Date$1,
  Time
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "QuestionRenderer",
  __ssrInlineRender: true,
  props: {
    question: {}
  },
  setup(__props) {
    const props = __props;
    const component = computed(() => {
      return questionRegistry[props.question.type];
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (component.value) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({ question: __props.question }, _attrs), null), _parent);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-red-500" }, _attrs))}> Unknown type: ${ssrInterpolate(__props.question.type)}</div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/preview/QuestionRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const QuestionRenderer = Object.assign(_sfc_main$1, { __name: "PreviewQuestionRenderer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Preview",
  __ssrInlineRender: true,
  setup(__props) {
    const formStore = useFormStore();
    const {
      formTitle,
      formDescription,
      questions
    } = pinia_prodExports.storeToRefs(formStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto py-8 space-y-6" }, _attrs))}><div class="bg-white p-6 rounded-xl border-t-4 border-orange-600"><h1 class="text-2xl font-bold">${ssrInterpolate(unref(formTitle))}</h1><p class="text-gray-600">${ssrInterpolate(unref(formDescription))}</p></div><!--[-->`);
      ssrRenderList(unref(questions), (q) => {
        _push(`<div class="bg-white p-6 rounded-xl space-y-4"><h2 class="font-medium text-lg">${ssrInterpolate(q.title)}</h2>`);
        _push(ssrRenderComponent(QuestionRenderer, { question: q }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Preview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Preview = Object.assign(_sfc_main, { __name: "Preview" });

export { Preview as P, useFormStore as u };
//# sourceMappingURL=Preview-Dik0YE4C.mjs.map
