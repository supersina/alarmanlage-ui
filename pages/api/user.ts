import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "John Doe" });
};
// async function main() {
//   let includePosts: boolean = false;
//   let user: Prisma.UserCreateInput;

//   // Check if posts should be included in the query
//   user = {
//     email: "elsa@prisma.io",
//     name: "Elsa Prisma",
//   };

//   // Pass 'user' object into query
//   const createUser = await prisma.user.create({ data: user });
// }
