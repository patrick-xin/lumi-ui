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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = Array.from({ length: 100 }, (_, i) => {
  const totalMinutes = Math.floor((i * 1440) / 100);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return {
    sys: Math.floor(Math.random() * 30) + 10,
    time,
    user: Math.floor(Math.random() * 40) + 20,
    wait: Math.floor(Math.random() * 20),
  };
});

const chartConfig = {
  sys: { color: "var(--chart-1)", label: "System" },
  user: { color: "var(--chart-2)", label: "User" },
  wait: { color: "var(--chart-3)", label: "I/O Wait" },
} satisfies ChartConfig;

export function ChartClusterCpu() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Cluster CPU Utilization</CardTitle>
        <CardDescription>
          100-point resolution with SVG gradients
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer className="size-full" config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              right: 6,
            }}
          >
            <defs>
              <linearGradient id="fillSys" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillUser" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWait" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="time"
              minTickGap={30}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis axisLine={false} tickLine={false} width={30} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="wait"
              fill="url(#fillWait)"
              stackId="1"
              stroke="var(--chart-3)"
              type="natural"
            />
            <Area
              dataKey="user"
              fill="url(#fillUser)"
              stackId="1"
              stroke="var(--chart-2)"
              type="natural"
            />
            <Area
              dataKey="sys"
              fill="url(#fillSys)"
              stackId="1"
              stroke="var(--chart-1)"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
