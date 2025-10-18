#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="studio-9970817292-3ce01"
SITE_ID="app-viandmo"

echo "== Firebase login (device flow, potvrď v prehliadači ak vyžiada) =="
firebase login --no-localhost || true

echo "== Aktivujem projekt =="
firebase use --project "studio-9970817292-3ce01" >/dev/null

echo "== Povolenie webframeworks (ak treba) =="
firebase experiments:enable webframeworks >/dev/null 2>&1 || true

echo "== Vytváram hosting site (ak chýba) =="
firebase hosting:sites:create "app-viandmo" --project "studio-9970817292-3ce01" || true

echo "== Mapujem target -> site =="
firebase target:apply hosting "app-viandmo" "app-viandmo" --project "studio-9970817292-3ce01"

echo "== Inštal/build =="
npm ci || npm i
npm run build

echo "== Deploy na hosting:app-viandmo =="
firebase deploy --only "hosting:app-viandmo" --project "studio-9970817292-3ce01"

echo "== HOTOVO: staging = https://app-viandmo.web.app =="
