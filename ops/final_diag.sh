#!/usr/bin/env bash
set -euo pipefail

# KONFIG (uprav podľa potreby)
PROJECT_ID="studio-9970817292-3ce01"
SITE_ID="app-viandmo"
STAGING_URL="https://app-viandmo.web.app"
CUSTOM_URL="https://app.viandmo.com"

red(){ printf "\033[31m%s\033[0m\n" "$*"; }
grn(){ printf "\033[32m%s\033[0m\n" "$*"; }
ylw(){ printf "\033[33m%s\033[0m\n" "$*"; }
hr(){ echo "----------------------------------------"; }

set +e

hr; echo "1) Node/NPM"
node -v; npm -v
if [ -f .nvmrc ]; then
  N=$(cat .nvmrc); echo ".nvmrc=$N"
else
  ylw "Missing .nvmrc (odporúčam 20.12.2)"
fi

hr; echo "2) Next/PWA/ESLint súbory"
[ -f next.config.js ] && grn "next.config.js ✓" || red "next.config.js ✗"
[ -f .eslintrc.json ] && grn ".eslintrc.json ✓" || ylw ".eslintrc.json ✗"
[ -f public/offline.html ] && grn "offline.html ✓" || ylw "offline.html ✗"
node -e "try{p=require('./package.json');console.log('next=',p.dependencies?.next||p.devDependencies?.next||'');console.log('next-pwa=',p.dependencies?.['next-pwa']||p.devDependencies?.['next-pwa']||'')}catch(e){console.log('package.json read err')}" 2>/dev/null

hr; echo "3) FetchPriority kontrola"
X=$(grep -RIn --include='*.{js,jsx,ts,tsx}' 'fetchpriority' . | wc -l)
test "$X" -eq 0 && grn "fetchPriority OK" || red "Nájdené 'fetchpriority' výskyty: $X"

hr; echo "4) Vercel stav"
if vercel whoami >/dev/null 2>&1; then
  grn "Vercel login ✓"
  vercel projects ls --json 2>/dev/null | head -c 500 || true; echo
  vercel ls --json 2>/dev/null | head -c 500 || true; echo
  if vercel domains ls 2>/dev/null | grep -E 'app\.viandmo\.com' >/dev/null; then
    grn "app.viandmo.com je pridaná vo Verceli ✓"
  else
    ylw "app.viandmo.com nie je pridaná vo Verceli"
  fi
else
  red "Vercel neprihlásený"
fi

hr; echo "5) Firebase stav"
if firebase whoami >/dev/null 2>&1; then
  grn "Firebase login ✓"
else
  red "Firebase neprihlásený"
fi

firebase use --project "$PROJECT_ID" >/dev/null 2>&1
CUR=$(firebase use 2>/dev/null | head -n1)
echo "Aktívny: $CUR"
firebase hosting:sites:list --project "$PROJECT_ID" || true

hr; echo "6) HTTP ping"
for URL in "$STAGING_URL" "$CUSTOM_URL"; do
  [ -n "$URL" ] || continue
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  echo "$URL -> $CODE"
done

hr; echo "Done."
