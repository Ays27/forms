<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '~/stores/form'
import { useMedia } from '~/composables/useMedia'
import { storeToRefs } from 'pinia'
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


//image remove and change
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
//for option image change
function editOptionImage(
  questionId: number,
  optionIndex: number
): void {
  imageQuestionId.value = questionId
  imageOptionIndex.value = optionIndex

  imageInput.value?.click()
}
//video
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

  <p class="text-sm text-gray-500 mb-4">
    Questions in this section:
    {{
      questions.filter(
        q => q.sectionId === section.id
      ).length
    }}
  </p>

<div class="space-y-4 mt-4">
  <div
    v-for="question in questions.filter(
      q => q.sectionId === section.id
    )"
    :key="question.id"
    class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600"
    @click="selectedQuestionId = question.id"
  >
  <div class="flex items-start gap-3">

  <!-- IMAGE THUMBNAIL -->
  <img
    v-if="question.imageUrl"
    :src="question.imageUrl"
    class="w-12 h-12 object-cover rounded border"
  />

  <!-- IF NO IMAGE -->
  <div
    v-else
    class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-xs text-gray-400"
  >
    📷
  </div>

  <!-- TEXT -->
  <div>
    <h3 class="font-medium text-lg">
      {{ question.title }}
    </h3>

    <p class="text-sm text-gray-500">
      {{ question.type }}
    </p>
  </div>

</div>
  </div>
</div>
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

    <!-- Option image preview -->
  <div
  v-if="option.imageUrl"
  class="flex items-center gap-2"
>
  <img
    :src="option.imageUrl"
    class="w-12 h-12 object-cover rounded border"
  >

  <button
    class="text-xs text-blue-500"
    @click="
      editOptionImage(
        question.id,
        index
      )
    "
  >
    Change
  </button>

  <button
    class="text-xs text-red-500"
    @click="
      removeOptionImage(
        question.id,
        index
      )
    "
  >
    Remove
  </button>
</div>

    <!-- Image button -->
    <button
      class="text-gray-500 hover:text-orange-600"
      @click="
        imageQuestionId = question.id;
        imageOptionIndex = index;
        imageInput?.click();
      "
    >
      <PhotoIcon class="w-5 h-5" />
    </button>

    <!-- Option text -->
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

    <!-- Option image preview -->
  <div
  v-if="option.imageUrl"
  class="flex items-center gap-2"
>
  <img
    :src="option.imageUrl"
    class="w-12 h-12 object-cover rounded border"
  >

  <button
    class="text-xs text-blue-500"
    @click="
      editOptionImage(
        question.id,
        index
      )
    "
  >
    Change
  </button>

  <button
    class="text-xs text-red-500"
    @click="
      removeOptionImage(
        question.id,
        index
      )
    "
  >
    Remove
  </button>
</div>
    <!-- Add image button -->
    <button
      class="text-gray-500 hover:text-orange-600"
      @click="
        imageQuestionId = question.id;
        imageOptionIndex = index;
        imageInput?.click();
      "
    >
      <PhotoIcon class="w-5 h-5" />
    </button>

    <!-- Option text -->
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
              {{ option.text }}
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
        <!-- Character Limit -->
<div
  v-if="
    question.type === 'Short Answer' ||
    question.type === 'Paragraph'
  "
  class="mt-3"
>
  <label class="block text-sm text-gray-600 mb-1">
    Character Limit
  </label>

  <input
    v-model.number="question.maxLength"
    type="number"
    min="1"
    placeholder="No limit"
    class="border border-gray-300 rounded px-2 py-1 w-40"
  >
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
        <!-- Image Question -->
<div
  v-else-if="question.type === 'Image'"
  class="space-y-4"
>
  <button
    class="flex items-center gap-2 text-orange-600"
    @click="
      imageQuestionId = question.id;
      imageOptionIndex = null;
      imageInput?.click();
    "
  >
    <PhotoIcon class="w-5 h-5" />
    Add Image
  </button>

  <img
    v-if="question.imageUrl"
    :src="question.imageUrl"
    class="max-h-96 rounded-lg border"
  />
</div>
<!--image-->
<div
  v-if="question.imageUrl"
  class="mb-4 space-y-2"
>
  <img
    :src="question.imageUrl"
    class="max-h-64 rounded-lg border"
  >

  <div class="flex gap-3">
    <button
      class="text-blue-500 text-sm"
      @click="editImage(question.id)"
    >
      Change Image
    </button>

    <button
      class="text-red-500 text-sm"
      @click="removeImage(question.id)"
    >
      Remove Image
    </button>
  </div>
</div>
<!--video-->
<div
  v-if="question.videoUrl"
  class="mb-4 space-y-2"
>
  <iframe
    :src="getEmbedUrl(question.videoUrl)"
    class="w-full max-w-md h-56 rounded-lg border"
    allowfullscreen
  />

  <div class="flex gap-3">
    <button
      class="text-blue-500 text-sm"
      @click="editVideo(question.id)"
    >
      Change Video
    </button>

    <button
      class="text-red-500 text-sm"
      @click="removeVideo(question.id)"
    >
      Remove Video
    </button>
  </div>
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
        <select
  v-model="question.goToSectionId"
  class="border rounded-lg px-3 py-2 text-sm"
>
  <option :value="undefined">
    Continue Normally
  </option>

  <option
    v-for="section in sections"
    :key="section.id"
    :value="section.id"
  >
    Go to {{ section.title }}
  </option>
</select>
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
              @click="
  console.log('duplicate clicked');
  duplicateQuestion(question)
"
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
        class="w-12 h-12 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        @click="addQuestion"
      >
       <PlusIcon class="w-6 h-6" />
      </button>

      <!--button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        📥
      </button-->

      <!--button class="w-12 h-12 rounded-lg hover:bg-gray-100">
        📝
      </button-->

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

    <button
  class="w-12 h-12 rounded-lg hover:bg-gray-100"
  @click="addSection"
>
  📂
</button>
    </div>

<div v-if="showVideoInput" class="fixed bottom-10 right-10 bg-white p-4 shadow-lg rounded-lg">
  <input
    placeholder="Video URL"
    class="border p-2 w-64"
    @keyup.enter="addVideoToQuestion(($event.target as HTMLInputElement).value)"
  />

  <button
    class="ml-2 text-red-500"
    @click="showVideoInput = false"
  >
    ✕
  </button>
</div>
<input
  ref="imageInput"
  type="file"
  accept="image/*"
  class="hidden"
  @change="uploadImage"
/>
  </div>
</template>