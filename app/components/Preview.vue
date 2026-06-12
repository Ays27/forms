<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFormStore } from '~/stores/form'

import QuestionRenderer from '~/components/preview/QuestionRenderer.vue'

const formStore = useFormStore()

const {
  formTitle,
  formDescription,
  questions
} = storeToRefs(formStore)
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 space-y-6">

    <div class="bg-white p-6 rounded-xl border-t-4 border-orange-600">
      <h1 class="text-2xl font-bold">{{ formTitle }}</h1>
      <p class="text-gray-600">{{ formDescription }}</p>
    </div>

    <div
      v-for="q in questions"
      :key="q.id"
      class="bg-white p-6 rounded-xl space-y-4"
    >
      <h2 class="font-medium text-lg">
        {{ q.title }}
      </h2>

      <QuestionRenderer :question="q" />
    </div>

  </div>
</template>