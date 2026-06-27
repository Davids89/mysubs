import { DomainError } from "./domain-error.js";

export class EmailAlreadyExistsError extends DomainError {
  readonly code = "EMAIL_ALREADY_EXISTS";
  readonly statusCode = 409;

  constructor() {
    super("This email already exists");
  }
}
