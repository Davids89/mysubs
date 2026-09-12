# Design System Governance

How a change to `packages/ui-components` gets proposed, approved, released, and
announced. Read [contributing.md](./contributing.md) for *how to build* a
component; this document covers everything around it.

---

## 1. Versioning

The package follows [semantic versioning](https://semver.org). It is `private`
and both apps consume it from source, so the version is not published anywhere
— it is the name a set of changes gets in the changelog and in git.

We are pre-1.0, which changes what the numbers mean:

| Bump | When |
| --- | --- |
| `MAJOR` (`1.0.0`) | Reserved. It lands when the component set stops moving, not before. |
| `MINOR` (`0.2.0`) | A new component, a new token, a new prop — **and any breaking change**, which pre-1.0 is allowed here. |
| `PATCH` (`0.1.1`) | A fix, a style correction, an accessibility repair, a docs-only change to the package. |

A change is **breaking** when a screen that compiles today stops compiling or
renders differently without touching its own code: a removed or renamed prop, a
removed export, a changed token value, a changed default.

The version lives in one place, `packages/ui-components/package.json`, and is
mirrored by a git tag: `ui-components-v0.2.0`.

---

## 2. Release process

**Cadence: on demand, never on a calendar.** A release is cut when `master` has
accumulated something a screen author would want to know about. In practice
that is every few merged PRs. Nothing waits for a release to be usable — the
apps already build from source.

**Who approves.** Every change needs two hats, and today one person wears both:

| Hat | Answers |
| --- | --- |
| Design | Does this match `style-guide.md`? If it does not, does the style guide change too? |
| Tech | Is it the smallest version that works, tokens-only, accessible, and documented in a story? |

When a second person joins, the rule becomes literal: the design hat reviews
before implementation starts, the tech hat reviews the PR.

**Cutting a release:**

1. Bump `version` in `packages/ui-components/package.json`.
2. In `CHANGELOG.md`, rename `## Unreleased` to `## [x.y.z] - YYYY-MM-DD` and open a fresh, empty `Unreleased`.
3. Merge to `master`. Storybook redeploys itself.
4. Tag it: `git tag ui-components-v0.2.0 && git push origin ui-components-v0.2.0`.

**Breaking changes.** Pre-1.0 they are allowed, but never silent:

- Deprecate first when it is cheap: keep the old prop working for one release, mark it `@deprecated` in the type with the replacement named.
- The changelog entry goes under `### Breaking Changes` and says what to do, not just what happened — "`Badge size` removed, use `variant`", not "removed `size`".
- Migrate the callers in the same PR. A breaking change that leaves `apps/mobile` broken does not merge.

---

## 3. Changelog

[`packages/ui-components/CHANGELOG.md`](../../packages/ui-components/CHANGELOG.md),
in [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format. It sits next
to the package so the PR that changes a component edits both files in the same
tree.

**Add your entry under `Unreleased` in the same PR that changes the package.**
Not afterwards, not at release time — at release time nobody remembers what the
diff was for. Write it for the person calling the component from a screen, not
for the person who wrote it.

---

## 4. Where the design system is published

| Surface | Where | Updated by |
| --- | --- | --- |
| Component playground | Storybook on GitHub Pages — https://davids89.github.io/mysubs/ | `.github/workflows/storybook.yml`, on every push to `master` |
| Specification | [style-guide.md](./style-guide.md) | The PR that changes the design |
| How to use it | [usage-guide.md](./usage-guide.md) | The PR that adds or changes a component |
| History | [CHANGELOG.md](../../packages/ui-components/CHANGELOG.md) | Every PR touching the package |

**Not on npm.** The package is `private`, and a registry only earns its place
when a project outside this monorepo needs the components. Until then,
publishing would be a release step that serves nobody. If that day comes: drop
`private`, keep the same version line, add a `prepublishOnly` build.

---

## 5. Review process

**Before implementation** — for a *new* component, or a change to a token:
open an issue (see §6) and settle the design question there. Does
`style-guide.md` already define this? Does a second screen actually need it?
Code written before that conversation tends to get thrown away.

**In the PR** — the author runs the checklist in
[contributing.md §10](./contributing.md#10-checklist-before-opening-the-pr). The
reviewer checks the four things that are expensive to fix later:

1. Tokens only — no raw hex, no magic numbers.
2. Accessibility — role, state, and label, verified by the `a11y` addon on the story.
3. The API is the smallest one that works — no prop nobody asked for.
4. The changelog entry exists and reads like release notes.

---

## 6. Asking for a change

Everything goes through GitHub issues, so the conversation stays attached to
the work:

| I want to… | Open |
| --- | --- |
| Request a new component | [Component request](https://github.com/Davids89/mysubs/issues/new?template=component-request.md) |
| Propose a design change — a color, a size, a copy rule | [Design change](https://github.com/Davids89/mysubs/issues/new?template=design-change.md) |
| Report a component bug | A normal issue, prefixed `[ui-components]` |

Both templates ask the same first question, because it is the one that decides
the answer: **which screens need this, and what do they do today without it?**
One screen is not yet a component. Two screens is a component.
