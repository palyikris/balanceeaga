import { Card } from "../ui/card";


interface TransactionSummaryProps {
  totalIncome: number;
  totalExpense: number;
}

export default function TransactionSummary(props: TransactionSummaryProps) {

  const { totalIncome, totalExpense } = props;

  return (
    <div className="grid grid-cols-3 gap-4 text-sm text-offwhite/70">
      <Card className="p-4 bg-graphite-900/70 border border-limeneon/20">
        <p className="text-offwhite/60">Teljes Bevétel</p>
        <p className="text-limeneon font-bold text-xl">
          {totalIncome.toLocaleString("hu-HU")} HUF
        </p>
      </Card>
      <Card className="p-4 bg-graphite-900/70 border border-electric/20">
        <p className="text-offwhite/60">Teljes Kiadás</p>
        <p className="text-electric font-bold text-xl">
          {totalExpense.toLocaleString("hu-HU")} HUF
        </p>
      </Card>
      <Card className="p-4 bg-graphite-900/70 border border-offwhite/20">
        <p className="text-offwhite/60">Egyenleg</p>
        <p
          className={`font-bold text-xl ${
            totalIncome + totalExpense >= 0 ? "text-limeneon" : "text-electric"
          }`}
        >
          {(totalIncome + totalExpense).toLocaleString("hu-HU")} HUF
        </p>
      </Card>
    </div>
  );
}