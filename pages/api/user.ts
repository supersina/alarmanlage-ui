import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prismaClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log(userData);

  if (req.method == "POST") {
    const savedUser = await prismaClient.user.create({ data: userData });
    res.json(savedUser);
  }

  if (req.method == "PATCH") {
    const updatedUser = await prismaClient.user.update({
      where: {
        email: userData.email,
      },
      data: {
        name: userData.name,
        email: userData.newEmail,
        image: userData.image,
      },
    });
    res.json(updatedUser);
  }
};