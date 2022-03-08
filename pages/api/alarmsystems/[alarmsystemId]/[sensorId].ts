import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../../prismaClient";

const sensorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { alarmsystemId, sensorId } = req.query;

  if (
    !alarmsystemId ||
    !sensorId ||
    typeof alarmsystemId !== "string" ||
    typeof sensorId !== "string"
  ) {
    return res.status(422).json({ message: "data invalid" });
  }
  const session = await getSession({ req });

  //DELETE SENSOR
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method == "DELETE") {
    const system = await prismaClient.alarmSystem.findFirst({
      where: { userId: session?.user.id, id: alarmsystemId },
      select: {
        id: true,
        sensors: {
          select: {
            id: true,
          },
        },
      },
    });

    const sensor = system?.sensors.find((sensor) => sensor.id === sensorId);

    if (sensor) {
      const deleteSensor = await prismaClient.sensor.delete({
        where: {
          id: sensor.id,
        },
      });
      res.status(200).json({ message: "alarm system updated" });
    } else return res.status(405).json({ message: "data missing" });
  }
};

export default sensorHandler;
