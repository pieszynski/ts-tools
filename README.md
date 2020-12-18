
# TS Tools
Cross project TypeScript tools

```bash
git submodule add https://github.com/pieszynski/ts-tools src/tools
```

## log.ts
Simple common logging library for both Node and browser.

In Node uses process environment variables:

* HIDE_TIMESTAMP - when true hides timestamps before log line. When should I hide? In Docker where it adds timestamps by its own.
* LOG_LEVEL - when set changes max log level allowed from 'info' to the one listed below in example.

```ts
import { log } from './tools/log';

log.e(...); // 'error'
log.w(...); // 'warn'
log.i(...); // 'info'
log.d(...); // 'debug'
log.t(...); // 'trace '
```

# define.ts
Super simple `define` method for TypeScript DependencyInjection when used in combination with `outFile` + `module=amd` settings.

Typescript compiler injects this whole file into one big `app.js` and there it acts as DI.

Example tsconfig.json configuration (used within `./src` directory)

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "amd",
    "outFile": "../dist/app.js",

    "removeComments": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "inlineSourceMap": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```
