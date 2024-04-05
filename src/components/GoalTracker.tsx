// src/components/GoalTracker.tsx
"use client";
import React from "react";
import { ProgressCircle } from "@tremor/react";
import { useTradeContext } from "@/context/TradeContext"; // Adjust the import path as necessary

const GoalTracker: React.FC = () => {
  const { user, trades } = useTradeContext();

  // Calculate the total profit/loss from all trades
  const totalProfitLoss = trades.reduce(
    (acc, trade) => acc + (trade.profitLoss ?? 0),
    0
  );

  // Use optional chaining and nullish coalescing to safely access user.accountSize
  const total = (user?.accountSize ?? 0) + totalProfitLoss;
  const targetAccountSize = 1000; // Example target account size
  const progressPercentage = (total / targetAccountSize) * 100;

  // Example strokeWidth calculation. Adjust based on your design needs.
  const strokeWidth = progressPercentage > 50 ? 10 : 5;

  return (
    <div>
      <h1 className="text-center p-10 text-4xl">Goal Tracker</h1>

      <div className="text-white flex space-x-8 items-center">
        <div>
          <p>Account Size: {user?.accountSize ?? 0}</p>
          <p>Total Profit/Loss: {totalProfitLoss}</p>
          <p>Total: {total}</p>
        </div>
        <div>
          <ProgressCircle
            className="stroke-green-500"
            value={progressPercentage}
            size="xl"
            color="indigo"
            strokeWidth={strokeWidth}
            showAnimation={true}
          >
            <span className="text-lg font-medium text-slate-700">
              {progressPercentage.toFixed(0)}%
            </span>
          </ProgressCircle>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
