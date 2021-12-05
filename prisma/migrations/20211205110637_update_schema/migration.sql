/*
  Warnings:

  - You are about to drop the `Alarm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensorStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alarm" DROP CONSTRAINT "Alarm_userId_fkey";

-- DropForeignKey
ALTER TABLE "SensorStatus" DROP CONSTRAINT "SensorStatus_userId_fkey";

-- DropTable
DROP TABLE "Alarm";

-- DropTable
DROP TABLE "SensorStatus";

-- CreateTable
CREATE TABLE "AlarmSystem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlarmSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "alarmSystemId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sensorCodeOpen" TEXT NOT NULL,
    "sensorCodeClosed" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorEvent" (
    "id" SERIAL NOT NULL,
    "sensorId" INTEGER NOT NULL,
    "sensorCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlarmSystem" ADD CONSTRAINT "AlarmSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_alarmSystemId_fkey" FOREIGN KEY ("alarmSystemId") REFERENCES "AlarmSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorEvent" ADD CONSTRAINT "SensorEvent_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
