import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import { d as db, r as responses, a as responseAnswers } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';

const responses_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { formId, answer } = body;
  const [response] = await db.insert(responses).values({
    formId: Number(formId)
  }).returning();
  const inserts = Object.entries(answer).map(([questionId, value]) => ({
    responseId: response.id,
    questionId: Number(questionId),
    value: String(value)
  }));
  if (inserts.length > 0) {
    await db.insert(responseAnswers).values(inserts);
  }
  return {
    success: true,
    responseId: response.id
  };
});

export { responses_post as default };
//# sourceMappingURL=responses.post.mjs.map
