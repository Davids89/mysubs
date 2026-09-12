# Changelog — @subtrack/ui-components

Notable changes to the design system package: tokens, primitives, and the
Storybook that documents them.

The package is `private` — both apps consume it from source inside the monorepo,
so a version is a name for a set of changes, not something published. Versions
follow [semantic versioning](https://semver.org) as described in
[governance.md](../../docs/design-system/governance.md#1-versioning); releases
are cut on demand, not on a calendar.

**Add your entry under `Unreleased` in the same PR that changes the package.**

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Entries before `0.1.0` are grouped by the date they landed on `master`.

## Unreleased

## [0.1.0] - 2026-09-12

### Added

- Versioning and release process: this package is now versioned with semver,
  released on demand, and tagged `ui-components-vX.Y.Z`.
  See [governance.md](../../docs/design-system/governance.md).
- Component request and design change issue templates, so a request for a new
  primitive starts with the screens that need it.
- Usage guide (`docs/design-system/usage-guide.md`): setup, component inventory with
  accessibility notes, and the patterns screens already repeat.
- This changelog.
- True-size previews in `style-guide.md` for the palette, type and spacing
  scales, radii, borders, icons, and every component.

### Changed

- The design system docs moved into `docs/design-system/` behind a README:
  `style-guide.md` (was `subtrack-design-system.md`), `usage-guide.md`, and
  `contributing.md` (was `component-guidelines.md`).

## 2026-09-11

### Added

- Storybook on `@storybook/react-native-web-vite`, one story file per
  component, `autodocs` props tables, and the `a11y` addon running axe on every
  story. `make storybook` serves it; `.github/workflows/storybook.yml` builds on
  every PR touching the package and deploys `master` to GitHub Pages.
- `docs/design-system/contributing.md` §8 documenting how a story is written.

### Fixed

- Pinned `react-dom` to the `react` version Storybook renders with, so the
  preview stops warning about a mismatched renderer.
- `storybook` script frees port 6006 before starting.

## 2026-08-30

### Added

- The base component set, ten primitives, one file each, all exported from
  `src/index.ts`: `Alert`, `Badge`, `Button`, `Card`, `Icon`, `Modal`,
  `Select`, `Spinner`, `TextField`, and the `Typography` family (`Title`,
  `Subtitle`, `Body`, `Caption`).
- Component metrics in `tokens.ts` (`components.badge`, `components.button`,
  `components.emptyState`, `components.input`, `components.subscriptionCard`)
  so no primitive needs a literal size.
- `docs/design-system/contributing.md`: when to create a component, the file shape, props
  and styling rules, accessibility requirements, and the pre-PR checklist.

### Notes

- `Icon` defers the glyph to a `render` prop because no icon package is
  installed. `Select` renders its options in the shared `Modal` instead of the
  native pickers. Both are deliberate, both carry a `ponytail:` comment.

## 2026-08-08

### Removed

- `src/index.native.ts` (DESIGN-001.6). It re-exported the same symbols as
  `src/index.ts`, so the `react-native` entry point now points at `index.ts`
  and there is one public surface instead of two.

## 2026-06-27

### Added

- `lightTheme` and the `Theme` type in `src/theme/tokens.ts` — brand and
  semantic colors, surfaces, text roles, borders, spacing, radii, stroke
  widths, and the typography scale.
- `ThemeProvider` and `useTheme`, defaulting to `lightTheme` so components,
  tests, and stories work without a provider.
- The tokens applied across the mobile app, and the app renamed to Subtrack.
