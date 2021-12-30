import { prismaClient } from "../prismaClient";
import { Prisma, AlarmSystem, User, Sensor, SensorEvent } from "@prisma/client";

async function seed() {
  const users = await Promise.all(
    getUsers().map((user) => {
      return prismaClient.user.create({ data: user });
    })
  );

  const alarmSystem = await Promise.all(
    getAlarmSystems().map((alarmSystem) => {
      return prismaClient.alarmSystem.create({ data: alarmSystem });
    })
  );

  const sensor = await Promise.all(
    getSensor().map((sensor) => {
      return prismaClient.sensor.create({ data: sensor });
    })
  );

  const sensorEvent = await Promise.all(
    getSensorEvent().map((sensorEvent) => {
      return prismaClient.sensorEvent.create({ data: sensorEvent });
    })
  );
}

seed();

function getUsers(): User[] {
  return [
    {
      id: "1",
      name: "Hairy Potter",
      email: "hairy.potter@hogwarts.de",
      image: null,
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Hagrid",
      email: "hagrid@hogwarts.de",
      image: null,
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Sina Sinsch",
      email: "sinschkoli@gmail.com",
      image: null,
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
function getAlarmSystems(): AlarmSystem[] {
  return [
    {
      id: "1",
      userId: "1",
      name: "Alarm System 1",
      apiToken: "ckweoyj9z000008la7nurdzx3",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      userId: "1",
      name: "Alarm System 2",
      apiToken: "ckweoywpa000108lag3tc8ftb",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      userId: "3",
      name: "Alarm System 3",
      apiToken: "ckweoyj9z000008la7nurderer",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      userId: "3",
      name: "Alarm System 4",
      apiToken: "ckweoywpa000108lag3tc8sds",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

function getSensor(): Sensor[] {
  return [
    {
      id: "1",
      alarmSystemId: "1",
      name: "Balkontuer",
      sensorCodeOpen: "11111",
      sensorCodeClosed: "11122",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      alarmSystemId: "1",
      name: "Kuechentuer",
      sensorCodeOpen: "22211",
      sensorCodeClosed: "22222",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      alarmSystemId: "2",
      name: "Wohnungstuer",
      sensorCodeOpen: "33311",
      sensorCodeClosed: "33322",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      alarmSystemId: "2",
      name: "Keller",
      sensorCodeOpen: "44411",
      sensorCodeClosed: "44422",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      alarmSystemId: "3",
      name: "Keller",
      sensorCodeOpen: "55511",
      sensorCodeClosed: "55522",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      alarmSystemId: "3",
      name: "Tolles Fenster",
      sensorCodeOpen: "66611",
      sensorCodeClosed: "66622",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      alarmSystemId: "4",
      name: "Tür",
      sensorCodeOpen: "77711",
      sensorCodeClosed: "77722",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8",
      alarmSystemId: "4",
      name: "Balkon",
      sensorCodeOpen: "88811",
      sensorCodeClosed: "88822",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

function getSensorEvent(): SensorEvent[] {
  return [
    {
      id: "1",
      sensorId: "1",
      sensorCode: "11111",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      sensorId: "1",
      sensorCode: "11122",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      sensorId: "2",
      sensorCode: "22211",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      sensorId: "3",
      sensorCode: "33322",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      sensorId: "4",
      sensorCode: "44411",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      sensorId: "5",
      sensorCode: "55511",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      sensorId: "5",
      sensorCode: "55522",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8",
      sensorId: "5",
      sensorCode: "55511",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "9",
      sensorId: "6",
      sensorCode: "66622",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "10",
      sensorId: "6",
      sensorCode: "66611",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "11",
      sensorId: "6",
      sensorCode: "66622",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "12",
      sensorId: "6",
      sensorCode: "66611",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "13",
      sensorId: "7",
      sensorCode: "77722",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "14",
      sensorId: "8",
      sensorCode: "88811",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "15",
      sensorId: "8",
      sensorCode: "88811",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
