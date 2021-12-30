import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../prismaClient";

// REST API Design
// GET /resource/<id>/relation/<id>
// GET /alarmsystems --> response: await prismaClient.alarmSystem.findMany({where: {userId: session.user.id}});
// GET /alarmsystems/12 --> response: prismaClient.alarmSystem.findUnique({where: {id: 12}})

// POST /alarmsystems --> response: prismaClient.alarmSystem.create({where: {userId: session.user.id}})
// PATCH /alarmsystems/12 --> response: prismaClient.alarmSystem.findUnique({where: {id: 12}})
// Nicht machen: GET /users/1/alarmsystems

const alarmSystemHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  console.log("api req headers", req.headers);
  console.log("getSession: ", session);

  if (req.method !== "GET") {
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
    console.log("alarmSystem = ", alarmsystems);
    res.json({ alarmsystems });
  }
};

export default alarmSystemHandler;
