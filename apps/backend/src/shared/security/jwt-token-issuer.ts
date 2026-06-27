import jwt from "jsonwebtoken";

import type {
  AuthUserRecord,
  TokenIssuer,
} from "../../modules/auth/auth.types.js";

const DEFAULT_EXPIRES_IN = "1h";

export class JwtTokenIssuer implements TokenIssuer {
  constructor(private readonly secret: string) {}

  issue(user: AuthUserRecord): string {
    return jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      this.secret,
      {
        expiresIn: DEFAULT_EXPIRES_IN,
        subject: user.id,
      },
    );
  }
}
