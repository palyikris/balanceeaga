"use client";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";

interface ClippedAreaChartProps {
  chartData: Array<{
    month: string;
    income: number;
    expense: number;
    net: number;
  }>;
  colors?: {
    income?: string;
    expense?: string;
    net?: string;
  };
  xTickFormatter?: (value: string) => string;
}

export function ClippedAreaChart(props: ClippedAreaChartProps) {

  const { chartData, colors, xTickFormatter } = props;

  // Convert month strings like "2025-01" -> "2025 January"
  const monthNames = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
  ];

  chartData.forEach((item) => {
    if (typeof item.month === "string" && /^\d{4}-\d{2}$/.test(item.month)) {
      const [year, mm] = item.month.split("-");
      const idx = Math.max(0, Math.min(11, Number(mm) - 1));
      item.month = `${year} ${monthNames[idx]}`;
    }
  });

  // Allow different colors for each series with sensible defaults
  const chartConfig: ChartConfig = {
    income: {
      label: "Income",
      color: colors?.income ?? "#A3FF12",
    },
    expense: {
      label: "Expense",
      color: colors?.expense ?? "#FF3CAC",
    },
    net: {
      label: "Net",
      color: colors?.net ?? "#00B3B3",
    },
  };

  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, chartData.length - 1)
  );

  // motion values
  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springY = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springIncome = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springExpense = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    // Clamp to inner plotting width to avoid overshoot/overflow
    const w = getInnerWidth();
    const clamped = Math.max(0, Math.min(w, latest));
    setAxis(clamped);
  });

  // Keep margins in one place and compute inner plotting width
  const margins = { left: 8, right: 8 };
  const getInnerWidth = () => {
    const w = chartRef.current?.getBoundingClientRect().width || 0;
    return Math.max(0, w - margins.left - margins.right);
  };

  // Compute right-side clip in px with a tiny DPR-aware fudge factor
  const getRightClipPx = () => {
    const w = getInnerWidth();
    const dpr = typeof window !== "undefined" && (window.devicePixelRatio || 1);
    const fudge = Math.max(1, Math.round((dpr as number) || 1)); // 1 on standard, 2 on retina
    return Math.max(0, Math.ceil(w - axis) + fudge);
  };

  // Custom tick to avoid clipping without adding large paddings:
  // - first label anchors to the right (start)
  // - last label anchors to the left (end)
  // - middle labels stay centered
  type TickProps = { x: number; y: number; payload: { value: string }; index: number };
  const CustomizedTick = (props: TickProps) => {
    const { x, y, payload, index } = props;
    const isFirst = index === 0;
    const isLast = index === chartData.length - 1;
    const anchor = isFirst ? "start" : isLast ? "end" : "middle";
    const label = xTickFormatter ? xTickFormatter(payload?.value) : payload?.value;
    return (
      <text x={x} y={(y ?? 0) + 12} textAnchor={anchor} fill="currentColor">
        {label}
      </text>
    );
  };

  if (springY.get() == 0) {
    springY.set(chartData[chartData.length - 1].net);
  }
  if (springIncome.get() == 0) {
    springIncome.set(chartData[chartData.length - 1].income);
  }
  if (springExpense.get() == 0) {
    springExpense.set(chartData[chartData.length - 1].expense);
  }

  return (
    <Card className="border-none bg-transparent">
      <CardHeader>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-tealblue/20">
            <span className="text-xs uppercase text-gray-400">Egyenleg</span>
            <h1 className="mt-1 text-lg font-extrabold text-tealblue">
              {springY.get().toFixed(0)}{" "}
              <span className="text-sm font-medium">Ft</span>
            </h1>
          </div>

          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-limeneon/20">
            <span className="text-xs uppercase text-gray-400">Bevétel</span>
            <div className="mt-1 text-lg font-bold text-limeneon">
              {springIncome.get().toFixed(0)} {" "}
              <span className="text-sm font-medium">Ft</span>
            </div>
          </div>

          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-electric/20">
            <span className="text-xs uppercase text-gray-400">Kiadás</span>
            <div className="mt-1 text-lg font-bold text-electric">
              {springExpense.get().toFixed(0)} {" "}
              <span className="text-sm font-medium">Ft</span>
            </div>
          </div>
        </div>
        <CardDescription>
          Teljes havi bevétel, kiadás és egyenleg grafikonon ábrázolva.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          ref={chartRef}
          className="h-54 w-full"
          config={chartConfig}
        >
          <AreaChart
            className="overflow-visible"
            accessibilityLayer
            data={chartData}
            onMouseMove={(state: {
              activeCoordinate?: { x?: number; y?: number };
              activePayload?: Array<{ dataKey?: string; value?: number }>;
              activeTooltipIndex?: number;
            }) => {
              const x = state.activeCoordinate?.x;
              const payload = state.activePayload || [];
              const nextIndex = typeof state.activeTooltipIndex === "number"
                ? Math.max(0, Math.min(chartData.length - 1, state.activeTooltipIndex))
                : activeIndex;
              setActiveIndex(nextIndex);

              const netItem = payload.find((p) => p.dataKey === "net");
              const incomeItem = payload.find((p) => p.dataKey === "income");
              const expenseItem = payload.find((p) => p.dataKey === "expense");

              const netValue = (netItem?.value ?? chartData[nextIndex]?.net) as number | undefined;
              const incomeValue = (incomeItem?.value ?? chartData[nextIndex]?.income) as number | undefined;
              const expenseValue = (expenseItem?.value ?? chartData[nextIndex]?.expense) as number | undefined;

              if (x) {
                springX.set(x);
              }
              if (netValue !== undefined) springY.set(netValue);
              if (incomeValue !== undefined) springIncome.set(incomeValue);
              if (expenseValue !== undefined) springExpense.set(expenseValue);
            }}
            onMouseLeave={() => {
              springX.set(getInnerWidth());
              const last = Math.max(0, chartData.length - 1);
              setActiveIndex(last);
              springY.jump(chartData[last].net);
              springIncome.jump(chartData[last].income);
              springExpense.jump(chartData[last].expense);
            }}
            margin={{
              right: margins.right,
              left: margins.left,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={(props) => {
                const { height } = props;
                return [0, height - 30];
              }}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              minTickGap={0}
              padding={{ left: 0, right: 0 }}
              tick={(props: unknown) => <CustomizedTick {...(props as TickProps)} />}
            />
            <Tooltip
              cursor={{
                stroke: "var(--color-net)",
                strokeDasharray: "3 3",
                strokeOpacity: 0.2,
              }}
              content={() => null}
              isAnimationActive={true}
            />
            <Area
              dataKey="net"
              type="monotone"
              fill="url(#gradient-cliped-area-net)"
              fillOpacity={0.4}
              stroke="var(--color-net)"
              clipPath={`inset(0 ${getRightClipPx() + 4}px 0 0)`}
            />
            <Area
              dataKey="income"
              type="monotone"
              fill="url(#gradient-cliped-area-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              clipPath={`inset(0 ${getRightClipPx() + 4}px 0 0)`}
            />
            <Area
              dataKey="expense"
              type="monotone"
              fill="url(#gradient-cliped-area-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              baseValue="dataMin"
              clipPath={`inset(0 ${getRightClipPx() + 4}px 0 0)`}
            />
            {/** vertical cursor handled by <Tooltip cursor=... /> **/}

            {/* this is a ghost line behind graph */}
            <Area
              dataKey="net"
              type="monotone"
              fill="none"
              stroke="var(--color-net)"
              strokeOpacity={0.1}
            />

            <Area
              dataKey="expense"
              type="monotone"
              fill="none"
              stroke="var(--color-expense)"
              strokeOpacity={0.1}
            />

            <Area
              dataKey="income"
              type="monotone"
              fill="none"
              stroke="var(--color-income)"
              strokeOpacity={0.1}
            />

            <defs>
              {/* Net gradient */}
              <linearGradient
                id="gradient-cliped-area-net"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-net)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-net)"
                  stopOpacity={0}
                />
              </linearGradient>
              {/* Income gradient */}
              <linearGradient
                id="gradient-cliped-area-income"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0}
                />
              </linearGradient>
              {/* Expense gradient */}
              <linearGradient
                id="gradient-cliped-area-expense"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
