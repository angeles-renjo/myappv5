// src/pages/api/getTrades.ts
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
    // Assuming your User model has an email field and your Trade model has a userId field
    const trades = await prisma.trade.findMany({
      where: {
        user: {
          email: session.user?.email ?? "",
        },
      },
      include: {
        user: true, // Include user data in the response
      },
    });
    res.json(trades);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
