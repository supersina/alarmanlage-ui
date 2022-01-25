import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../../prismaClient";

//GET, POST

const alarmSystemHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!session) {
    return res.status(403).json({ message: "Forbidden" });
  }

  //GET ALARM SYSTEMS
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

  //CREATE ALARM SYSTEM
  if (req.method == "POST") {
    const alarmSystemData = JSON.parse(req.body);

    const usr = await prismaClient.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!usr) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const alarmsystem = await prismaClient.alarmSystem.create({
        data: {
          userId: session.user.id,
          name: alarmSystemData.name,
          isActive: alarmSystemData.isActive,
        },
      });
      res.json({ alarmsystem });
    }
  }
};

export default alarmSystemHandler;
