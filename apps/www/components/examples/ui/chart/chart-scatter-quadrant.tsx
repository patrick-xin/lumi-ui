"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/ui/chart";
import {
  CartesianGrid,
  ReferenceLine,
  Scatter,
  ScatterChart,
  type ScatterShapeProps,
  Symbols,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const data = Array.from({ length: 30 }, (_, i) => ({
  cost: Math.floor(Math.random() * 1000) + 200,
  id: i,
  impact: Math.floor(Math.random() * 500) + 50,
  performance: Math.floor(Math.random() * 100),
  segment: Math.random() > 0.5 ? "Enterprise" : "Startup",
}));

const chartConfig = {
  cost: { label: "Cost ($)" },
  impact: { label: "Business Impact" },
  performance: { label: "Performance Score" },
} satisfies ChartConfig;

export function ChartScatterQuadrant() {
  return (
    <Card className="w-full sm:w-150">
      <CardHeader>
        <CardTitle>Vendor Matrix</CardTitle>
        <CardDescription>Cost vs Performance vs Impact</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="aspect-square" config={chartConfig}>
          <ScatterChart margin={{ bottom: 20, left: 20, right: 20, top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="performance"
              domain={[0, 100]}
              name="Performance"
              type="number"
              unit="pts"
            />
            <YAxis
              dataKey="cost"
              domain={[0, 1200]}
              name="Cost"
              type="number"
              unit="$"
            />
            <ZAxis
              dataKey="impact"
              name="Impact"
              range={[50, 400]}
              type="number"
            />

            <ReferenceLine
              label="Avg Perf"
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
              x={50}
            />
            <ReferenceLine
              label="Avg Cost"
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
              y={700}
            />

            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Segment
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.segment}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Impact
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ strokeDasharray: "3 3" }}
              isAnimationActive={false}
            />

            <Scatter data={data} name="Vendors" shape={CustomScatterShape} />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CustomScatterShape = (props: ScatterShapeProps) => {
  const { cx, cy, payload } = props;
  const isEnterprise = payload.segment === "Enterprise";
  const fillColor = isEnterprise ? "var(--chart-1)" : "var(--chart-2)";
  return (
    <Symbols
      cx={cx}
      cy={cy}
      fill={fillColor}
      fillOpacity={0.7}
      size={props.size}
      type="circle"
    />
  );
};
