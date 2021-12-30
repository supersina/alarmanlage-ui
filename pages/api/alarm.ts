import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prismaClient";

const alarmHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log("user data", userData);

  const alarmSystem = await prismaClient.alarmSystem.findMany();
  res.json(alarmSystem);
};

export default alarmHandler;
