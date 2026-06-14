import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001/api/auth' // IMPORTANT: matches your Nuxt server port
})