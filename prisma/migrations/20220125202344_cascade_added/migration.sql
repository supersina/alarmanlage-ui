-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_alarmSystemId_fkey";

-- DropForeignKey
ALTER TABLE "SensorEvent" DROP CONSTRAINT "SensorEvent_sensorId_fkey";

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_alarmSystemId_fkey" FOREIGN KEY ("alarmSystemId") REFERENCES "AlarmSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorEvent" ADD CONSTRAINT "SensorEvent_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
