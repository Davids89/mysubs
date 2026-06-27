import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import {
  createAuthRouter,
  type AuthRouterDependencies,
} from "../../src/modules/auth/auth.controller.js";
import { errorMiddleware } from "../../src/shared/middleware/error.middleware.js";

const existingUser = {
  email: "ana@correo.com",
  firstName: "Ana",
  id: "4f3fc486-f04d-4c49-8f2a-d194a9a28a49",
  lastName: "García",
  passwordHash: "hashed-password123",
};

const createTestApp = (overrides: Partial<AuthRouterDependencies> = {}) => {
  const app = express();

  app.use(express.json());
  app.use("/auth", createAuthRouter(createDependencies(overrides)));
  app.use(errorMiddleware);

  return app;
};

const createDependencies = (
  overrides: Partial<AuthRouterDependencies>,
): AuthRouterDependencies => ({
  passwordHasher: {
    hash: async (password) => `hashed-${password}`,
    verify: async ({ hash, password }) => hash === `hashed-${password}`,
  },
  repository: {
    createUser: async (data) => ({
      ...data,
      id: existingUser.id,
      passwordHash: data.passwordHash,
    }),
    findUserByEmail: async () => null,
  },
  tokenIssuer: {
    issue: () => "signed-token",
  },
  ...overrides,
});

describe("auth routes", () => {
  it("registers a new user", async () => {
    const response = await request(createTestApp()).post("/auth/register").send({
      confirmPassword: "password123",
      email: "ana@correo.com",
      firstName: "Ana",
      lastName: "García",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      token: "signed-token",
      user: {
        email: "ana@correo.com",
        firstName: "Ana",
        id: existingUser.id,
        lastName: "García",
      },
    });
  });

  it("rejects duplicate registration emails", async () => {
    const response = await request(
      createTestApp({
        repository: {
          createUser: async () => existingUser,
          findUserByEmail: async () => existingUser,
        },
      }),
    )
      .post("/auth/register")
      .send({
        confirmPassword: "password123",
        email: "ana@correo.com",
        firstName: "Ana",
        lastName: "García",
        password: "password123",
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      code: "EMAIL_ALREADY_EXISTS",
      message: "This email already exists",
    });
  });

  it("validates registration input", async () => {
    const response = await request(createTestApp()).post("/auth/register").send({
      confirmPassword: "password124",
      email: "ana",
      firstName: "",
      lastName: "García",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe("VALIDATION_ERROR");
  });

  it("logs in an existing user", async () => {
    const response = await request(
      createTestApp({
        repository: {
          createUser: async () => existingUser,
          findUserByEmail: async () => existingUser,
        },
      }),
    )
      .post("/auth/login")
      .send({
        email: "ana@correo.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("signed-token");
  });

  it("rejects invalid login credentials", async () => {
    const response = await request(
      createTestApp({
        repository: {
          createUser: async () => existingUser,
          findUserByEmail: async () => existingUser,
        },
      }),
    )
      .post("/auth/login")
      .send({
        email: "ana@correo.com",
        password: "wrong-password",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password",
    });
  });
});
