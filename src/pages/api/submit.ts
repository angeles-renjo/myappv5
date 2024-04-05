import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Trade } from "@prisma/client";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pair, rule, risk, learnings, tradeType, profitLoss, date, link } =
    req.body;

  const priceNumber = parseFloat(profitLoss);

  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const result = await prisma.trade.create({
      data: {
        pair: pair,
        rule: rule,
        risk: risk, // Example value, adjust as needed
        learnings: learnings, // Example value, adjust as needed
        tradeType: tradeType, // Example value, adjust as needed
        profitLoss: priceNumber,
        date: date,
        link: link,
        user: {
          connect: {
            email: session.user?.email ?? "",
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
