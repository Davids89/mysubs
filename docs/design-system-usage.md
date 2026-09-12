# Design System — Usage Guide

How to consume `@subtrack/ui-components` from a screen. What each component is,
what it costs you in accessibility, and the patterns we already repeat.

Companion documents:

- [subtrack-design-system.md](./subtrack-design-system.md) — the source of
  truth for colors, typography, spacing, and what a component must look like.
- [component-guidelines.md](./component-guidelines.md) — how to **build** or
  change a component. Read that one before opening a PR against the package.
- [architecture.md](./architecture.md) — where the package sits in the monorepo.

---

## 1. Philosophy

- **Accessibility-first.** Roles, states, and labels are written with the
  component, not retrofitted. A control that looks disabled *is* disabled.
- **Mobile-first.** The primitives are React Native. Storybook renders them
  through `react-native-web` for documentation; the device is the real target.
- **Tokens are the vocabulary.** Components compose decisions that already
  exist in `tokens.ts`. A screen never invents a color or a size.
- **The smallest set that works.** Ten primitives, one file each. We add the
  eleventh when a second screen needs it — see `component-guidelines.md` §2.

Browse everything running: `make storybook` → <http://localhost:6006>.

---

## 2. Setup

The package is already a dependency of `apps/mobile`. Wrap the app once in
`ThemeProvider` — this is done in `apps/mobile/app/_layout.tsx`:

```tsx
import { ThemeProvider } from "@subtrack/ui-components";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
```

`ThemeProvider` takes an optional `theme` prop and defaults to `lightTheme`.
There is only one theme today; `useTheme()` still works without a provider
because the context defaults to `lightTheme`, which is what keeps tests and
stories cheap.

### Importing

Always from the package root. `src/index.ts` is the whole public surface — if
it is not exported there, it does not exist:

```tsx
import { Button, Card, TextField, useTheme } from "@subtrack/ui-components";
```

Never deep-import (`@subtrack/ui-components/src/Button.js`). Mobile resolves the
package through its `react-native` field straight to TypeScript source, so
there is no build step to run while developing.

### Reading tokens

`useTheme()` returns the whole `Theme` object. Use it for anything the
primitives do not cover — a screen layout, a one-off label color:

```tsx
const theme = useTheme();

<View style={{ gap: theme.spacing.lg, padding: theme.spacing.xl }}>
  <Text style={{ color: theme.colors.textRole.muted }}>No subscriptions yet</Text>
</View>
```

Token groups: `colors` (`brand`, `semantic`, `surface`, `textRole`, `border`),
`spacing` (`xs`…`3xl`, `hero`), `radius`, `strokeWidth`, `typography`, and
`components` (per-component metrics like `input.height`). No literal hex codes,
font sizes, radii, or spacing values in a screen — ever.

---

## 3. Component inventory

All ten are exported from `@subtrack/ui-components` and have a story next to
them. Status is **Ready** unless noted.

| Component | Status | Key props | Accessibility |
| --- | --- | --- | --- |
| `Alert` | Ready | `message`, `title?`, `type?` (`info` \| `success` \| `warning` \| `error`), `onDismiss?` | `role="alert"`; the dismiss control is labelled `"Dismiss"` |
| `Badge` | Ready | `label`, `variant?` (`neutral` \| `success` \| `warning` \| `danger`) | Read as plain text; no role. Keep the label meaningful on its own |
| `Button` | Ready | `label`, `variant?` (`primary` \| `secondary` \| `danger` \| `ghost`), `size?` (`small` \| `medium` \| `large`), `loading?`, `icon?`, plus `PressableProps` | `role="button"`, `accessibilityState={{ busy, disabled }}`; loading really blocks presses |
| `Card` | Ready | `variant?` (`outlined` \| `elevated`), plus `ViewProps` | Container only. Pass `accessibilityRole`/`accessibilityLabel` yourself when the card is tappable |
| `Icon` | Ready — no icon package yet | `render({ color, size })`, `size?` (`inline` \| `list` \| `nav` \| `max`), `label?`, `color?` | Hidden from screen readers unless you pass `label`, which also sets `role="image"` |
| `Modal` | Ready | `visible`, `onClose`, `title?`, `children` | Backdrop is labelled `"Close"`; Android back button routes to `onClose` |
| `Select` | Ready | `label`, `options: SelectOption[]`, `value?`, `onChange`, `placeholder?` | Trigger is `role="button"`; each option exposes `accessibilityState.selected` |
| `Spinner` | Ready | `size?` (`small` \| `medium` \| `large`), `color?` | `role="progressbar"` |
| `TextField` | Ready | `label`, `error?`, `icon?`, plus `TextInputProps` | Visible label is *not* auto-associated with the input (React Native has no `htmlFor`) — pass `accessibilityLabel` when the field needs one |
| `Typography` | Ready | `Title`, `Subtitle`, `Body`, `Caption` — all take `TextProps` | Plain text. `Title` and `Subtitle` do not set `accessibilityRole="header"`; pass it when the text is a real heading |

Known gaps, all deliberate:

| Gap | Why | Fixed by |
| --- | --- | --- |
| `Icon` takes a `render` callback instead of a glyph name | No icon package is installed | Installing one, then swapping `render` for a name |
| No dark theme | `tokens.ts` only defines `lightTheme` | Adding `darkTheme`; `ThemeProvider` already takes a `theme` prop |
| No toolbar theme switch in Storybook | Nothing to switch to | Falls out of the line above |
| `Select` uses the shared `Modal`, not native pickers | Identical behaviour on both platforms, zero dependencies | Only if a design calls for the native wheel |

Every one of these is greppable in the source as a `ponytail:` comment.

There is no Figma file. `docs/subtrack-design-system.md` plus Storybook are the
design source of truth; if a Figma library ever exists, link it here.

---

## 4. Common patterns

### A form with validation and a submitting state

State lives in a hook, the screen only renders. `RegisterScreen` plus
`apps/mobile/src/hooks/useRegisterScreen.ts` is the copy-me example:

```tsx
export function RegisterScreen() {
  const { errors, form, isSubmitting, submit, updateField } = useRegisterScreen();

  return (
    <>
      <TextField
        autoCapitalize="none"
        error={errors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={(value) => updateField("email", value)}
        placeholder="you@email.com"
        value={form.email}
      />
      <TextField
        error={errors.password}
        label="Password"
        onChangeText={(value) => updateField("password", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.password}
      />
      <Button label="Create account" loading={isSubmitting} onPress={submit} />
    </>
  );
}
```

- `error` on `TextField` turns the border red and prints the message. Empty
  string or `undefined` means valid — do not render your own error `Text`.
- `loading` on `Button` shows a `Spinner` in the icon slot, keeps the label,
  and blocks presses. Use it instead of `disabled={isSubmitting}` so the user
  sees why nothing happens.
- `errors` is built by running the Zod schema from `@subtrack/shared-types`
  over the form and keeping the first issue per field. The screen never invents
  copy for a rule the backend also enforces.

### Request-level feedback

Field errors go on the field. Anything about the request as a whole goes in an
`Alert` above the form:

```tsx
{error ? <Alert message={error} type="error" /> : null}
{notice ? <Alert message={notice} onDismiss={dismissNotice} type="success" /> : null}
```

Pass `onDismiss` only when dismissing is meaningful — it renders the control.

### Loading a screen

```tsx
if (isLoading) {
  return (
    <View style={styles.centered}>
      <Spinner size="large" />
    </View>
  );
}
```

`Spinner` defaults to the brand color, so pass `color` only inside a filled
`Button` (which already does it for you).

### A list of cards

```tsx
<FlatList
  contentContainerStyle={{ gap: theme.spacing.md, padding: theme.spacing.lg }}
  data={subscriptions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Card>
      <Subtitle>{item.name}</Subtitle>
      <Badge label={item.status} variant={item.status === "active" ? "success" : "warning"} />
      <Caption>{item.renewsAt}</Caption>
    </Card>
  )}
/>
```

Spacing between cards is the list's job (`gap`), not a `marginBottom` on
`Card`. That keeps the last item from pushing a phantom gap at the end.

### Choosing from a fixed set

```tsx
<Select
  label="Billing cycle"
  onChange={(value) => updateField("cycle", value)}
  options={[
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ]}
  value={form.cycle}
/>
```

`Select` owns the open/closed state; you own `value`.

### Confirming a destructive action

```tsx
<Modal onClose={close} title="Delete subscription" visible={isOpen}>
  <Body>This cannot be undone.</Body>
  <Button label="Delete" onPress={confirm} variant="danger" />
  <Button label="Cancel" onPress={close} variant="ghost" />
</Modal>
```

`visible` is yours to hold. `onClose` fires from the backdrop and from the
Android back button, so it must be safe to call at any time.

### Extending a component's style

Every component accepts `style` and applies it **last**, so the caller always
wins. Use it for layout, not for repainting:

```tsx
<Button label="Add subscription" style={{ alignSelf: "stretch" }} />
```

If you find yourself overriding a color, the variant is missing — add it to the
component instead. See `component-guidelines.md` §4.

---

## 5. Where a component does *not* belong

`packages/ui-components` is for primitives any screen could use. Anything that
knows about subscriptions, auth, or one specific screen lives in
`apps/mobile/src/components/` — `AuthScreenLayout` is the example to copy.

The first screen that needs a layout inlines it. The second one extracts it.

---

## 6. Testing a screen that uses the package

Component tests live in `apps/mobile/src/test/` and import from
`@subtrack/ui-components`, which mobile's Jest maps to the package source.
Assert against the token, never against a hex string:

```tsx
expect(flattenStyle(getByRole("button")).backgroundColor).toBe(
  lightTheme.colors.brand.primary,
);
```

`lightTheme` is exported for exactly this. A test that hardcodes `"#1D9E75"`
breaks the moment the brand changes, which is the change we want to be easy.

Run them with `make test` or `pnpm --filter @subtrack/mobile test`.
