import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const hello = defineEventHandler(() => {
  return { hello: "world" };
});

export { hello as default };
//# sourceMappingURL=hello.mjs.map
