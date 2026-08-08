import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { create, findUnique } = vi.hoisted(() => ({
  create: vi.fn(),
  findUnique: vi.fn(),
}));

vi.mock("../../src/infrastructure/db/prisma-client.js", () => ({
  getPrismaClient: () => ({ user: { create, findUnique } }),
}));

const { createApp } = await import(
  "../../src/infrastructure/http/create-app.js"
);

const password = "password123";

const existingUser = {
  email: "ana@correo.com",
  firstName: "Ana",
  id: "4f3fc486-f04d-4c49-8f2a-d194a9a28a49",
  lastName: "García",
  passwordHash: bcrypt.hashSync(password, 4),
};

const registerPayload = {
  confirmPassword: password,
  email: existingUser.email,
  firstName: existingUser.firstName,
  lastName: existingUser.lastName,
  password,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("auth routes", () => {
  it("registers a new user", async () => {
    findUnique.mockResolvedValue(null);
    create.mockImplementation(async ({ data }) => ({
      ...data,
      id: existingUser.id,
    }));

    const response = await request(createApp())
      .post("/auth/register")
      .send(registerPayload);

    expect(response.status).toBe(201);
    expect(response.body.user).toEqual({
      email: existingUser.email,
      firstName: existingUser.firstName,
      id: existingUser.id,
      lastName: existingUser.lastName,
    });
    expect(typeof response.body.token).toBe("string");
  });

  it("stores the password hashed, never in plain text", async () => {
    findUnique.mockResolvedValue(null);
    create.mockImplementation(async ({ data }) => ({
      ...data,
      id: existingUser.id,
    }));

    await request(createApp()).post("/auth/register").send(registerPayload);

    const storedHash = create.mock.calls[0]?.[0].data.passwordHash;
    expect(storedHash).not.toBe(password);
    expect(await bcrypt.compare(password, storedHash)).toBe(true);
  });

  it("rejects duplicate registration emails", async () => {
    findUnique.mockResolvedValue(existingUser);

    const response = await request(createApp())
      .post("/auth/register")
      .send(registerPayload);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      code: "EMAIL_ALREADY_EXISTS",
      message: "This email already exists",
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("validates registration input", async () => {
    const response = await request(createApp()).post("/auth/register").send({
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
    findUnique.mockResolvedValue(existingUser);

    const response = await request(createApp())
      .post("/auth/login")
      .send({ email: existingUser.email, password });

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(response.body.user.email).toBe(existingUser.email);
  });

  it("rejects invalid login credentials", async () => {
    findUnique.mockResolvedValue(existingUser);

    const response = await request(createApp())
      .post("/auth/login")
      .send({ email: existingUser.email, password: "wrong-password" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password",
    });
  });

  it("rejects login for an unknown email", async () => {
    findUnique.mockResolvedValue(null);

    const response = await request(createApp())
      .post("/auth/login")
      .send({ email: "nobody@correo.com", password });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe("INVALID_CREDENTIALS");
  });
});
