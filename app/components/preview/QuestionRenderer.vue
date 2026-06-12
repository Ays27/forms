<script setup lang="ts">
import { computed } from 'vue'
import type { Question } from '~/types/form'
import { questionRegistry } from './questionRegistry'

const props = defineProps<{
  question: Question
}>()

const component = computed(() => {
  return questionRegistry[
    props.question.type as keyof typeof questionRegistry
  ]
})
</script>

<template>
  <component
    v-if="component"
    :is="component"
    :question="question"
  />

  <div v-else class="text-red-500">
    Unknown type: {{ question.type }}
  </div>
</template>