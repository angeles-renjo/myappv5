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

interface TradeContextData {
  trades: Trade[];
  addTrade: (trade: Trade) => void;
  user: User | null; // Include user data
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update the user
}

const TradeContext = createContext<TradeContextData | undefined>(undefined);

interface TradeProviderProps {
  children: ReactNode;
}

export const TradeProvider: React.FC<TradeProviderProps> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addTrade = (trade: Trade) => {
    setTrades([...trades, trade]);
  };

  // Fetch user and trades data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const userResponse = await fetch("/api/getUserTrade"); // Adjust the API endpoint as necessary
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch trades data
      const tradesResponse = await fetch("/api/getTrades"); // Adjust the API endpoint as necessary
      const tradesData = await tradesResponse.json();
      setTrades(tradesData);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <TradeContext.Provider value={{ trades, addTrade, user, setUser }}>
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
