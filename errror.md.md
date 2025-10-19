Skip to content
Navigation Menu
ENZO7700
viandmo

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
CI
fix(routes): remove /(marketing) URLs; add safe Home page #4
Jobs
Run details
Annotations
1 error
build-test
failed 3 days ago in 52s
Search logs
1s
1s
3s
31s
14s
Run npm run build --if-present

> nextn@0.1.0 build
> next build

⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

   ▲ Next.js 15.3.3

   Creating an optimized production build ...
 ✓ (pwa) Compiling for server...
 ✓ (pwa) Compiling for server...
 ✓ (pwa) Compiling for client (static)...
 ○ (pwa) Service worker: /home/runner/work/viandmo/viandmo/public/sw.js
 ○ (pwa)   URL: /sw.js
 ○ (pwa)   Scope: /
 ○ (pwa) This app will fallback to these precached routes when fetching from the cache and the network fails:
 ○ (pwa)   Documents (pages): /offline.html
 ✓ Compiled successfully in 5.0s
   Linting and checking validity of types ...
 ⨯ ESLint: Failed to load config "next/core-web-vitals" to extend from. Referenced from: /home/runner/work/viandmo/viandmo/.eslintrc.json
Failed to compile.

./next.config.ts:12:3
Type error: Object literal may only specify known properties, and 'swcMinify' does not exist in type 'PluginOptions'.

  10 |   },
  11 |   reloadOnOnline: true,
> 12 |   swcMinify: true,
     |   ^
  13 |   workboxOptions: {
  14 |     disableDevLogs: true,
  15 |   },
Next.js build worker exited with code: 1 and signal: null
Error: Process completed with exit code 1.
0s
0s
0s
1s
0s
