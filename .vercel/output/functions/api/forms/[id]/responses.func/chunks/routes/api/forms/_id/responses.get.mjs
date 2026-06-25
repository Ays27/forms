import { d as defineEventHandler, c as createError } from '../../../../_/nitro.mjs';
import { eq, inArray } from 'drizzle-orm';
import { d as db, r as responses, a as responseAnswers } from '../../../../_/index.mjs';
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

const responses_get = defineEventHandler(async (event) => {
  var _a;
  const formId = Number((_a = event.context.params) == null ? void 0 : _a.id);
  if (!formId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form id"
    });
  }
  const formResponses = await db.select().from(responses).where(eq(responses.formId, formId));
  const answers = await db.select().from(responseAnswers).where(
    inArray(
      responseAnswers.responseId,
      formResponses.map((r) => r.id)
    )
  );
  const grouped = formResponses.map((r) => {
    const rAnswers = answers.filter(
      (a) => a.responseId === r.id
    );
    const answerMap = {};
    rAnswers.forEach((a) => {
      answerMap[String(a.questionId)] = a.value;
    });
    return {
      id: r.id,
      createdAt: r.createdAt,
      answers: answerMap
    };
  });
  return {
    responses: grouped
  };
});

export { responses_get as default };
//# sourceMappingURL=responses.get.mjs.map
