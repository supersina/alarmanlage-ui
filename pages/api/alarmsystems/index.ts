import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../prismaClient";

//POST, GET

const alarmSystemHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (req.method !== "GET" && req.method !== "POST") {
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
};

export default alarmSystemHandler;
