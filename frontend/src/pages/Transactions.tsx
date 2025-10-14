import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/transactions/TransationTable";
import { useAllTransactions } from "@/hooks/transactions/useAllTransactions";
import { TypingAnimation } from "./../components/magicui/typing-animation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import type { Transaction } from "@/types/transaction";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Transactions() {
  const { data, isLoading } = useAllTransactions();

  // --- UI filters ---
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {}
  );

  // --- derived data ---
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((tx: Transaction) => {
      const matchCategory =
        category === "all" ||
        tx.category?.name?.toLowerCase() === category.toLowerCase();
      const matchSearch =
        search.trim().length === 0 ||
        tx.description_raw?.toLowerCase().includes(search.toLowerCase()) ||
        tx.counterparty?.toLowerCase().includes(search.toLowerCase());
      const matchDate =
        (!dateRange.from ||
          dayjs(tx.booking_date).isAfter(
            dayjs(dateRange.from).subtract(1, "day")
          )) &&
        (!dateRange.to ||
          dayjs(tx.booking_date).isBefore(dayjs(dateRange.to).add(1, "day")));

      return matchCategory && matchSearch && matchDate;
    });
  }, [data, category, search, dateRange]);

  const totalIncome = useMemo(
    () =>
      filteredData
        .filter((t: Transaction) => parseFloat(t.amount) > 0)
        .reduce((a: number, t: Transaction) => a + parseFloat(t.amount), 0),
    [filteredData]
  );

  const totalExpense = useMemo(
    () =>
      filteredData
        .filter((t: Transaction) => parseFloat(t.amount) < 0)
        .reduce((a: number, t: Transaction) => a + parseFloat(t.amount), 0),
    [filteredData]
  );

  if (isLoading) {
    return (
      <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
        <div className="flex flex-col justify-between items-center mt-4 py-6">
          <h1 className="font-bold text-tealblue mb-8 text-2xl">
            Loading your transactions...
          </h1>
          <Spinner color="#00B3B3" size={30}></Spinner>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-bold text-limeneon">
          <TypingAnimation style={{ fontSize: "1.5rem" }}>
            Your transactions.
          </TypingAnimation>
        </h2>
        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search description or counterparty"
            className="w-80 bg-graphite-900 border border-offwhite/10 text-offwhite/80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-graphite-900 border border-offwhite/10 text-offwhite/80">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary section */}
      <div className="grid grid-cols-3 gap-4 text-sm text-offwhite/70">
        <Card className="p-4 bg-graphite-900/70 border border-limeneon/20">
          <p className="text-offwhite/60">Total Income</p>
          <p className="text-limeneon font-bold text-xl">
            {totalIncome.toLocaleString("hu-HU")} HUF
          </p>
        </Card>
        <Card className="p-4 bg-graphite-900/70 border border-electric/20">
          <p className="text-offwhite/60">Total Expense</p>
          <p className="text-electric font-bold text-xl">
            {totalExpense.toLocaleString("hu-HU")} HUF
          </p>
        </Card>
        <Card className="p-4 bg-graphite-900/70 border border-offwhite/20">
          <p className="text-offwhite/60">Balance</p>
          <p
            className={`font-bold text-xl ${
              totalIncome + totalExpense >= 0
                ? "text-limeneon"
                : "text-electric"
            }`}
          >
            {(totalIncome + totalExpense).toLocaleString("hu-HU")} HUF
          </p>
        </Card>
      </div>

      {/* Transaction Table (unchanged) */}
      <TransactionTable data={filteredData}></TransactionTable>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-offwhite/50 italic">
          No transactions match your filters.
        </div>
      )}
    </Card>
  );
}
