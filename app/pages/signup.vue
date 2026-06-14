<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- Navbar -->
    <nav class="border-b bg-white px-6 py-3">
      <h1
        class="bg-gradient-to-r from-[#F97316] to-[#C2410C] bg-clip-text text-3xl font-bold text-transparent"
      >
        Forms
      </h1>
    </nav>

    <!-- PAGE WRAPPER -->
    <main class="flex min-h-[calc(100vh-64px)] justify-center px-4 pt-16 sm:pt-24 lg:pt-32">

      <!-- CARD -->
      <div class="w-full max-w-xl rounded-3xl bg-white p-10 shadow-md">

        <!-- INNER CENTER WRAPPER -->
        <div class="mx-auto flex max-w-sm flex-col items-center">

          <!-- TITLE -->
          <h1 class="mb-8 text-center text-2xl font-semibold text-gray-800">
            Welcome, register to Forms
          </h1>

          <!-- INPUTS WRAPPER -->
          <div class="w-full space-y-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F97316]"
            />

            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F97316]"
            />

            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          <!-- BUTTON -->
          <button
            @click="handleSignup"
            class="mt-6 w-64 rounded-xl bg-[#C2410C] py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#C2410C] hover:ring-1 hover:ring-[#C2410C]"
          >
            Sign up
          </button>

          <!-- LOGIN TEXT -->
          <p class="mt-6 text-center text-sm text-gray-600">
            Already a member?
            <span class="cursor-pointer font-medium text-[#C2410C] hover:underline">
              Login
            </span>
          </p>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authClient } from '~/lib/auth-client'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const res = await authClient.signUp.email({
      email: email.value,
      password: password.value
    })
    console.log('Signup success:', res)
  } catch (err) {
    console.error('Signup failed:', err)
  }
}
</script>
