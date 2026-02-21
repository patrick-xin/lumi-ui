"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart";

type SparkPoint = { x: string; a: number; b?: number };

const kpiSparkConfig = {
  a: { color: "var(--chart-1)", label: "Primary" },
  b: { color: "var(--chart-2)", label: "Secondary" },
} satisfies ChartConfig;

function makeSparkData(
  len = 32,
  opts?: { aTrend?: number; bTrend?: number; spike?: boolean },
) {
  const aTrend = opts?.aTrend ?? -0.6;
  const bTrend = opts?.bTrend ?? 0.2;
  const spike = opts?.spike ?? true;

  let a = 80 + Math.random() * 8;
  let b = 40 + Math.random() * 6;

  const points: SparkPoint[] = Array.from({ length: len }, (_, i) => {
    // smooth-ish drift + noise
    a = Math.max(0, a + aTrend + (Math.random() - 0.5) * 3.5);
    b = Math.max(0, b + bTrend + (Math.random() - 0.5) * 2.4);

    // one late spike for series B (like your screenshot)
    if (spike && i === Math.floor(len * 0.85)) {
      b = b + 26 + Math.random() * 10;
    }

    return {
      a: Math.round(a * 10) / 10,
      b: Math.round(b * 10) / 10,
      x: String(i + 1),
    };
  });

  return points;
}

function Delta({ value, trend }: { value: string; trend: "up" | "down" }) {
  const Icon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs",
        trend === "up"
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export function ChartKpiSpark({
  data,
  showB = true,
  className,
}: {
  data: SparkPoint[];
  showB?: boolean;
  className?: string;
}) {
  return (
    <ChartContainer
      className={cn("h-16 w-full", className)}
      config={kpiSparkConfig}
    >
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 8 }}
        >
          <defs>
            <linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--color-a)" stopOpacity={0.35} />
              <stop
                offset="95%"
                stopColor="var(--color-a)"
                stopOpacity={0.06}
              />
            </linearGradient>
            <linearGradient id="fillB" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--color-b)" stopOpacity={0.28} />
              <stop
                offset="95%"
                stopColor="var(--color-b)"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          {/* subtle horizontal grid only */}
          <CartesianGrid
            strokeDasharray="4 4"
            strokeOpacity={0.35}
            vertical={false}
          />

          {/* keep a stable range; hide axis */}
          <YAxis domain={["dataMin - 6", "dataMax + 6"]} hide />

          {/* Series A (often “down” / red in screenshot vibe; but we keep token-driven) */}
          <Area
            activeDot={false}
            dataKey="a"
            dot={false}
            fill="url(#fillA)"
            stroke="var(--color-a)"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            activeDot={false}
            dataKey="a"
            dot={false}
            stroke="var(--color-a)"
            strokeWidth={2}
            type="monotone"
          />

          {/* Series B (often “up” / green spike vibe) */}
          {showB && (
            <>
              <Area
                activeDot={false}
                dataKey="b"
                dot={false}
                fill="url(#fillB)"
                stroke="var(--color-b)"
                strokeWidth={2}
                type="monotone"
              />
              <Line
                activeDot={false}
                dataKey="b"
                dot={false}
                stroke="var(--color-b)"
                strokeWidth={2}
                type="monotone"
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function KpiSparkCard({
  title,
  description,
  value,
  delta,
  trend,
  badge,
  showB = true,
}: {
  title: string;
  description?: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  badge?: string;
  showB?: boolean;
}) {
  const data = React.useMemo(
    () =>
      makeSparkData(34, {
        aTrend: trend === "down" ? -0.9 : 0.4,
        bTrend: 0.25,
        spike: true,
      }),
    [trend],
  );

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {description ? (
              <CardDescription className="text-xs">
                {description}
              </CardDescription>
            ) : null}
          </div>
          {badge ? (
            <Badge className="bg-muted text-foreground" variant="secondary">
              {badge}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-end justify-between gap-2">
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </div>
          <Delta trend={trend} value={delta} />
        </div>

        <p className="text-xs text-muted-foreground">Last 30 days</p>
        <div className="rounded-lg border p-2 h-30">
          <ChartKpiSpark data={data} showB={showB} />
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiSparkGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KpiSparkCard
        badge="MTD"
        delta="+12.4%"
        description="Net inflow"
        title="Revenue"
        trend="up"
        value="$128,430"
      />
      <KpiSparkCard
        badge="Runway"
        delta="+4.9%"
        description="Operating costs"
        title="Burn"
        trend="down"
        value="$54,210"
      />
      <KpiSparkCard
        badge="30D"
        delta="+3.1%"
        description="Engaged"
        title="Active Users"
        trend="up"
        value="24,918"
      />
      <KpiSparkCard
        badge="Low"
        delta="-0.06%"
        description="Disputes & refunds"
        showB={false}
        title="Refund Rate"
        trend="up"
        value="0.42%" // single-series variant
      />
    </div>
  );
}
