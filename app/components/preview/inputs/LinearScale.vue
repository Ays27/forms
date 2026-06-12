<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{
  question: Question
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <label
      v-for="n in 5"
      :key="n"
      class="flex flex-col items-center gap-1"
    >
      <input type="radio" name="scale" />
      <span class="text-sm">{{ n }}</span>
    </label>
  </div>
</template>