<template>
  <button
    v-if="user"
    @click="logout"
    class="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
  >
    Logout
  </button>
</template>

<script setup lang="ts">
const { user, logout } = useSession()
</script>