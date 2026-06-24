<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'

import Questions from '~/components/Questions.vue'
import Preview from '~/components/Preview.vue'
import { useFormStore } from '~/stores/form'

const isPreviewMode = ref(false)
const statusMessage = ref('')
const formStore = useFormStore()
const route = useRoute()

const { published } = storeToRefs(formStore)
const { setPublished } = formStore
onMounted(async () => {
  const id = route.params.id

  if (!id) return

  try {
    const data = await $fetch(`/api/forms/${id}`)

    formStore.formId = Number(id)
    formStore.formTitle = data.form.title
    formStore.formDescription = data.form.description

    formStore.sections = data.sections || []
    formStore.questions = data.questions || []
  } catch (err) {
    console.error('Failed to load form:', err)
  }
})

const handlePublish = async () => {
  try {
    if (!published.value) {
      const form = await $fetch('/api/forms/publish', {
        method: 'POST',
        body: {
          title: formStore.formTitle,
          description: formStore.formDescription,
          sections: formStore.sections,
          questions: formStore.questions
        }
      })

      formStore.formId = form.id
      formStore.shareId = form.shareId

      setPublished(true)

    } else {
      await $fetch(`/api/forms/${formStore.formId}/unpublish`, {
        method: 'POST'
      })

      formStore.shareId = null
      setPublished(false)
    }

  } catch (err) {
    console.error(err)
  }
}

const openResponses = () => {
  const id = formStore.formId

  if (!id) {
    statusMessage.value = 'Publish the form first'

    setTimeout(() => {
      statusMessage.value = ''
    }, 3000)

    return
  }

  navigateTo(`/forms/responses/${id}`)
}
/* =========================
   COPY SHARE LINK
========================= */
const copyLink = async () => {
  if (!formStore.shareId) {
    statusMessage.value = 'Publish the form first'

    setTimeout(() => {
      statusMessage.value = ''
    }, 3000)

    return
  }

  const url = `${window.location.origin}/f/${formStore.shareId}`

  await navigator.clipboard.writeText(url)

  statusMessage.value = 'Link copied successfully'

  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- NAVBAR -->
    <nav class="border-b bg-white px-6 py-3">
      <div class="flex items-center justify-between">
<div
  v-if="statusMessage"
  class="text-sm text-green-600 font-medium"
>
  {{ statusMessage }}
</div>
        <!-- LEFT -->
        <div class="flex items-center gap-4">
          <span class="font-medium text-gray-700">
            {{ formStore.formTitle }}
          </span>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-2">

          <UButton
            icon="i-lucide-eye"
            color="neutral"
            variant="ghost"
            @click="isPreviewMode = !isPreviewMode"
          />

          <UButton icon="i-lucide-undo-2" color="neutral" variant="ghost" @click="formStore.undo()"/>

          <UButton icon="i-lucide-redo-2" color="neutral" variant="ghost" @click="formStore.redo()"/>

          <UButton
            icon="i-lucide-link"
            color="neutral"
            variant="ghost"
            @click="copyLink"
          />

<UButton
  :label="formStore.published ? 'Published' : 'Publish'"
  class="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"

  @click="handlePublish"
/>

          <LogoutButton />
        </div>
      </div>

      <!-- TABS -->
      <div class="flex justify-center gap-10">

        <!-- QUESTIONS -->
        <button
          class="py-4 text-sm font-medium border-b-2 transition"
        >
          Questions
        </button>

        <!-- RESPONSES -->
      <button
  @click="openResponses"
>
  Responses
</button>

      </div>
    </nav>

    <!-- CONTENT -->

    <!-- EDIT MODE -->
    <Questions
      v-if="!isPreviewMode"
      v-model:form-title="formStore.formTitle"
      v-model:form-description="formStore.formDescription"
    />

    <!-- PREVIEW MODE -->
   <!-- PREVIEW MODE -->
<Preview
  v-else
  :form-title="formStore.formTitle"
  :form-description="formStore.formDescription"
  @exit-preview="isPreviewMode = false"
/>

  </div>
</template>