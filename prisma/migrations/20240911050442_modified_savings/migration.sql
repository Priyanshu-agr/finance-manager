/*
  Warnings:

  - You are about to drop the `Savings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Savings" DROP CONSTRAINT "Savings_user_id_fkey";

-- DropTable
DROP TABLE "Savings";

-- CreateTable
CREATE TABLE "savings" (
    "id" SERIAL NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "targetDate" DATE NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "savings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "savings_user_id_key" ON "savings"("user_id");

-- AddForeignKey
ALTER TABLE "savings" ADD CONSTRAINT "savings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
