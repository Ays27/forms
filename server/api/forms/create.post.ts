import { db } from '../../db'
import { forms, sections, questions } from '../../db/schema'
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

  const body = await readBody(event)

  // 1. create form
  const [form] = await db
    .insert(forms)
    .values({
      userId: session.user.id,
      title: body.title,
      description: body.description
    })
    .returning()

  // 2. create default section
  const [section] = await db
    .insert(sections)
    .values({
      formId: form.id,
      title: 'Section 1'
    })
    .returning()

  // 3. create default question (optional but recommended)
  await db.insert(questions).values({
    formId: form.id,
    sectionId: section.id,
    title: 'Untitled Question',
    type: 'Multiple Choice',
    required: false
  })

  return form
})