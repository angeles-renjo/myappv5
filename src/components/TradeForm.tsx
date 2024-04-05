// src/components/TradeForm.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dropdown,
  DropdownTrigger,
  Input,
  Button,
  DropdownItem,
  DropdownMenu,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import { useTradeContext } from "@/context/TradeContext";
import { useSession } from "next-auth/react"; // Import useSession

const TradeForm: React.FC = () => {
  const [pair, setPair] = useState("");
  const [rule, setRule] = useState("");
  const [risk, setRisk] = useState("");
  const [learnings, setLearnings] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [profitLoss, setProfitLoss] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { addTrade } = useTradeContext();
  const { data: session } = useSession(); // Use useSession to get the session data

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      try {
        // Create a new trade object with userId from the session
        const newTrade = {
          userId: session?.user?.email, // Assuming the session user object includes an id property
          pair,
          rule,
          risk,
          learnings,
          tradeType,
          profitLoss: profitLoss !== null ? profitLoss : 0,
          date,
          link,
        };

        // Use the addTrade function from the context to add the new trade
        addTrade(newTrade);

        // Optionally, submit the new trade to your backend
        // ...
      } catch (error) {
        setError("Failed to submit trade. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      pair,
      rule,
      risk,
      learnings,
      tradeType,
      profitLoss,
      date,
      link,
      addTrade,
      session,
    ]
  );

  return (
    <div>
      <Popover placement="bottom" backdrop="blur">
        <PopoverTrigger>
          <Button color="warning" variant="flat">
            Open Trade Form
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 py-8 px-2 lg:p-10"
          >
            <Input
              type="text"
              label="Pair"
              placeholder="Enter pair"
              labelPlacement="outside"
              value={pair}
              onChange={(e) => setPair(e.target.value)}
            />
            <div className="flex space-x-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">{rule || "Select Rule"}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Rule Options">
                  <DropdownItem onClick={() => setRule("YES")}>
                    YES
                  </DropdownItem>
                  <DropdownItem onClick={() => setRule("NO")}>NO</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">{risk || "Select Risk"}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Risk Options">
                  <DropdownItem onClick={() => setRisk("1%")}>1%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("2%")}>2%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("3%")}>3%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("4%")}>4%</DropdownItem>
                  <DropdownItem onClick={() => setRisk("5%")}>5%</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {tradeType || "Select Trade Type"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Trade Type Options">
                  <DropdownItem onClick={() => setTradeType("LONG")}>
                    LONG
                  </DropdownItem>
                  <DropdownItem onClick={() => setTradeType("SHORT")}>
                    SHORT
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Textarea
              type="text"
              label="Learnings"
              placeholder="Enter learnings"
              labelPlacement="outside"
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
            />
            <Input
              type="number"
              label="Profit/Loss"
              placeholder="0.00"
              labelPlacement="outside"
              value={profitLoss !== null ? profitLoss.toString() : ""}
              onChange={(e) => setProfitLoss(Number(e.target.value))}
            />
            <Input
              type="date"
              label="Date"
              placeholder="Select date"
              labelPlacement="outside"
              value={date}
              isRequired={true}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              type="text"
              label="Link"
              placeholder="Enter link"
              labelPlacement="outside"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              variant="faded"
              type="submit"
              className="mt-4"
              isDisabled={isSubmitting}
            >
              Submit Trade
            </Button>
          </form>
        </PopoverContent>
      </Popover>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default TradeForm;
