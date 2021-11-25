import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log(userData);

  if (req.method == "POST") {
    const savedUser = await prisma.user.create({ data: userData });
    res.json(savedUser);
  }

  if (req.method == "PATCH") {
    const updatedUser = await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        name: userData.name,
        email: userData.newEmail,
      },
    });
    res.json(updatedUser);
  }
};
