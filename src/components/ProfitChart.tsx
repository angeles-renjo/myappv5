// src/components/ProfitChart.tsx
"use client";
import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";
import { useTradeContext } from "@/context/TradeContext"; // Adjust the import path as necessary

interface ChartData {
  date: string;
  accountSize: number;
}

export default function ProfitChart() {
  const { user, trades } = useTradeContext();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    let currentAccountSize = user?.accountSize || 0;
    const formattedData = trades.map((trade) => {
      const date = new Date(trade.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      // Ensure profitLoss is treated as a number, converting null to 0
      const profitLossValue = trade.profitLoss !== null ? trade.profitLoss : 0;
      currentAccountSize += profitLossValue;

      return {
        date: formattedDate,
        accountSize: currentAccountSize,
      };
    });

    // Sort the formattedData array by date in ascending order
    formattedData.sort((a, b) => {
      const dateA = a.date.split("/").reverse().join("-"); // Convert to YYYY-MM-DD format for sorting
      const dateB = b.date.split("/").reverse().join("-");
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    setChartData(formattedData);
  }, [trades, user?.accountSize]); // Depend on trades and user's account size// Depend on trades and user's account size

  return (
    <div className="profit-chart sm:w-full lg:w-1/2 ">
      <h1 className="text-center text-4xl tracking-widest text-white">
        PNL CHART
      </h1>
      <AreaChart
        className="h-52 "
        data={chartData}
        index="date"
        categories={["accountSize"]}
        showXAxis={false}
        yAxisWidth={60}
        showGridLines={false}
        showAnimation={true}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
