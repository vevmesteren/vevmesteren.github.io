#!/usr/bin/env bash
#
# publish-radar-article.sh
# Publishes a radar article to vevmesteren.com from a cron job.
#
# The cron agent generates: title, description, domain, body text, source URLs.
# This script handles the deterministic parts: frontmatter, filename, build
# validation, commit, and push. The model can't get the YAML wrong.
#
# Usage:
#   bash scripts/publish-radar-article.sh \
#     --cron-id 178da4e27e5e \
#     --date 2026-11-24 \
#     --title "Your Article Title" \
#     --description "One-line description under 200 chars" \
#     --domain banking \
#     --body-file /tmp/radar-article-body.md \
#     --sources "https://example.com/1 https://example.com/2"
#
# Exit codes:
#   0 — article published and deployed
#   1 — validation error (missing arg, bad file, build failure)
#
set -euo pipefail

REPO_DIR="/home/hermes/vevmesteren.github.io"
NODE_BIN="/home/hermes/.local/node/bin"

# ── Parse args ──────────────────────────────────────────────────────────────
CRON_ID="" DATE="" TITLE="" DESCRIPTION="" DOMAIN="" BODY_FILE="" SOURCES=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --cron-id)     CRON_ID="$2";      shift 2 ;;
        --date)        DATE="$2";         shift 2 ;;
        --title)       TITLE="$2";        shift 2 ;;
        --description)  DESCRIPTION="$2"; shift 2 ;;
        --domain)      DOMAIN="$2";        shift 2 ;;
        --body-file)   BODY_FILE="$2";    shift 2 ;;
        --sources)     SOURCES="$2";      shift 2 ;;
        *) echo "WARN: unknown arg: $1"; shift ;;
    esac
done

# ── Validate ────────────────────────────────────────────────────────────────
for req in CRON_ID DATE TITLE DESCRIPTION DOMAIN BODY_FILE; do
    [ -z "${!req}" ] && { echo "ERROR: --$(echo "$req" | tr '[:upper:]' '[:lower:]') is required"; exit 1; }
done

[ ! -f "$BODY_FILE" ]          && { echo "ERROR: body file not found: $BODY_FILE"; exit 1; }
[ -z "$SOURCES" ]              && { echo "ERROR: --sources is required (min 1 URL)"; exit 1; }

# Description ≤ 200 chars (schema-enforced)
DESC_LEN=${#DESCRIPTION}
[ "$DESC_LEN" -gt 200 ] && { echo "ERROR: description is ${DESC_LEN} chars, max 200"; exit 1; }

# ── Determine radar tag from cron-id ─────────────────────────────────────────
case "$CRON_ID" in
    178da4e27e5e) RADAR_TAG="agentic-banking-radar"  ;;
    407e284ddbba) RADAR_TAG="enterprise-harness-radar" ;;
    *)            RADAR_TAG="radar"                   ;;
esac

# ── Generate kebab-case slug from title ──────────────────────────────────────
SLUG=$(echo "$TITLE" \
    | sed 's/[^a-zA-Z0-9]/-/g' \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/--*/-/g' \
    | sed 's/^-//;s/-$//' \
    | cut -c1-80)

ARTICLE_PATH="$REPO_DIR/src/content/radar/$SLUG.md"

# Handle slug collision: append date
if [ -f "$ARTICLE_PATH" ]; then
    SLUG="${SLUG}-${DATE}"
    ARTICLE_PATH="$REPO_DIR/src/content/radar/$SLUG.md"
fi

# ── Escape title/description for YAML double-quoted strings ───────────────────
TITLE_ESC=$(echo "$TITLE"       | sed 's/"/\\"/g')
DESC_ESC=$(echo "$DESCRIPTION" | sed 's/"/\\"/g')

# ── Build the article ────────────────────────────────────────────────────────
{
    echo "---"
    echo "title: \"$TITLE_ESC\""
    echo "description: \"$DESC_ESC\""
    echo "date: $DATE"
    echo "domain: $DOMAIN"
    echo "tags: [$RADAR_TAG, $DOMAIN]"
    echo "sources:"
    for url in $SOURCES; do
        echo "  - $url"
    done
    echo "draft: false"
    echo "---"
    echo ""
    cat "$BODY_FILE"
} > "$ARTICLE_PATH"

echo "Wrote: $ARTICLE_PATH"

# ── Build to validate (catches YAML errors, bad frontmatter) ──────────────────
cd "$REPO_DIR"
export PATH="$NODE_BIN:$PATH"
if ! npm run build 2>&1; then
    echo "ERROR: build failed — removing article and aborting"
    rm -f "$ARTICLE_PATH"
    rm -rf dist
    exit 1
fi
rm -rf dist

# ── Commit and push to main (triggers deploy workflow) ────────────────────────
cd "$REPO_DIR"
git checkout main 2>/dev/null || true
git pull origin main 2>/dev/null || true
git add "src/content/radar/$SLUG.md"
git commit -m "Radar: $TITLE ($DATE)"
git push origin main

echo "SUCCESS: Published /radar/$SLUG/ — deploy workflow triggered"