import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import {
  forms,
  sections,
  questions,
  options
} from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const shareId = event.context.params?.id

  if (!shareId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing share id'
    })
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.shareId, shareId)
  })

  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Form not found'
    })
  }

  const formSections = await db
    .select()
    .from(sections)
    .where(eq(sections.formId, form.id))

  const formQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.formId, form.id))

  const formOptions = await db
    .select()
    .from(options)

  const questionsWithOptions = formQuestions.map((q) => ({
    ...q,
    options: formOptions.filter(
      (o) => o.questionId === q.id
    )
  }))

  return {
    form,
    sections: formSections,
    questions: questionsWithOptions
  }
})