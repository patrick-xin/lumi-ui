"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/ui/chart";

const chartConfig: ChartConfig = {
  downloads: {
    color: "var(--color-green-100)",
    label: "Downloads",
  },
  views: {
    color: "var(--color-green-100)",
    label: "Views",
  },
};

export const StatsChart = ({
  data = "views",
}: {
  data?: "views" | "downloads";
}) => {
  return (
    <ChartContainer
      className="aspect-auto h-[120px] w-full"
      config={chartConfig}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" hide />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="bg-foreground text-background border-transparent shadow-none w-fit"
              hideIndicator
              labelFormatter={(value) => {
                return new Date(value as string).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              }}
            />
          }
          cursor={false}
        />
        <Bar
          className="hover:fill-green-600 transition-colors duration-50"
          dataKey={data}
          fill={`var(--color-${data})`}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};

const chartData = [
  { date: "2025-12-24", downloads: 350, views: 6452 },
  { date: "2025-12-25", downloads: 120, views: 1945 },
  { date: "2025-12-26", downloads: 420, views: 6576 },
  { date: "2025-12-27", downloads: 180, views: 2371 },
  { date: "2025-12-28", downloads: 150, views: 2335 },
  { date: "2025-12-29", downloads: 380, views: 6237 },
  { date: "2025-12-30", downloads: 520, views: 7528 },
  { date: "2025-12-31", downloads: 110, views: 1944 },
  { date: "2026-01-01", downloads: 290, views: 4837 },
  { date: "2026-01-02", downloads: 160, views: 2358 },
  { date: "2026-01-03", downloads: 140, views: 2350 },
  { date: "2026-01-04", downloads: 410, views: 6734 },
  { date: "2026-01-05", downloads: 90, views: 1232 },
  { date: "2026-01-06", downloads: 230, views: 3677 },
  { date: "2026-01-07", downloads: 85, views: 1269 },
  { date: "2026-01-08", downloads: 115, views: 1658 },
  {
    date: "2026-01-09",
    downloads: 145,
    views: 2001,
  },
  {
    date: "2026-01-10",
    downloads: 395,
    views: 6352,
  },
  {
    date: "2026-01-11",
    downloads: 190,
    views: 2954,
  },
  {
    date: "2026-01-12",
    downloads: 310,
    views: 4590,
  },
  {
    date: "2026-01-13",
    downloads: 110,
    views: 1843,
  },
];
