// import TradeForm from "@/components/TradeForm";
import TradeForm from "@/components/TradeForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import JournalTable from "@/components/JournalTable";
import ProfitChart from "@/components/ProfitChart";
import GoalTracker from "@/components/GoalTracker";

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");

  return (
    <main className="min-h-screen items-center flex flex-col">
      <TradeForm />
      <JournalTable />
      <ProfitChart />
      {/* <GoalTracker /> */}
    </main>
  );
}
