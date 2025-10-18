#!/usr/bin/env bash
set -euo pipefail
URL="${1:?Usage: health_min <url>}"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo 000)
echo "HTTP $CODE @ $URL"
exit $([ "$CODE" -eq 200 ] && echo 0 || echo 1)
