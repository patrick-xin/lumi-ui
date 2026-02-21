"use client";

import type { Column, SortDirection } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/ui/button";
import { DropdownMenuTrigger } from "@/registry/ui/dropdown-menu";
import { columnMenuHandle } from "./index";

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  sortDirection?: SortDirection | false;
}

export function ColumnHeaderDropdown<TData, TValue>({
  column,
  title,
  sortDirection,
}: ColumnHeaderProps<TData, TValue>) {
  return (
    <DropdownMenuTrigger
      handle={columnMenuHandle}
      id={`menu-trigger-${column.id}`}
      payload={column.id}
      render={
        <Button
          className="data-popup-open:bg-accent cursor-pointer"
          size="sm"
          variant="ghost"
        >
          <span>{title}</span>
          {sortDirection === "desc" ? (
            <ArrowDownIcon className="text-muted-foreground" />
          ) : sortDirection === "asc" ? (
            <ArrowUpIcon className="text-muted-foreground" />
          ) : (
            <ArrowUpDownIcon className="text-muted-foreground" />
          )}
        </Button>
      }
    />
  );
}
