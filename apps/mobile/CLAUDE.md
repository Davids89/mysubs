# Mobile CLAUDE.md

Mobile-specific conventions for `apps/mobile` and related React Native UI work.
Read this file before implementing any mobile task.

---

## App Structure

- This app uses Expo Router. Keep `apps/mobile/package.json` `main` set to `expo-router/entry`.
- Routes live under `apps/mobile/app/`.
  - Root providers and navigator configuration belong in `app/_layout.tsx`.
  - Screens should be rendered from route files such as `app/index.tsx`, not implemented inline there.
- App-specific code lives under `apps/mobile/src/`.
  - `src/screens/` contains screen components.
  - `src/hooks/` contains screen state, derived content, and effects.
  - `src/components/` contains app-local presentational components.
  - `src/test/` contains mobile test setup and shared test helpers.

## Component And Hook Rules

- One component per file. Component filenames use `PascalCase`, for example `HomeScreen.tsx`.
- Components should receive props and render. Do not put API calls, business logic, or complex state transitions directly in components.
- Move screen state, effects, and derived content into hooks such as `useHomeScreen.ts`.
- Props must be typed with `type Props = { ... }`; never use `any`.

## Theme And UI Primitives

- Reusable design tokens, theme providers, and shared UI primitives belong in `packages/ui-components`.
- Mobile screens should consume theme values through `ThemeProvider` and `useTheme` from `@subtrack/ui-components`.
- Keep `packages/ui-components` reusable. It may depend on React/React Native as peer dependencies, but it must not import from `apps/*`.
- Theme token types should allow valid custom themes in tests and future brand modes; avoid overly literal token types that make overrides impossible.

## Testing

- Mobile tests use Jest with `jest-expo` and `@testing-library/react-native`.
- Keep Jest aligned with the Expo preset peer range. For this project, Jest 29 works with `jest-expo`; avoid upgrading to Jest 30 unless the preset supports it.
- Use focused tests for screen rendering and provider behavior.
- When testing workspace TypeScript source with NodeNext `.js` import specifiers, keep the Jest mapper that resolves relative `.js` imports back to source files.
- Prefer `const { getByText } = render(...)` queries over relying on a global `screen` object.

## Scripts And Verification

- Mobile lint should cover `app` and `src`: `pnpm --filter @subtrack/mobile lint`.
- Mobile typecheck should include route and source files: `pnpm --filter @subtrack/mobile typecheck`.
- Mobile tests should run with: `pnpm --filter @subtrack/mobile test`.
- After mobile changes, also run root checks:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
- If package binaries disappear after filtered dependency changes, refresh workspace links with `pnpm install` and rerun verification.

## Running The App Locally

- Start Expo with `pnpm --filter @subtrack/mobile exec expo start`.
- Launch Android with `pnpm --filter @subtrack/mobile exec expo start --android`.
- If `adb` is not found, set the Android SDK environment for the command:

```sh
ANDROID_HOME="$HOME/Android/Sdk" \
ANDROID_SDK_ROOT="$HOME/Android/Sdk" \
PATH="$HOME/Android/Sdk/platform-tools:$HOME/Android/Sdk/emulator:$PATH" \
pnpm --filter @subtrack/mobile exec expo start --android
```

- Before launching Android, verify a device is visible with:

```sh
adb devices
```

If no device appears, start an emulator manually from Android Studio Device Manager or connect a physical device with USB debugging enabled.
