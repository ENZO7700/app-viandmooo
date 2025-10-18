#!/usr/bin/env bash
set -e
git add -A
git commit -m "autosave: $(date '+%Y-%m-%d %H:%M:%S')" || true
git push
