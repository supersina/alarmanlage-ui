import { AlarmSystem, Sensor } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../prismaClient";
import { isAlarmSystem, isSensor } from "../../../validation/validation";

function validatePatch(
  alarmSystem: any
): alarmSystem is AlarmSystem & { sensors: Sensor[] } {
  alarmSystem.sensors.map((sensor: any) => {
    if (!isSensor(sensor)) return false;
  });
  if (!isAlarmSystem(alarmSystem)) return false;

  return true;
}

export type AlarmSystemGet = {
  id: string;
  isActive: boolean;
  name: string | null;
  sensors: {
    id: string;
    name: string;
    alarmSystemId: string;
    sensorCodeOpen: string;
    sensorCodeClosed: string;
    sensorEvents: {
      id: string;
      sensorId: string;
      sensorCode: string;
    }[];
  }[];
};

const alarmSystemHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (
    req.method !== "GET" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  ) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { alarmsystemId } = req.query;
  //check alarm systems of session user
  if (typeof alarmsystemId !== "string") {
    return res.status(405).json({
      message: "sensor update only possible for single alarmsystem",
    });
  }

  if (req.method == "GET") {
    //GET ALARM SYSTEM
    const alarmsystem = await prismaClient.alarmSystem.findMany({
      where: { userId: session?.user.id, id: alarmsystemId },
      select: {
        id: true,
        name: true,
        isActive: true,
        sensors: {
          select: {
            id: true,
            alarmSystemId: true,
            name: true,
            sensorCodeOpen: true,
            sensorCodeClosed: true,
            sensorEvents: {
              select: {
                id: true,
                sensorId: true,
                sensorCode: true,
              },
            },
          },
        },
      },
    });

    res.json(alarmsystem[0]);
  }

  //CHANGE ALARM SYSTEM
  if (req.method == "PATCH") {
    const alarmSystemData = JSON.parse(req.body);

    const isValidAlarmSystemData = validatePatch(alarmSystemData);
    if (!isValidAlarmSystemData) {
      return res.status(422).json({ message: "data invalid" });
    }
    const updatedAlarmSystem = await prismaClient.alarmSystem.updateMany({
      where: { userId: session?.user.id, id: alarmsystemId },

      data: {
        name: alarmSystemData.name,
        isActive: alarmSystemData.isActive,
      },
    });

    const sessionAlarmSystem = await prismaClient.alarmSystem.findMany({
      where: { userId: session?.user.id, id: alarmsystemId },
    });

    alarmSystemData.sensors.map(async (sensor: Sensor) => {
      const sens = await prismaClient.sensor.updateMany({
        where: {
          id: sensor.id,
          alarmSystemId: sessionAlarmSystem[0].id,
        },
        data: {
          alarmSystemId: alarmsystemId,
          name: sensor.name,
          sensorCodeOpen: sensor.sensorCodeOpen,
          sensorCodeClosed: sensor.sensorCodeClosed,
        },
      });
    });
    res.status(200).json({ message: "alarm system updated" });
  }

  //DELETE ALARM SYSTEM
  if (req.method == "DELETE") {
    const deleteAlarmsystem = await prismaClient.alarmSystem.deleteMany({
      where: { userId: session?.user.id, id: alarmsystemId },
    });

    res.status(200).json({ message: "alarm system deleted" });
  }
};

export default alarmSystemHandler;
