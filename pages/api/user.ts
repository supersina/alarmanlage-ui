import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userData = JSON.parse(req.body);
  const savedUser = await prisma.user.create({ data: userData });

  res.json(savedUser);
  // if (method === "GET") {
  //   return res.status(200).json(prisma.user);
  // }

  // if (method === "POST") {
  //   const { body } = req;
  //   prisma.user.create({ ...body });
  //   return res.status(200).json(prisma.user);
  // }
};
