import { db } from '../../db'
import { forms, sections, questions, options } from '../../db/schema'
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

  const shareId = crypto.randomUUID()

  const form = await db.transaction(async (tx) => {
    /* =========================
       CREATE FORM
    ========================== */

    const [createdForm] = await tx
      .insert(forms)
      .values({
        userId: session.user.id,
        title: body.title,
        description: body.description,
        shareId
      })
      .returning()

    const formId = createdForm.id

    /* =========================
       SECTIONS
    ========================== */

    const sectionMap = new Map<number, number>()

    for (const sec of body.sections || []) {
      const [inserted] = await tx
        .insert(sections)
        .values({
          formId,
          title: sec.title
        })
        .returning()

      sectionMap.set(sec.id, inserted.id)
    }

    /* =========================
       QUESTIONS
    ========================== */

    for (const q of body.questions || []) {
      const [question] = await tx
        .insert(questions)
        .values({
          formId,
          sectionId: sectionMap.get(q.sectionId) || q.sectionId,
          title: q.title,
          type: q.type,
          required: q.required ?? false,
          imageUrl: q.imageUrl ?? null,
          videoUrl: q.videoUrl ?? null,
          goToSectionId: q.goToSectionId ?? null,
          maxLength: q.maxLength ?? null
        })
        .returning()

      /* =========================
         OPTIONS
      ========================== */

      if (q.options?.length) {
        await tx.insert(options).values(
  q.options.map((opt: any) => ({
    questionId: question.id,
    text: opt.text,
    imageUrl: opt.imageUrl ?? null,

    goToSectionId:
      opt.goToSectionId
        ? sectionMap.get(opt.goToSectionId)
        : null
  }))
)
      }
    }

    return createdForm
  })

  /* =========================
     FINAL RESPONSE
  ========================== */

  return {
    id: form.id,
    shareId: form.shareId,
    shareUrl: `/f/${form.shareId}`
  }
})