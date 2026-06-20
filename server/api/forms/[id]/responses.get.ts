import { eq, inArray } from 'drizzle-orm'
import { db } from '../../../db'
import { responses, responseAnswers } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const formId = Number(event.context.params?.id)

  if (!formId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form id'
    })
  }

  const formResponses = await db
    .select()
    .from(responses)
    .where(eq(responses.formId, formId))

  const answers = await db
    .select()
    .from(responseAnswers)
    .where(
      inArray(
        responseAnswers.responseId,
        formResponses.map(r => r.id)
      )
    )

  const grouped = formResponses.map((r) => {
    const rAnswers = answers.filter(
      (a) => a.responseId === r.id
    )

    const answerMap: Record<string, string> = {}

    rAnswers.forEach((a) => {
      answerMap[String(a.questionId)] = a.value
    })

    return {
      id: r.id,
      createdAt: r.createdAt,
      answers: answerMap
    }
  })

  return {
    responses: grouped
  }
})