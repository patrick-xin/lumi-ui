import {
  endOfYear,
  isAfter,
  startOfDay,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
} from "@/registry/ui/popover";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { Calendar } from "./calendar";

interface CalendarRangePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  value?: DateRange;
  onValueChange: (date: DateRange | undefined) => void;
}

export const CalendarRangePicker = ({
  open,
  onOpenChange,
  ref,
  value,
  onValueChange,
}: CalendarRangePickerProps) => {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const defaultFrom = React.useMemo(() => subMonths(today, 1), [today]);
  const startMonth = React.useMemo(
    () => new Date(today.getFullYear() - 2, 0, 1),
    [today],
  );
  const endMonth = React.useMemo(
    () => new Date(today.getFullYear(), 11, 31),
    [today],
  );
  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(
    () => value,
  );

  const [visibleMonth, setVisibleMonth] = React.useState<Date>(
    () => value?.from ?? defaultFrom,
  );
  React.useEffect(() => {
    if (open) {
      setDraftRange(value);
      setVisibleMonth(value?.from ?? defaultFrom);
    }
  }, [defaultFrom, open, value]);

  const fromDate = draftRange?.from ?? defaultFrom;
  const toDate = draftRange?.to ?? draftRange?.from ?? today;

  const setRange = (nextRange: DateRange | undefined) => {
    setDraftRange(nextRange);
    if (nextRange?.from) {
      setVisibleMonth(nextRange.from);
    }
  };

  const handleConfirm = () => {
    onValueChange(draftRange);
    onOpenChange(false);
  };

  const applyPresetRange = (nextRange: DateRange) => {
    setDraftRange(nextRange);
    if (nextRange.from) {
      setVisibleMonth(nextRange.from);
    }
    onValueChange(nextRange);
    onOpenChange(false);
  };

  const applyPreset = (preset: PresetRange) => {
    if (preset === "today") {
      applyPresetRange({ from: today, to: today });
      return;
    }

    if (preset === "yesterday") {
      const yesterday = subDays(today, 1);
      applyPresetRange({ from: yesterday, to: yesterday });
      return;
    }

    if (preset === "last_7_days") {
      applyPresetRange({ from: subDays(today, 6), to: today });
      return;
    }

    if (preset === "last_30_days") {
      applyPresetRange({ from: subDays(today, 29), to: today });
      return;
    }

    if (preset === "last_3_months") {
      applyPresetRange({ from: subMonths(today, 3), to: today });
      return;
    }

    if (preset === "last_6_months") {
      applyPresetRange({ from: subMonths(today, 6), to: today });
      return;
    }

    const previousYear = subYears(today, 1);
    applyPresetRange({
      from: startOfYear(previousYear),
      to: endOfYear(previousYear),
    });
  };

  const toSafeDateInMonth = (
    sourceDate: Date,
    targetMonth: number,
    targetYear: number,
  ) => {
    const sourceDay = sourceDate.getDate();
    const maxDayInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    return new Date(
      targetYear,
      targetMonth,
      Math.min(sourceDay, maxDayInMonth),
    );
  };

  const updateFromDate = (
    targetMonth: number,
    targetYear: number = fromDate.getFullYear(),
  ) => {
    const nextFrom = toSafeDateInMonth(fromDate, targetMonth, targetYear);
    const nextTo = isAfter(nextFrom, toDate) ? nextFrom : toDate;
    setRange({ from: nextFrom, to: nextTo });
  };

  const updateToDate = (
    targetMonth: number,
    targetYear: number = toDate.getFullYear(),
  ) => {
    const nextTo = toSafeDateInMonth(toDate, targetMonth, targetYear);
    const nextFrom = isAfter(fromDate, nextTo) ? nextTo : fromDate;
    setRange({ from: nextFrom, to: nextTo });
  };

  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverPortal>
        <PopoverBackdrop className="animate-fade bg-black/20 backdrop-blur-[2px] fixed inset-0" />
        <PopoverPositioner
          anchor={ref}
          disableAnchorTracking
          side="left"
          sideOffset={12}
        >
          <PopoverArrow />
          <PopoverPopup
            className="relative rounded-md bg-popover p-0 text-popover-foreground shadow-2xl shadow-primary/10 border-primary/20 animate-popup"
            data-slot="popover-content"
          >
            <div className="flex">
              {/* Left side */}
              <div className="flex flex-col gap-2 border-r p-2 mt-2">
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("today")}
                  size="sm"
                  variant="ghost"
                >
                  Today
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("yesterday")}
                  size="sm"
                  variant="ghost"
                >
                  Yesterday
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("last_7_days")}
                  size="sm"
                  variant="ghost"
                >
                  Last 7 days
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("last_30_days")}
                  size="sm"
                  variant="ghost"
                >
                  Last 30 days
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("last_3_months")}
                  size="sm"
                  variant="ghost"
                >
                  Last 3 months
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("last_6_months")}
                  size="sm"
                  variant="ghost"
                >
                  Last 6 months
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => applyPreset("last_year")}
                  size="sm"
                  variant="ghost"
                >
                  Last Year
                </Button>
              </div>

              {/* Right side */}
              <div className="flex flex-col">
                <div className="flex flex-wrap justify-between gap-4 xl:gap-6 p-2 sm:p-4 border-b">
                  <div className="flex gap-2 items-center">
                    <div className="text-sm font-medium">From</div>
                    <Select<string>
                      items={monthOptions}
                      onValueChange={(value) => {
                        if (!value) return;
                        updateFromDate(Number(value));
                      }}
                      value={String(fromDate.getMonth())}
                    >
                      <SelectTriggerGroup
                        className="bg-secondary hover:bg-secondary/80"
                        placeholder="Select month"
                        size="sm"
                      />
                      <SelectContent alignItemWithTrigger>
                        {months.map((month, monthIndex) => (
                          <SelectItemContent
                            key={month}
                            value={String(monthIndex)}
                          >
                            {month}
                          </SelectItemContent>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select<string>
                      onValueChange={(value) => {
                        if (!value) return;
                        updateFromDate(fromDate.getMonth(), Number(value));
                      }}
                      value={String(fromDate.getFullYear())}
                    >
                      <SelectTriggerGroup
                        className="bg-secondary hover:bg-secondary/80"
                        placeholder="Select year"
                        size="sm"
                      />
                      <SelectContent alignItemWithTrigger>
                        {years.map((year) => (
                          <SelectItemContent key={year} value={String(year)}>
                            {year}
                          </SelectItemContent>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex gap-2 items-center">
                    <div className="text-sm font-medium">To</div>
                    <Select<string>
                      items={monthOptions}
                      onValueChange={(value) => {
                        if (!value) return;
                        updateToDate(Number(value));
                      }}
                      value={String(toDate.getMonth())}
                    >
                      <SelectTriggerGroup
                        className="bg-secondary hover:bg-secondary/80"
                        placeholder="Select month"
                        size="sm"
                      />
                      <SelectContent alignItemWithTrigger>
                        {months.map((month, monthIndex) => (
                          <SelectItemContent
                            key={month}
                            value={String(monthIndex)}
                          >
                            {month}
                          </SelectItemContent>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select<string>
                      onValueChange={(value) => {
                        if (!value) return;
                        updateToDate(toDate.getMonth(), Number(value));
                      }}
                      value={String(toDate.getFullYear())}
                    >
                      <SelectTriggerGroup
                        className="bg-secondary hover:bg-secondary/80"
                        placeholder="Select year"
                        size="sm"
                      />
                      <SelectContent alignItemWithTrigger>
                        {years.map((year) => (
                          <SelectItemContent key={year} value={String(year)}>
                            {year}
                          </SelectItemContent>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="p-2 sm:p-4">
                  <Calendar
                    className="w-full"
                    classNames={{
                      day_button:
                        "data-[range-middle=true]:text-accent-foreground data-[range-middle=true]:bg-accent ",
                      range_end: "bg-accent after:bg-accent rounded-l-none",
                      range_middle: "bg-accent after:bg-accent",
                      range_start: "bg-accent after:bg-accent rounded-r-none",
                    }}
                    defaultMonth={visibleMonth}
                    endMonth={endMonth}
                    mode="range"
                    month={visibleMonth}
                    numberOfMonths={2}
                    onMonthChange={setVisibleMonth}
                    onSelect={setRange}
                    selected={draftRange}
                    showOutsideDays={false}
                    startMonth={startMonth}
                  />
                </div>
                <div className="border-t p-2 sm:p-4 flex justify-end">
                  <Button onClick={handleConfirm} size="sm">
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
};

type PresetRange =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "last_3_months"
  | "last_6_months"
  | "last_year";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthOptions = months.map((label, monthIndex) => ({
  label,
  value: String(monthIndex),
}));

const years = Array.from(
  { length: 3 },
  (_, index) => new Date().getFullYear() - index,
);
