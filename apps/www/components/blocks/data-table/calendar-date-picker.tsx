"use client";

import * as React from "react";
import { cn } from "@/registry/lib/utils";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
} from "@/registry/ui/popover";
import { Calendar } from "./calendar";

interface CalendarDatePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
}

export function CalendarDatePicker({
  open,
  onOpenChange,
  ref,
  value,
  onValueChange,
}: CalendarDatePickerProps) {
  const startYear = new Date().getFullYear() - 2;
  const today = React.useMemo(() => new Date(), []);
  const selectedDate = value ?? today;
  const handleDateSelect = (date: Date | undefined) => {
    onValueChange(date ?? selectedDate);
    onOpenChange(false);
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
          <PopoverPopup
            className={cn(
              "relative w-80 rounded-md bg-popover text-popover-foreground shadow-2xl shadow-primary/10 border-primary/20",
              "overlay-outline animate-popup",
            )}
            data-slot="popover-content"
          >
            <PopoverArrow />
            <Calendar
              captionLayout="dropdown"
              className="w-full"
              defaultMonth={value ?? today}
              disabled={{ after: today }}
              endMonth={today}
              mode="single"
              onSelect={handleDateSelect}
              selected={selectedDate}
              startYear={startYear}
            />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}
