import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  Question,
  Section
} from '~/types/form'

export const useFormStore = defineStore('form', () => {
  const history = ref<any[]>([])
  const future = ref<any[]>([])
  const formTitle = ref('Untitled Form')
  const formDescription = ref('Form description')
  const formId = ref<number | null>(null)
  const shareId = ref<string | null>(null)
  const published = ref(false)
  const selectedQuestionId = ref<number | null>(1)
  const updateQuestion = (e: any, id: number) => {
  const q = questions.value.find(q => q.id === id)
  if (!q) return

  q.title = e.target.innerHTML
}
  const sections = ref<Section[]>([
    {
      id: 1,
      title: 'Section 1'
    }
  ])

  const questions = ref<Question[]>([
    {
      id: 1,
      title: 'Untitled Question',
      type: 'Multiple Choice',
      required: false,
      options: [
        {
          text: 'Option 1'
        }
      ],
      sectionId: 1,
      goToSectionId: undefined,
      maxLength: undefined
    }
  ])
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
  )

  future.value = []
}

  function addQuestion(): void {
    saveState()
    const newQuestion: Question = {
      id: Date.now(),
      title: 'Untitled Question',
      type: 'Multiple Choice',
      required: false,
      options: [
        {
          text: 'Option 1'
        }
      ],
      sectionId:
        sections.value[sections.value.length - 1].id,
      goToSectionId: undefined,
      maxLength: undefined
    }

    questions.value.push(newQuestion)

    selectedQuestionId.value = newQuestion.id
  }

  function addSection(): void {
    saveState()
    sections.value.push({
      id: Date.now(),
      title: `Section ${sections.value.length + 1}`
    })
  }

  function deleteQuestion(id: number): void {
    saveState()
    questions.value = questions.value.filter(
      question => question.id !== id
    )
  }

 function duplicateQuestion(question: Question): void {
  saveState()
  const clonedQuestion: Question = {
    ...question,
    id: Date.now(),
    options: question.options.map(option => ({
      ...option
    }))
  }

  questions.value.push(clonedQuestion)
}

  function addOption(
    question: Question
  ): void {
    saveState()
    question.options.push({
      text: `Option ${
        question.options.length + 1
      }`
    })
  }
function togglePublish() {
  published.value = !published.value
}
function undo() {
  console.log('UNDO CLICKED')
  if (history.value.length === 0) return

  const current = {
    formTitle: formTitle.value,
    formDescription: formDescription.value,
    sections: sections.value,
    questions: questions.value
  }

  future.value.push(
    JSON.parse(JSON.stringify(current))
  )

  const previous = history.value.pop()

  formTitle.value = previous.formTitle
  formDescription.value = previous.formDescription
  sections.value = previous.sections
  questions.value = previous.questions
}
async function setPublished(state: boolean) {
  published.value = state

  if (!formId.value) return

  await $fetch(`/api/forms/${formId.value}/publish`, {
    method: 'POST',
    body: {
      published: state
    }
  })
}
function redo() {
  if (future.value.length === 0) return

  const current = {
    formTitle: formTitle.value,
    formDescription: formDescription.value,
    sections: sections.value,
    questions: questions.value
  }

  history.value.push(
    JSON.parse(JSON.stringify(current))
  )

  const next = future.value.pop()

  formTitle.value = next.formTitle
  formDescription.value = next.formDescription
  sections.value = next.sections
  questions.value = next.questions
}
  async function loadForm(formId: number) {
  const data = await $fetch(`/api/forms/${formId}`)

  formTitle.value = data.form.title
  formDescription.value = data.form.description
  formId.value = data.form.id
  shareId.value = data.form.shareId
  sections.value = data.sections
  questions.value = data.questions.map((q: any) => ({
    ...q,
    options: data.options
      .filter((o: any) => o.questionId === q.id)
      .map((o: any) => ({
  text: o.text,
  imageUrl: o.imageUrl,
  goToSectionId: o.goToSectionId
}))
  }
))
saveState()
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
    published,
    togglePublish,
    setPublished,
    saveState
  }
})