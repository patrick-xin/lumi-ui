"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowRight, ArrowUp, CircleDashed } from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";
import { PRIORITIES } from "./data";

function getPriorityIcon(priority: string) {
  if (!priority)
    return <CircleDashed className="size-4 text-muted-foreground" />;

  switch (priority.toLowerCase()) {
    case "high":
      return <ArrowUp className="size-4 text-red-500" />;
    case "medium":
      return <ArrowRight className="size-4 text-yellow-500" />;
    case "low":
      return <ArrowDown className="size-4 text-blue-500" />;
    case "all":
      return <CircleDashed className="size-4 text-muted-foreground" />;
  }
}

interface ColumnHeaderSelectProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  filterValue: string;
}

export function ColumnHeaderSelect<TData, TValue>({
  column,
  title,
  filterValue,
}: ColumnHeaderSelectProps<TData, TValue>) {
  return (
    <Select
      onValueChange={(value) => {
        column.setFilterValue(value === "all" ? undefined : value);
      }}
      value={filterValue ?? "all"}
    >
      <SelectTrigger
        render={<Button className="cursor-pointer" size="sm" variant="ghost" />}
      >
        <SelectValue
          className="flex items-center gap-1 data-[placeholder]:text-foreground"
          placeholder={title}
        >
          {(value) => {
            const displayLabel = value === "all" ? "All" : value;
            return (
              <>
                <span>{displayLabel}</span>
                <span>{getPriorityIcon(value)}</span>
              </>
            );
          }}
        </SelectValue>
      </SelectTrigger>

      <SelectContent alignItemWithTrigger>
        {["all", ...PRIORITIES].map((priority) => (
          <SelectItemContent
            className="pr-3"
            hideIndicator
            key={priority}
            value={priority}
          >
            <span>{priority === "all" ? "All" : priority}</span>
            <span className="ml-auto">{getPriorityIcon(priority)}</span>
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
