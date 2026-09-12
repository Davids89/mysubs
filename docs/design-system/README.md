# Subtrack Design System

The visual language of Subtrack and the React Native components that implement
it. Tokens, ten primitives, one theme, and the rules that keep them small.

The code lives in [`packages/ui-components`](../../packages/ui-components).
Everything renders in Storybook:

```bash
make storybook      # http://localhost:6006
```

`master` builds and deploys it to GitHub Pages through
[`.github/workflows/storybook.yml`](../../.github/workflows/storybook.yml).

---

## Start here

| I want to… | Read |
| --- | --- |
| Know what a screen should look like — colors, type, spacing, copy | [style-guide.md](./style-guide.md) |
| Use the components in a screen | [usage-guide.md](./usage-guide.md) |
| Add or change a component | [contributing.md](./contributing.md) |
| See what changed and when | [CHANGELOG.md](../../packages/ui-components/CHANGELOG.md) |

The changelog stays next to the package on purpose: the PR that changes a
component edits both files in the same tree.

---

## Philosophy

- **Accessibility-first.** Roles, states, and labels are written with the
  component, not retrofitted. A control that looks disabled *is* disabled, and
  every story is checked by the `a11y` addon before the PR opens.
- **Mobile-first.** The primitives are React Native. Storybook renders them
  through `react-native-web` for documentation; the device is the real target.
- **Tokens are the vocabulary.** A component composes decisions that already
  exist in `tokens.ts`. It does not invent a color, a size, or a radius, and
  neither does a screen.
- **Primitives are dumb.** They take props and render. State, data, and
  navigation live in the app.
- **The smallest set that works.** A component is a promise to maintain
  something forever, so it earns its place by being needed twice. Ten
  primitives today; the eleventh waits for a second caller.
- **Deliberate shortcuts are written down, not hidden.** Where we shipped the
  smaller version on purpose, a `ponytail:` comment names the ceiling and what
  replaces it. `grep -rn "ponytail:" packages/ui-components` finds them all.

---

## What exists today

`Alert`, `Badge`, `Button`, `Card`, `Icon`, `Modal`, `Select`, `Spinner`,
`TextField`, and the `Typography` family (`Title`, `Subtitle`, `Body`,
`Caption`) — all exported from `@subtrack/ui-components`, all with a story.

The full inventory, with per-component accessibility notes and the known gaps
(no icon package, no dark theme yet), is in
[usage-guide.md §3](./usage-guide.md#3-component-inventory).

There is no Figma file. This folder plus Storybook are the design source of
truth; if a Figma library ever exists, link it here.
