---
name: Design change
about: Propose a change to a token, a style rule, or UI copy
title: "[design] "
labels: design-system
---

## What changes?

<!-- The exact value, before and after: "Primary #1D9E75 → #1A8A66",
     "body 15px → 16px", "buttons may use Title Case". -->

## Why?

<!-- Accessibility, legibility, consistency with the rest of the system. -->

## What does it break?

<!-- Which components and screens render differently. A token change is a
     breaking change: see docs/design-system/governance.md §2. -->

## Where it must be updated together

- [ ] `packages/ui-components/src/theme/tokens.ts`
- [ ] `docs/design-system/style-guide.md` (and its preview SVGs — `make-previews.py`)
- [ ] `packages/ui-components/CHANGELOG.md`
