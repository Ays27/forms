<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref<any>(null)
const answers = ref<Record<string, any>>({})
const loading = ref(true)


onMounted(async () => {
  try {
    const id = route.params.id

    if (!id) return

    const res = await $fetch(`/api/forms/${id}`)

    form.value = {
      ...res.form,
      sections: res.sections || [],
      questions: res.questions || []
    }

  } catch (err) {
    console.error('Failed to load form:', err)
  } finally {
    loading.value = false
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

    <!-- LOADING -->
    <div v-if="loading" class="text-gray-500 text-center">
      Loading...
    </div>

    <!-- FORM NOT FOUND -->
    <div v-else-if="!form" class="text-red-500 text-center">
      Form not found
    </div>

    <!-- FORM -->
    <div v-else class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

      <h1 class="text-2xl font-bold">
        {{ form.title }}
      </h1>

      <p class="text-gray-500 mb-6">
        {{ form.description }}
      </p>

      <div
        v-for="q in form.questions"
        :key="q.id"
        class="mb-6"
      >
        <p class="font-medium mb-2">
          {{ q.title }}
        </p>

        <input
          v-if="q.type === 'Short Answer'"
          v-model="answers[q.id]"
          class="w-full border p-2 rounded"
          placeholder="Your answer"
        />

        <textarea
          v-else-if="q.type === 'Paragraph'"
          v-model="answers[q.id]"
          class="w-full border p-2 rounded"
          placeholder="Your answer"
        />

        <div v-else-if="q.type === 'Multiple Choice'">
          <label
            v-for="opt in q.options"
            :key="opt.id"
            class="block"
          >
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
  </div>
</template>