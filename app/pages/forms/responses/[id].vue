<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref<any>(null)
const responses = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const id = route.params.id

  if (!id) {
    error.value = 'Missing form id'
    loading.value = false
    return
  }

  try {
    // Load form (for title/questions mapping)
    const formRes = await $fetch(`/api/forms/${id}`)

    form.value = {
      ...formRes.form,
      questions: formRes.questions || []
    }

    // Load responses
    const res = await $fetch(`/api/forms/${id}/responses`)
    responses.value = res.responses || []

  } catch (err: any) {
    console.error(err)
    error.value = 'Failed to load responses'
  } finally {
    loading.value = false
  }
})

/* helper: get question text */
const getQuestion = (id: number) => {
  return form.value?.questions?.find((q: any) => q.id === id)?.title || 'Unknown Question'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- LOADING -->
    <div v-if="loading" class="text-center text-gray-500">
      Loading responses...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="responses.length === 0" class="text-center text-gray-500">
      No responses yet
    </div>

    <!-- CONTENT -->
    <div v-else class="max-w-3xl mx-auto space-y-6">

      <!-- FORM TITLE -->
      <h1 class="text-2xl font-bold text-gray-800">
        {{ form?.title }}
      </h1>

      <!-- RESPONSES LIST -->
      <div
        v-for="r in responses"
        :key="r.id"
        class="bg-white p-5 rounded-xl shadow"
      >

        <!-- HEADER -->
        <div class="flex justify-between text-sm text-gray-500 mb-4">
          <span>Response #{{ r.id }}</span>
          <span>{{ new Date(r.createdAt).toLocaleString() }}</span>
        </div>

        <!-- ANSWERS -->
        <div class="space-y-3">
          <div
            v-for="(value, qId) in r.answers"
            :key="qId"
            class="border-b pb-2"
          >
            <p class="text-sm font-medium text-gray-700">
              {{ getQuestion(Number(qId)) }}
            </p>

            <p class="text-gray-900">
              {{ value }}
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>