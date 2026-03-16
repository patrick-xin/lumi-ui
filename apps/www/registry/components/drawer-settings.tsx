"use client";

import * as React from "react";
import { useMediaQuery } from "@/registry/hooks/use-media-query";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { Label } from "@/registry/ui/label";
import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Switch } from "@/registry/ui/switch";
import { toast } from "@/registry/ui/toast";

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

const TOP_MARGIN_REM = 3;
const snapPoints = [`${40 + TOP_MARGIN_REM}rem`, 1];

export function DrawerDialogSettingsDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <PreferencesDialog onOpenChange={setOpen} open={open} />;
  }

  return <PreferencesDrawer onOpenChange={setOpen} open={open} />;
}

const PreferencesDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Drawer onOpenChange={onOpenChange} open={open} snapPoints={snapPoints}>
      <DrawerTrigger
        render={<Button variant="outline">Drawer with ScrollArea</Button>}
      />
      <DrawerContent
        layout="snap"
        style={
          {
            "--drawer-snap-top-margin": `${TOP_MARGIN_REM}rem`,
          } as React.CSSProperties
        }
      >
        <DrawerDragHandle className="my-4" />
        <DrawerHeader className="mb-4 mx-4 touch-none">
          <DrawerTitle>Preferences</DrawerTitle>
          <DrawerDescription>Manage your preferences.</DrawerDescription>
        </DrawerHeader>
        <DrawerSelectable className="min-h-0 touch-auto z-10">
          <PreferencesDialogContent />
        </DrawerSelectable>
        <DrawerFooter className="px-4 mt-6 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <DrawerClose
            render={
              <Button
                onClick={() => {
                  toast.success({
                    description:
                      "Your preferences have been saved successfully.",
                    title: "Preferences saved",
                  });
                }}
              >
                Save
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const PreferencesDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger
        render={<Button variant="outline">Drawer with ScrollArea</Button>}
      />
      <DialogContent className="sm:max-w-3xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>Manage your preferences.</DialogDescription>
        </DialogHeader>
        <PreferencesDialogContent />
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <Button
            onClick={() => {
              toast.success({
                description: "Your preferences have been saved successfully.",
                title: "Preferences saved",
              });
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function PreferencesDialogContent() {
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
    <ScrollArea className="w-full h-[70vh]" gradientScrollFade noScrollBar>
      <div className="space-y-4">
        <Card className="border-none shadow-none rounded-md">
          <CardHeader>
            <CardTitle>General</CardTitle>
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
                  <SelectTriggerGroup className="w-48 sm:w-56" />
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
                  <SelectTriggerGroup className="w-40 sm:w-56" />

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
                  <SelectTriggerGroup className="w-40 sm:w-56" />
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
              className="flex-wrap"
              control={
                <Select
                  items={selectById.numberFormat.options}
                  onValueChange={(v) =>
                    setSelectValue("numberFormat", v as string)
                  }
                  value={selectById.numberFormat.value}
                >
                  <SelectTriggerGroup className="w-56" />
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

            <PreferenceRow
              className="flex-wrap"
              control={
                <Select
                  items={selectById.timezone.options}
                  onValueChange={(v) => setSelectValue("timezone", v as string)}
                  value={selectById.timezone.value}
                >
                  <SelectTriggerGroup />
                  <SelectContent>
                    {timezoneGroups.map((group) => (
                      <SelectGroup key={group.label}>
                        <SelectGroupLabel>{group.label}</SelectGroupLabel>
                        {group.items.map((item) => (
                          <SelectItemContent
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItemContent>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              }
              description={selectById.timezone.description}
              label={selectById.timezone.label}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Interface & theme</CardTitle>
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
                  <SelectTriggerGroup className="w-32 sm:w-40" />
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
                  aria-label="Reduced motion"
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
                  aria-label="Live updates"
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

        <Card className="border-none shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Intelligence</CardTitle>
            <CardDescription>
              Signal quality and automation settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <PreferenceRow
              control={
                <Switch
                  aria-label="Anomaly detection"
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
                  aria-label="Convert emoticons"
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

function PreferenceRow({
  label,
  description,
  control,
  htmlFor,
  className,
}: {
  label: string;
  description?: string;
  control: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 py-3 ${className}`}>
      <div className="min-w-0 space-y-1">
        <Label
          className="text-sm font-medium text-foreground"
          htmlFor={htmlFor}
        >
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground leading-snug">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

const timezoneGroups = [
  {
    items: [
      { label: "Eastern Standard Time (EST)", value: "est" },
      { label: "Central Standard Time (CST)", value: "cst" },
      { label: "Mountain Standard Time (MST)", value: "mst" },
      { label: "Pacific Standard Time (PST)", value: "pst" },
      { label: "Alaska Standard Time (AKST)", value: "akst" },
      { label: "Hawaii Standard Time (HST)", value: "hst" },
    ],
    label: "North America",
  },
  {
    items: [
      { label: "Greenwich Mean Time (GMT)", value: "gmt" },
      { label: "Central European Time (CET)", value: "cet" },
      { label: "Eastern European Time (EET)", value: "eet" },
      { label: "Western European Summer Time (WEST)", value: "west" },
      { label: "Central Africa Time (CAT)", value: "cat" },
      { label: "East Africa Time (EAT)", value: "eat" },
    ],
    label: "Europe & Africa",
  },
  {
    items: [
      { label: "Moscow Time (MSK)", value: "msk" },
      { label: "India Standard Time (IST)", value: "ist" },
      { label: "China Standard Time (CST)", value: "cst_china" },
      { label: "Japan Standard Time (JST)", value: "jst" },
      { label: "Korea Standard Time (KST)", value: "kst" },
      {
        label: "Indonesia Central Standard Time (WITA)",
        value: "ist_indonesia",
      },
    ],
    label: "Asia",
  },
  {
    items: [
      { label: "Australian Western Standard Time (AWST)", value: "awst" },
      { label: "Australian Central Standard Time (ACST)", value: "acst" },
      { label: "Australian Eastern Standard Time (AEST)", value: "aest" },
      { label: "New Zealand Standard Time (NZST)", value: "nzst" },
      { label: "Fiji Time (FJT)", value: "fjt" },
    ],
    label: "Australia & Pacific",
  },
  {
    items: [
      { label: "Argentina Time (ART)", value: "art" },
      { label: "Bolivia Time (BOT)", value: "bot" },
      { label: "Brasilia Time (BRT)", value: "brt" },
      { label: "Chile Standard Time (CLT)", value: "clt" },
    ],
    label: "South America",
  },
];

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
  {
    description: "Timezone for all date-based displays.",
    id: "timezone",
    label: "Timezone",
    options: timezoneGroups.flatMap((group) => group.items),
    value: "pst",
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
