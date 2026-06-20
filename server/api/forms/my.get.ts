import { eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { forms } from '../../db/schema'
import { auth } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  })

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return await db
    .select()
    .from(forms)
    .where(eq(forms.userId, session.user.id))
})