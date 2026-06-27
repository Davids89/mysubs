import { BcryptPasswordHasher } from "../../shared/security/bcrypt-password-hasher.js";
import { JwtTokenIssuer } from "../../shared/security/jwt-token-issuer.js";
import { PrismaAuthRepository } from "./auth.repository.js";
import type { AuthRouterDependencies } from "./auth.controller.js";

export const createAuthDependencies = (): AuthRouterDependencies => ({
  passwordHasher: new BcryptPasswordHasher(),
  repository: new PrismaAuthRepository(),
  tokenIssuer: new JwtTokenIssuer(getJwtSecret()),
});

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required to initialize auth");
  }

  return secret ?? "development-jwt-secret";
};
