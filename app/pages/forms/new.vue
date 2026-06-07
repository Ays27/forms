<script setup lang="ts">
import { ref } from 'vue'
import Questions from '~/components/Questions.vue'

const formTitle = ref('Untitled Form')
const formDescription = ref('Form description')

const activeTab = ref('Questions')
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- Navbar -->
    <nav class="border-b bg-white px-6 py-3">
      <div class="flex items-center justify-between">

        <!-- Left -->
        <div class="flex items-center gap-4">
          <span class="font-medium text-gray-700">
            {{ formTitle }}
          </span>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-2">

          <UButton
            icon="i-lucide-eye"
            color="neutral"
            variant="ghost"
          />

          <UButton
            icon="i-lucide-undo-2"
            color="neutral"
            variant="ghost"
          />

          <UButton
            icon="i-lucide-redo-2"
            color="neutral"
            variant="ghost"
          />

          <UButton
            icon="i-lucide-link"
            color="neutral"
            variant="ghost"
          />

          <UButton
            icon="i-lucide-users"
            color="neutral"
            variant="ghost"
          />

          <UButton
            label="Publish"
            class="bg-[#C2410C] text-white hover:bg-[#9A3412]"
          />

        </div>
      </div>

      <!-- Tabs -->
      <div>
        <div class="flex justify-center gap-10">

          <button
            @click="activeTab = 'Questions'"
            class="py-4 text-sm font-medium border-b-2"
            :class="
              activeTab === 'Questions'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent'
            "
          >
            Questions
          </button>

          <button
            @click="activeTab = 'Responses'"
            class="py-4 text-sm font-medium border-b-2 transition"
            :class="
              activeTab === 'Responses'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            Responses
          </button>

          <button
            @click="activeTab = 'Settings'"
            class="py-4 text-sm font-medium border-b-2 transition"
            :class="
              activeTab === 'Settings'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            Settings
          </button>

        </div>
      </div>

    </nav>

    <!-- Page Content -->
    <Questions
      v-if="activeTab === 'Questions'"
      v-model:form-title="formTitle"
      v-model:form-description="formDescription"
    />

  </div>
</template>