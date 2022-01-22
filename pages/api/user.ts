import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prismaClient } from "../../prismaClient";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method == "GET") {
    const user = await prismaClient.user.findUnique({
      where: { id: session?.user.id },
      select: { name: true, email: true, image: true },
    });
    res.json({ user });
  }

  if (req.method == "PATCH") {
    const userData = JSON.parse(req.body);
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
