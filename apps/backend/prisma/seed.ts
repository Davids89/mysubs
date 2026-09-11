import "dotenv/config";
import bcrypt from "bcryptjs";

import { getPrismaClient } from "../src/infrastructure/db/prisma-client.js";

const SALT_ROUNDS = 12;

const DEV_USER = {
  email: "user@email.com",
  firstName: "Dev",
  lastName: "User",
  password: "pass123",
};

const seedDevUser = async (): Promise<void> => {
  const passwordHash = await bcrypt.hash(DEV_USER.password, SALT_ROUNDS);

  await getPrismaClient().user.upsert({
    where: { email: DEV_USER.email },
    update: { passwordHash },
    create: {
      email: DEV_USER.email,
      firstName: DEV_USER.firstName,
      lastName: DEV_USER.lastName,
      passwordHash,
    },
  });

  console.log(`Seeded dev user ${DEV_USER.email} / ${DEV_USER.password}`);
};

await seedDevUser();
