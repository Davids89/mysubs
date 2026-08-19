import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../generated/prisma/client.js";

const globalForPrisma = globalThis as typeof globalThis & {
  prismaClient?: PrismaClient;
};

/**
 * Created on first use rather than at import time, so importing a module that
 * touches the database does not require DATABASE_URL to be set.
 */
export const getPrismaClient = (): PrismaClient => {
  if (globalForPrisma.prismaClient) {
    return globalForPrisma.prismaClient;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize Prisma");
  }

  globalForPrisma.prismaClient = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  return globalForPrisma.prismaClient;
};
