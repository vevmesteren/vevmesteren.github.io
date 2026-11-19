#!/usr/bin/env bash
#
# publish-blog-article.sh
# Publishes a blog article to vevmesteren.com from the vevcast profile.
#
# Handles both blog and radar collections. Supports draft mode for testing.
#
# Usage:
#   bash scripts/publish-blog-article.sh \
#     --collection blog \
#     --date 2026-11-19 \
#     --title "Your Article Title" \
#     --description "One-line description under 200 chars" \
#     --kind essay \
#     --tags "tag1 tag2" \
#     --body-file /tmp/article-body.md \
#     --draft
#
# Exit codes:
#   0 — article published (or drafted) and deployed
#   1 — validation error (missing arg, bad file, build failure)
#
set -euo pipefail

REPO_DIR="/home/hermes/vevmesteren.github.io"
NODE_BIN="/home/hermes/.local/node/bin"

# ── Parse args ──────────────────────────────────────────────────────────────
DATE="" TITLE="" DESCRIPTION="" COLLECTION="" KIND="" BODY_FILE="" DRAFT=false
TAGS=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --collection)  COLLECTION="$2";   shift 2 ;;
        --date)        DATE="$2";          shift 2 ;;
        --title)       TITLE="$2";         shift 2 ;;
        --description) DESCRIPTION="$2";  shift 2 ;;
        --kind)        KIND="$2";          shift 2 ;;
        --tags)        TAGS="$2";           shift 2 ;;
        --body-file)   BODY_FILE="$2";     shift 2 ;;
        --draft)       DRAFT=true;          shift ;;
        *) echo "WARN: unknown arg: $1"; shift ;;
    esac
done

# ── Validate ────────────────────────────────────────────────────────────────
for req in COLLECTION DATE TITLE DESCRIPTION BODY_FILE; do
    [ -z "${!req}" ] && { echo "ERROR: --$(echo "$req" | tr '[:upper:]' '[:lower:]') is required"; exit 1; }
done

[ ! -f "$BODY_FILE" ] && { echo "ERROR: body file not found: $BODY_FILE"; exit 1; }

# Collection must be blog or radar
[[ "$COLLECTION" != "blog" && "$COLLECTION" != "radar" ]] && {
    echo "ERROR: --collection must be 'blog' or 'radar'"; exit 1
}

# Description max 200 chars (schema-enforced)
DESC_LEN=${#DESCRIPTION}
[ "$DESC_LEN" -gt 200 ] && { echo "ERROR: description is ${DESC_LEN} chars, max 200"; exit 1; }

# ── Generate kebab-case slug from title ──────────────────────────────────────
SLUG=$(echo "$TITLE" \
    | sed 's/[^a-zA-Z0-9]/-/g' \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/--*/-/g' \
    | sed 's/^-//;s/-$//' \
    | cut -c1-80)

ARTICLE_PATH="$REPO_DIR/src/content/$COLLECTION/$SLUG.md"

# Handle slug collision: append date
if [ -f "$ARTICLE_PATH" ]; then
    SLUG="${SLUG}-${DATE}"
    ARTICLE_PATH="$REPO_DIR/src/content/$COLLECTION/$SLUG.md"
fi

# ── Escape title/description for YAML double-quoted strings ───────────────────
TITLE_ESC=$(echo "$TITLE"       | sed 's/"/\\"/g')
DESC_ESC=$(echo "$DESCRIPTION" | sed 's/"/\\"/g')

# ── Build tags array ────────────────────────────────────────────────────────
TAGS_YAML=""
if [ -n "$TAGS" ]; then
    TAG_LIST=$(echo "$TAGS" | tr ' ' ',')
    TAGS_YAML="tags: [$TAG_LIST]"
else
    TAGS_YAML="tags: []"
fi

# ── Build the article ────────────────────────────────────────────────────────
{
    echo "---"
    echo "title: \"$TITLE_ESC\""
    echo "description: \"$DESC_ESC\""
    echo "date: $DATE"
    if [ -n "$KIND" ]; then
        echo "kind: $KIND"
    fi
    echo "$TAGS_YAML"
    if [ "$DRAFT" = true ]; then
        echo "draft: true"
    else
        echo "draft: false"
    fi
    echo "---"
    echo ""
    cat "$BODY_FILE"
} > "$ARTICLE_PATH"

echo "Wrote: $ARTICLE_PATH (draft=$DRAFT)"

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
git add "src/content/$COLLECTION/$SLUG.md"
if [ "$DRAFT" = true ]; then
    git commit -m "Draft: $TITLE ($DATE) [vevcast test]"
else
    git commit -m "Publish: $TITLE ($DATE)"
fi
git push origin main

if [ "$DRAFT" = true ]; then
    echo "SUCCESS: Drafted /$COLLECTION/$SLUG/ (not visible to public — draft: true)"
else
    echo "SUCCESS: Published /$COLLECTION/$SLUG/ — deploy workflow triggered"
fi