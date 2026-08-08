import {
  loginUserRequestSchema,
  registerUserRequestSchema,
} from "@subtrack/shared-types";
import { Router } from "express";

import { loginUser, registerUser } from "./auth.service.js";

export const createAuthRouter = (): Router => {
  const router = Router();

  router.post("/register", async (request, response, next) => {
    try {
      const body = registerUserRequestSchema.parse(request.body);
      response.status(201).json(await registerUser(body));
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", async (request, response, next) => {
    try {
      const body = loginUserRequestSchema.parse(request.body);
      response.status(200).json(await loginUser(body));
    } catch (error) {
      next(error);
    }
  });

  return router;
};
