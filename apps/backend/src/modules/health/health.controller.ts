import { Router, type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

import { GetHealthHandler } from "./queries/get-health/get-health.handler.js";
import type { GetHealthQuery } from "./queries/get-health/get-health.query.js";

const getHealthRequestSchema = z.object({}).strict();

export const createHealthRouter = (): Router => {
  const router = Router();
  const getHealthHandler = new GetHealthHandler();

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    try {
      const query = validateGetHealthRequest(request);
      response.status(200).json(getHealthHandler.execute(query));
    } catch (error) {
      next(error);
    }
  });

  return router;
};

const validateGetHealthRequest = (request: Request): GetHealthQuery => {
  getHealthRequestSchema.parse(request.query);
  return {};
};
