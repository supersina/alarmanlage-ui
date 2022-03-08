import { AlarmSystem, Sensor } from "@prisma/client";

export function isAlarmSystem(alarmSystem: any): alarmSystem is AlarmSystem {
  if (
    !alarmSystem ||
    typeof alarmSystem.name != "string" ||
    typeof alarmSystem.isActive != "boolean"
  ) {
    return false;
  }
  return true;
}

export function isSensor(sensor: any): sensor is Sensor {
  if (
    typeof sensor.id != "string" ||
    typeof sensor.name != "string" ||
    typeof sensor.sensorCodeOpen != "string" ||
    typeof sensor.sensorCodeClosed != "string"
  ) {
    return false;
  }
  return true;
}

export function validateSensorPost(sensor: any): sensor is Sensor {
  if (
    typeof sensor.name != "string" ||
    typeof sensor.sensorCodeOpen != "string" ||
    typeof sensor.sensorCodeClosed != "string"
  ) {
    return false;
  }
  return true;
}
