# Subtrack

Track your subscriptions — what you pay for, when it renews, and which ones you
share with other people. Expo mobile app + Express/Postgres backend in a pnpm
monorepo.

Pre-MVP. Auth (register/login) and the home screen are in place.

## Stack

| Layer    | Tech                                              |
| -------- | ------------------------------------------------- |
| Backend  | Node.js · TypeScript · Express · Prisma 7 · Postgres 17 |
| Mobile   | React Native · Expo · Expo Router                 |
| Shared   | Zod schemas, typed API client, RN design system   |
| Tests    | Vitest (backend) · Jest + Testing Library (mobile) |
| Tooling  | pnpm workspaces · Turborepo · ESLint              |

## Layout

```
apps/backend         Express REST API (modules/ → controller + service → Prisma)
apps/mobile          Expo app (app/ routes → src/screens → src/hooks)
packages/shared-types  Zod schemas + inferred types, used by both apps
packages/api-client    Typed fetch wrapper over the REST API
packages/ui-components Design tokens, ThemeProvider, RN primitives
```

`apps/*` may import `packages/*`; never the other way round.

## Getting started

```bash
make install                     # pnpm install
cp apps/backend/.env.example apps/backend/.env
make upd                         # Postgres + backend on :3000, migrated and seeded
                                 # dev user: user@email.com / pass123
make mobile-android              # or: pnpm --filter @subtrack/mobile dev
```

`make upd` is idempotent — re-run it after pulling new migrations.

Without Docker: run your own Postgres, point `DATABASE_URL` at it, then
`pnpm --filter @subtrack/backend db:migrate`, `make db-seed` and
`make backend-dev`.

Requires Node 20+, pnpm 9, Docker (optional), and the Android SDK for
`make mobile-android`.

## Commands

`make help` lists them all. The ones you'll use:

```bash
make dev            # all dev tasks via Turborepo
make storybook      # component library at http://localhost:6006
make test           # all tests
make test-backend   # backend only
make build          # build every package
make upd            # start Docker services, migrate, seed
make down           # stop Docker services
make db-seed        # insert the dev user
make db-shell       # psql on the backend database
```

Backend database scripts live in `apps/backend/package.json`: `db:migrate`,
`db:deploy`, `db:generate`, `db:seed`, `db:studio`.

### Dev user

`make db-seed` (`apps/backend/prisma/seed.ts`) upserts a single account for
local testing:

| Email            | Password  |
| ---------------- | --------- |
| `user@email.com` | `pass123` |

Local development only — the seed is never run against a deployed database.
Inspect what landed in the DB with `make db-shell`, then e.g.
`select email, first_name from users;`.

## API

| Method | Path                 | Body                                      |
| ------ | -------------------- | ----------------------------------------- |
| GET    | `/health`        | —                                         |
| POST   | `/auth/register` | firstName, lastName, email, password      |
| POST   | `/auth/login`    | email, password → JWT                     |

## Design system

Ten React Native primitives, one theme, tokens for everything else, in
`packages/ui-components`. Accessibility-first, mobile-first, and deliberately
small — a component earns its place by being needed twice.

```bash
make storybook      # every component and variant at http://localhost:6006
```

`master` builds and deploys Storybook to GitHub Pages through
`.github/workflows/storybook.yml`. Start with
`docs/design-system-usage.md` to consume it, `docs/component-guidelines.md` to
change it.

## Docs

- `docs/architecture.md` — diagrams and why the structure is this small
- `docs/auth-flow.md` — registration and login end to end
- `docs/subtrack-design-system.md` — colors, typography, components
- `docs/design-system-usage.md` — using the components: inventory and patterns
- `docs/component-guidelines.md` — how we build components, and when not to
- `packages/ui-components/CHANGELOG.md` — what changed in the design system
- `CLAUDE.md` — conventions AI agents (and humans) follow here

## License

MIT — see `LICENSE`.
