// src/pages/api/getUserAndTrades.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? "",
      },
      include: {
        Trade: true, // Include trades data in the response
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
