import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../prismaClient";
import { useRouter } from "next/router";

const alarmSystemHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method == "GET") {
    const alarmsystems = await prismaClient.alarmSystem.findMany({
      where: { userId: session?.user.id },
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

    res.json({ alarmsystems });
  }

  if (req.method == "PATCH") {
    const alarmSystemData = JSON.parse(req.body);
    console.log("Sensoren:", alarmSystemData.sensors);
    const updatedAlarmSystem = await prismaClient.alarmSystem.updateMany({
      where: { userId: session?.user.id, id: alarmSystemData.id },

      data: {
        name: alarmSystemData.name,
        isActive: alarmSystemData.isActive,
      },
    });

    //check alarm systems of session user
    const { alarmsystemId } = req.query;
    console.log("Alarm Id: ", alarmsystemId);

    if (typeof alarmsystemId !== "string") {
      return res.status(405).json({
        message: "sensor update only possible for single alarmsystem",
      });
    }

    const sessionAlarmSystem = await prismaClient.alarmSystem.findMany({
      where: { userId: session?.user.id, id: alarmsystemId },
    });

    console.log("Session users alarm system: ", sessionAlarmSystem[0]);

    alarmSystemData.sensors.map(async (sensor) => {
      const sens = await prismaClient.sensor.updateMany({
        where: {
          id: sensor.id,
          alarmSystemId: sessionAlarmSystem[0].id,
        },
        data: {
          alarmSystemId: sensor.alarmSystemId,
          name: sensor.name,
          sensorCodeOpen: sensor.sensorCodeOpen,
          sensorCodeClosed: sensor.sensorCodeClosed,
        },
      });
    });

    res.status(200).json({ message: "alarm system updated" });
  }
};

export default alarmSystemHandler;
