<script setup lang="ts">
import type { Question } from '~/types/form'

defineProps<{ question: Question }>()
</script>

<template>
  <input
    type="text"
    class="w-full border-b border-gray-300 py-2 outline-none"
    placeholder="Your answer"
  />
</template>