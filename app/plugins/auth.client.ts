import { useSession } from "~/composables/useSession"

export default defineNuxtPlugin(async () => {
  const { fetchSession } = useSession()
  await fetchSession()
})