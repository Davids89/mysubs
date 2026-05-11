# AGENTS.md

Architecture guide, conventions, and best practices for this monorepo.
AI agents must read and apply these rules in **all** code interactions.

---

## 1. Monorepo Structure

monorepo/
├── apps/
│   ├── backend/          # Node.js — REST/GraphQL API
│   │   └── spec/         # Backend tests mirroring routes/use cases
│   └── mobile/           # React Native + Expo
├── packages/
│   ├── shared-types/     # Shared Interfaces, enums, Zod schemas
│   ├── api-client/       # Typed HTTP Wrapper (generated or manual)
│   ├── business-logic/   # Validations and pure utilities (no I/O)
│   ├── ui-components/    # React Native Design System
│   └── config/           # Base tsconfig, eslint config, prettier
├── turbo.json
├── pnpm-workspace.yaml
└── package.json


**Dependency Rules:**
* `apps/*` can import from `packages/*`.
* `packages/*` **never** import from `apps/*`.
* `packages/business-logic` and `packages/shared-types` have no I/O dependencies (no fetch, fs, DB).

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + TypeScript + Express or Fastify |
| Mobile | React Native + Expo SDK + TypeScript |
| Shared Types | Zod (runtime validation) + TypeScript (static typing) |
| ORM | Prisma or TypeORM (in `backend/`) |
| Tests | Vitest (backend and packages) · Jest + Testing Library (mobile) |
| Package Manager | pnpm workspaces |
| Build Orchestration | Turborepo |
| CI/CD | GitHub Actions + EAS Build (mobile) |

---

## 3. Backend Architecture — CQRS

### Mandatory Flow

HTTP Request
└── Controller
├── Command → CommandHandler → Repository(ies)
└── Query   → QueryHandler  → Repository(ies)


* **Controllers** only orchestrate: validate the request with Zod, instantiate the command/query, and return the HTTP response.
* Each **Command** or **Query** is an immutable class or type representing intent.
* Each **Handler** contains the logic for a single use case.
* **Repositories** encapsulate all data access.
* A handler **does not call another handler**.

### Folder Structure in `apps/backend/src/`

src/
├── modules/
│   └── [domain]/                  # e.g. users/, orders/, products/
│       ├── commands/
│       │   └── create-user/
│       │       ├── create-user.command.ts
│       │       ├── create-user.handler.ts
│       │       └── create-user.repository.ts
│       ├── queries/
│       │   └── get-user-by-id/
│       │       ├── get-user-by-id.query.ts
│       │       ├── get-user-by-id.handler.ts
│       │       └── get-user-by-id.repository.ts
│       └── [domain].controller.ts
├── shared/
│   ├── helpers/                    # Reusable pure functions
│   ├── middleware/                 # Auth, error handling, logging
│   └── errors/                    # Domain error classes
├── infrastructure/
│   ├── db/                         # Prisma/TypeORM configuration
│   └── http/                       # Express/Fastify setup
└── main.ts

### Test Structure in `apps/backend/spec/`

Backend tests live under `apps/backend/spec/` and mirror the route, module, or use case they verify.

spec/
├── health/
│   └── get-health.test.ts
└── [domain]/
    └── [use-case].test.ts


---

## 4. TDD — Test Driven Development

### Main Rule
**No handler, helper, or domain function is written without its test first.**

**Mandatory Flow:**
1. Write the test describing expected behavior (Red).
2. Write the minimum code to make it pass (Green).
3. Refactor while keeping the test Green.

---

## 5. Naming Conventions

### General (TypeScript — Backend and Mobile)
| Element | Convention | Example |
|---|---|---|
| Variables & Parameters | descriptive `camelCase` | `userEmail`, `isEmailVerified` |
| Module Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_ATTEMPTS` |
| Functions & Methods | `camelCase`, verb + noun | `getUserById`, `sendVerificationEmail` |
| Classes & Interfaces | `PascalCase` | `CreateUserHandler`, `UserRepository` |
| Types & Enums | `PascalCase` | `UserStatus`, `OrderState` |
| Files | `kebab-case` | `create-user.handler.ts` |
| Folders | `kebab-case` | `shared-types/`, `create-user/` |
| Tests | behavior/use-case name + `.test.ts` in `spec/` | `create-user.test.ts` |

---

## 6. Method Size and Complexity

### Limits
| Rule | Limit |
|---|---|
| Lines per function/method | **maximum 20** |
| Parameters per function | **maximum 3** (use an object if more are needed) |
| Indentation levels | **maximum 2** |
| Cyclomatic complexity per function | **maximum 5** |

If a function exceeds any of these limits, it **must be split** before committing.

---

## 7. Code Reuse

### Extraction Hierarchy
1. **`packages/business-logic`** — if logic is pure and cross-platform.
2. **`apps/backend/src/shared/helpers/`** — if it's backend-specific shared logic.
3. **Module-local helper** — if it only applies to that specific domain.
4. **Private function in the same file** — if it's only used in one place but improves readability.

---

## 8. Error Handling

* Use domain error classes, never generic strings.
* Define errors in `apps/backend/src/shared/errors/`.
* Global error middleware maps everything to HTTP responses.

---

## 9. React Native Conventions (Mobile)

* One component per file. Filename = Component name (`UserCard.tsx`).
* State logic and effects go in a custom hook (`useUserCard.ts`), not in the component.
* Components only receive props and render; they do not call the API directly.
* Props are always typed with `type Props = { ... }`, never `any`.

---

## 10. General Rules Claude Must Always Apply

1. **Never generate code without tests** for handlers, helpers, and domain logic.
2. **Never duplicate code** that already exists in `packages/` or `shared/helpers/`.
3. **Never put business logic in controllers** or React Native components.
4. **Never use `any`** in TypeScript.
5. **Always validate** external inputs with Zod at the system boundary.
6. **Always follow the CQRS pattern** for new backend use cases.
7. **Always name according to conventions** in section 5.
8. **Always split** methods that exceed size/complexity limits.
9. **Maintain the established style** when modifying existing modules.
10. Prefer the **simplest and most testable solution**.
