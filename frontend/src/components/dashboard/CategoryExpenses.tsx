import { Card } from "../ui/card";
import { RoundedPieChart } from "../ui/rounded-pie-chart";

interface CategoryExpenses {
  categoryExpenses: { category: string; amount: number }[];
}

export default function CategoryExpenses(props: CategoryExpenses) {
  const { categoryExpenses } = props;


  categoryExpenses.forEach((ce) => {
    ce.amount = Math.abs(ce.amount);
  });

  return (
    <Card className="bg-graphite/50 p-6 w-full h-full">
      <h2 className="text-xl font-bold mb-3 text-offwhite/80">
        Kiadások kategóriák szerint
      </h2>
      <RoundedPieChart chartData={categoryExpenses}></RoundedPieChart>
      {/* <ul className="divide-y divide-tealblue/30">
        {categoryExpenses?.map((m) => (
          <li key={m.name} className="flex justify-between py-2">
            <span className="text-offwhite/50">{m.name}</span>
            <span className="text-limeneon">
              {m.amount.toLocaleString()} Ft
            </span>
          </li>
        ))}
      </ul> */}
    </Card>
  );
}
