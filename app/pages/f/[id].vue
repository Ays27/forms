<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref<any>(null)
const answers = ref<Record<string, any>>({})
const submitted = ref(false)
const submitError = ref('')
const currentSectionId = ref<number | null>(null)
onMounted(async () => {
  try {
    console.log('Share ID:', route.params.id)

    const data = await $fetch(
      `/api/forms/share/${route.params.id}`
    )

    console.log('API returned:', data)

    form.value = {
      ...data.form,
      questions: data.questions,
      sections: data.sections
    }
    if (data.sections?.length) {
  currentSectionId.value = data.sections[0].id
}
    console.log(
  'Questions:',
  form.value.questions
)

  } catch (err) {
    console.error(err)
  }
})

const submit = async () => {
  submitError.value = ''

  for (const q of form.value.questions) {
    if (
      q.required &&
      (
        answers.value[q.id] === undefined ||
        answers.value[q.id] === ''
      )
    ) {
      submitError.value = `"${q.title}" is required`
      return
    }
  }

  await $fetch('/api/responses', {
    method: 'POST',
    body: {
      formId: form.value.id,
      answer: answers.value
    }
  })

  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <div
  v-if="submitted"
  class="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow text-center"
>


  <h2 class="text-2xl font-bold mb-2">
    Response Submitted
  </h2>

  <p class="text-gray-500">
    Thank you for completing this form.
  </p>
</div>

<div
  v-else-if="form"
  class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow"
>

      <!-- TITLE -->
      <h1 class="text-2xl font-bold">
        {{ form.title }}
      </h1>

      <p class="text-gray-500 mb-6">
        {{ form.description }}
      </p>
<div class="mb-4 text-gray-500 font-medium">
  {{
    form.sections.find(s => s.id === currentSectionId)?.title
  }}
</div>
      <!-- QUESTIONS -->
    <div
  v-for="q in form.questions.filter(
    q => q.sectionId === currentSectionId
  )"
  :key="q.id"
>

        <p class="font-medium mb-2">
  {{ q.title }}

  <span
    v-if="q.required"
    class="text-red-500 ml-1"
  >
    *
  </span>
</p>

        <input
          v-if="q.type === 'Short Answer'"
          v-model="answers[q.id]"
          class="w-full border p-2 rounded"
        />

        <textarea
          v-else-if="q.type === 'Paragraph'"
          v-model="answers[q.id]"
          class="w-full border p-2 rounded"
        />

        <div v-else-if="q.type === 'Multiple Choice'">
  <label v-for="opt in q.options" :key="opt.id" class="block">
    
    <input
      type="radio"
      :name="q.id"
      :checked="answers[q.id] === opt.text"
      @change="() => {
        answers[q.id] = opt.text

        if (opt.goToSectionId) {
          currentSectionId = opt.goToSectionId
        }
      }"
    />

    {{ opt.text }}
  </label>
</div>

      </div>
<div
  v-if="submitError"
  class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg"
>
  {{ submitError }}
</div>
      <button
        class="bg-orange-600 text-white px-4 py-2 rounded"
        @click="submit"
      >
        Submit
      </button>

    </div>

    <div v-else class="text-center text-gray-500">
      Loading...
    </div>

  </div>
</template>