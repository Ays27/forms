import { d as defineEventHandler, a as toWebRequest } from '../../../_/nitro.mjs';
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
import 'better-auth';
import '@better-auth/drizzle-adapter';
import '../../../_/index.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';

const _____ = defineEventHandler(async (event) => {
  const request = toWebRequest(event);
  return auth.handler(request);
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
