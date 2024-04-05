// src/pages/api/getAccountSize.ts
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
    // Fetch user's account size and trades
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? "",
      },
      include: {
        Trade: true, // Include trades in the response
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Calculate total profit/loss from trades
    const profitLoss = user.Trade.reduce(
      (acc, trade) => acc + (trade.profitLoss ?? 0),
      0
    );

    // Send response with account size and total profit/loss
    res.json({ accountSize: user.accountSize ?? 0, profitLoss });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
