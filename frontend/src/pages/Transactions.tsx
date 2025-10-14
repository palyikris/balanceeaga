import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/transactions/TransationTable";
import { useAllTransactions } from "@/hooks/transactions/useAllTransactions";
import { TypingAnimation } from './../components/magicui/typing-animation';

export default function Transactions() {
  const { data, isLoading } = useAllTransactions();

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <Card className="flex w-full justify-start flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden max-h-[100vh] overflow-x-hidden pb-6 relative mb-8">
      <h2 className="font-bold text-limeneon">
        <TypingAnimation style={{
          fontSize: "1.5rem",
        }}>Your transactions.</TypingAnimation>
      </h2>
      <TransactionTable data={data}></TransactionTable>
    </Card>
  );
}
