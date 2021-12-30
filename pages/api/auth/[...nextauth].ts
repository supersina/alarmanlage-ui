import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  // Passwordless / email sign in
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async (params) => {
      const { session, user } = params;
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
