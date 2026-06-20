<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{
  question: Question
}>()
</script>

<template>
  <div>
    <input
      type="text"
      :maxlength="question.maxLength"
      class="w-full border-b border-gray-300 py-2 outline-none"
      placeholder="Your answer"
    >

    <p
      v-if="question.maxLength"
      class="text-xs text-gray-500 mt-1"
    >
      Maximum {{ question.maxLength }} characters
    </p>
  </div>
</template>