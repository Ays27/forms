<script setup lang="ts">
import { useFormStore } from '~/stores/form'
import { useMedia } from '~/composables/useMedia'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'

import {
  PlusIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'

import type {
  Question,
  Section,
  Option,
  QuestionType
} from  '~/types/form'
const formStore = useFormStore()

const { sections, questions, formTitle, formDescription, selectedQuestionId } = storeToRefs(formStore)
const {
  addQuestion,
  addSection,
  deleteQuestion,
  duplicateQuestion,
  addOption
} = formStore
const {
  imageInput,
  imageQuestionId,
  imageOptionIndex,
  showVideoInput,
    openImagePicker
} = useMedia()
const format = (command: string) => {
  document.execCommand(command)
}
const showLinkInput = ref(false)
const linkUrl = ref('')
let savedRange: Range | null = null
const saveSelection = () => {
  const selection = window.getSelection()

  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)

  // only save if inside editor
  const container = range.commonAncestorContainer as HTMLElement

  if (!container) return

  savedRange = range.cloneRange()
}
const insertLink = () => {
  if (!linkUrl.value || !savedRange) return

  const selection = window.getSelection()
  if (!selection) return

  selection.removeAllRanges()
  selection.addRange(savedRange)

  const url = linkUrl.value

  // get selected text
  const selectedText = selection.toString() || url

  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.className = 'text-blue-600 underline'
  link.textContent = selectedText

  const range = selection.getRangeAt(0)
  range.deleteContents()
  range.insertNode(link)

  // reset
  linkUrl.value = ''
  showLinkInput.value = false

  nextTick(() => {
    savedRange = null
  })
}
function openOptionImagePicker(
  questionId: number,
  optionIndex: number
): void {
  imageQuestionId.value = questionId
  imageOptionIndex.value = optionIndex

  imageInput.value?.click()
}
function uploadImage(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const targetId = imageQuestionId.value
  if (!targetId) return

  const reader = new FileReader()

reader.onload = () => {
  const question = questions.value.find(
    q => q.id === targetId
  )

  if (!question) return

  if (imageOptionIndex.value !== null) {
    const option =
      question.options[imageOptionIndex.value]

    if (!option) return

    option.imageUrl = reader.result as string

    imageOptionIndex.value = null
    return
  }

  question.imageUrl = reader.result as string
}

  reader.readAsDataURL(file)
}

function removeImage(questionId: number): void {
  const question = questions.value.find(
    q => q.id === questionId
  )

  if (!question) return

  question.imageUrl = undefined
}

function editImage(questionId: number): void {
  imageQuestionId.value = questionId
  imageOptionIndex.value = null

  imageInput.value?.click()
}
function removeOptionImage(
  questionId: number,
  optionIndex: number
): void {
  const question = questions.value.find(
    q => q.id === questionId
  )

  if (!question) return

  const option = question.options[optionIndex]

  if (!option) return

  option.imageUrl = undefined
}
function editOptionImage(
  questionId: number,
  optionIndex: number
): void {
  imageQuestionId.value = questionId
  imageOptionIndex.value = optionIndex

  imageInput.value?.click()
}
function addVideoToQuestion(url: string): void {
  const q = questions.value.find(
    q => q.id === selectedQuestionId.value
  )

  if (q) {
    q.videoUrl = url
  }

  showVideoInput.value = false
}
function getEmbedUrl(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
  )

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : ''
}
function removeVideo(questionId: number): void {
  const question = questions.value.find(
    q => q.id === questionId
  )

  if (!question) return

  question.videoUrl = undefined
}
function editVideo(questionId: number): void {
  selectedQuestionId.value = questionId
  showVideoInput.value = true
}
function updateQuestionTitle(
  event: Event,
  question: Question
) {
  question.title =
    (event.target as HTMLElement).innerHTML
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">

    <!-- MAIN AREA -->
    <div class="flex-1 space-y-6">

      <!-- Header -->
      <div class="bg-white rounded-xl shadow-sm border-t-8 border-orange-600 p-6">
        <input
          v-model="formTitle"
          class="w-full text-3xl outline-none mb-4"
        />

        <input
          v-model="formDescription"
          class="w-full text-gray-600 outline-none"
        />
      </div>

      <!-- SECTIONS -->
      <div
        v-for="section in sections"
        :key="section.id"
        class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500"
      >
        <input
          v-model="section.title"
          class="text-2xl font-semibold outline-none mb-2 w-full"
        >

        <p class="text-sm text-gray-500 mb-4">
          Questions in this section:
          {{
            questions.filter(q => q.sectionId === section.id).length
          }}
        </p>

        <!-- SECTION QUESTIONS -->
        <div class="space-y-4 mt-4">

          <div
            v-for="question in questions.filter(q => q.sectionId === section.id)"
            :key="question.id"
            class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"
            @click="selectedQuestionId = question.id"
          >
            <div class="flex items-start gap-3">

              <img
                v-if="question.imageUrl"
                :src="question.imageUrl"
                class="w-12 h-12 object-cover rounded border"
              />

              <div
                v-else
                class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-xs text-gray-400"
              >
                📷
              </div>

              <div>
                <h3 class="font-medium text-lg" v-html="question.title"></h3>
                <p class="text-sm text-gray-500">
                  {{ question.type }}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- ALL QUESTIONS (IMPORTANT FIX: safe + scoped) -->
      <div
        v-for="question in (questions || [])"
        :key="question.id"
        class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"
        @click="selectedQuestionId = question.id"
      >

        <!-- HEADER -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">

          <div
            contenteditable="true"
            class="flex-1 border-b border-gray-300 outline-none text-xl pb-2 min-h-[40px]"
            v-html="question.title"
            @input="updateQuestionTitle($event, question)"
          />

          <button
            class="text-gray-500 hover:text-orange-600"
            @click="
              imageQuestionId = question.id;
              imageOptionIndex = null;
              imageInput?.click();
            "
          >
            <PhotoIcon class="w-5 h-5" />
          </button>

          <div class="flex flex-col gap-2 w-full md:w-auto">

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
              <option>Image</option>
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

        <!-- MULTIPLE CHOICE -->
        <div v-if="question.type === 'Multiple Choice'" class="space-y-3">
          <div
            v-for="(option, index) in question.options"
            :key="index"
            class="flex items-center gap-3"
          >
            <input type="radio" disabled>

            <input
              v-model="option.text"
              class="flex-1 border-b border-gray-200 outline-none"
            >
            <select
  v-model="option.goToSectionId"
  class="border rounded px-2 py-1 text-xs ml-2"
>
  <option :value="undefined">
    Continue
  </option>

  <option
    v-for="section in sections"
    :key="section.id"
    :value="section.id"
  >
    Go to {{ section.title }}
  </option>
</select>

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

        <!-- CHECKBOXES -->
        <div v-else-if="question.type === 'Checkboxes'" class="space-y-3">
          <div
            v-for="(option, index) in question.options"
            :key="index"
            class="flex items-center gap-3"
          >
            <input type="checkbox" disabled>

            <input
              v-model="option.text"
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

        <!-- OTHER TYPES (UNCHANGED LOGIC) -->
        <div v-else-if="question.type === 'Short Answer'">
          <input
            disabled
            class="w-full border-b border-gray-300 py-2 outline-none"
            placeholder="Short answer text"
          >
        </div>

        <div v-else-if="question.type === 'Paragraph'">
          <textarea
            disabled
            rows="4"
            class="w-full border border-gray-300 rounded-lg p-3 outline-none"
            placeholder="Long answer text"
          />
        </div>

        <div
          v-if="question.type === 'Short Answer' || question.type === 'Paragraph'"
          class="mt-3"
        >
          <label class="block text-sm text-gray-600 mb-1">
            Character Limit
          </label>

          <input
            v-model.number="question.maxLength"
            type="number"
            class="border border-gray-300 rounded px-2 py-1 w-40"
          >
        </div>

        <!-- TOOLBAR (RESTORED EXACTLY) -->
        <div
          v-if="selectedQuestionId === question.id"
          class="mt-6 pt-4 border-t flex flex-wrap gap-2"
        >
          <button class="w-10 h-10 rounded hover:bg-gray-100 font-bold" @click="format('bold')">
            B
          </button>

          <button class="w-10 h-10 rounded hover:bg-gray-100 italic" @click="format('italic')">
            I
          </button>

          <button class="w-10 h-10 rounded hover:bg-gray-100 underline" @click="format('underline')">
            U
          </button>

        <button
  type="button"
  class="w-10 h-10 rounded hover:bg-gray-100"
  @mousedown.prevent
  @click="
    saveSelection();
    showLinkInput = !showLinkInput
  "
>
  🔗
</button>

          <button
            class="w-10 h-10 rounded hover:bg-gray-100"
            @click="format('removeFormat')"
          >
            Tx
          </button>
        </div>

        <!-- LINK INPUT -->
        <div v-if="showLinkInput" class="flex gap-2 mt-2">
          <input
            v-model="linkUrl"
            placeholder="https://example.com"
            class="border rounded px-3 py-2 flex-1"
            @keyup.enter="insertLink"
          >

          <button
            class="px-3 py-2 bg-orange-600 text-white rounded"
            @click="insertLink"
          >
            Add
          </button>
        </div>

        <!-- FOOTER -->
        <div class="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between gap-4">

          <select
            v-model="question.goToSectionId"
            class="border rounded-lg px-3 py-2 text-sm"
          >
            <option :value="undefined">Continue Normally</option>

            <option
              v-for="section in sections"
              :key="section.id"
              :value="section.id"
            >
              Go to {{ section.title }}
            </option>
          </select>

          <label class="flex items-center gap-2">
            <input v-model="question.required" type="checkbox">
            <span class="text-sm">Required</span>
          </label>

          <div class="flex gap-4">
            <button class="text-blue-500 text-sm" @click="duplicateQuestion(question)">
              Duplicate
            </button>

            <button class="text-red-500 text-sm" @click="deleteQuestion(question.id)">
              Delete
            </button>
          </div>

        </div>

      </div>
    </div>

    <!-- SIDEBAR (RESPONSIVE FIXED, SAME STYLE) -->
    <div class="sticky top-24 h-fit bg-white rounded-xl shadow-sm p-2 flex flex-row md:flex-col gap-2">

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center" @click="addQuestion">
        <PlusIcon class="w-6 h-6" />
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        @click="openImagePicker(selectedQuestionId)"
      >
        <PhotoIcon class="w-6 h-6" />
      </button>

      <button
        class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        @click="showVideoInput = true"
      >
        <VideoCameraIcon class="w-6 h-6" />
      </button>

      <button class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center" @click="addSection">
        📂
      </button>

    </div>

    <!-- VIDEO INPUT -->
    <div v-if="showVideoInput" class="fixed bottom-10 right-10 bg-white p-4 shadow-lg rounded-lg">
      <input
        placeholder="Video URL"
        class="border p-2 w-64"
        @keyup.enter="addVideoToQuestion(($event.target as HTMLInputElement).value)"
      />

      <button class="ml-2 text-red-500" @click="showVideoInput = false">✕</button>
    </div>

    <!-- IMAGE INPUT -->
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="uploadImage"
    />

  </div>
</template>