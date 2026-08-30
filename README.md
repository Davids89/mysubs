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
make up                          # Postgres + backend in Docker on :3000
pnpm --filter @subtrack/backend db:migrate
make mobile-android              # or: pnpm --filter @subtrack/mobile dev
```

Without Docker: run your own Postgres, point `DATABASE_URL` at it, then
`make backend-dev`.

Requires Node 20+, pnpm 9, Docker (optional), and the Android SDK for
`make mobile-android`.

## Commands

`make help` lists them all. The ones you'll use:

```bash
make dev            # all dev tasks via Turborepo
make test           # all tests
make test-backend   # backend only
make build          # build every package
make down           # stop Docker services
```

Backend database scripts live in `apps/backend/package.json`: `db:migrate`,
`db:deploy`, `db:generate`, `db:studio`.

## API

| Method | Path                 | Body                                      |
| ------ | -------------------- | ----------------------------------------- |
| GET    | `/health`        | —                                         |
| POST   | `/auth/register` | firstName, lastName, email, password      |
| POST   | `/auth/login`    | email, password → JWT                     |

## Docs

- `docs/architecture.md` — diagrams and why the structure is this small
- `docs/auth-flow.md` — registration and login end to end
- `docs/subtrack-design-system.md` — colors, typography, components
- `CLAUDE.md` — conventions AI agents (and humans) follow here

## License

MIT — see `LICENSE`.
