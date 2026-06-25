import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, f as forms } from '../../../_/index.mjs';
import { a as auth } from '../../../_/auth.mjs';
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
import 'better-auth';
import '@better-auth/drizzle-adapter';

const my_get = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  });
  if (!(session == null ? void 0 : session.user)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  return await db.select().from(forms).where(eq(forms.userId, session.user.id));
});

export { my_get as default };
//# sourceMappingURL=my.get.mjs.map
