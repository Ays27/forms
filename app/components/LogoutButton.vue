<template>
  <button
    v-if="session?.user"
    @click="handleLogout"
    class="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
  >
    Logout
  </button>
</template>

<script setup lang="ts">
import { useSession } from '~/composables/useSession'
import { authClient } from '~/lib/auth-client'

const { session } = useSession()

const handleLogout = async () => {
  await authClient.signOut()
  await navigateTo('/login')
}
</script>