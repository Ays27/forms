import { db } from '../db'
import { responses, responseAnswers } from '../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { formId, answer } = body

  // 1. create response row
  const [response] = await db.insert(responses).values({
    formId: Number(formId)
  }).returning()

  // 2. store answers
  const inserts = Object.entries(answer).map(([questionId, value]) => ({
    responseId: response.id,
    questionId: Number(questionId),
    value: String(value)
  }))

  if (inserts.length > 0) {
    await db.insert(responseAnswers).values(inserts)
  }

  return {
    success: true,
    responseId: response.id
  }
})