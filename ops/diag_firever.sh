#!/usr/bin/env bash
set -euo pipefail

APP_URL_DEFAULT="https://app.viandmo.com"
FIREBASE_SITE_DEFAULT="app-viandmo"
VERCEL_PROJECT_HINT=""
RUN_BUILD="${RUN_BUILD:-0}"  # 1 = spusti npm run build, 0 = nie

bold(){ printf "\033[1m%s\033[0m\n" "$*"; }
ok(){ printf "  ✅ %s\n" "$*"; }
warn(){ printf "  ⚠️  %s\n" "$*"; }
err(){ printf "  ❌ %s\n" "$*" >&2; }
hr(){ printf "\n----------------------------------------\n"; }

need_or_warn(){ command -v "$1" >/dev/null 2>&1 || { warn "Chýba nástroj: $1"; return 1; }; }

bold "🔥 DIAGNOSTIKA: Firebase + Vercel + Next.js (RUN_BUILD=${RUN_BUILD})"
hr

# 0) ZÁKLAD
need_or_warn node || exit 1
need_or_warn npm || exit 1
need_or_warn curl || exit 1
need_or_warn npx || true
JQ_OK=1; command -v jq >/dev/null 2>&1 || JQ_OK=0
OPENSSL_OK=1; command -v openssl >/dev/null 2>&1 || OPENSSL_OK=0

# 1) NODE/NPM
hr; bold "1) Node/NPM verzie"
NODE_V=$(node -v || true); NPM_V=$(npm -v || true)
ok "Node: ${NODE_V:-?}, npm: ${NPM_V:-?}"
if [ -f .nvmrc ]; then
  NVMRC=$(cat .nvmrc || true)
  if [ -n "${NVMRC}" ] && [ "${NODE_V#v}" != "${NVMRC}" ]; then
    warn ".nvmrc=${NVMRC}, bežíš ${NODE_V}; odporúčam nvm use ${NVMRC}"
  else
    ok ".nvmrc OK (${NVMRC})"
  fi
else
  warn "Chýba .nvmrc (zamkni napr. 20.12.2)"
fi

# 2) NEXT/ESLINT/PWA
hr; bold "2) Next.js / ESLint / PWA"
PKG_NEXT=$(node -e "try{p=require('./package.json');console.log(p.dependencies?.next||p.devDependencies?.next||'')}catch(e){console.log('')}" 2>/dev/null || true)
[ -n "$PKG_NEXT" ] && ok "next: ${PKG_NEXT}" || warn "Next.js nie je v package.json?"
[ -f next.config.ts ] && warn "Máš next.config.ts (ak build padá, prehoď na next.config.js)"
if [ -f next.config.js ]; then
  grep -q "swcMinify" next.config.js && warn "Odstráň 'swcMinify' pre Next 15" || ok "next.config.js bez swcMinify"
else
  warn "Chýba next.config.js"
fi
if [ -f .eslintrc.json ]; then
  grep -q 'next/core-web-vitals' .eslintrc.json && ok "ESLint preset OK" || warn "Doplň \"next/core-web-vitals\""
else
  warn "Chýba .eslintrc.json (minimálny preset odporúčaný)"
fi
[ -f public/offline.html ] && ok "offline.html prítomný" || warn "Chýba public/offline.html pre PWA fallback"

# 3) VERCEL
hr; bold "3) Vercel"
if command -v vercel >/dev/null 2>&1; then
  if vercel whoami >/dev/null 2>&1; then ok "Vercel: prihlásený"; else err "Vercel: neprihlásený (vercel login)"; exit 1; fi
  if [ "$JQ_OK" -eq 1 ]; then
    vercel projects ls --json >/tmp/_vercel_projects.json 2>/dev/null || true
    CNT=$(jq 'length' /tmp/_vercel_projects.json 2>/dev/null || echo 0); ok "Projekty: ${CNT}"
    vercel ls --json >/tmp/_vercel_deploys.json 2>/dev/null || true
    LAST_URL=$(jq -r '.[0].url // empty' /tmp/_vercel_deploys.json 2>/dev/null || true)
    LAST_STATE=$(jq -r '.[0].state // empty' /tmp/_vercel_deploys.json 2>/dev/null || true)
    [ -n "$LAST_URL" ] && ok "Posledný deploy: https://${LAST_URL} (stav: ${LAST_STATE})" || warn "Žiadna história deployov"
  else
    warn "Bez jq skáčem detailný výpis Vercel projektov"
  fi
else
  err "Chýba Vercel CLI (npm i -g vercel)"; exit 1
fi

# 4) FIREBASE
hr; bold "4) Firebase"
if command -v firebase >/dev/null 2>&1; then
  if firebase whoami >/dev/null 2>&1; then ok "Firebase: prihlásený"; else err "Firebase: neprihlásený (firebase login --no-localhost)"; fi
  if firebase use >/dev/null 2>&1; then
    CUR=$(firebase use | head -n1 || true); ok "Aktívny: ${CUR}"
  else
    warn "Neurčený aktívny projekt (firebase use --add)"
  fi
  firebase hosting:sites:list >/dev/null 2>&1 && ok "Hosting sites dostupné" || warn "Žiadne hosting sites (firebase hosting:sites:create ${FIREBASE_SITE_DEFAULT})"
else
  warn "Chýba Firebase CLI (npm i -g firebase-tools)"
fi

# 5) DNS/HTTP/SSL
hr; bold "5) DNS/HTTP/SSL"
APP_URL="${APP_URL:-$APP_URL_DEFAULT}"
HOST=$(echo "$APP_URL" | awk -F/ '{print $3}')
[ -z "$HOST" ] && HOST="app.viandmo.com"
ok "Host: ${HOST}"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${HOST}" || echo "000")
[[ "$CODE" =~ ^2|3 ]] && ok "HTTP ${CODE}" || warn "HTTP ${CODE} – deploy/doména?"
if [ "$OPENSSL_OK" -eq 1 ]; then
  EXP=$(echo | openssl s_client -servername "$HOST" -connect "$HOST:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | sed -n 's/notAfter=//p' || true)
  if [ -n "$EXP" ]; then
    TS=$(date -d "$EXP" +%s 2>/dev/null || date -j -f "%b %d %T %Y %Z" "$EXP" +%s)
    NOW=$(date +%s); DAYS=$(( (TS-NOW)/86400 ))
    [ "$DAYS" -gt 14 ] && ok "SSL expirácia: ${DAYS} dní" || warn "SSL expirácia o ${DAYS} dní"
  else
    warn "Neviem získať SSL dátum (možný DNS/443 problém)"
  fi
else
  warn "openssl nie je nainštalovaný – preskakujem SSL expiráciu"
fi

# 6) KONFIG SÚBORY
hr; bold "6) Konfig sanity"
[ -f vercel.json ] && ok "vercel.json ✓" || warn "chýba vercel.json (cache headers odporúčané)"
[ -f package-lock.json ] && ok "package-lock.json ✓" || warn "chýba package-lock.json"
[ -f next.config.js ] && ok "next.config.js ✓" || warn "chýba next.config.js"

# 7) LOKÁLNY BUILD (ak RUN_BUILD=1)
if [ "$RUN_BUILD" = "1" ]; then
  hr; bold "7) npm run build"
  LOGF="diag_build_$(date +%H%M%S).log"
  set +e
  npm ci >/dev/null 2>&1 || npm i >/dev/null 2>&1
  npm run -s build >"$LOGF" 2>&1
  RC=$?
  set -e
  if [ $RC -eq 0 ]; then ok "Build OK"; else
    err "Build padol (log: $LOGF)"
    grep -qi "ESLint: Failed to load config .*next/core-web-vitals" "$LOGF" && warn "Doplň .eslintrc.json s {\"extends\":[\"next/core-web-vitals\"]}"
    grep -qi "swcMinify" "$LOGF" && warn "Odstráň 'swcMinify' z next.config.*"
  fi
fi

hr; bold "✅ HOTOVO"
