/*
  Warnings:

  - A unique constraint covering the columns `[apiToken]` on the table `AlarmSystem` will be added. If there are existing duplicate values, this will fail.
  - The required column `apiToken` was added to the `AlarmSystem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "AlarmSystem" ADD COLUMN     "apiToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AlarmSystem_apiToken_key" ON "AlarmSystem"("apiToken");
