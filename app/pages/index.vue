<script setup lang="ts">
import { ref, onMounted } from 'vue'

const forms = ref([])

onMounted(async () => {
  try {
    const res = await $fetch('/api/forms/my')
    forms.value = res
  } catch (err) {
    console.error(err)
  }
})
</script>
<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- Navbar -->
    <nav class="border-b bg-white px-6 py-3">
      <div class="flex items-center justify-between">

        <!-- Logo -->
        <h1
          class="bg-gradient-to-r from-[#F97316] to-[#C2410C] bg-clip-text text-3xl font-bold text-transparent"
        >
          Forms
        </h1>

        <!-- Search -->
        <div class="relative mx-8 w-full max-w-xl">

          <svg
            class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 106.05 6.05a7.5 7.5 0 0010.6 10.6z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search"
            class="w-full rounded-xl bg-[#F3F4F6] py-2 pl-10 pr-4 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F97316]"
          />
         
        </div>
      <LogoutButton />
      </div>
    </nav>

    <!-- Body -->
   <main class="mx-auto max-w-6xl px-6 py-8 space-y-8">
<div>
  <h2 class="mb-6 text-xl font-semibold text-gray-800">
    Start a new form
  </h2>
</div>
  <!-- GRID -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

    <!-- CREATE NEW FORM -->
    <NuxtLink
      to="/forms/new"
      class="block w-40 cursor-pointer"
    >
      <div
        class="flex h-40 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm transition hover:shadow-md"
      >
        <span class="text-8xl font-light text-[#C2410C] -mt-6">
          +
        </span>
      </div>
    </NuxtLink>

    <!-- USER FORMS -->
    <NuxtLink
      v-for="form in forms"
      :key="form.id"
      :to="`/forms/${form.id}`"
      class="block w-40"
    >
      <div class="h-40 rounded-xl border bg-white p-3 shadow-sm hover:shadow-md">
        <h3 class="font-semibold text-gray-800">
          {{ form.title }}
        </h3>

        <p class="text-xs text-gray-500 mt-2">
          {{ form.description }}
        </p>
      </div>
    </NuxtLink>

  </div>

</main>

  </div>
</template>