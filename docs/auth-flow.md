# Authentication Flow

This document explains the current Subtrack authentication flow for new teammates. It covers how registration and login move through the mobile app, shared packages, backend services, and the database.

For the wider system shape and the reasoning behind the current layering, see [architecture.md](./architecture.md).

## Big Picture

Authentication is split across the monorepo so each layer has one clear responsibility:

- `packages/shared-types` defines the request and response contracts with Zod schemas, used by both the mobile form and the backend.
- `packages/api-client` wraps the HTTP calls and validates API responses.
- `apps/mobile` renders auth screens, stores the issued token, and navigates after auth.
- `apps/backend` validates incoming requests, runs the auth service, hashes passwords, issues JWTs, and persists users with Prisma.

```mermaid
flowchart LR
  Mobile[Expo mobile app] --> ApiClient["@subtrack/api-client"]
  ApiClient --> Backend["Express /auth routes"]
  Backend --> Shared["@subtrack/shared-types Zod schemas"]
  Backend --> Service["auth.service.ts"]
  Service --> Security["bcrypt + jsonwebtoken"]
  Service --> DB[(PostgreSQL users table)]
  Mobile --> SecureStore["Expo SecureStore token cache"]
```

## Shared Contract

The auth API contract lives in `packages/shared-types/src/auth.ts`.

Registration accepts:

- `firstName`
- `lastName`
- `email`
- `password`
- `confirmPassword`

Login accepts:

- `email`
- `password`

Both endpoints return the same `AuthResponse`:

```ts
{
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
```

The shared response schema is parsed by `packages/api-client`, so mobile callers only receive data that matches the contract.

## Mobile Flow

Expo Router starts at `apps/mobile/app/index.tsx`, which redirects to `/(auth)/login`. The root layout wraps all routes in `ThemeProvider` and `AuthSessionProvider`.

```mermaid
flowchart TD
  Start["App opens /"] --> LoginRoute["Redirect to /(auth)/login"]
  LoginRoute --> LoginScreen["LoginScreen"]
  LoginScreen --> RegisterLink{"User taps register?"}
  RegisterLink -- yes --> RegisterScreen["RegisterScreen"]
  RegisterLink -- no --> SubmitLogin["Submit login form"]
  RegisterScreen --> SubmitRegister["Validate and submit registration form"]
  SubmitLogin --> AuthApi["authApiClient.login"]
  SubmitRegister --> AuthApiRegister["authApiClient.register"]
  AuthApi --> StoreToken["AuthSessionProvider.signIn stores token"]
  AuthApiRegister --> StoreToken
  StoreToken --> SecureStore["SecureStore: subtrack.authToken"]
  StoreToken --> Home["Navigate to /home or registration success"]
```

### Login

`LoginScreen` is presentational. State, submit behavior, and navigation live in `useLoginScreen`.

1. The user enters email and password.
2. `useLoginScreen.submit()` calls `authApiClient.login(form)`.
3. On success, `AuthSessionProvider.signIn(token)` writes the token to `SecureStore`.
4. The app navigates to `/home`.
5. On failure, the screen shows `Invalid email or password`.

### Registration

`RegisterScreen` is also presentational. State, validation, API calls, and navigation live in `useRegisterScreen`.

1. The user enters name, surname, email, password, and confirmation.
2. The hook validates the form with `registerUserRequestSchema` from `@subtrack/shared-types`.
3. If validation passes, it calls `authApiClient.register(form)`.
4. On success, the token is stored through `AuthSessionProvider.signIn(token)`.
5. The app navigates to `/(auth)/registration-success` with the user's first name.
6. The success screen can then navigate to `/home`.

## Backend Flow

The backend exposes two auth routes under `/auth`:

- `POST /auth/register`
- `POST /auth/login`

The router lives in `apps/backend/src/modules/auth/auth.controller.ts`. Controllers only validate and orchestrate. Use-case logic stays in `auth.service.ts`.

```mermaid
sequenceDiagram
  participant Client as Mobile/API client
  participant Controller as Auth controller
  participant Schema as Zod request schema
  participant Service as auth.service
  participant Security as bcrypt/jsonwebtoken
  participant DB as PostgreSQL

  Client->>Controller: POST /auth/register or /auth/login
  Controller->>Schema: parse request body
  Schema-->>Controller: typed request
  Controller->>Service: registerUser / loginUser
  Service->>DB: Prisma query via getPrismaClient()
  Service->>Security: hash/verify password, issue JWT
  Service-->>Controller: AuthResponse
  Controller-->>Client: 200/201 JSON
```

### Register

`registerUser` in `auth.service.ts` performs the registration use case:

1. Checks whether the email is already taken with `user.findUnique`.
2. Throws `EmailAlreadyExistsError` if the email is unavailable.
3. Hashes the password with bcrypt (12 salt rounds).
4. Creates the user with `user.create`.
5. Issues a JWT.
6. Returns the token and public user fields.

```mermaid
flowchart TD
  Register["POST /auth/register"] --> CheckEmail["Find user by email"]
  CheckEmail --> Exists{"User exists?"}
  Exists -- yes --> EmailError["EmailAlreadyExistsError"]
  Exists -- no --> Hash["Hash password with bcrypt"]
  Hash --> CreateUser["Create user in Prisma"]
  CreateUser --> IssueToken["Issue JWT"]
  IssueToken --> Response["Return AuthResponse"]
```

### Login

`loginUser` in `auth.service.ts` performs the login use case:

1. Finds the user by email.
2. Throws `InvalidCredentialsError` if no user exists.
3. Verifies the submitted password against the stored hash.
4. Throws `InvalidCredentialsError` if the password does not match.
5. Issues a JWT.
6. Returns the token and public user fields.

```mermaid
flowchart TD
  Login["POST /auth/login"] --> FindUser["Find user by email"]
  FindUser --> Found{"User found?"}
  Found -- no --> Invalid["InvalidCredentialsError"]
  Found -- yes --> Verify["Verify password with bcrypt"]
  Verify --> Match{"Password matches?"}
  Match -- no --> Invalid
  Match -- yes --> IssueToken["Issue JWT"]
  IssueToken --> Response["Return AuthResponse"]
```

## Token Behavior

Tokens are issued by `auth.service.ts`:

- Algorithm defaults to the `jsonwebtoken` library default.
- Subject is the user id.
- Payload includes `email`, `firstName`, and `lastName`.
- Expiration is `1h`.
- Secret comes from `JWT_SECRET`.
- In production, a missing `JWT_SECRET` throws when a token is issued.
- In development, the backend falls back to `development-jwt-secret`.

On mobile, the token is stored in Expo SecureStore under `subtrack.authToken`.

```mermaid
flowchart LR
  Backend["Backend issues JWT"] --> Mobile["Mobile receives AuthResponse"]
  Mobile --> SignIn["AuthSessionProvider.signIn"]
  SignIn --> SecureStore["SecureStore.setItemAsync"]
  SecureStore --> Later["App reload"]
  Later --> LoadToken["AuthSessionProvider loads token"]
```

## Error Handling

Errors are normalized by `apps/backend/src/shared/middleware/error.middleware.ts`.

- Zod validation errors return `400` with `VALIDATION_ERROR` and validation issues.
- Domain errors return their own status code, code, and message.
- Unknown errors return `500` with `INTERNAL_SERVER_ERROR`.

The auth domain currently uses:

- `EmailAlreadyExistsError` for duplicate registration emails.
- `InvalidCredentialsError` for missing users or password mismatches.

The mobile API client converts non-OK API responses into `Error` objects using the backend `message` field when available.

## Database Fields

Auth data is stored in the Prisma `User` model:

- `id`
- `firstName`
- `lastName`
- `email`
- `passwordHash`

The database column names are mapped to snake_case where needed, for example `first_name`, `last_name`, and `password_hash`.

## Current Limitations

The current branch implements the first auth slice. A few important pieces are not in place yet:

- There is no backend middleware yet that validates JWTs on protected routes (`US-AUTH-003`).
- The root route redirects on `AuthSessionProvider.token`, but `/home` itself is not guarded against a missing session (`US-AUTH-003`).
- `packages/api-client` does not attach the token to requests or handle `401` (`US-AUTH-003`).
- There is no refresh-token flow; JWTs expire after one hour.

