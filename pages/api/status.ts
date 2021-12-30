import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prismaClient";

const statusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log(userData);

  // const updatedSensorStatus = await prismaClient.sensorStatus.update({
  //   where: {
  //     user: userData.email,
  //   },
  //   data: {
  //     name: userData.name,
  //     email: userData.newEmail,
  //     image: userData.image,
  //   },
  // });
  // res.json(updatedSensorStatus);
};

export default statusHandler;
