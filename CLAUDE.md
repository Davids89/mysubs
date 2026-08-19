# CLAUDE.md

Architecture guide, conventions, and best practices for this monorepo.
AI agents must read and apply these rules in **all** code interactions.

> **Guiding principle:** this is a pre-MVP product. Prefer the smallest thing
> that works. Add a layer when a second caller appears, not before. If you find
> yourself writing an interface with one implementation, stop and inline it.
>
> See `docs/architecture.md` for the diagrams and the reasoning behind the
> current structure.

---

## Design System

- Before changing UI, mobile screens, or shared design tokens, read and follow `docs/subtrack-design-system.md`.
- The Subtrack design system is the source of truth for identity, colors, typography, spacing, radii, borders, components, screen structure, and UI copy rules.
- Reusable design tokens, theme providers, and shared UI primitives belong in `packages/ui-components`.

---

## 1. Monorepo Structure

```
monorepo/
├── apps/
│   ├── backend/          # Node.js — REST
│   │   └── spec/         # Backend tests mirroring routes/use cases
│   └── mobile/           # React Native + Expo
├── packages/
│   ├── shared-types/     # Zod schemas + inferred types, shared by both apps
│   ├── api-client/       # Typed HTTP wrapper
│   └── ui-components/    # React Native design system
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Dependency Rules:**

- `apps/*` can import from `packages/*`.
- `packages/*` **never** import from `apps/*`.
- `packages/shared-types` has no I/O dependencies (no fetch, fs, DB).

**A package must earn its place.** Create one only when code is genuinely
consumed by both apps. Backend-only helpers live in
`apps/backend/src/shared/`; mobile-only helpers live in `apps/mobile/src/`.

---

## 2. Tech Stack

| Layer               | Technology                                                      |
| ------------------- | --------------------------------------------------------------- |
| Backend             | Node.js + TypeScript + Express                                  |
| Mobile              | React Native + Expo SDK + TypeScript                            |
| Shared Types        | Zod (runtime validation) + TypeScript (static typing)           |
| ORM                 | Prisma 7 + PostgreSQL                                           |
| Tests               | Vitest (backend and packages) · Jest + Testing Library (mobile) |
| Package Manager     | pnpm workspaces                                                 |
| Build Orchestration | Turborepo                                                       |
| CI/CD               | GitHub Actions + EAS Build (mobile)                             |

---

## 3. Backend Architecture

### Flow

```
HTTP Request
└── Controller (Express router)
    └── Service function
        └── Prisma
```

- **Controllers** validate the request body with a Zod schema from
  `@subtrack/shared-types`, call a service function, and return the response.
  Errors go to `next(error)` and the global error middleware maps them.
- **Services** hold the use-case logic. They are plain exported **functions**,
  not classes, and they call Prisma directly.
- Business rules that reject a request throw a domain error from
  `shared/errors/`; the middleware turns it into the right status code.

### Folder Structure in `apps/backend/src/`

```
src/
├── modules/
│   └── [domain]/                  # e.g. auth/, subscriptions/, tags/
│       ├── [domain].controller.ts # routes + Zod validation
│       └── [domain].service.ts    # use-case functions
├── shared/
│   ├── errors/                    # Domain error classes
│   ├── helpers/                   # Reusable pure functions
│   └── middleware/                # Auth, error handling, logging
├── infrastructure/
│   ├── db/                        # Prisma client factory
│   └── http/                      # Express app assembly
└── main.ts
```

### When to add structure

Do **not** pre-split a module. Add the next layer only when one of these is
actually true:

| Add                                  | Only when                                                  |
| ------------------------------------ | ---------------------------------------------------------- |
| A repository module                  | The same query is needed by two or more services            |
| An interface / port                  | A second real implementation exists (not a test double)     |
| A separate file per use case         | `[domain].service.ts` passes roughly 200 lines              |
| A new `packages/*` workspace         | Both apps import it                                        |

Test doubles are **not** a reason to introduce a port. Mock the module with
`vi.mock` instead — see section 4.

### Database / Prisma

- Before creating or changing Prisma models, inspect any ERD or schema attachment linked from the issue and treat it as the source of truth.
- The backend uses Prisma 7 with PostgreSQL. Use `prisma.config.ts`, an explicit generated client output, and the PostgreSQL adapter (`@prisma/adapter-pg`).
- Get the client with `getPrismaClient()` from `infrastructure/db/prisma-client.ts`. It builds the client on first use, so importing a module that touches the DB does not require `DATABASE_URL` at import time.
- For database setup tasks, update `docker-compose.yml`, `.env.example`, Prisma scripts, schema, and migrations together.
- After Prisma changes, run `prisma format`, backend build, and backend tests.

---

## 4. Testing

### Main Rule

**No service function, helper, or domain function is written without its test.**
Write the test first when the behavior is clear enough to describe (Red →
Green → Refactor).

### Backend

- Tests live under `apps/backend/spec/` and mirror the route or use case they verify.
- Prefer testing **through the Express router** with `supertest`, so validation,
  status codes, and error mapping are covered together.
- Isolate the database by mocking the Prisma client module:

```ts
const { create, findUnique } = vi.hoisted(() => ({
  create: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("../../src/infrastructure/db/prisma-client.js", () => ({
  getPrismaClient: () => ({ user: { create, findUnique } }),
}));
```

- Let bcrypt and jwt run for real; they are fast enough and the assertions are
  more honest.

```
spec/
├── health.test.ts
└── [domain]/
    └── [use-case].test.ts
```

### Mobile

- Jest with `jest-expo` and `@testing-library/react-native`.
- See `apps/mobile/CLAUDE.md`.

---

## 5. Naming Conventions

| Element                | Convention                                     | Example                                |
| ---------------------- | ---------------------------------------------- | -------------------------------------- |
| Variables & Parameters | descriptive `camelCase`                        | `userEmail`, `isEmailVerified`         |
| Module Constants       | `UPPER_SNAKE_CASE`                             | `MAX_RETRY_ATTEMPTS`                   |
| Functions & Methods    | `camelCase`, verb + noun                       | `getUserById`, `sendVerificationEmail` |
| Classes & Types        | `PascalCase`                                   | `EmailAlreadyExistsError`, `AuthUser`  |
| Types & Enums          | `PascalCase`                                   | `UserStatus`, `OrderState`             |
| Files                  | `kebab-case`                                   | `auth.service.ts`                      |
| Folders                | `kebab-case`                                   | `shared-types/`, `ui-components/`      |
| Tests                  | behavior/use-case name + `.test.ts` in `spec/` | `auth-routes.test.ts`                  |

---

## 6. Method Size and Complexity

| Rule                               | Limit                                            |
| ---------------------------------- | ------------------------------------------------ |
| Lines per function/method          | **maximum 20 (flexible)**                        |
| Parameters per function            | **maximum 3** (use an object if more are needed) |
| Indentation levels                 | **maximum 2**                                    |
| Cyclomatic complexity per function | **maximum 5**                                    |

If a function exceeds any of these limits, it **must be split** before committing.

Splitting means extracting a private function in the same file. It does not
mean creating a new class, file, or package.

---

## 7. Code Reuse

### Extraction Hierarchy

1. **Private function in the same file** — the default.
2. **Module-local helper** — if it only applies to that specific domain.
3. `**apps/backend/src/shared/helpers/`** — if it's backend-specific shared logic.
4. `**packages/shared-types`** — only if both apps need it.

Duplication is cheaper than the wrong abstraction. Wait for the third
occurrence before extracting.

---

## 8. Error Handling

- Use domain error classes, never generic strings.
- Define errors in `apps/backend/src/shared/errors/`.
- Global error middleware maps everything to HTTP responses.

---

## 9. React Native Conventions (Mobile)

- For any mobile task, also read and apply `apps/mobile/CLAUDE.md` before changing files under `apps/mobile/` or mobile-facing code in `packages/ui-components/`.
- One component per file. Filename = Component name (`UserCard.tsx`).
- State logic and effects go in a custom hook (`useUserCard.ts`), not in the component. A hook with no state and no effects is not a hook — inline it.
- Components only receive props and render; they do not call the API directly.
- Props are always typed with `type Props = { ... }`, never `any`.

---

## 10. General Rules Claude Must Always Apply

1. **Never generate code without tests** for service functions, helpers, and domain logic.
2. **Never duplicate code** that already exists in `packages/` or `shared/helpers/`.
3. **Never put business logic in controllers** or React Native components.
4. **Never use `any`** in TypeScript.
5. **Always validate** external inputs with Zod at the system boundary, reusing the schemas in `packages/shared-types`.
6. **Never add an abstraction for a single caller.** No interface with one implementation, no factory with one product, no wrapper that only delegates.
7. **Always name according to conventions** in section 5.
8. **Always split** methods that exceed size/complexity limits.
9. **Maintain the established style** when modifying existing modules.
10. Prefer the **simplest and most testable solution**. When two designs work, ship the shorter one.
