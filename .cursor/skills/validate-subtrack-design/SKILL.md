---
name: validate-subtrack-design
description: Validates mobile screens and shared UI components against the Subtrack design system, reports violations, and fixes them using theme tokens and ui-components primitives. Use when validating UI, auditing design compliance, fixing design drift, reviewing mobile screens, or when the user asks to check or fix design library conformance.
---

# Validate Subtrack Design

Audit UI against the Subtrack design system and fix violations in the same pass.

## Sources Of Truth

Read these before validating or fixing:

1. `docs/subtrack-design-system.md` — colors, typography, spacing, components, copy rules, screen structure
2. `packages/ui-components/src/theme/tokens.ts` — implemented React Native token values
3. `apps/mobile/AGENTS.md` — mobile screen/hook/component conventions
4. `AGENTS.md` — design system placement rules

Do not invent colors, radii, weights, or component specs outside these files.

## Workflow

Copy this checklist and track progress:

```
Design validation:
- [ ] Step 1: Determine scope
- [ ] Step 2: Run automated checks
- [ ] Step 3: Manual audit against design doc
- [ ] Step 4: Fix violations
- [ ] Step 5: Verify with typecheck/tests
- [ ] Step 6: Report findings
```

### Step 1: Determine Scope

Default scope when the user does not specify files:

```sh
git diff --name-only origin/master...HEAD -- 'apps/mobile/**' 'packages/ui-components/**'
```

If there is no branch diff, validate the screen or component the user named. Otherwise inspect all changed mobile screens, hooks with UI copy, and shared UI primitives.

### Step 2: Run Automated Checks

From repo root:

```sh
.cursor/skills/validate-subtrack-design/scripts/validate-design.sh
```

Optionally pass paths:

```sh
.cursor/skills/validate-subtrack-design/scripts/validate-design.sh apps/mobile/src/screens/HomeScreen.tsx
```

Treat script output as signals, not the full audit. Confirm each finding manually before changing code.

### Step 3: Manual Audit

For each file in scope, verify:

| Area | Check |
| --- | --- |
| Colors | No hardcoded hex/rgb in screens or shared components except in `tokens.ts`. Use `useTheme()` tokens. Brand teal and semantic colors only through theme. |
| Surfaces | Page backgrounds use `theme.colors.surface.page`. Cards/headers use `surface.raised`. Chips/inputs/empty states use `surface.subtle`. |
| Borders | Default borders use `theme.colors.border.default` with `theme.strokeWidth.default` (`0.5`). Error borders use `border.error`. Accent borders use `strokeWidth.accent` (`2`) only for featured accent cases. |
| Typography | Only weights `400` and `500`. Use `theme.typography.*` roles, not ad hoc sizes/weights. No `600` or `700`. |
| Spacing/radii | Use `theme.spacing.*` and `theme.radius.*`. Avoid magic numbers when a token exists. |
| Components | Prefer `@subtrack/ui-components` primitives (`Button`, `TextField`, `ThemeProvider`). Button/input heights come from `theme.components.*`. |
| Copy | Sentence case. Active voice. Buttons start with a verb. No `!`. Labels/titles without terminal punctuation; help/empty-state body ends with a period. |
| Accessibility | Decorative icons hidden from accessibility. Icon-only buttons have labels. |
| Architecture | Screen logic in hooks. One component per file. No API calls inside presentational components. |

For screen structure, compare against the defined layouts in `docs/subtrack-design-system.md` (login, registration, subscription list, success, empty states).

Token mapping from CSS variables to React Native theme paths is in [token-map.md](token-map.md).

### Step 4: Fix Violations

Fix in this order:

1. **Replace inline design values with theme tokens**
   - `#1D9E75` → `theme.colors.brand.primary` or `theme.colors.primary`
   - `#0F6E56` → `theme.colors.brand.dark`
   - `#A32D2D` / error text → `theme.colors.semantic.danger.text`
   - `#E24B4A` / error border → `theme.colors.border.error`
   - `var(--text-muted)` → `theme.colors.textRole.muted`
   - `var(--surface-2)` → `theme.colors.surface.raised`

2. **Use shared primitives before custom markup**
   - Text inputs → `TextField`
   - Primary actions → `Button`
   - Theme access → `useTheme()`

3. **Move screen copy/state to hooks**
   - Strings and derived content belong in `use*Screen.ts`, not inline in the component when they represent screen content.

4. **Extend tokens only when the design system requires a missing value**
   - Add the token to `packages/ui-components/src/theme/tokens.ts`
   - Update `Theme` type and `lightTheme`
   - Prefer reusing an existing token if the design doc value already maps to one

5. **Keep fixes minimal**
   - Do not restyle unrelated screens
   - Do not refactor beyond what is needed for design compliance

### Step 5: Verify

Run focused checks for touched packages:

```sh
pnpm --filter @subtrack/ui-components typecheck
pnpm --filter @subtrack/mobile typecheck
pnpm --filter @subtrack/mobile test
```

If shared tokens changed, also run:

```sh
pnpm --filter @subtrack/ui-components build
pnpm test
```

Fix any regressions before finishing.

### Step 6: Report

Return a concise report:

```markdown
## Design validation

### Scope
- [files or areas checked]

### Findings fixed
- [violation] → [fix applied]

### Remaining issues
- [anything blocked or out of scope]

### Verification
- [commands run and result]
```

Mark findings as:
- **Critical**: breaks design system rules or accessibility
- **Drift**: works but uses non-token values or wrong component patterns
- **Copy**: text/tone violations

## Common Fixes

**Hardcoded color in screen**

```tsx
// Before
<Text style={{ color: "#64748B" }}>

// After
<Text style={{ color: theme.colors.textRole.muted }}>
```

**Wrong font weight**

```tsx
// Before
fontWeight: "700"

// After
fontWeight: theme.typography.label.weight
```

**Wrong border width**

```tsx
// Before
borderWidth: 1

// After
borderWidth: theme.strokeWidth.default
```

**Legacy flat border/danger usage**

```tsx
// Before
borderColor: theme.colors.border
color: theme.colors.danger

// After
borderColor: theme.colors.border.default
color: theme.colors.semantic.danger.text
```

**Screen content inline in component**

Move strings and derived labels to the screen hook:

```ts
// apps/mobile/src/hooks/useHomeScreen.ts
export const useHomeScreen = () => ({
  title: "My subscriptions",
  // ...
});
```

## When To Stop And Ask

Ask the user before proceeding if:

- The design doc and `tokens.ts` disagree and you cannot tell which is authoritative
- A requested UI pattern is not defined in the design system
- Fixing compliance requires a new shared component not yet in `packages/ui-components`

## Additional Resources

- Token mapping reference: [token-map.md](token-map.md)
- Fix examples: [examples.md](examples.md)
