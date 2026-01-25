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
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { growth: 25, region: "China", sales: 14.2, share: 52 },
  { growth: 4, region: "Europe", sales: 3.2, share: 23 },
  { growth: 11, region: "N. America", sales: 2.1, share: 12 },
  { growth: 38, region: "Asia-Pac", sales: 1.8, share: 8 },
  { growth: 45, region: "ROW", sales: 0.9, share: 4 },
];

const chartConfig = {
  growth: {
    color: "var(--chart-2)",
    label: "YoY Growth (%)",
  },
  sales: {
    color: "var(--chart-3)",
    label: "Sales Volume (Millions)",
  },
} satisfies ChartConfig;

export function ChartEVMarket() {
  return (
    <Card className="w-full sm:w-120">
      <CardHeader>
        <CardTitle>Global EV Market 2025</CardTitle>
        <CardDescription>
          Sales Volume vs. Year-over-Year Growth Rate
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer className="h-72 min-h-72" config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{ bottom: 0, left: 0, right: 0, top: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              axisLine={false}
              dataKey="region"
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              orientation="left"
              tickFormatter={(value) => `${value}M`}
              tickLine={false}
              yAxisId="left"
            />
            <YAxis
              axisLine={false}
              orientation="right"
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              yAxisId="right"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value} Outlook`}
                />
              }
              cursor={false}
            />
            <Legend height={36} verticalAlign="top" />
            <Bar
              barSize={40}
              dataKey="sales"
              fill="var(--color-sales)"
              name="Sales Volume (M)"
              radius={[4, 4, 0, 0]}
              yAxisId="left"
            />
            <Line
              dataKey="growth"
              dot={{ fill: "var(--color-growth)", r: 4 }}
              name="YoY Growth (%)"
              stroke="var(--color-growth)"
              strokeWidth={3}
              type="monotone"
              yAxisId="right"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Emerging markets see +45% surge <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              China dominates volume, while Rest of World (ROW) leads growth
              velocity.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
