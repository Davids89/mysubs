import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      code: "VALIDATION_ERROR",
      issues: error.issues
    });
    return;
  }

  response.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Unexpected server error"
  });
};
