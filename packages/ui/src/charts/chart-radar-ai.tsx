"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@lumi-ui/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@lumi-ui/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const chartData = [
  { desktop: 88, edge: 78, metric: "Reasoning (GPQA)", mobile: 92 },
  { desktop: 94, edge: 65, metric: "Coding (SWE-bench)", mobile: 85 },
  { desktop: 91, edge: 70, metric: "Math (DeepMind)", mobile: 88 },
  { desktop: 85, edge: 60, metric: "Multimodal", mobile: 95 },
  { desktop: 98, edge: 50, metric: "Context Window", mobile: 75 },
  { desktop: 92, edge: 85, metric: "Safety", mobile: 89 },
];

const chartConfig = {
  desktop: {
    color: "var(--chart-1)",
    label: "DeepSeek R1",
  },
  edge: {
    color: "var(--chart-3)",
    label: "Llama 4 (8B)",
  },
  mobile: {
    color: "var(--chart-2)",
    label: "Gemini 2.5 Flash",
  },
} satisfies ChartConfig;

export function ChartRadarAI() {
  return (
    <Card className="w-full sm:w-120">
      <CardHeader className="items-center">
        <CardTitle>AI Model Performance 2025</CardTitle>
        <CardDescription>
          Benchmark comparison: Reasoning vs Efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto aspect-square max-h-full w-full"
          config={chartConfig}
        >
          <RadarChart data={chartData} outerRadius={110}>
            <PolarGrid strokeOpacity={0.2} />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "gray", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              axisLine={false}
              domain={[0, 100]}
              tick={false}
            />

            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.3}
              name="DeepSeek R1"
              stroke="var(--color-desktop)"
            />
            <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0.3}
              name="Gemini 2.5 Flash"
              stroke="var(--color-mobile)"
            />
            <Radar
              dataKey="edge"
              fill="var(--color-edge)"
              fillOpacity={0.0}
              name="Llama 4 (8B)"
              stroke="var(--color-edge)"
              strokeDasharray="4 4"
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          DeepSeek leads in Coding & Context <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Comparison of Top 3 Open/Closed Weights
        </div>
      </CardFooter>
    </Card>
  );
}
