import type {
  AuthRepository,
  AuthUserRecord,
  CreateAuthUserData,
} from "./auth.types.js";

type PrismaUser = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  passwordHash: string;
};

export class PrismaAuthRepository implements AuthRepository {
  async createUser(data: CreateAuthUserData): Promise<AuthUserRecord> {
    const prismaClient = await getPrismaClient();
    const user = await prismaClient.user.create({ data });
    return mapUser(user);
  }

  async findUserByEmail(email: string): Promise<AuthUserRecord | null> {
    const prismaClient = await getPrismaClient();
    const user = await prismaClient.user.findUnique({ where: { email } });
    return user ? mapUser(user) : null;
  }
}

const getPrismaClient = async () => {
  const module = await import("../../infrastructure/db/prisma-client.js");
  return module.prismaClient;
};

const mapUser = (user: PrismaUser): AuthUserRecord => ({
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  lastName: user.lastName,
  passwordHash: user.passwordHash,
});
