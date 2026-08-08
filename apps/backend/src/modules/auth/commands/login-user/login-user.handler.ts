import type { AuthResponse } from "@subtrack/shared-types";

import { InvalidCredentialsError } from "../../../../shared/errors/invalid-credentials.error.js";
import type {
  AuthRepository,
  PasswordHasher,
  TokenIssuer,
} from "../../auth.types.js";
import type { LoginUserCommand } from "./login-user.command.js";

type Dependencies = {
  passwordHasher: PasswordHasher;
  repository: AuthRepository;
  tokenIssuer: TokenIssuer;
};

export class LoginUserHandler {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(command: LoginUserCommand): Promise<AuthResponse> {
    const user = await this.dependencies.repository.findUserByEmail(
      command.email,
    );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    await this.ensurePasswordMatches(command.password, user.passwordHash);

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

  private async ensurePasswordMatches(
    password: string,
    hash: string,
  ): Promise<void> {
    const isValid = await this.dependencies.passwordHasher.verify({
      hash,
      password,
    });

    if (!isValid) {
      throw new InvalidCredentialsError();
    }
  }
}
