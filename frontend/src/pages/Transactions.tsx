import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/transactions/TransationTable";
import { useAllTransactions } from "@/hooks/transactions/useAllTransactions";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import type { Transaction } from "@/types/transaction";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import TransactionHeader from "@/components/transactions/TransactionHeader";
import TransactionSummary from "@/components/transactions/TransactionSummary";
import { useAllCategories } from "@/hooks/categories/useAllCategories";


export default function Transactions() {
  const { data, isLoading } = useAllTransactions();

  // --- UI filters ---
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {}
  );

    const { isLoading: categoryLoading, data: categories } = useAllCategories();

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

    if (isLoading || categoryLoading) {
      return (
        <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
          <div className="flex flex-col justify-between items-center mt-4 py-6">
            <h1 className="font-bold text-tealblue mb-8 text-2xl">
              Tranzakcióid betöltése...
            </h1>
            <Spinner color="#00B3B3" size={30}></Spinner>
          </div>
        </Card>
      );
    }

    return (
      <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
        <TransactionHeader
          search={search}
          setSearch={setSearch}
          setCategory={setCategory}
          categories={categories || []}
        ></TransactionHeader>

        <TransactionSummary
          totalExpense={totalExpense}
          totalIncome={totalIncome}
        ></TransactionSummary>

        <TransactionTable data={filteredData}></TransactionTable>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-offwhite/50 italic">
            Nincsenek tranzakciók a szűrőknek megfelelően.
          </div>
        )}
      </Card>
    );
}
