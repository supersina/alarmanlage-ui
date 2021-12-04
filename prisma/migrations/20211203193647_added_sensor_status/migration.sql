/*
  Warnings:

  - You are about to drop the column `place` on the `Alarm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alarm" DROP COLUMN "place",
ADD COLUMN     "sensor" TEXT;

-- CreateTable
CREATE TABLE "SensorStatus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "SensorStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SensorStatus" ADD CONSTRAINT "SensorStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
