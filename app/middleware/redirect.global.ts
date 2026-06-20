import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware((to) => {
  const { session, loading } = useSession()

  // Optional: prevent redirect flicker while session is loading
  if (loading.value) return

  const isLoggedIn = !!session.value

  // not logged in → force signup
  if (!isLoggedIn && to.path !== '/signup') {
    return navigateTo('/signup')
  }

  // logged in → block auth pages
  if (isLoggedIn && (to.path === '/signup' || to.path === '/login')) {
    return navigateTo('/')
  }
})