import { AlarmSystem, Sensor, SensorEvent, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../prismaClient";

export type UserGet = User & {
  alarmSystems: (AlarmSystem & {
    sensors: (Sensor & {
      sensorEvents: SensorEvent[];
    })[];
  })[];
};

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method == "GET") {
    const user = await prismaClient.user.findUnique({
      where: { id: session?.user.id },
      include: {
        alarmSystems: {
          include: {
            sensors: { include: { sensorEvents: true } },
          },
        },
      },
    });
    console.log("User Data: ", user);
    res.json(user);
  }

  if (req.method == "PATCH") {
    const userData = JSON.parse(req.body);

    if (
      (!userData &&
        (typeof userData.name != "string" ||
          typeof userData.name != "undefined")) ||
      (typeof userData.email != "string" &&
        (typeof userData.image != "string" ||
          typeof userData.image != "undefined"))
    ) {
      return res.status(422).json({ message: "Unvalid data" });
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: session?.user.id },

      data: {
        name: userData.name,
        email: userData.newEmail,
        image: userData.image,
      },
    });
    res.json(updatedUser);
  }
};

export default userHandler;
