import { c as defineEventHandler, f as createError } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, f as forms, s as sections, q as questions, o as options } from '../../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm/pg-core';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const shareId = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!shareId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing share id"
    });
  }
  const form = await db.query.forms.findFirst({
    where: eq(forms.shareId, shareId)
  });
  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: "Form not found"
    });
  }
  const formSections = await db.select().from(sections).where(eq(sections.formId, form.id));
  const formQuestions = await db.select().from(questions).where(eq(questions.formId, form.id));
  const formOptions = await db.select().from(options);
  const questionsWithOptions = formQuestions.map((q) => ({
    ...q,
    options: formOptions.filter(
      (o) => o.questionId === q.id
    )
  }));
  return {
    form,
    sections: formSections,
    questions: questionsWithOptions
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
