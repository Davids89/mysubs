#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

if [ "$#" -gt 0 ]; then
  TARGETS=("$@")
else
  mapfile -t TARGETS < <(
    git diff --name-only origin/master...HEAD -- \
      'apps/mobile/**/*.tsx' \
      'apps/mobile/**/*.ts' \
      'packages/ui-components/**/*.tsx' \
      'packages/ui-components/**/*.ts' 2>/dev/null || true
  )

  if [ "${#TARGETS[@]}" -eq 0 ]; then
    TARGETS=(
      apps/mobile/src
      packages/ui-components/src
    )
  fi
fi

echo "Subtrack design validation"
echo "Targets: ${TARGETS[*]}"
echo

violations=0

scan() {
  local label="$1"
  local pattern="$2"
  shift 2
  local paths=("$@")
  local matches

  if [ "${#paths[@]}" -eq 0 ]; then
    paths=("${TARGETS[@]}")
  fi

  matches="$(rg -n --glob '*.tsx' --glob '*.ts' --glob '!**/tokens.ts' --glob '!**/*.test.tsx' --glob '!**/*.test.ts' "$pattern" "${paths[@]}" 2>/dev/null || true)"
  if [ -n "$matches" ]; then
    violations=1
    echo "[$label]"
    echo "$matches"
    echo
  fi
}

scan "Hardcoded hex colors" '#[0-9A-Fa-f]{3,8}'
scan "Disallowed font weights 600/700" 'fontWeight:\s*"(600|700)"|fontWeight:\s*'\''(600|700)'\'''
scan "Likely wrong border width" 'borderWidth:\s*1([^0-9]|$)'
scan "Legacy flat border token" 'colors\.border([^.\w]|$)'
scan "Legacy danger token" 'colors\.danger'
scan "Inline typography in screens" 'fontSize:\s*[0-9]+' apps/mobile/src/screens apps/mobile/src/components

if [ "$violations" -eq 0 ]; then
  echo "No automated violations found."
  echo "Continue with manual audit using docs/subtrack-design-system.md."
else
  echo "Automated checks found potential design violations."
  echo "Review each match manually, then fix with theme tokens and shared primitives."
  exit 1
fi
