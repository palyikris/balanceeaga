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
    day: string;
    amount: number
  }>;
  color?: string;
  xTickFormatter?: (value: string) => string;
}

export function ClippedAreaChartForSpendingPatterns(props: ClippedAreaChartProps) {
  const { chartData, color, xTickFormatter } = props;

  const daysToHun: {
    [key: string]: string;
  } = {
    "Mon": "Hétfő",
    "Tue": "Kedd",
    "Wed": "Szerda",
    "Thu": "Csütörtök",
    "Fri": "Péntek",
    "Sat": "Szombat",
    "Sun": "Vasárnap",
  }


  chartData.map((data) => {
    if (daysToHun[data.day]) {
      data.day = daysToHun[data.day];
    }
    data.amount = Math.abs(data.amount);
    return data;
  });

  // Allow custom color with sensible default
  const chartConfig: ChartConfig = {
    amount: {
      label: "Összeg",
      color: color ?? "#00B3B3",
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
  const springAmount = useSpring(0, {
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
  const margins = { left: 12, right: 12, top: 5, bottom: 5 };
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
  type TickProps = {
    x: number;
    y: number;
    payload: { value: string };
    index: number;
  };
  const CustomizedTick = (props: TickProps) => {
    const { x, y, payload, index } = props;
    const isFirst = index === 0;
    const isLast = index === chartData.length - 1;
    const anchor = isFirst ? "start" : isLast ? "end" : "middle";
    const label = xTickFormatter
      ? xTickFormatter(payload?.value)
      : payload?.value;
    return (
      <text x={x} y={(y ?? 0) + 12} textAnchor={anchor} fill="currentColor">
        {label}
      </text>
    );
  };

  if (springAmount.get() == 0) {
    springAmount.set(chartData[chartData.length - 1].amount);
  }

  return (
    <Card className="border-none bg-transparent">
      <CardHeader>
        <div className="w-full flex justify-start">
          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-tealblue/20 w-1/3">
            <span className="text-xs uppercase text-offwhite/80">Összeg</span>
            <h1 className="mt-1 text-lg font-extrabold text-tealblue">
              {springAmount.get().toFixed(0)}{" "}
              <span className="text-sm font-medium">Ft</span>
            </h1>
          </div>
        </div>
        <CardDescription>
          Napi költési minták a hét napjai szerint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          ref={chartRef}
          className="h-54 w-full overflow-visible"
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
              const nextIndex =
                typeof state.activeTooltipIndex === "number"
                  ? Math.max(
                      0,
                      Math.min(chartData.length - 1, state.activeTooltipIndex)
                    )
                  : activeIndex;
              setActiveIndex(nextIndex);

              const amountItem = payload.find((p) => p.dataKey === "amount");
              const amountValue = (amountItem?.value ?? chartData[nextIndex]?.amount) as
                | number
                | undefined;

              if (x) {
                springX.set(x);
              }
              if (amountValue !== undefined) springAmount.set(amountValue);
            }}
            onMouseLeave={() => {
              springX.set(getInnerWidth());
              const last = Math.max(0, chartData.length - 1);
              setActiveIndex(last);
              springAmount.jump(chartData[last].amount);
            }}
            margin={{
              right: margins.right,
              left: margins.left,
              top: margins.top,
              bottom: margins.bottom,
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
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              minTickGap={0}
              padding={{ left: 10, right: 10 }}
              tick={(props: unknown) => (
                <CustomizedTick {...(props as TickProps)} />
              )}
            />
            <Tooltip
              cursor={{
                stroke: "var(--color-amount)",
                strokeDasharray: "3 3",
                strokeOpacity: 0.2,
              }}
              content={() => null}
              isAnimationActive={true}
            />
            <Area
              dataKey="amount"
              type="monotone"
              fill="url(#gradient-cliped-area-amount)"
              fillOpacity={0.4}
              stroke="var(--color-amount)"
              clipPath={`inset(0 ${getRightClipPx() + 4}px 0 0)`}
            />
            {/** vertical cursor handled by <Tooltip cursor=... /> **/}

            {/* this is a ghost line behind graph */}
            <Area
              dataKey="amount"
              type="monotone"
              fill="none"
              stroke="var(--color-amount)"
              strokeOpacity={0.1}
            />

            <defs>
              {/* Amount gradient */}
              <linearGradient
                id="gradient-cliped-area-amount"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount)"
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
