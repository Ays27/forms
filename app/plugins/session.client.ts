import { useSession } from '~/composables/useSession'

export default defineNuxtPlugin(async () => {
  const { fetchSession, session } = useSession()

  // Prevent duplicate fetch on refresh + hydration
  if (!session.value) {
    await fetchSession()
  }
})