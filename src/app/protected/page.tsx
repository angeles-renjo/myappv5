// import TradeForm from "@/components/TradeForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User, Prisma } from "@prisma/client";

const userEmail: Prisma.UserSelect = {
  email: true,
};
export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");
  console.log(session);

  return <div>Protected</div>;
}
