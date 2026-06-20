<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{
  question: Question
}>()
</script>

<template>
  <div>
    <textarea
      rows="4"
      :maxlength="question.maxLength"
      placeholder="Your answer"
      class="w-full border rounded-lg p-3"
    />

    <p
      v-if="question.maxLength"
      class="text-xs text-gray-500 mt-1"
    >
      Maximum {{ question.maxLength }} characters
    </p>
  </div>
</template>