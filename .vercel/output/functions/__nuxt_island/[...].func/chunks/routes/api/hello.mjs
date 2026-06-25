import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const hello = defineEventHandler(() => {
  return { hello: "world" };
});

export { hello as default };
//# sourceMappingURL=hello.mjs.map
