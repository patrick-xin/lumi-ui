"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/ui/chart";
import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";

const chartData = [
  { capacity: 20, fill: "var(--chart-4)", source: "Bioenergy" },
  { capacity: 45, fill: "var(--chart-3)", source: "Hydro" },
  { capacity: 130, fill: "var(--chart-2)", source: "Wind" },
  { capacity: 420, fill: "var(--chart-1)", source: "Solar" },
];

const chartConfig = {
  bio: {
    color: "var(--chart-4)",
    label: "Bioenergy",
  },
  capacity: {
    label: "Capacity Added (GW)",
  },
  hydro: {
    color: "var(--chart-3)",
    label: "Hydropower",
  },
  solar: {
    color: "var(--chart-1)",
    label: "Solar PV",
  },
  wind: {
    color: "var(--chart-2)",
    label: "Wind Power",
  },
} satisfies ChartConfig;

export function ChartRadialEnergy() {
  return (
    <Card className="w-full sm:w-120">
      <CardHeader>
        <CardTitle>Global Energy Additions</CardTitle>
        <CardDescription>New Capacity by Source</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center min-h-72 flex-1">
        <ChartContainer
          className="mx-auto aspect-square w-full max-w-[250px]"
          config={chartConfig}
        >
          <RadialBarChart
            barSize={20}
            data={chartData}
            endAngle={270}
            innerRadius="25%"
            outerRadius="100%"
            startAngle={-90}
          >
            <RadialBar background cornerRadius={10} dataKey="capacity" />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="source" />}
              cursor={false}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Solar accounts for 68% of new growth <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          1GW = Power for ~750k homes
        </div>
      </CardFooter>
    </Card>
  );
}
