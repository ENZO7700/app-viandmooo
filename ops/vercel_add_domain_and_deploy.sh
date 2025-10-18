#!/usr/bin/env bash
set -euo pipefail
export BROWSER=/bin/true

echo "== Link projekt (ak nie je) =="
vercel link --yes || true

echo "== Pridávam doménu app.viandmo.com =="
vercel domains add app.viandmo.com || true

echo "== DNS inštrukcie =="
vercel domains inspect app.viandmo.com || true

echo "== engines.node → 20.x (pre Vercel) =="
if command -v jq >/dev/null 2>&1; then
  tmp=package.tmp.json
  jq '.engines.node="20.x"' package.json > "$tmp" && mv "$tmp" package.json || true
else
  grep -q '"engines"' package.json || sed -i '0,/{/s//{\n  "engines": { "node": "20.x" },/' package.json
fi

echo "== Build + PROD deploy =="
npm ci || npm i
npm run build || true
vercel --prod

echo "== Stav domén =="
vercel domains ls | grep -E 'app\.viandmo\.com' || echo "➡️  Doplň DNS záznamy podľa vyššie, potom zopakuj 'vercel domains inspect app.viandmo.com'."
