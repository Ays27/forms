export const useAuth = () => {
  const user = useState('user', () => null)

  const login = async (email: string, password: string) => {
    const res = await $fetch('/api/auth/sign-in/email', {
      method: 'POST',
      body: { email, password }
    })

    user.value = res.user
    return res
  }

  const logout = async () => {
    await $fetch('/api/auth/sign-out', { method: 'POST' })
    user.value = null
  }

  const getSession = async () => {
    const res = await $fetch('/api/auth/session')
    user.value = res?.user ?? null
    return res
  }

  return {
    user,
    login,
    logout,
    getSession
  }
}