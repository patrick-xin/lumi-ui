"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Label } from "@/registry/ui/label";
import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Switch } from "@/registry/ui/switch";

type PreferenceSelect = {
  id: string;
  label: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
};

type PreferenceSwitch = {
  id: string;
  label: string;
  description?: string;
  value: boolean;
};

const initialSelects: PreferenceSelect[] = [
  {
    description: "Choose which page opens when you launch the dashboard.",
    id: "homeView",
    label: "Default home view",
    options: [
      { label: "Executive overview", value: "overview" },
      { label: "Financial performance", value: "financials" },
      { label: "Billing operations", value: "billing" },
      { label: "Customer health", value: "customers" },
      { label: "Alerts & anomalies", value: "alerts" },
    ],
    value: "overview",
  },
  {
    description: "Applied to charts and tables by default.",
    id: "dateRange",
    label: "Default date range",
    options: [
      { label: "Last 7 days", value: "7d" },
      { label: "Last 30 days", value: "30d" },
      { label: "Last 90 days", value: "90d" },
      { label: "Month to date", value: "mtd" },
      { label: "Quarter to date", value: "qtd" },
    ],
    value: "30d",
  },
  {
    description: "Used for financial formatting across the dashboard.",
    id: "currency",
    label: "Currency",
    options: [
      { label: "USD — US Dollar", value: "usd" },
      { label: "EUR — Euro", value: "eur" },
      { label: "GBP — British Pound", value: "gbp" },
      { label: "SGD — Singapore Dollar", value: "sgd" },
      { label: "JPY — Japanese Yen", value: "jpy" },
    ],
    value: "usd",
  },
  {
    description: "How large numbers are abbreviated in KPIs.",
    id: "numberFormat",
    label: "Number format",
    options: [
      { label: "Compact (128.4k)", value: "compact" },
      { label: "Standard (128,430)", value: "standard" },
      { label: "Accounting (128,430.00)", value: "accounting" },
    ],
    value: "compact",
  },
  {
    description: "Controls spacing for tables and cards.",
    id: "density",
    label: "Data density",
    options: [
      { label: "Comfortable", value: "comfortable" },
      { label: "Compact", value: "compact" },
      { label: "Dense", value: "dense" },
    ],
    value: "comfortable",
  },
];

const initialSwitches: PreferenceSwitch[] = [
  {
    description: "Minimize animations across the dashboard UI.",
    id: "reducedMotion",
    label: "Reduce motion",
    value: false,
  },
  {
    description: "Display mini-trends inside KPI cards.",
    id: "showKpiSparks",
    label: "Show KPI sparklines",
    value: true,
  },
  {
    description: "Refresh key metrics automatically when data changes.",
    id: "liveUpdates",
    label: "Live updates",
    value: true,
  },
  {
    description: "Surface unusual spikes, drops, and outliers in charts.",
    id: "anomalyDetection",
    label: "Anomaly highlights",
    value: true,
  },
  {
    description: "Strings like :) will be converted to 🙂 in notes.",
    id: "convertEmoticons",
    label: "Convert text emoticons",
    value: false,
  },
];

function PreferenceRow({
  label,
  description,
  control,
  htmlFor,
}: {
  label: string;
  description?: string;
  control: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 space-y-1">
        <Label
          className="text-sm font-medium text-foreground"
          htmlFor={htmlFor}
        >
          {label}
        </Label>
        {description ? (
          <p className="text-sm text-muted-foreground leading-snug">
            {description}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export function PreferencesDialogContent() {
  const [selects, setSelects] = React.useState(initialSelects);
  const [switches, setSwitches] = React.useState(initialSwitches);

  function setSelectValue(id: string, value: string) {
    setSelects((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  }

  function setSwitchValue(id: string, value: boolean) {
    setSwitches((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  }

  const selectById = React.useMemo(
    () => Object.fromEntries(selects.map((s) => [s.id, s])),
    [selects],
  );
  const switchById = React.useMemo(
    () => Object.fromEntries(switches.map((s) => [s.id, s])),
    [switches],
  );

  return (
    <ScrollArea className="max-h-[70vh] w-full" gradientScrollFade noScrollBar>
      <div className="space-y-4">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">General</CardTitle>
            <CardDescription>Default behavior and formatting.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <PreferenceRow
              control={
                <Select
                  items={selectById.homeView.options}
                  onValueChange={(v) => setSelectValue("homeView", v as string)}
                  value={selectById.homeView.value}
                >
                  <SelectTriggerGroup className="w-[180px] sm:w-[220px] bg-muted/40" />
                  <SelectContent alignItemWithTrigger>
                    {selectById.homeView.options.map((o) => (
                      <SelectItemContent key={o.value} value={o.value}>
                        {o.label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.homeView.description}
              label={selectById.homeView.label}
            />

            <PreferenceRow
              control={
                <Select
                  items={selectById.dateRange.options}
                  onValueChange={(v) =>
                    setSelectValue("dateRange", v as string)
                  }
                  value={selectById.dateRange.value}
                >
                  <SelectTriggerGroup className="w-[180px] sm:w-[220px] bg-muted/40" />

                  <SelectContent alignItemWithTrigger>
                    {selectById.dateRange.options.map((o) => (
                      <SelectItemContent key={o.value} value={o.value}>
                        {o.label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.dateRange.description}
              label={selectById.dateRange.label}
            />

            <PreferenceRow
              control={
                <Select
                  items={selectById.currency.options}
                  onValueChange={(v) => setSelectValue("currency", v as string)}
                  value={selectById.currency.value}
                >
                  <SelectTriggerGroup className="w-[180px] sm:w-[220px] bg-muted/40" />
                  <SelectContent>
                    {selectById.currency.options.map((o) => (
                      <SelectItemContent key={o.value} value={o.value}>
                        {o.label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.currency.description}
              label={selectById.currency.label}
            />

            <PreferenceRow
              control={
                <Select
                  items={selectById.numberFormat.options}
                  onValueChange={(v) =>
                    setSelectValue("numberFormat", v as string)
                  }
                  value={selectById.numberFormat.value}
                >
                  <SelectTriggerGroup className="w-[180px] sm:w-[220px] bg-muted/40" />
                  <SelectContent alignItemWithTrigger>
                    {selectById.numberFormat.options.map((o) => (
                      <SelectItemContent key={o.value} value={o.value}>
                        {o.label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.numberFormat.description}
              label={selectById.numberFormat.label}
            />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Interface & theme</CardTitle>
            <CardDescription>
              Visual density and interaction preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <PreferenceRow
              control={
                <Select
                  items={selectById.density.options}
                  onValueChange={(v) => setSelectValue("density", v as string)}
                  value={selectById.density.value}
                >
                  <SelectTriggerGroup className="w-[180px] sm:w-[220px] bg-muted/40" />
                  <SelectContent alignItemWithTrigger>
                    {selectById.density.options.map((o) => (
                      <SelectItemContent key={o.value} value={o.value}>
                        {o.label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.density.description}
              label={selectById.density.label}
            />

            <PreferenceRow
              control={
                <Switch
                  checked={switchById.reducedMotion.value}
                  id="reducedMotion"
                  onCheckedChange={(v) => setSwitchValue("reducedMotion", v)}
                />
              }
              description={switchById.reducedMotion.description}
              htmlFor="reducedMotion"
              label={switchById.reducedMotion.label}
            />

            <PreferenceRow
              control={
                <Switch
                  checked={switchById.showKpiSparks.value}
                  id="showKpiSparks"
                  onCheckedChange={(v) => setSwitchValue("showKpiSparks", v)}
                />
              }
              description={switchById.showKpiSparks.description}
              htmlFor="showKpiSparks"
              label={switchById.showKpiSparks.label}
            />

            <PreferenceRow
              control={
                <Switch
                  checked={switchById.liveUpdates.value}
                  id="liveUpdates"
                  onCheckedChange={(v) => setSwitchValue("liveUpdates", v)}
                />
              }
              description={switchById.liveUpdates.description}
              htmlFor="liveUpdates"
              label={switchById.liveUpdates.label}
            />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Intelligence</CardTitle>
            <CardDescription>
              Signal quality and automation settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <PreferenceRow
              control={
                <Switch
                  checked={switchById.anomalyDetection.value}
                  id="anomalyDetection"
                  onCheckedChange={(v) => setSwitchValue("anomalyDetection", v)}
                />
              }
              description={switchById.anomalyDetection.description}
              htmlFor="anomalyDetection"
              label={switchById.anomalyDetection.label}
            />

            <PreferenceRow
              control={
                <Switch
                  checked={switchById.convertEmoticons.value}
                  id="convertEmoticons"
                  onCheckedChange={(v) => setSwitchValue("convertEmoticons", v)}
                />
              }
              description={switchById.convertEmoticons.description}
              htmlFor="convertEmoticons"
              label={switchById.convertEmoticons.label}
            />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
