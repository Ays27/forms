import { d as defineEventHandler, c as createError, r as readBody } from '../../../_/nitro.mjs';
import { d as db, f as forms, s as sections, q as questions, o as options } from '../../../_/index.mjs';
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

const publish_post = defineEventHandler(async (event) => {
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
  const shareId = crypto.randomUUID();
  const form = await db.transaction(async (tx) => {
    var _a, _b, _c, _d, _e, _f;
    const [createdForm] = await tx.insert(forms).values({
      userId: session.user.id,
      title: body.title,
      description: body.description,
      shareId
    }).returning();
    const formId = createdForm.id;
    const sectionMap = /* @__PURE__ */ new Map();
    for (const sec of body.sections || []) {
      const [inserted] = await tx.insert(sections).values({
        formId,
        title: sec.title
      }).returning();
      sectionMap.set(sec.id, inserted.id);
    }
    for (const q of body.questions || []) {
      const [question] = await tx.insert(questions).values({
        formId,
        sectionId: sectionMap.get(q.sectionId) || q.sectionId,
        title: q.title,
        type: q.type,
        required: (_a = q.required) != null ? _a : false,
        imageUrl: (_b = q.imageUrl) != null ? _b : null,
        videoUrl: (_c = q.videoUrl) != null ? _c : null,
        goToSectionId: (_d = q.goToSectionId) != null ? _d : null,
        maxLength: (_e = q.maxLength) != null ? _e : null
      }).returning();
      if ((_f = q.options) == null ? void 0 : _f.length) {
        await tx.insert(options).values(
          q.options.map((opt) => {
            var _a2;
            return {
              questionId: question.id,
              text: opt.text,
              imageUrl: (_a2 = opt.imageUrl) != null ? _a2 : null,
              goToSectionId: opt.goToSectionId ? sectionMap.get(opt.goToSectionId) : null
            };
          })
        );
      }
    }
    return createdForm;
  });
  return {
    id: form.id,
    shareId: form.shareId,
    shareUrl: `/f/${form.shareId}`
  };
});

export { publish_post as default };
//# sourceMappingURL=publish.post.mjs.map
