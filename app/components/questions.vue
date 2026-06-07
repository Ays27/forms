<script setup lang="ts">
import { ref } from 'vue'

type QuestionType =
  | 'Multiple Choice'
  | 'Checkboxes'
  | 'Dropdown'
  | 'Short Answer'
  | 'Paragraph'

interface Question {
  id: number
  title: string
  type: QuestionType
  required: boolean
  options: string[]
}

const formTitle = defineModel<string>('formTitle', {
  default: 'Untitled Form'
})

const formDescription = defineModel<string>('formDescription', {
  default: 'Form description'
})

const questions = ref<Question[]>([
  {
    id: 1,
    title: 'Untitled Question',
    type: 'Multiple Choice',
    required: false,
    options: ['Option 1']
  }
])

function addQuestion(): void {
  questions.value.push({
    id: Date.now(),
    title: 'Untitled Question',
    type: 'Multiple Choice',
    required: false,
    options: ['Option 1']
  })
}

function deleteQuestion(id: number): void {
  questions.value = questions.value.filter(
    question => question.id !== id
  )
}

function addOption(question: Question): void {
  question.options.push(
    `Option ${question.options.length + 1}`
  )
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 flex gap-6">

    <!-- Main Area -->
    <div class="flex-1 space-y-6">

      <!-- Form Header -->
      <div
        class="bg-white rounded-xl shadow-sm border-t-8 border-orange-600 p-6"
      >
        <input
          v-model="formTitle"
          class="w-full text-3xl outline-none mb-4"
        />

        <input
          v-model="formDescription"
          class="w-full text-gray-600 outline-none"
        />
      </div>

      <!-- Questions -->
      <div
        v-for="question in questions"
        :key="question.id"
        class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"
      >
        <!-- Top -->
        <div class="flex gap-4 mb-6">

          <input
            v-model="question.title"
            class="flex-1 border-b border-gray-300 outline-none text-xl pb-2"
          />

          <select
            v-model="question.type"
            class="border rounded-lg px-3 py-2"
          >
            <option>Multiple Choice</option>
            <option>Checkboxes</option>
            <option>Dropdown</option>
            <option>Short Answer</option>
            <option>Paragraph</option>
          </select>

        </div>

        <!-- Multiple Choice -->
        <div
          v-if="question.type === 'Multiple Choice'"
          class="space-y-3"
        >
          <div
            v-for="(option, index) in question.options"
            :key="index"
            class="flex items-center gap-3"
          >
            <input type="radio" disabled>

            <input
              v-model="question.options[index]"
              class="flex-1 border-b border-gray-200 outline-none"
            >
          </div>

          <button
            class="text-orange-600 text-sm"
            @click="addOption(question)"
          >
            + Add Option
          </button>
        </div>

        <!-- Checkboxes -->
        <div
          v-else-if="question.type === 'Checkboxes'"
          class="space-y-3"
        >
          <div
            v-for="(option, index) in question.options"
            :key="index"
            class="flex items-center gap-3"
          >
            <input type="checkbox" disabled>

            <input
              v-model="question.options[index]"
              class="flex-1 border-b border-gray-200 outline-none"
            >
          </div>

          <button
            class="text-orange-600 text-sm"
            @click="addOption(question)"
          >
            + Add Option
          </button>
        </div>

        <!-- Dropdown -->
        <div
          v-else-if="question.type === 'Dropdown'"
        >
          <select
            class="border rounded-lg px-3 py-2 w-full"
          >
            <option
              v-for="(option, index) in question.options"
              :key="index"
            >
              {{ option }}
            </option>
          </select>

          <button
            class="text-orange-600 text-sm mt-3"
            @click="addOption(question)"
          >
            + Add Option
          </button>
        </div>

        <!-- Short Answer -->
        <div
          v-else-if="question.type === 'Short Answer'"
        >
          <input
            disabled
            placeholder="Short answer text"
            class="w-full border-b border-gray-300 py-2 outline-none"
          >
        </div>

        <!-- Paragraph -->
        <div
          v-else-if="question.type === 'Paragraph'"
        >
          <textarea
            disabled
            placeholder="Long answer text"
            rows="4"
            class="w-full border border-gray-300 rounded-lg p-3 outline-none"
          />
        </div>

        <!-- Footer -->
        <div
          class="mt-6 pt-4 border-t flex justify-between items-center"
        >
          <label class="flex items-center gap-2">
            <input
              v-model="question.required"
              type="checkbox"
            >

            <span class="text-sm">
              Required
            </span>
          </label>

          <button
            class="text-red-500 text-sm"
            @click="deleteQuestion(question.id)"
          >
            Delete Question
          </button>
        </div>

      </div>

    </div>

    <!-- Sidebar -->
    <div
      class="sticky top-24 h-fit bg-white rounded-xl shadow-sm p-2 flex flex-col gap-2"
    >
      <button
        class="w-12 h-12 rounded-lg hover:bg-gray-100"
        @click="addQuestion"
      >
        ➕
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        📥
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        📝
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        🖼️
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        🎥
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        📂
      </button>
    </div>

  </div>
</template>