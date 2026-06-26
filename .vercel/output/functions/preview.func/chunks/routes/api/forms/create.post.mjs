import { d as defineEventHandler, c as createError, r as readBody } from '../../../_/nitro.mjs';
import { d as db, f as forms, s as sections, q as questions } from '../../../_/index.mjs';
import { a as auth } from '../../../_/auth.mjs';
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
import 'better-auth';
import '@better-auth/drizzle-adapter';

const create_post = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  });
  if (!(session == null ? void 0 : session.user)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const body = await readBody(event);
  const [form] = await db.insert(forms).values({
    userId: session.user.id,
    title: body.title,
    description: body.description
  }).returning();
  const [section] = await db.insert(sections).values({
    formId: form.id,
    title: "Section 1"
  }).returning();
  await db.insert(questions).values({
    formId: form.id,
    sectionId: section.id,
    title: "Untitled Question",
    type: "Multiple Choice",
    required: false
  });
  return form;
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
