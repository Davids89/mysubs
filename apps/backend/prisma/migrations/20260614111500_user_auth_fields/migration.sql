ALTER TABLE "users"
  DROP COLUMN "birthday",
  DROP COLUMN "country",
  DROP COLUMN "name",
  ADD COLUMN "first_name" TEXT NOT NULL,
  ADD COLUMN "last_name" TEXT NOT NULL,
  ADD COLUMN "password_hash" TEXT NOT NULL;

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
