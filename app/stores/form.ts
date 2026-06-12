import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  Question,
  Section
} from '~/types/form'

export const useFormStore = defineStore('form', () => {
  const formTitle = ref('Untitled Form')

  const formDescription = ref('Form description')

  const selectedQuestionId = ref<number | null>(1)

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
      goToSectionId: undefined
    }
  ])

  function addQuestion(): void {
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
      goToSectionId: undefined
    }

    questions.value.push(newQuestion)

    selectedQuestionId.value = newQuestion.id
  }

  function addSection(): void {
    sections.value.push({
      id: Date.now(),
      title: `Section ${sections.value.length + 1}`
    })
  }

  function deleteQuestion(id: number): void {
    questions.value = questions.value.filter(
      question => question.id !== id
    )
  }

  function duplicateQuestion(
    question: Question
  ): void {
    questions.value.push({
      ...structuredClone(question),
      id: Date.now()
    })
  }

  function addOption(
    question: Question
  ): void {
    question.options.push({
      text: `Option ${
        question.options.length + 1
      }`
    })
  }

  return {
    formTitle,
    formDescription,
    selectedQuestionId,
    sections,
    questions,

    addQuestion,
    addSection,
    deleteQuestion,
    duplicateQuestion,
    addOption
  }
})