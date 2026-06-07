<script setup lang="ts">
import { ref } from 'vue'

type QuestionType =
  | 'Short Answer'
  | 'Paragraph'
  | 'Multiple Choice'
  | 'Checkboxes'
  | 'Dropdown'
  | 'Linear Scale'
  | 'Date'
  | 'Time'

interface Question {
  id: number
  title: string
  type: QuestionType
  required: boolean
  options: string[]
  sectionId: number
}
interface Section {
  id: number
  title: string
}
const formTitle = defineModel<string>('formTitle', {
  default: 'Untitled Form'
})

const formDescription = defineModel<string>('formDescription', {
  default: 'Form description'
})

const selectedQuestionId = ref<number | null>(1)
const sections = ref<Section[]>([
  {
    id: 1,
    title: 'Section 1'
  }
])
const questions = ref<Question[]>([
  {
 
  id: 1,
  title: 'Untitled Question',
  type: 'Multiple Choice',
  required: false,
  options: ['Option 1'],
  sectionId: 1
}
  
])

function addQuestion(): void {
const newQuestion: Question = {
  id: Date.now(),
  title: 'Untitled Question',
  type: 'Multiple Choice',
  required: false,
  options: ['Option 1'],
  sectionId: sections.value[sections.value.length - 1].id
}

  questions.value.push(newQuestion)
  selectedQuestionId.value = newQuestion.id
}
function addSection(): void {
  sections.value.push({
    id: Date.now(),
    title: `Section ${sections.value.length + 1}`
  })
}

function deleteQuestion(id: number): void {
  questions.value = questions.value.filter(
    question => question.id !== id
  )
}

function duplicateQuestion(question: Question): void {
  questions.value.push({
    ...structuredClone(question),
    id: Date.now()
  })
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
<div
  v-for="section in sections"
  :key="section.id"
  class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500"
>
  <input
    v-model="section.title"
    class="text-2xl font-semibold outline-none mb-2"
  >

  <p class="text-sm text-gray-500">
    Questions in this section:
    {{
      questions.filter(
        q => q.sectionId === section.id
      ).length
    }}
  </p>
</div>
      <!-- Questions -->
      <div
        v-for="question in questions"
        :key="question.id"
        class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"
        @click="selectedQuestionId = question.id"
      >
      <!-- Question Header -->
<div class="flex gap-4 mb-6">

  <input
    v-model="question.title"
    class="flex-1 border-b border-gray-300 outline-none text-xl pb-2"
  />

  <div class="flex flex-col gap-2">

    <select
      v-model="question.type"
      class="border rounded-lg px-3 py-2"
    >
      <option>Short Answer</option>
      <option>Paragraph</option>
      <option>Multiple Choice</option>
      <option>Checkboxes</option>
      <option>Dropdown</option>
      <option>Linear Scale</option>
      <option>Date</option>
      <option>Time</option>
    </select>

    <select
      v-model="question.sectionId"
      class="border rounded-lg px-3 py-2 text-sm"
    >
      <option
        v-for="section in sections"
        :key="section.id"
        :value="section.id"
      >
        {{ section.title }}
      </option>
    </select>

  </div>

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

            <button
              class="text-red-500"
              @click="question.options.splice(index, 1)"
            >
              ✕
            </button>

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

            <button
              class="text-red-500"
              @click="question.options.splice(index, 1)"
            >
              ✕
            </button>

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
            rows="4"
            placeholder="Long answer text"
            class="w-full border border-gray-300 rounded-lg p-3 outline-none"
          />
        </div>

        <!-- Linear Scale -->
        <div
          v-else-if="question.type === 'Linear Scale'"
          class="flex gap-6 mt-4"
        >
          <label
            v-for="n in 5"
            :key="n"
          >
            <input type="radio" disabled>
            {{ n }}
          </label>
        </div>

        <!-- Date -->
        <div
          v-else-if="question.type === 'Date'"
        >
          <input
            type="date"
            disabled
            class="border rounded-lg px-3 py-2"
          >
        </div>

        <!-- Time -->
        <div
          v-else-if="question.type === 'Time'"
        >
          <input
            type="time"
            disabled
            class="border rounded-lg px-3 py-2"
          >
        </div>

        <!-- Formatting Toolbar -->
        <div
          v-if="selectedQuestionId === question.id"
          class="mt-6 pt-4 border-t flex gap-2"
        >
          <button
            class="w-10 h-10 rounded hover:bg-gray-100 font-bold"
          >
            B
          </button>

          <button
            class="w-10 h-10 rounded hover:bg-gray-100 italic"
          >
            I
          </button>

          <button
            class="w-10 h-10 rounded hover:bg-gray-100 underline"
          >
            U
          </button>

          <button
            class="w-10 h-10 rounded hover:bg-gray-100"
          >
            🔗
          </button>

          <button
            class="w-10 h-10 rounded hover:bg-gray-100"
          >
            Tx
          </button>
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

          <div class="flex gap-4">

            <button
              class="text-blue-500 text-sm"
              @click="duplicateQuestion(question)"
            >
              Duplicate
            </button>

            <button
              class="text-red-500 text-sm"
              @click="deleteQuestion(question.id)"
            >
              Delete
            </button>

          </div>
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

    <button
  class="w-12 h-12 rounded-lg hover:bg-gray-100"
  @click="addSection"
>
  📂
</button>
    </div>

  </div>
</template>