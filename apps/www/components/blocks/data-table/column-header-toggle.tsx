"use client";

import type { Column, SortDirection } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import type * as React from "react";
import { Toggle } from "@/registry/ui/toggle";

interface ColumnHeaderToggleProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  sortDirection: SortDirection | false;
  title: string;
}

export function ColumnHeaderToggle<TData, TValue>({
  column,
  sortDirection,
  title,
}: ColumnHeaderToggleProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className="text-sm font-medium">{title}</div>;
  }

  return (
    <Toggle
      className="bg-transparent! hover:bg-accent! hover:text-foreground cursor-pointer"
      onPressedChange={() => column.toggleSorting(sortDirection === "asc")}
      pressed={!!sortDirection}
      size="sm"
    >
      {title}
      {sortDirection === "desc" || sortDirection === false ? (
        <ArrowDownIcon className="text-muted-foreground" />
      ) : (
        <ArrowUpIcon className="text-muted-foreground" />
      )}
    </Toggle>
  );
}
