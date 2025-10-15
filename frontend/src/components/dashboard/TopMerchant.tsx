import { Card } from "../ui/card";

interface TopMerchantProps {
  merchants: { name: string; amount: number }[];
}

export default function TopMerchant(props: TopMerchantProps) {

  const { merchants } = props;

  return (
    <Card className="bg-graphite/50 p-6 w-full">
      <h2 className="text-xl font-bold mb-3 text-offwhite/80">
        Top kereskedők
      </h2>
      <ul className="divide-y divide-tealblue/30">
        {merchants?.map((m) => (
          <li key={m.name} className="flex justify-between py-2">
            <span className="text-offwhite/50">{m.name}</span>
            <span className="text-limeneon">
              {m.amount.toLocaleString()} Ft
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}