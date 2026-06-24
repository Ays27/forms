import { authClient } from "~/lib/auth-client"

export const useSession = () => {
  const session = useState<any>("session", () => null)
  const user = useState<any>("user", () => null)
  const loading = useState("auth-loading", () => true)

  const fetchSession = async () => {
    try {
      loading.value = true
      const res = await authClient.getSession()

      session.value = res?.data?.session || null
      user.value = res?.data?.user || null
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await authClient.signOut()
    session.value = null
    user.value = null
    await navigateTo('/login')
  }

  return {
    session,
    user,
    loading,
    fetchSession,
    logout
  }
}