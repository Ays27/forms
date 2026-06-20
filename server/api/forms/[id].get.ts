import { eq } from 'drizzle-orm'
import { db } from '../../db'
import {
  forms,
  sections,
  questions,
  options
} from '../../db/schema'

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id

  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id'
    })
  }

  const id = Number(idParam)

  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid numeric id'
    })
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, id)
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
    .where(eq(sections.formId, id))

  const formQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.formId, id))

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
    questions: questionsWithOptions,
    options: formOptions
  }
})