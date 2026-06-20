import { ref } from 'vue'
import { authClient } from '~/lib/auth-client'

const session = ref<any>(null)
const loading = ref(true)
let initialized = false

export const useSession = () => {
  const fetchSession = async () => {
    if (initialized) return

    loading.value = true

    try {
      const res = await authClient.getSession()
      session.value = res?.data || null
    } catch (err) {
      session.value = null
    }

    loading.value = false
    initialized = true
  }

  return {
    session,
    loading,
    fetchSession
  }
}