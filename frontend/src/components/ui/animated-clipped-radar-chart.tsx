"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";
import { BlurFade } from "../magicui/blur-fade";
import type { CategoryRadarData } from "@/api/dashboard/fetchCategoryRadar";

const colors = {
  graphite: "#1C1C1C",
  coolgray: "#3C3F41",
  offwhite: "#F5F5F5",
  limeneon: "#A3FF12",
  electric: "#FF3CAC",
  tealblue: "#00B3B3",
};

const chartConfig = {
  value: {
    label: "value",
    color: colors.tealblue,
  },
} satisfies ChartConfig;

interface AnimatedClippedRadarChartProps {
  size?: number;
  maxHeight?: string;
  data: CategoryRadarData;
}

export function AnimatedClippedRadarChart({
  size = 400,
  maxHeight = "max-h-[400px]",
  data,
}: AnimatedClippedRadarChartProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [hoveredValue, setHoveredValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const springAngle = useSpring(0, { damping: 30, stiffness: 100 });
  const springValue = useSpring(0, { damping: 30, stiffness: 100 });

  useMotionValueEvent(springAngle, "change", setCurrentAngle);
  useMotionValueEvent(springValue, "change", setHoveredValue);

  useEffect(() => {
    if (!hasAnimated) {
      springAngle.set(360);
      springValue.set(data[data.length - 1].value);
      setHasAnimated(true);
    }
  }, [hasAnimated, springAngle, springValue, data]);

  // Calculate center and radius based on size
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) * 0.96; // 96% of half the size for padding
  const rad = (currentAngle - 90) * (Math.PI / 180);
  const x = centerX + radius * Math.cos(rad);
  const y = centerY + radius * Math.sin(rad);

  return (
    <Card className="border-none bg-transparent">
      <BlurFade className="w-full" inView delay={0.2} direction="right">
        <CardHeader className="items-center pb-4 border-l border-electric/80 p-4 max-w-md">
          <CardTitle>
            {Math.round(hoveredValue)} Ft
            {/* <Badge variant="secondary" className="ml-2" color={colors.limeneon}>
              <TrendingDown className="h-4 w-4" />
              <span>-5.2%</span>
            </Badge> */}
          </CardTitle>
          <CardDescription>
            Vizsgáld meg a kiadásaid kategóriák szerint. Vidd az egered a
            grafikon fölé a részletekért!
          </CardDescription>
        </CardHeader>
      </BlurFade>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className={`mx-auto aspect-square ${maxHeight}`}
          // style={{
          //   width: "600px",
          //   height: "600px",
          // }}
        >
          <RadarChart
            width={size}
            height={size}
            data={data.map((item) => {
              return { ...item, Kiadás: item.value };
            })}
            onMouseMove={(state) => {
              if (state.activePayload && state.activePayload[0]) {
                const v = state.activePayload[0].value;
                const idx = state.activeTooltipIndex || 0;
                const a = (idx * 360) / data.length;
                springAngle.set(a);
                springValue.set(v);
              }
            }}
            onMouseLeave={() => {
              springAngle.set(360);
              springValue.set(data[data.length - 1].value);
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis
              dataKey="category"
              tickSize={10}
              tick={{ fill: colors.offwhite, fontSize: 12 }}
            />
            <PolarGrid strokeDasharray="3 3" />

            <defs>
              <clipPath id="clipped-sector">
                {currentAngle >= 360 ? (
                  <circle cx={centerX} cy={centerY} r={radius} fill="white" />
                ) : (
                  <path
                    d={`
                      M ${centerX} ${centerY}
                      L ${centerX} ${centerY - radius}
                      A ${radius} ${radius} 0 ${
                      currentAngle > 180 ? 1 : 0
                    } 1 ${x} ${y}
                      Z
                    `}
                    fill="white"
                  />
                )}
              </clipPath>

              <linearGradient
                id="gradient-clipped-radar-value"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={chartConfig.value.color}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.value.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Radar
              dataKey="Kiadás"
              stroke={chartConfig.value.color}
              fill={chartConfig.value.color}
              fillOpacity={0.2}
              clipPath="url(#clipped-sector)"
              width={size}
              height={size}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
