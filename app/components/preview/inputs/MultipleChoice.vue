<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{
  question: Question
}>()
</script>

<template>
  <div class="space-y-2">
    <label
      v-for="(opt, i) in question.options"
      :key="i"
      class="flex items-center gap-2"
    >
      <input type="radio" name="mcq" />
      <span>{{ opt.text }}</span>
    </label>
  </div>
</template>