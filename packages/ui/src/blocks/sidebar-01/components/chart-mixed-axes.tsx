"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@lumi-ui/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@lumi-ui/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@lumi-ui/ui/toggle-group";
import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
} from "recharts";

const data = Array.from({ length: 12 }, (_, i) => ({
  customers: Math.floor(Math.random() * 500) + 100,
  expenses: Math.floor(Math.random() * 3000) + 1000,
  month: new Date(2025, i, 1).toLocaleString("default", { month: "short" }),
  profitMargin: Math.floor(Math.random() * 30) + 10,
  revenue: Math.floor(Math.random() * 5000) + 2000,
}));

const chartConfig = {
  customers: { color: "var(--chart-4)", label: "Active Users" },
  expenses: { color: "var(--chart-2)", label: "Expenses" },
  profitMargin: { color: "var(--chart-3)", label: "Margin" },
  revenue: { color: "var(--chart-1)", label: "Revenue" },
} satisfies ChartConfig;

export function ChartMixedAxes() {
  const [activeSeries, setActiveSeries] = React.useState<string[]>(
    Object.keys(chartConfig),
  );
  const showFinancials =
    activeSeries.includes("revenue") || activeSeries.includes("expenses");
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex justify-between flex-wrap">
        <div className="space-y-2">
          <CardTitle>Financial Performance</CardTitle>
          <CardDescription>
            Toggle series visibility using the controls below
          </CardDescription>
        </div>
        <ToggleGroup
          className="gap-2 flex-wrap"
          multiple
          onValueChange={(value) => {
            setActiveSeries(value);
          }}
          value={activeSeries}
        >
          {Object.entries(chartConfig).map(([key, config]) => (
            <ToggleGroupItem
              aria-label={`Toggle ${config.label}`}
              className="gap-1 text-xs cursor-pointer"
              key={key}
              size="sm"
              value={key}
              variant="outline"
            >
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: config.color }}
              />
              {config.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer className="size-full" config={chartConfig}>
          <ComposedChart
            data={data}
            margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
          >
            <defs>
              <linearGradient id="fillCustomers" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillMargin" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-profitMargin)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-profitMargin)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              axisLine={false}
              dataKey="month"
              fontSize={12}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              fontSize={12}
              orientation="left"
              tickFormatter={(value) => {
                if (showFinancials) {
                  return `$${value / 1000}k`;
                }
                return value;
              }}
              tickLine={false}
              width={40}
              yAxisId="left"
            />
            <YAxis
              axisLine={false}
              fontSize={12}
              hide={!activeSeries.includes("profitMargin")}
              orientation="right"
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              width={40}
              yAxisId="right"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-48"
                  indicator="dot"
                  labelKey="month"
                />
              }
              cursor={false}
            />
            <Area
              dataKey="customers"
              fill="url(#fillCustomers)"
              hide={!activeSeries.includes("customers")}
              stackId="c"
              stroke="var(--color-customers)"
              strokeWidth={2}
              type="natural"
              yAxisId="left"
            />
            <Bar
              barSize={20}
              dataKey="revenue"
              fill="var(--color-revenue)"
              hide={!activeSeries.includes("revenue")}
              radius={[4, 4, 0, 0]}
              yAxisId="left"
            />
            <Bar
              barSize={20}
              dataKey="expenses"
              fill="var(--color-expenses)"
              fillOpacity={0.6}
              hide={!activeSeries.includes("expenses")}
              radius={[4, 4, 0, 0]}
              yAxisId="left"
            />
            <Area
              activeDot={{ r: 6, strokeWidth: 0 }}
              dataKey="profitMargin"
              fill="url(#fillMargin)"
              hide={!activeSeries.includes("profitMargin")}
              stroke="var(--color-profitMargin)"
              strokeWidth={3}
              type="monotone"
              yAxisId="right"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
