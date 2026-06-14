import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { db } from '../db'

const baseURL = process.env.BETTER_AUTH_URL
const secret = process.env.BETTER_AUTH_SECRET

if (!baseURL) throw new Error('BETTER_AUTH_URL is missing')
if (!secret) throw new Error('BETTER_AUTH_SECRET is missing')

export const auth = betterAuth({
  baseURL,
  secret,

  database: drizzleAdapter(db, {
    provider: 'pg'
  }),

  emailAndPassword: {
    enabled: true
  }
})