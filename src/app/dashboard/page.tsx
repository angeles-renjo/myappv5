// import TradeForm from "@/components/TradeForm";
import TradeForm from "@/components/TradeForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import JournalTable from "@/components/JournalTable";
import ProfitChart from "@/components/ProfitChart";
import GoalTracker from "@/components/GoalTracker";
import { TradeProvider } from "@/context/TradeContext";

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");

  return (
    <TradeProvider>
      <main className=" w-full  flex flex-col mt-10">
        <div className="flex items-center justify-center w-full">
          <TradeForm />
        </div>
        <div className="p-10">
          <JournalTable />
        </div>
        <div className="flex w-full justify-evenly items-center">
          <ProfitChart />
          <GoalTracker />
        </div>
      </main>
    </TradeProvider>
  );
}
