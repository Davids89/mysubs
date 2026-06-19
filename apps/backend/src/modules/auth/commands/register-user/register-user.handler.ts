import type { AuthResponse } from "@mysubs/shared-types";

import type {
  AuthRepository,
  PasswordHasher,
  TokenIssuer,
} from "../../auth.types.js";
import { EmailAlreadyExistsError } from "../../../../shared/errors/email-already-exists.error.js";
import type { RegisterUserCommand } from "./register-user.command.js";

type Dependencies = {
  passwordHasher: PasswordHasher;
  repository: AuthRepository;
  tokenIssuer: TokenIssuer;
};

export class RegisterUserHandler {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(command: RegisterUserCommand): Promise<AuthResponse> {
    await this.ensureEmailIsAvailable(command.email);
    const passwordHash = await this.dependencies.passwordHasher.hash(
      command.password,
    );
    const user = await this.dependencies.repository.createUser({
      email: command.email,
      firstName: command.firstName,
      lastName: command.lastName,
      passwordHash,
    });

    return {
      token: this.dependencies.tokenIssuer.issue(user),
      user: {
        email: user.email,
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
      },
    };
  }

  private async ensureEmailIsAvailable(email: string): Promise<void> {
    const existingUser = await this.dependencies.repository.findUserByEmail(
      email,
    );

    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }
  }
}
