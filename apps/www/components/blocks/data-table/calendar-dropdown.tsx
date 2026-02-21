"use client";

import type { Column, SortDirection } from "@tanstack/react-table";
import { addDays, format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  CalendarDaysIcon,
  CalendarIcon,
  Timer,
  Trash,
} from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { CalendarDatePicker } from "./calendar-date-picker";
import { CalendarRangePicker } from "./calendar-range-picker";

interface CalendarDropdownProps<TData, TValue> {
  column: Column<TData, TValue>;
  sortDirection: SortDirection | false;
  title?: string;
  dateFilterValue?: RenewalDateFilterValue;
}

type RenewalDateRangeFilterValue = {
  from?: string;
  to?: string;
};

export type RenewalDateFilterValue = string | RenewalDateRangeFilterValue;

const parseFilterDate = (value?: string) => {
  if (!value) return undefined;
  const parsedDate = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export const CalendarDropdown = <TData, TValue>({
  column,
  sortDirection,
  title = "Renewal Date",
  dateFilterValue,
}: CalendarDropdownProps<TData, TValue>) => {
  const hasFilter =
    typeof dateFilterValue === "string"
      ? dateFilterValue.length > 0
      : typeof dateFilterValue === "object" && dateFilterValue !== null
        ? Boolean(dateFilterValue.from || dateFilterValue.to)
        : dateFilterValue != null;
  const selectedDate =
    typeof dateFilterValue === "string" && dateFilterValue.length > 0
      ? parseFilterDate(dateFilterValue)
      : new Date();
  const selectedRange: DateRange | undefined =
    typeof dateFilterValue === "object" && dateFilterValue !== null
      ? {
          from: parseFilterDate(dateFilterValue.from),
          to: parseFilterDate(dateFilterValue.to),
        }
      : {
          from: new Date(new Date().getFullYear(), 0, 12),
          to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
        };
  const [rangeOpen, setRangeOpen] = React.useState(false);
  const [dateOpen, setDateOpen] = React.useState(false);
  const rangeRef = React.useRef<HTMLDivElement | null>(null);
  const dateRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent cursor-pointer"
              size="sm"
              variant="ghost"
            />
          }
        >
          {title} <Timer />
        </DropdownMenuTrigger>
        <DropdownMenuContent matchAnchorWidth={false} sideOffset={4}>
          <DropdownMenuItem
            className="text-sm justify-between"
            disabled={sortDirection === "asc"}
            onClick={() => column.toggleSorting(false)}
          >
            Asc <ArrowUp className="size-3.5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm justify-between"
            disabled={sortDirection === "desc"}
            onClick={() => column.toggleSorting(true)}
          >
            Desc <ArrowDown className="size-3.5" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-sm justify-between"
            closeOnClick={false}
            onClick={() => setDateOpen(true)}
            ref={dateRef}
          >
            Custom Date
            <CalendarIcon className="size-3.5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm justify-between"
            onClick={() => setRangeOpen(true)}
            ref={rangeRef}
          >
            Custom Range <CalendarDaysIcon className="size-3.5" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-sm justify-between"
            disabled={!sortDirection && !hasFilter}
            onClick={() => {
              column.clearSorting();
              column.setFilterValue(undefined);
            }}
            variant="destructive"
          >
            Clear <Trash className="size-3.5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CalendarRangePicker
        onOpenChange={setRangeOpen}
        onValueChange={(dateRange) => {
          const from = dateRange?.from
            ? format(dateRange.from, "yyyy-MM-dd")
            : undefined;
          const to = dateRange?.to
            ? format(dateRange.to, "yyyy-MM-dd")
            : undefined;

          if (!from && !to) {
            column.setFilterValue(undefined);
            return;
          }

          column.setFilterValue({
            from,
            to,
          } satisfies RenewalDateRangeFilterValue);
        }}
        open={rangeOpen}
        ref={rangeRef}
        value={selectedRange}
      />
      <CalendarDatePicker
        onOpenChange={setDateOpen}
        onValueChange={(date) => {
          column.setFilterValue(date ? format(date, "yyyy-MM-dd") : undefined);
        }}
        open={dateOpen}
        ref={dateRef}
        value={selectedDate}
      />
    </>
  );
};
