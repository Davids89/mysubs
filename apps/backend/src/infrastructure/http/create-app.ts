import express, { type Express } from "express";

import { createAuthRouter } from "../../modules/auth/auth.controller.js";
import { errorMiddleware } from "../../shared/middleware/error.middleware.js";

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });
  app.use("/auth", createAuthRouter());
  app.use(errorMiddleware);

  return app;
};
