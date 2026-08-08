import type {
  AuthResponse,
  LoginUserRequest,
  RegisterUserRequest,
} from "@subtrack/shared-types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getPrismaClient } from "../../infrastructure/db/prisma-client.js";
import { EmailAlreadyExistsError } from "../../shared/errors/email-already-exists.error.js";
import { InvalidCredentialsError } from "../../shared/errors/invalid-credentials.error.js";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRES_IN = "1h";

type UserRecord = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  passwordHash: string;
};

export const registerUser = async (
  request: RegisterUserRequest,
): Promise<AuthResponse> => {
  const users = getPrismaClient().user;

  if (await users.findUnique({ where: { email: request.email } })) {
    throw new EmailAlreadyExistsError();
  }

  const user = await users.create({
    data: {
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      passwordHash: await bcrypt.hash(request.password, SALT_ROUNDS),
    },
  });

  return toAuthResponse(user);
};

export const loginUser = async (
  request: LoginUserRequest,
): Promise<AuthResponse> => {
  const user = await getPrismaClient().user.findUnique({
    where: { email: request.email },
  });

  if (!user || !(await bcrypt.compare(request.password, user.passwordHash))) {
    throw new InvalidCredentialsError();
  }

  return toAuthResponse(user);
};

const toAuthResponse = (user: UserRecord): AuthResponse => ({
  token: jwt.sign(
    { email: user.email, firstName: user.firstName, lastName: user.lastName },
    getJwtSecret(),
    { expiresIn: TOKEN_EXPIRES_IN, subject: user.id },
  ),
  user: {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    lastName: user.lastName,
  },
});

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required to initialize auth");
  }

  return secret ?? "development-jwt-secret";
};
