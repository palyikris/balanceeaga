import { BlurFade } from "../magicui/blur-fade";
import { Card } from "../ui/card";
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface DashboardSummaryProps {
  cashflow: { month: number; income: number; expense: number }[];
  balance: number;
}

export default function DashboardSummary(props: DashboardSummaryProps) {
  const { cashflow } = props;

  return (
    <BlurFade className="grid md:grid-cols-4 gap-6" inView delay={0.1}>
      <Card className="p-4 bg-graphite-900/70 border border-limeneon/80">
        <h3 className="text-sm uppercase text-offwhite/70">Bevétel</h3>
        <TypingAnimation className="text-2xl font-bold text-limeneon">
          {`${cashflow?.reduce((s, c) => s + c.income, 0).toLocaleString()} Ft`}
        </TypingAnimation>
      </Card>
      <Card className="p-4 bg-graphite-900/70 border border-electric/80">
        <h3 className="text-sm uppercase text-offwhite/70">Kiadás</h3>
        <TypingAnimation className="text-2xl font-bold text-electric">
          {`${cashflow
            ?.reduce((s, c) => s + c.expense, 0)
            .toLocaleString()} Ft`}
        </TypingAnimation>
      </Card>
      <Card className="p-4 bg-graphite-900/70 border border-tealblue/80">
        <h3 className="text-sm uppercase text-offwhite/70">Megtakarítás</h3>
        <TypingAnimation className="text-2xl font-bold text-tealblue">
          {`${(
            cashflow?.reduce((s, c) => s + (c.income - c.expense), 0) ?? 0
          ).toLocaleString()} Ft
      `}
        </TypingAnimation>
      </Card>
      <Card className="p-4 bg-graphite-900/70 border border-tealblue/80">
        <h3 className="text-sm uppercase text-offwhite/70">Egyenleg</h3>
        <TypingAnimation className="text-2xl font-bold text-tealblue">
          {`${props.balance.toLocaleString()} Ft`}
        </TypingAnimation>
      </Card>
    </BlurFade>
  );
}
