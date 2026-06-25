import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, f as forms, s as sections, q as questions, o as options } from '../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm/pg-core';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const idParam = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing id"
    });
  }
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid numeric id"
    });
  }
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, id)
  });
  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: "Form not found"
    });
  }
  const formSections = await db.select().from(sections).where(eq(sections.formId, id));
  const formQuestions = await db.select().from(questions).where(eq(questions.formId, id));
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
    questions: questionsWithOptions,
    options: formOptions
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
