export type AuthUserRecord = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  passwordHash: string;
};

export type CreateAuthUserData = {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

export type PasswordVerification = {
  hash: string;
  password: string;
};

export type AuthRepository = {
  createUser(data: CreateAuthUserData): Promise<AuthUserRecord>;
  findUserByEmail(email: string): Promise<AuthUserRecord | null>;
};

export type PasswordHasher = {
  hash(password: string): Promise<string>;
  verify(verification: PasswordVerification): Promise<boolean>;
};

export type TokenIssuer = {
  issue(user: AuthUserRecord): string;
};
