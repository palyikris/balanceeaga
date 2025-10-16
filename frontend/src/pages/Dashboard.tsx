// src/pages/DashboardPage.tsx
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { AnimatedClippedRadarChart } from "@/components/ui/animated-clipped-radar-chart";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TopMerchant from "@/components/dashboard/TopMerchant";
import { useCashFlow } from "@/hooks/dashboard/useCashFlow";
import { useCategoryRadar } from "@/hooks/dashboard/useCategoryRadar";
import { useTopMerchants } from "@/hooks/dashboard/useTopMerchants";

export default function DashboardPage() {
  const { data: cashflow, isLoading: cashflowLoading } = useCashFlow();
  const { data: radar, isLoading: radarLoading } = useCategoryRadar();
  const { data: merchants, isLoading: merchLoading } = useTopMerchants();

  if (cashflowLoading || radarLoading || merchLoading)
    return (
      <div className="flex w-full h-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6 justify-center items-center">
        <Spinner color="#00B3B3"></Spinner>
      </div>
    );

  return (
    <div className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
      <h1 className="text-4xl font-extrabold text-limeneon">
        Pénzügyi áttekintés.
      </h1>

      <DashboardSummary cashflow={cashflow || []}></DashboardSummary>

      <Card className="bg-graphite/50 p-6">
        <h2 className="text-xl text-offwhite/80 font-bold mb-2">
          Kiadások kategóriák szerint
        </h2>
        {radar && radar.length > 0 ? (
          <AnimatedClippedRadarChart data={radar} />
        ) : (
          <p className="text-offwhite/80">Nincs kiadás.</p>
        )}
      </Card>

      <Card className="flex flex-row justify-center items-center gap-4 bg-transparent p-0 border-none">
        {merchants && merchants.length > 0 ? (
          <TopMerchant merchants={merchants} />
        ) : (
          <p>Nincsenek kiemelt kereskedők.</p>
        )}
      </Card>
    </div>
  );
}
