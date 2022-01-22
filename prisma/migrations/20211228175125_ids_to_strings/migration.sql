/*
  Warnings:

  - The primary key for the `AlarmSystem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sensor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SensorEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `verification_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AlarmSystem" DROP CONSTRAINT "AlarmSystem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_alarmSystemId_fkey";

-- DropForeignKey
ALTER TABLE "SensorEvent" DROP CONSTRAINT "SensorEvent_sensorId_fkey";

-- AlterTable
ALTER TABLE "AlarmSystem" DROP CONSTRAINT "AlarmSystem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AlarmSystem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AlarmSystem_id_seq";

-- AlterTable
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "alarmSystemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sensor_id_seq";

-- AlterTable
ALTER TABLE "SensorEvent" DROP CONSTRAINT "SensorEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sensorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SensorEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SensorEvent_id_seq";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "accounts_id_seq";

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "sessions_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "verification_requests" DROP CONSTRAINT "verification_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "verification_requests_id_seq";

-- AddForeignKey
ALTER TABLE "AlarmSystem" ADD CONSTRAINT "AlarmSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_alarmSystemId_fkey" FOREIGN KEY ("alarmSystemId") REFERENCES "AlarmSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorEvent" ADD CONSTRAINT "SensorEvent_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
