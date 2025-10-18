#!/usr/bin/env bash
set -euo pipefail

#########################
# CONFIG (uprav podľa seba)
#########################
# GitHub – zoznam účtov/organizácií, ktoré chceš zálohovať:
GITHUB_OWNERS=("youh4ck3dme" "ENZO7700")
# Režim pre GitHub: "user" (všetky tvoje repos) + uvedené OWNERS (orgy) alebo len "owners"
GH_MODE="user_and_owners"   # values: user | owners | user_and_owners

# Vercel – prostredia, z ktorých chceme env:
VERCEL_ENVS=("production" "preview" "development")

# Výstupný koreň
BACKUP_ROOT="${HOME}/backup_$(date +%Y%m%d-%H%M%S)"
DOWNLOADS_DIR="${HOME}/Downloads"
ZIP_NAME="FULL_BACKUP_GITHUB_VERCEL_$(date +%Y%m%d-%H%M%S).zip"

#########################
# Helpers
#########################
log() { printf "\n\033[1;36m[INFO]\033[0m %s\n" "$*"; }
err() { printf "\n\033[1;31m[ERROR]\033[0m %s\n" "$*" >&2; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { err "Chýba prikaz '$1'. Nainštaluj ho a spusti znova."; exit 1; }
}

mkdir -p "$BACKUP_ROOT" "$DOWNLOADS_DIR"

#########################
# Predpoklady
#########################
need_cmd gh
need_cmd jq
need_cmd vercel
need_cmd git
need_cmd zip

log "GitHub auth check…"
if ! gh auth status >/dev/null 2>&1; then
  log "Spúšťam interaktívny login do GitHubu…"
  gh auth login -s "repo,read:org" -w
fi
log "✅ GitHub OK"

log "Vercel auth check…"
if ! vercel teams ls >/dev/null 2>&1; then
  log "Spúšťam login do Vercelu…"
  vercel login
fi
log "✅ Vercel OK"

#########################
# 1) GitHub BACKUP – mirror clone všetkých repo
#########################
GH_OUT="${BACKUP_ROOT}/github"
mkdir -p "$GH_OUT"

# Inventár
GH_INV="${GH_OUT}/INVENTORY_github_repos.jsonl"
: > "$GH_INV"

log "Sťahujem zoznam repo z GitHubu…"

# Funkcia na dump repo pre ownera/org
dump_owner_repos() {
  local owner="$1"
  log "→ Owner/Org: ${owner}"
  # stránkovanie po 100
  page=1
  while :; do
    data=$(gh api -H "Accept: application/vnd.github+json" \
      "/orgs/${owner}/repos?per_page=100&page=${page}" 2>/dev/null || true)
    # Ak org neexistuje, skús user repos
    if [[ -z "$data" || "$data" == "Not Found" || "$data" == *"message"* && "$data" == *"Not Found"* ]]; then
      data=$(gh api -H "Accept: application/vnd.github+json" \
        "/users/${owner}/repos?per_page=100&page=${page}" 2>/dev/null || true)
    fi
    [[ -z "$data" || "$data" == "[]" ]] && break
    echo "$data" | jq -c '.[]' >> "$GH_INV"
    ((page++))
  done
}

# a) všetky repo prihláseného užívateľa
if [[ "$GH_MODE" == "user" || "$GH_MODE" == "user_and_owners" ]]; then
  page=1
  while :; do
    data=$(gh api -H "Accept: application/vnd.github+json" \
      "/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member" 2>/dev/null || true)
    [[ -z "$data" || "$data" == "[]" ]] && break
    echo "$data" | jq -c '.[]' >> "$GH_INV"
    ((page++))
  done
fi

# b) explicitní ownery/orgy
if [[ "$GH_MODE" == "owners" || "$GH_MODE" == "user_and_owners" ]]; then
  for o in "${GITHUB_OWNERS[@]}"; do
    dump_owner_repos "$o"
  done
fi

# Unikátne repo (pre istotu)
TMP="${GH_OUT}/_tmp.jsonl"
jq -s 'unique_by(.full_name)' "$GH_INV" | jq -c '.[]' > "$TMP"
mv "$TMP" "$GH_INV"

# Mirror clone
log "Mirror clone všetkých nalezených repo…"
while read -r line; do
  name=$(echo "$line" | jq -r '.full_name')
  ssh_url=$(echo "$line" | jq -r '.ssh_url')
  http_url=$(echo "$line" | jq -r '.clone_url')
  # prefer SSH ak máš kľúče; inak fallback na HTTPS
  clone_url="$ssh_url"
  [[ "$clone_url" == "null" || -z "$clone_url" ]] && clone_url="$http_url"
  safe_dir="${GH_OUT}/repos/${name}.git"
  mkdir -p "$(dirname "$safe_dir")"
  if [[ -d "$safe_dir" ]]; then
    log "↻ fetch: $name"
    git -C "$safe_dir" remote set-url origin "$clone_url" || true
    git -C "$safe_dir" fetch --all --prune
  else
    log "↓ clone: $name"
    git clone --mirror "$clone_url" "$safe_dir" || { err "Zlyhal clone $name"; }
  fi
done < <(cat "$GH_INV")

log "✅ GitHub backup hotový → $GH_OUT"

#########################
# 2) Vercel BACKUP – projekty, pull config, env
#########################
V_OUT="${BACKUP_ROOT}/vercel"
mkdir -p "$V_OUT/projects"

log "Sťahujem zoznam Vercel projektov…"
# Zoznam tímov (prvý je „Personal Account“)
vercel teams ls --json > "${V_OUT}/teams.json" || true

# Pre každý tím vypýtaj projekty
jq -r '.[].id // empty' "${V_OUT}/teams.json" 2>/dev/null | while read -r TEAM_ID; do
  T_DIR="${V_OUT}/teams/${TEAM_ID}"
  mkdir -p "$T_DIR"
  log "→ Projekty v teame: $TEAM_ID"
  vercel projects ls --json --team "$TEAM_ID" > "${T_DIR}/projects.json" || true
done

# Aj personal projekty (bez --team)
vercel projects ls --json > "${V_OUT}/projects_personal.json" || true

# Zjednoť JSON do jedného zoznamu
jq -s 'flatten' \
  $(find "$V_OUT" -name "projects.json" -o -name "projects_personal.json") \
  > "${V_OUT}/ALL_PROJECTS.json" || echo "[]">"${V_OUT}/ALL_PROJECTS.json"

# Pullni environmenty a project configy
log "Ťahám env a config pre každý Vercel projekt…"
jq -r '.[].name' "${V_OUT}/ALL_PROJECTS.json" | sort -u | while read -r PNAME; do
  [[ -z "$PNAME" || "$PNAME" == "null" ]] && continue
  P_DIR="${V_OUT}/projects/${PNAME}"
  mkdir -p "$P_DIR"
  # project linking/config
  vercel pull --yes --environment=production --cwd "$P_DIR" >/dev/null 2>&1 || true
  # env dump pre všetky prostredia
  for ENV in "${VERCEL_ENVS[@]}"; do
    vercel env pull "${P_DIR}/.env.${ENV}" --environment="$ENV" --cwd "$P_DIR" >/dev/null 2>&1 || true
  done
  # meta info
  vercel inspect "$PNAME" --json > "${P_DIR}/inspect.json" 2>/dev/null || true
done

log "✅ Vercel backup hotový → $V_OUT"

#########################
# 3) Inventár + meta
#########################
log "Generujem inventár…"
{
  echo "# INVENTORY"
  echo "Timestamp: $(date -Is)"
  echo "Backup root: $BACKUP_ROOT"
  echo
  echo "## GitHub repos count:"
  jq -s 'length' "$GH_INV"
  echo
  echo "## Vercel projects count:"
  jq -r '.[].name' "${V_OUT}/ALL_PROJECTS.json" | sort -u | wc -l
} > "${BACKUP_ROOT}/INVENTORY.txt"

#########################
# 4) ZIP → ~/Downloads
#########################
log "Balím ZIP… môže to chvíľu trvať pri veľa repo."
cd "$(dirname "$BACKUP_ROOT")"
zip -rq "${ZIP_NAME}" "$(basename "$BACKUP_ROOT")"

mv "${ZIP_NAME}" "${DOWNLOADS_DIR}/"
log "🎉 HOTOVO: ${DOWNLOADS_DIR}/${ZIP_NAME}"
echo
echo "Tip: prever veľkosť:"
ls -lh "${DOWNLOADS_DIR}/${ZIP_NAME}"
