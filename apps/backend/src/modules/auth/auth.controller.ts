import {
  loginUserRequestSchema,
  registerUserRequestSchema,
} from "@subtrack/shared-types";
import { Router, type NextFunction, type Request, type Response } from "express";

import type {
  AuthRepository,
  PasswordHasher,
  TokenIssuer,
} from "./auth.types.js";
import { LoginUserHandler } from "./commands/login-user/login-user.handler.js";
import type { LoginUserCommand } from "./commands/login-user/login-user.command.js";
import { RegisterUserHandler } from "./commands/register-user/register-user.handler.js";
import type { RegisterUserCommand } from "./commands/register-user/register-user.command.js";

export type AuthRouterDependencies = {
  passwordHasher: PasswordHasher;
  repository: AuthRepository;
  tokenIssuer: TokenIssuer;
};

export const createAuthRouter = (
  dependencies: AuthRouterDependencies,
): Router => {
  const router = Router();
  const registerUserHandler = new RegisterUserHandler(dependencies);
  const loginUserHandler = new LoginUserHandler(dependencies);

  router.post("/register", async (request, response, next) => {
    await handleRegister(request, response, next, registerUserHandler);
  });

  router.post("/login", async (request, response, next) => {
    await handleLogin(request, response, next, loginUserHandler);
  });

  return router;
};

const handleRegister = async (
  request: Request,
  response: Response,
  next: NextFunction,
  handler: RegisterUserHandler,
): Promise<void> => {
  try {
    const command: RegisterUserCommand = registerUserRequestSchema.parse(
      request.body,
    );
    const result = await handler.execute(command);
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (
  request: Request,
  response: Response,
  next: NextFunction,
  handler: LoginUserHandler,
): Promise<void> => {
  try {
    const command: LoginUserCommand = loginUserRequestSchema.parse(
      request.body,
    );
    const result = await handler.execute(command);
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
