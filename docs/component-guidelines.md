# Component Guidelines

How we build components in `packages/ui-components`, and why there is so little
of them.

Companion documents:

- [subtrack-design-system.md](./subtrack-design-system.md) — what a component
  must look like. Source of truth for colors, sizes, and copy.
- [architecture.md](./architecture.md) — where a component sits in the system.
- [`CLAUDE.md`](../CLAUDE.md) — the repo-wide rules this document specialises.

---

## 1. Philosophy

**A component is a promise to maintain something forever.** Every primitive we
add has to be read, themed, tested, documented, and kept in sync with the design
system by whoever comes next. So the bar to add one is high, and the bar to keep
one small is higher.

Four ideas drive everything below:

1. **Tokens are the vocabulary.** A component composes design decisions that
   already exist. It does not make new ones.
2. **Primitives are dumb.** They take props and render. State, data, and
   navigation live in the app.
3. **The shortest version that satisfies the design system wins.** No options
   nobody asked for, no folder of five files where one file works.
4. **Deliberate shortcuts are written down, not hidden.**

---

## 2. When to create a component

Create one when **either** is true:

- `docs/subtrack-design-system.md` defines it as a component.
- A second screen needs the same thing. (The first screen inlines it. The
  second one extracts it.)

Do **not** create one for:

| Situation | Do this instead |
| --- | --- |
| One screen needs a specific layout | Keep it in `apps/mobile/src/components/` |
| A component would only differ by a color or a label | Add a prop to the existing one |
| A wrapper that only forwards props | Use the underlying component directly |
| "We will probably need it later" | Wait until later |

`packages/ui-components` is for primitives that any screen could use. Anything
that knows about subscriptions, auth, or a specific screen belongs in
`apps/mobile/src/`.

---

## 3. Anatomy

One component, one file, flat in `src/`. No per-component folders, no
`Component.styles.ts`, no barrel files per component. `src/index.ts` is the only
public surface — if it is not exported there, it does not exist.

```
packages/ui-components/src/
├── Alert.tsx
├── Badge.tsx
├── Button.tsx
├── ...
├── theme/
│   ├── ThemeProvider.tsx
│   └── tokens.ts
└── index.ts
```

The shape every component follows:

```tsx
import { StyleSheet, View, type ViewProps } from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = ViewProps & {
  variant?: "elevated" | "outlined";
};

/** One line saying what it is for. */
export function Card({ children, style, variant = "outlined", ...props }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        { backgroundColor: theme.colors.surface.raised },
        variant === "outlined" ? outlinedStyle(theme) : styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  elevated: { elevation: 2 },
});
```

Notes on that shape:

- **Named `function` export.** No default exports, no `React.FC`, no `memo`
  until a profiler says so.
- **Relative imports carry the `.js` extension.** The package is NodeNext; this
  is not optional.
- **Static styles go in `StyleSheet.create` at the bottom.** Anything derived
  from the theme has to be an inline object — it cannot be static.

---

## 4. Props

- Always `type Props = { ... }`. Never `any`, never `interface`.
- **Extend the React Native type you wrap** — `ViewProps`, `PressableProps`,
  `TextInputProps` — so callers keep `testID`, `accessibilityLabel`, and the
  rest without us re-declaring them.
- **Variants are string unions, not booleans.** `variant="danger"` scales;
  `isDanger` plus `isGhost` produces impossible combinations.
- **Every component accepts `style`**, and applies it *last*. The caller always
  wins.
- Keep props alphabetical, in the type and in the destructuring. It removes the
  "where do I add this" question.
- Document a prop with a JSDoc line only when its behaviour is not obvious from
  the name — e.g. `/** Renders the dismiss control when provided. */`.

---

## 5. Styling

### Tokens or nothing

No literal color, font size, radius, or spacing value in a component. If the
value you need is not in `theme`, **add it to `tokens.ts`** — that is a two-line
diff and it keeps the design system honest. Adding `large` to `Button` meant
adding `components.button.largeHeight`, not writing `height: 54`.

The only literals we accept today are values the token set has no concept of:
the `Card` elevated shadow and the `Modal` backdrop scrim. Both are marked where
they are used. Do not grow that list without a reason.

### Style array order

Always the same five slots, in this order:

```tsx
style={[
  styles.base,        // static geometry
  { ...tokenValues }, // theme-derived
  variantStyle,       // what kind of thing it is
  stateStyle,         // disabled, loading, error
  style,              // the caller, always last
]}
```

### Variants resolve in a pure function

Nested ternaries inside JSX blow past the complexity limits in `CLAUDE.md` §6
and cannot be read at 3am. Extract a private function in the same file:

```tsx
function resolveVariant(theme: Theme, variant: ButtonVariant) {
  if (variant === "secondary") return { /* ... */ };
  if (variant === "danger") return { /* ... */ };
  return { /* primary */ };
}
```

Private function in the same file is the default extraction. A new file, a new
folder, or a new package needs a second caller first — see `CLAUDE.md` §7.

---

## 6. Accessibility

Not negotiable, and cheap if done while writing the component:

- Every interactive element gets an `accessibilityRole`.
- Elements with a changing state expose it: `accessibilityState={{ busy, disabled }}`.
- Controls without a visible text label get an `accessibilityLabel`
  (`"Dismiss"`, `"Close"`).
- Decorative visuals are hidden: `accessibilityElementsHidden` plus
  `importantForAccessibility="no-hide-descendants"`. `Icon` does this by default
  and only opts in when you pass `label`.
- A disabled or loading control is actually disabled, not just faded.

---

## 7. Testing

`packages/ui-components` has no test runner of its own. Component tests live in
`apps/mobile/src/test/` and import from `@subtrack/ui-components`, which mobile's
Jest maps to the package source.

What to test — the branches, not the pixels:

- Variant and size resolution.
- State behaviour: a `loading` button ignores presses, a non-dismissible alert
  has no dismiss control.
- Callbacks fire with the right argument.

Assert against **the token**, never against a hex string:

```tsx
expect(flattenStyle(getByRole("button")).backgroundColor).toBe(
  lightTheme.colors.brand.primary,
);
```

A test that hardcodes `"#1D9E75"` breaks the moment the brand changes, which is
exactly the change we want to be easy.

---

## 8. Marking deliberate shortcuts

When we ship the smaller version on purpose and it has a known ceiling, say so
in a comment: what the ceiling is, and what replaces it.

```tsx
// ponytail: the options render in the shared Modal instead of the native
// pickers, so iOS and Android behave identically without a picker dependency.
```

Two live examples: `Select` avoids a picker dependency this way, and `Icon` is a
render-prop wrapper because no icon package is installed yet. Both are fine.
Both are findable with `grep -rn "ponytail:"` when it is time to upgrade.

---

## 9. Checklist before opening the PR

- [ ] The design system defines this component, or a second screen needs it.
- [ ] No literal colors, sizes, radii, or spacing — tokens only.
- [ ] `type Props`, alphabetical, extends the underlying React Native props.
- [ ] Accepts `style` and applies it last.
- [ ] Variants resolved in a private function, not in JSX.
- [ ] Accessibility role, state, and labels are set.
- [ ] Exported from `src/index.ts`.
- [ ] Tests cover each branch and assert token values.
- [ ] Deliberate shortcuts carry a `ponytail:` comment.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass.
