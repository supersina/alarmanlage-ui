import { Sensor } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../../prismaClient";
import { validateSensorPost } from "../../../../validation/validation";

//POST

const sensorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const sensor = JSON.parse(req.body);

  const { alarmsystemId } = req.query;

  if (
    !alarmsystemId ||
    typeof alarmsystemId !== "string" ||
    !validateSensorPost(sensor)
  ) {
    return res.status(422).json({ message: "data invalid" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const sessionAlarmSystem = await prismaClient.alarmSystem.findMany({
    where: { userId: session?.user.id, id: alarmsystemId },
  });

  if (sessionAlarmSystem[0]) {
    const sens = await prismaClient.sensor.create({
      data: {
        alarmSystemId: alarmsystemId,
        name: sensor.name,
        sensorCodeOpen: sensor.sensorCodeOpen,
        sensorCodeClosed: sensor.sensorCodeClosed,
      },
    });
    res.json(sens);
  } else res.status(412).json({ message: "Precondition Failed" });
};

export default sensorHandler;
