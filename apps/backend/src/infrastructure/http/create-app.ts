import express, { type Express } from "express";

import { createAuthRouter } from "../../modules/auth/auth.controller.js";
import { createAuthDependencies } from "../../modules/auth/auth.dependencies.js";
import { createHealthRouter } from "../../modules/health/health.controller.js";
import { errorMiddleware } from "../../shared/middleware/error.middleware.js";

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use("/auth", createAuthRouter(createAuthDependencies()));
  app.use("/health", createHealthRouter());
  app.use(errorMiddleware);

  return app;
};
