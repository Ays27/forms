<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- Navbar -->
    <nav class="border-b bg-white px-4 sm:px-6 py-3">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#C2410C]">
        Forms
      </h1>
    </nav>

    <!-- PAGE WRAPPER -->
    <main class="flex min-h-[calc(100vh-64px)] justify-center px-4 pt-12 sm:pt-20 md:pt-24">

      <!-- CARD -->
      <div class="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-md">

        <div class="mx-auto flex w-full max-w-sm flex-col items-center">

          <h1 class="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-semibold text-gray-800">
            Welcome back
          </h1>

          <!-- INPUTS -->
          <div class="w-full space-y-3 sm:space-y-4">

            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base"
            />
            <p v-if="emailError" class="text-sm text-red-500">
              {{ emailError }}
            </p>

            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base"
            />
            <p v-if="passwordError" class="text-sm text-red-500">
              {{ passwordError }}
            </p>

          </div>

          <!-- GENERAL MESSAGE -->
          <p v-if="generalError" class="mt-4 text-center text-sm text-red-500">
            {{ generalError }}
          </p>

          <p v-if="successMessage" class="mt-4 text-center text-sm text-green-600">
            {{ successMessage }}
          </p>

          <!-- BUTTON -->
          <button
            @click="handleLogin"
            :disabled="!isFormValid"
            class="mt-6 w-full sm:w-64 rounded-xl py-3 text-white transition"
            :class="isFormValid
              ? 'bg-[#C2410C] hover:bg-white hover:text-[#C2410C] hover:ring-1 hover:ring-[#C2410C]'
              : 'bg-gray-400 cursor-not-allowed'"
          >
            Login
          </button>

          <p class="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?
            <NuxtLink to="/signup" class="text-[#C2410C] hover:underline">
              Sign up
            </NuxtLink>
          </p>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { authClient } from '~/lib/auth-client'

const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')
const successMessage = ref('')

/* ---------------------------
   VALIDATION
----------------------------*/

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ---------------------------
   REDIRECT IF ALREADY LOGGED IN
----------------------------*/

onMounted(async () => {
  try {
    const session = await authClient.getSession()

    if (session?.user) {
      await navigateTo('/')
    }
  } catch (err) {
    // ignore
  }
})

/* ---------------------------
   LIVE VALIDATION
----------------------------*/

watch(email, (val) => {
  emailError.value = validateEmail(val) ? '' : 'Invalid email format'
})

watch(password, (val) => {
  passwordError.value =
    val.length >= 8 ? '' : 'Password must be at least 8 characters'
})

/* ---------------------------
   FORM VALIDITY
----------------------------*/

const isFormValid = computed(() => {
  return validateEmail(email.value) && password.value.length >= 8
})

/* ---------------------------
   LOGIN HANDLER
----------------------------*/

const handleLogin = async () => {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''
  successMessage.value = ''

  try {
    await authClient.signIn.email({
      email: email.value,
      password: password.value
    })

    await authClient.getSession()

    successMessage.value = 'Login successful!'
    await navigateTo('/')

  } catch (err: any) {
    generalError.value =
      err?.message || 'Wrong email or password'
  }
}
</script>