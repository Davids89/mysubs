import bcrypt from "bcryptjs";

import type {
  PasswordHasher,
  PasswordVerification,
} from "../../modules/auth/auth.types.js";

const SALT_ROUNDS = 12;

export class BcryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  verify({ hash, password }: PasswordVerification): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
