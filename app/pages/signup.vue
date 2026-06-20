<template>
  <div class="min-h-screen bg-[#F3F4F6]">

    <!-- Navbar -->
    <nav class="border-b bg-white px-4 sm:px-6 py-3">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#C2410C]">
        Forms
      </h1>
    </nav>

   
    <main class="flex min-h-[calc(100vh-64px)] justify-center px-4 pt-12 sm:pt-20 md:pt-24">

   
      <div class="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-md">

        <div class="mx-auto flex w-full max-w-sm flex-col items-center">

         
          <h1 class="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-semibold text-gray-800">
            Welcome, register to Forms
          </h1>

          <div class="w-full space-y-3 sm:space-y-4">

            <input v-model="name" type="text" placeholder="Name"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base" />
            <p v-if="nameError" class="text-sm text-red-500">{{ nameError }}</p>

            <input v-model="email" type="email" placeholder="Email"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base" />
            <p v-if="emailError" class="text-sm text-red-500">{{ emailError }}</p>

            <input v-model="password" type="password" placeholder="Password"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base" />
            <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>

            <input v-model="confirmPassword" type="password" placeholder="Confirm Password"
              class="w-full rounded-xl bg-[#F3F4F6] px-3 py-2 text-sm sm:text-base" />
            <p v-if="confirmPasswordError" class="text-sm text-red-500">
              {{ confirmPasswordError }}
            </p>

          </div>

          <p v-if="generalError" class="mt-4 text-center text-sm text-red-500">
            {{ generalError }}
          </p>

         
          <p v-if="successMessage" class="mt-4 text-center text-sm text-green-600">
            {{ successMessage }}
          </p>

   <button
  type="button"
  @click="handleSignup"
  :disabled="!isFormValid"
  class="mt-6 w-full sm:w-64 rounded-xl py-3 text-white transition"
  :class="isFormValid
    ? 'bg-[#C2410C] hover:bg-white hover:text-[#C2410C] hover:ring-1 hover:ring-[#C2410C]'
    : 'bg-gray-400 cursor-not-allowed'"
>
  Sign up
</button>

          
          <p class="mt-6 text-sm text-gray-600 text-center">
            Already a member?
           <NuxtLink to="/login" class="text-[#C2410C] hover:underline">
  Login
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const generalError = ref('')
const successMessage = ref('')



const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePassword = (password: string) => {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)
}

/* ---------------------------
   CHECK IF ALREADY LOGGED IN
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


watch(name, (val) => {
  if (!val.trim()) {
    nameError.value = 'Name is required'
  } else if (val.trim().length < 3) {
    nameError.value = 'Name must be at least 3 characters'
  } else {
    nameError.value = ''
  }
})

watch(email, (val) => {
  emailError.value = validateEmail(val) ? '' : 'Invalid email format'
})

watch(password, (val) => {
  passwordError.value = validatePassword(val)
    ? ''
    : 'Password must be 8+ chars, 1 uppercase, 1 special character'
})

watch(confirmPassword, (val) => {
  confirmPasswordError.value =
    val === password.value ? '' : 'Passwords do not match'
})



const isFormValid = computed(() => {
  return (
    name.value.trim().length >= 3 &&
    validateEmail(email.value) &&
    validatePassword(password.value) &&
    password.value === confirmPassword.value
  )
})



const handleSignup = async () => {
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  generalError.value = ''
  successMessage.value = ''

  try {
    await authClient.signUp.email({
      email: email.value,
      password: password.value,
      name: name.value
    })

    successMessage.value = 'Account created successfully!'

    await authClient.getSession()
    await navigateTo('/')

  } catch (err: any) {
    generalError.value = err?.message || 'Signup failed'
  }
}
</script>