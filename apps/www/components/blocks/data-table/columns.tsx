import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { DropdownMenuTrigger } from "@/registry/ui/dropdown-menu";
import { TooltipTrigger } from "@/registry/ui/tooltip";
import { actionMenuHandle, headerTooltipHandle } from ".";
import {
  CalendarDropdown,
  type RenewalDateFilterValue,
} from "./calendar-dropdown";
import { ColumnHeaderCombobox } from "./column-header-combobox";
import { ColumnHeaderDropdown } from "./column-header-dropdown";
import { ColumnHeaderSelect } from "./column-header-select";
import { ColumnHeaderToggle } from "./column-header-toggle";
import {
  CURRENCY_FORMATTER,
  DATE_FORMATTER,
  type DealRow,
  PRIORITIES_STYLES,
  REGIONS,
  STAGE_STYLES,
  STAGES,
} from "./data";
import { renewalDateFilterFn } from "./utils";

const columnHelper = createColumnHelper<DealRow>();
export const columns = [
  columnHelper.accessor("select", {
    cell: ({ row }) => (
      <div className="px-4 flex items-center justify-center">
        <Checkbox
          aria-label={`Select account ${row.original.id}`}
          checked={row.getIsSelected()}
          className="translate-y-px border-accent cursor-pointer"
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <div className="px-4 flex items-center justify-center">
        <Checkbox
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          className="translate-y-px border-accent cursor-pointer"
          onCheckedChange={(checked) =>
            table.toggleAllPageRowsSelected(checked)
          }
        />
      </div>
    ),
    id: "select",
    size: 50,
  }),
  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <span className="font-mono text-muted-foreground text-xs px-1">
        #{row.original.id}
      </span>
    ),
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      return (
        <ColumnHeaderToggle
          column={column}
          sortDirection={sortDirection}
          title="ID"
        />
      );
    },
    id: "id",
    size: 70,
  }),
  columnHelper.accessor("account_name", {
    cell: ({ row }) => (
      <span className="px-2.5 text-muted-foreground">
        {row.original.account_name}
      </span>
    ),
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      return (
        <ColumnHeaderDropdown
          column={column}
          sortDirection={sortDirection}
          title="Account"
        />
      );
    },
    id: "account_name",
    size: 180,
  }),
  columnHelper.accessor("owner", {
    cell: ({ row }) => (
      <span className="px-2.5 text-muted-foreground">{row.original.owner}</span>
    ),
    header: ({ column }) => {
      const filterValue = (column.getFilterValue() as string) ?? null;
      return <ColumnHeaderCombobox column={column} filterValue={filterValue} />;
    },
    id: "owner",
    size: 180,
  }),
  columnHelper.accessor("region", {
    cell: ({ row }) => (
      <span className="px-2.5 text-muted-foreground">
        {row.original.region}
      </span>
    ),
    filterFn: "equals",
    header: ({ column }) => {
      return <ColumnHeaderDropdown column={column} title="Region" />;
    },
    id: "region",
    meta: {
      filterOptions: REGIONS,
      menuType: "radio-filter",
    },
    size: 120,
  }),
  columnHelper.accessor("stage", {
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex rounded-md px-3 py-1 ml-2 font-medium text-xs",
          STAGE_STYLES[row.original.stage],
        )}
      >
        {row.original.stage}
      </span>
    ),
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <ColumnHeaderDropdown column={column} title="Stage" />
    ),
    id: "stage",
    meta: {
      filterOptions: STAGES,
      menuType: "checkbox-filter",
    },
    size: 130,
  }),
  columnHelper.accessor("priority", {
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex rounded-md px-2 py-1 ml-4 font-medium text-xs",
          PRIORITIES_STYLES[row.original.priority],
        )}
      >
        {row.original.priority}
      </span>
    ),
    filterFn: "equals",
    header: ({ column }) => {
      const filterValue = (column.getFilterValue() as string) ?? "";

      return (
        <ColumnHeaderSelect
          column={column}
          filterValue={filterValue}
          title="Priority"
        />
      );
    },
    id: "priority",
    size: 120,
  }),
  columnHelper.accessor("annual_value", {
    cell: ({ row }) => (
      <span className="tabular-nums ml-1.5 font-mono text-muted-foreground">
        {CURRENCY_FORMATTER.format(row.original.annual_value)}
      </span>
    ),
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      return (
        <ColumnHeaderDropdown
          column={column}
          sortDirection={sortDirection}
          title="Acv"
        />
      );
    },
    id: "annual_value",
    size: 120,
  }),
  columnHelper.accessor("seats", {
    cell: ({ row }) => (
      <span className="tabular-nums ml-4 font-mono text-muted-foreground">
        {row.original.seats}
      </span>
    ),
    header: ({ column }) => (
      <ColumnHeaderDropdown column={column} title="Seats" />
    ),
    id: "seats",
    size: 90,
  }),
  columnHelper.accessor("renewal_date", {
    cell: ({ row }) => {
      const value = new Date(`${row.original.renewal_date}T00:00:00`);
      return (
        <span className="px-2 ml-2 text-muted-foreground">
          {DATE_FORMATTER.format(value)}
        </span>
      );
    },
    filterFn: renewalDateFilterFn,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const dateFilterValue = column.getFilterValue() as
        | RenewalDateFilterValue
        | undefined;
      return (
        <CalendarDropdown
          column={column}
          dateFilterValue={dateFilterValue}
          sortDirection={sortDirection}
        />
      );
    },
    id: "renewal_date",
    size: 180,
  }),
  columnHelper.accessor("action", {
    cell: ({ row }) => {
      const id = row.original.id;
      const account = row.original.account_name;
      const owner = row.original.owner;
      const action = {
        id,
        name: account,
        owner,
        url: `https://example.com/${id}`,
      };

      return (
        <DropdownMenuTrigger
          handle={actionMenuHandle}
          id={`action-menu-trigger-${id}`}
          payload={action}
          render={
            <Button
              className="p-0 data-popup-open:bg-accent cursor-pointer"
              size="icon-xs"
              variant="ghost"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />
      );
    },
    header: () => (
      <TooltipTrigger
        handle={headerTooltipHandle}
        payload={{ text: "Take actions" }}
      >
        Action
      </TooltipTrigger>
    ),
    id: "action",
    size: 45,
  }),
];
