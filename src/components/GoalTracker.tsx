"use client";
import React, { useEffect, useState } from "react";
import { ProgressCircle } from "@tremor/react";

const GoalTracker: React.FC = () => {
  const [data, setData] = useState({ accountSize: 0, profitLoss: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getUserAndTrades");
      const data = await response.json();
      setData({ accountSize: data.accountSize, profitLoss: data.profitLoss });
    };

    fetchData();
  }, []);

  const total = data.accountSize + data.profitLoss;
  const targetAccountSize = 1000; // Example target account size
  const progressPercentage = (total / targetAccountSize) * 100;

  // Example strokeWidth calculation. Adjust based on your design needs.
  const strokeWidth = progressPercentage > 50 ? 10 : 5;

  return (
    <div>
      <h1 className="text-center p-10 text-4xl">Goal Tracker</h1>

      <div className="text-white flex space-x-8 items-center">
        <div>
          <p>Account Size: {data.accountSize}</p>
          <p>Profit/Loss: {data.profitLoss}</p>
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
