// src/context/TradeContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Trade, User } from "@prisma/client";
import { Spinner } from "@nextui-org/react";

interface TradeContextData {
  trades: Trade[];
  addTrade: (trade: Partial<Trade>) => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  error: string | null;
  loading: boolean; // Added loading state
}

const TradeContext = createContext<TradeContextData | undefined>(undefined);

interface TradeProviderProps {
  children: ReactNode;
}

export const TradeProvider: React.FC<TradeProviderProps> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  const addTrade = async (trade: Partial<Trade>) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trade),
      });

      if (!response.ok) {
        throw new Error("Failed to submit trade. Please try again.");
      }

      const result = await response.json();
      console.log("Trade saved:", result);

      const tradesResponse = await fetch("/api/getTrades");
      const tradesData = await tradesResponse.json();
      setTrades(tradesData);
    } catch (error) {
      console.error("Error saving trade:", error);
      setError("Failed to submit trade. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const userResponse = await fetch("/api/getUserTrade");
        const userData = await userResponse.json();
        setUser(userData);

        const tradesResponse = await fetch("/api/getTrades");
        const tradesData = await tradesResponse.json();
        setTrades(tradesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );
  }

  return (
    <TradeContext.Provider
      value={{ trades, addTrade, user, setUser, error, loading }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error("useTradeContext must be used within a TradeProvider");
  }
  return context;
};
