import { ref } from 'vue'

export function useMedia() {
  const imageInput = ref<HTMLInputElement | null>(null)

  const imageQuestionId = ref<number | null>(null)

  const imageOptionIndex = ref<number | null>(null)

  const showVideoInput = ref(false)

  function openImagePicker(
    selectedQuestionId: number | null
  ): void {
    imageQuestionId.value = selectedQuestionId

    imageInput.value?.click()
  }

  return {
    imageInput,
    imageQuestionId,
    imageOptionIndex,
    showVideoInput,
    openImagePicker
  }
}