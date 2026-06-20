<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref<any>(null)
const answers = ref<Record<string, any>>({})

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

  } catch (err) {
    console.error(err)
  }
})

const submit = async () => {
  await $fetch('/api/responses', {
    method: 'POST',
    body: {
      formId: form.value.id,
      answer: answers.value
    }
  })

  alert('Submitted!')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <div v-if="form" class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

      <!-- TITLE -->
      <h1 class="text-2xl font-bold">
        {{ form.title }}
      </h1>

      <p class="text-gray-500 mb-6">
        {{ form.description }}
      </p>

      <!-- QUESTIONS -->
      <div v-for="q in form.questions" :key="q.id" class="mb-6">

        <p class="font-medium mb-2">
          {{ q.title }}
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
              :value="opt.text"
              v-model="answers[q.id]"
            />
            {{ opt.text }}
          </label>
        </div>

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