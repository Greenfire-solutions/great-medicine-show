#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/Greenfire-solutions/great-medicine-show.git}"
TARGET_BRANCH="${TARGET_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo work)}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Run this command inside your project folder (the one with .git)."
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REPO_URL"
else
  git remote set-url origin "$REPO_URL"
fi

echo "→ Pushing branch '$TARGET_BRANCH' to origin..."
git push -u origin "$TARGET_BRANCH"

echo "→ Triggering Vercel production deploy..."
npx vercel --prod --yes

echo "✅ Ship complete."
