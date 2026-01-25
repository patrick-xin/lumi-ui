"use client";

import { cn } from "@lumi-ui/ui/lib/utils";
import * as React from "react";
import {
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import type { LegendPayload } from "recharts/types/component/DefaultLegendContent";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { Props as LegendProps } from "recharts/types/component/Legend";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

const THEMES = { dark: ".dark", light: "" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

interface ChartItem {
  dataKey?: string | number;
  payload?: Record<string, unknown> | undefined;
  name?: string | number;
  value?: ValueType | string | undefined;
  color?: string;
  fill?: string;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "min-w-0 min-h-0 aspect-auto w-full h-full text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-wrapper]:outline-hidden [&_.recharts-surface]:outline-hidden [&_g]:outline-hidden",
          className,
        )}
        data-chart={chartId}
        data-slot="chart"
        {...props}
      >
        <ChartStyle config={config} id={chartId} />
        <ResponsiveContainer
          initialDimension={{ height: 100, width: 100 }}
          minHeight={100}
          minWidth={100}
        >
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
            ${colorConfig
              .map(([key, itemConfig]) => {
                const color =
                  itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
                  itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
              })
              .join("\n")}
            }
            `,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsTooltip;

type CustomTooltipProps<
  TValue extends ValueType = ValueType,
  TName extends NameType = NameType,
> = Partial<Omit<TooltipContentProps<TValue, TName>, "payload">> & {
  payload?: ReadonlyArray<Payload<TValue, TName>>;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (
    label: TooltipContentProps<TValue, TName>["label"],
    payload: ReadonlyArray<Payload<TValue, TName>>,
  ) => React.ReactNode;
  formatter?: (
    value: TValue | undefined,
    name: TName | undefined,
    item: Payload<TValue, TName>,
    index: number,
    payload: ReadonlyArray<Payload<TValue, TName>>,
  ) => React.ReactNode;
  labelClassName?: string;
  color?: string;
};

function ChartTooltipContent<TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  labelFormatter,
  formatter,
  labelClassName,
  color,
  nameKey,
  labelKey,
}: CustomTooltipProps<TValue, TName>) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = (() => {
      const v =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      return typeof v === "string" || typeof v === "number" ? v : undefined;
    })();

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-16 items-start gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
              key={`${item.dataKey}-${index}`}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-xs border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "my-0.5": nestLabel && indicator === "dashed",
                            "w-0 border border-dashed bg-transparent":
                              indicator === "dashed",
                            "w-1": indicator === "line",
                          },
                        )}
                        style={{
                          "--color-bg": indicatorColor,
                          "--color-border": indicatorColor,
                        }}
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 gap-2 leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsLegend;

type ChartLegendContentProps = {
  className?: string;
  hideIcon?: boolean;
  verticalAlign?: LegendProps["verticalAlign"];
  payload?: LegendPayload[];
  nameKey?: string;
};

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
            key={item.value}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-xs"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadItem = payload as ChartItem;

  let configLabelKey: string = key;

  if (
    key in payloadItem &&
    typeof payloadItem[key as keyof ChartItem] === "string"
  ) {
    configLabelKey = payloadItem[key as keyof ChartItem] as string;
  } else if (
    payloadItem.payload &&
    key in payloadItem.payload &&
    typeof payloadItem.payload[key] === "string"
  ) {
    configLabelKey = payloadItem.payload[key] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
