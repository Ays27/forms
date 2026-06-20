<template>
  <div class="min-h-screen bg-[#F3F4F6] p-6">

    <div v-if="form" class="mx-auto max-w-xl bg-white p-6 rounded-xl shadow">

      <h1 class="text-2xl font-bold mb-2">
        {{ form.title }}
      </h1>

      <p class="text-gray-600 mb-6">
        {{ form.description }}
      </p>

      <!-- SIMPLE INPUT (we expand later) -->
      <textarea
        v-model="answer"
        placeholder="Your answer..."
        class="w-full border rounded-lg p-3"
      />

      <button
        @click="submitForm"
        class="mt-4 bg-[#C2410C] text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>

    </div>

    <p v-else class="text-center mt-10">
      Loading form...
    </p>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authClient } from '~/lib/auth-client'

const route = useRoute()

const form = ref<any>(null)
const answer = ref('')

/* ---------------------------
   LOAD FORM BY SLUG
----------------------------*/

onMounted(async () => {
  const res = await $fetch(`/api/forms/${route.params.slug}`)
  form.value = res
})

/* ---------------------------
   SUBMIT FORM
----------------------------*/

const submitForm = async () => {
  const session = await authClient.getSession()

  // ❌ owner cannot fill their own form
  if (session?.user?.id === form.value.userId) {
    alert("You cannot fill your own form")
    return
  }

  await $fetch('/api/responses', {
    method: 'POST',
    body: {
      formId: form.value.id,
      answer: answer.value
    }
  })

  alert('Submitted!')
}
</script>