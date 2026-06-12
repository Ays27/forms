<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{
  question: Question
}>()
</script>

<template>
  <textarea
    disabled
    rows="4"
    placeholder="Your answer"
    class="w-full border rounded-lg p-3"
  />
</template>