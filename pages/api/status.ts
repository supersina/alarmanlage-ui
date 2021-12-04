import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prismaClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log(userData);

  const savedAlarms = await prismaClient.alarm.findMany();
  res.json(savedAlarms);
};
