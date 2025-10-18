#!/usr/bin/env bash
set -euo pipefail
PROJECT_ID="studio-9970817292-3ce01"
SITE_ID="app-viandmo"
firebase use --project "$PROJECT_ID" >/dev/null
firebase target:apply hosting "$SITE_ID" "$SITE_ID" --project "$PROJECT_ID"
firebase hosting:sites:list --project "$PROJECT_ID"
