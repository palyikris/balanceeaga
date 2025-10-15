// src/pages/DashboardPage.tsx
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DefaultRadialChart } from "@/components/ui/radial-chart";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { AnimatedClippedRadarChart } from "@/components/ui/animated-clipped-radar-chart";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TopMerchant from "@/components/dashboard/TopMerchant";

// Color palette (from COLORS.md)
const COLORS = {
  graphite: "#1C1C1C",
  coolgray: "#3C3F41",
  offwhite: "#F5F5F5",
  limeneon: "#A3FF12",
  electric: "#FF3CAC",
  tealblue: "#00B3B3",
};

// Mock fetchers (replace later with real API)
const fetchCashflow = async () => [
  { month: "Jan", income: 420000, expense: 370000 },
  { month: "Feb", income: 460000, expense: 390000 },
  { month: "Mar", income: 430000, expense: 420000 },
  { month: "Apr", income: 480000, expense: 410000 },
  { month: "May", income: 510000, expense: 440000 },
];

const fetchCategoryRadar = async () => [
  { category: "Étel", value: 45 },
  { category: "Szórakozás", value: 20 },
  { category: "Közlekedés", value: 35 },
  { category: "Egészség", value: 25 },
  { category: "Lakhatás", value: 40 },
  { category: "Utazás", value: 30 },
];

const fetchTopMerchants = async () => [
  { name: "Tesco", amount: 68000 },
  { name: "MOL", amount: 43000 },
  { name: "MediaMarkt", amount: 28000 },
  { name: "Netflix", amount: 4500 },
  { name: "Google", amount: 3000 },
];

export default function DashboardPage() {
  const { data: cashflow, isLoading: cashflowLoading } = useQuery({
    queryKey: ["cashflow"],
    queryFn: fetchCashflow,
  });
  const { data: radar, isLoading: radarLoading } = useQuery({
    queryKey: ["categoryRadar"],
    queryFn: fetchCategoryRadar,
  });
  const { data: merchants, isLoading: merchLoading } = useQuery({
    queryKey: ["topMerchants"],
    queryFn: fetchTopMerchants,
  });

  if (cashflowLoading || radarLoading || merchLoading)
    return (
      <div className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
        <Spinner color="#00B3B3"></Spinner>
      </div>
    );

  return (
    <div className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
      <h1 className="text-2xl font-extrabold text-limeneon">
        Pénzügyi áttekintés
      </h1>

      <DashboardSummary cashflow={cashflow || []}></DashboardSummary>

      <Card className="bg-graphite/50 p-6">
        <h2 className="text-xl text-offwhite/80 font-bold mb-2">
          Kiadások kategóriák szerint
        </h2>
        <AnimatedClippedRadarChart size={500} maxHeight="max-h-[500px]" />
      </Card>

      <Card className="flex flex-row justify-center items-center gap-4 bg-transparent p-0 border-none">
        <TopMerchant merchants={merchants || []}></TopMerchant>
        <TopMerchant merchants={merchants || []}></TopMerchant>
      </Card>
    </div>
  );
}
