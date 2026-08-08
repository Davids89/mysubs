# Design Validation Examples

## Example 1: Home screen uses tokens correctly

**Good patterns**

- `theme.colors.surface.page` for screen background
- `theme.colors.border.default` with `theme.strokeWidth.default`
- Typography from `theme.typography.title`, `.caption`, `.body`
- Copy in `useHomeScreen.ts`, not hardcoded in multiple JSX blocks

## Example 2: Auth screen drift

**Findings**

- `fontWeight: "700"` on link text → use `theme.typography.label.weight` (`500`)
- `borderWidth: 1` on input wrapper → use `theme.strokeWidth.default`
- `#DC2626` error color → `theme.colors.semantic.danger.text`
- `"Sign In"` button label → `"Sign in"` (sentence case, verb-first)

**Fix locations**

- Screen component styles
- Shared `TextField` if the issue is in the primitive
- Hook copy if the label comes from screen content

## Example 3: Missing token vs wrong usage

**Wrong usage**: screen hardcodes `#1D9E75` even though `theme.colors.brand.primary` exists.
→ Replace with theme token.

**Missing token**: design doc adds a new semantic state not present in `tokens.ts`.
→ Add typed token to `Theme` and `lightTheme`, then consume it from screens/components.
→ Do not hardcode the new color in app code.

## Example 4: Validation report

```markdown
## Design validation

### Scope
- apps/mobile/src/screens/LoginScreen.tsx
- packages/ui-components/src/TextField.tsx

### Findings fixed
- Critical: error text used `#DC2626` → `theme.colors.semantic.danger.text`
- Drift: input border used `borderWidth: 1` → `theme.strokeWidth.default`
- Copy: "Entrar" kept (existing product copy), verified sentence case

### Remaining issues
- None

### Verification
- pnpm --filter @subtrack/mobile typecheck ✅
- pnpm --filter @subtrack/mobile test ✅
```
