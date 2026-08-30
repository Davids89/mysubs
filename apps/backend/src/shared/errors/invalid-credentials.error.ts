import { DomainError } from "./domain-error.js";

export class InvalidCredentialsError extends DomainError {
  readonly code = "INVALID_CREDENTIALS";
  readonly statusCode = 401;

  constructor() {
    super("Email or password incorrect");
  }
}
