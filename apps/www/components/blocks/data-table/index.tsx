"use client";

import type { MenuRootChangeEventDetails } from "@base-ui/react";
import type {
  FilterFn,
  PaginationState,
  RowData,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Check,
  MoreHorizontal,
  Trash,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { createAlertDialogHandle } from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import { Card } from "@/registry/ui/card";
import { Checkbox } from "@/registry/ui/checkbox";
import { createDialogHandle } from "@/registry/ui/dialog";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItemContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Input } from "@/registry/ui/input";
import { toast } from "@/registry/ui/toast";
import { ActionDropdown } from "./action-dropdown";
import {
  CalendarDropdown,
  type RenewalDateFilterValue,
} from "./calendar-dropdown";
import { ColumnHeaderCombobox } from "./column-header-combobox";
import { ColumnHeaderDropdown } from "./column-header-dropdown";
import { ColumnHeaderSelect } from "./column-header-select";
import { ColumnHeaderToggle } from "./column-header-toggle";
import {
  type Action,
  CURRENCY_FORMATTER,
  DATE_FORMATTER,
  DEAL_ROWS,
  type DealRow,
  PRIORITIES_STYLES,
  REGIONS,
  STAGE_STYLES,
  STAGES,
} from "./data";
import { TableFooter } from "./data-table-footer";
import { AccountDialog } from "./dialogs/account";
import { DeleteAccoundDialog } from "./dialogs/delete-accound";
import { DialogOutsideScrollDemo } from "./dialogs/payment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./tables";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    menuType?: "sort" | "radio-filter" | "checkbox-filter" | "custom";
    filterOptions?: readonly string[];
  }
}

const columnHelper = createColumnHelper<DealRow>();
export const columnMenuHandle = createDropdownMenuHandle<string>();
export const actionMenuHandle = createDropdownMenuHandle<Action>();
export const deleteAlertDialogHandle = createAlertDialogHandle<Action>();
export const accountDialogHandle = createDialogHandle<Action>();
export const paymentDialogHandle = createDialogHandle<Action>();

type RenewalDateRangeFilterValue = {
  from?: string;
  to?: string;
};

const isRenewalDateRangeFilterValue = (
  value: unknown,
): value is RenewalDateRangeFilterValue => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const from = candidate.from;
  const to = candidate.to;

  return (
    (from === undefined || typeof from === "string") &&
    (to === undefined || typeof to === "string")
  );
};

const parseIsoDate = (value: string) => {
  const parsedDate = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

const formatIsoDate = (value: string) => {
  const parsedDate = parseIsoDate(value);
  return parsedDate ? DATE_FORMATTER.format(parsedDate) : value;
};

const getColumnActionLabel = (columnId: string) => {
  const labels: Record<string, string> = {
    account_name: "Account",
    annual_value: "Acv",
    owner: "Owner",
    priority: "Priority",
    region: "Region",
    renewal_date: "Renewal Date",
    seats: "Seats",
    stage: "Stage",
  };

  return labels[columnId] ?? columnId;
};

const renewalDateFilterFn: FilterFn<DealRow> = (row, columnId, filterValue) => {
  const rowDate = row.getValue<string>(columnId);

  if (typeof filterValue === "string") {
    return filterValue.length === 0 || rowDate === filterValue;
  }

  if (!isRenewalDateRangeFilterValue(filterValue)) {
    return true;
  }

  const from = filterValue.from;
  const to = filterValue.to;

  if (!from && !to) {
    return true;
  }

  if (from && rowDate < from) {
    return false;
  }

  if (to && rowDate > to) {
    return false;
  }

  return true;
};

const columns = [
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
      <span className="px-2.5">{row.original.account_name}</span>
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
    cell: ({ row }) => <span className="px-2.5">{row.original.owner}</span>,
    header: ({ column }) => {
      const filterValue = (column.getFilterValue() as string) ?? null;
      return <ColumnHeaderCombobox column={column} filterValue={filterValue} />;
    },
    id: "owner",
    size: 180,
  }),
  columnHelper.accessor("region", {
    cell: ({ row }) => <span className="px-2.5">{row.original.region}</span>,
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
      return <span className="px-2 ml-2">{DATE_FORMATTER.format(value)}</span>;
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
    header: "Action",
    id: "action",
    size: 45,
  }),
];

export function DataTable() {
  type ActiveAction = {
    clear: () => void;
    id: string;
    label: string;
  };

  const [data, _setData] = React.useState(() => [...DEAL_ROWS]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeTrigger, setActiveTrigger] = React.useState<string | null>(null);
  const handleOpenChange = (
    isOpen: boolean,
    eventDetails: MenuRootChangeEventDetails,
  ) => {
    setMenuOpen(isOpen);
    if (isOpen) {
      setActiveTrigger(eventDetails.trigger?.id ?? null);
    }
  };
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
  });

  const activeActions: ActiveAction[] = [];

  for (const sortedColumn of sorting) {
    const columnLabel = getColumnActionLabel(sortedColumn.id);
    activeActions.push({
      clear: () => {
        setSorting((currentSorting) =>
          currentSorting.filter((item) => item.id !== sortedColumn.id),
        );
      },
      id: `sort-${sortedColumn.id}`,
      label: `${columnLabel}: ${sortedColumn.desc ? "Desc" : "Asc"}`,
    });
  }

  for (const columnFilter of table.getState().columnFilters) {
    const column = table.getColumn(columnFilter.id);
    if (!column) continue;

    const columnLabel = getColumnActionLabel(columnFilter.id);
    const filterValue = columnFilter.value;

    if (Array.isArray(filterValue)) {
      for (const selectedOption of filterValue) {
        if (typeof selectedOption !== "string") continue;

        activeActions.push({
          clear: () => {
            const currentFilterValue = column.getFilterValue();
            if (!Array.isArray(currentFilterValue)) {
              column.setFilterValue(undefined);
              return;
            }

            const nextFilterValue = currentFilterValue.filter(
              (value) => value !== selectedOption,
            );
            column.setFilterValue(
              nextFilterValue.length > 0 ? nextFilterValue : undefined,
            );
          },
          id: `filter-${columnFilter.id}-${selectedOption}`,
          label: `${columnLabel}: ${selectedOption}`,
        });
      }
      continue;
    }

    if (isRenewalDateRangeFilterValue(filterValue)) {
      const from = filterValue.from ? formatIsoDate(filterValue.from) : "";
      const to = filterValue.to ? formatIsoDate(filterValue.to) : "";
      const rangeLabel =
        from && to ? `${from} - ${to}` : from ? `From ${from}` : `Until ${to}`;

      if (rangeLabel) {
        activeActions.push({
          clear: () => column.setFilterValue(undefined),
          id: `filter-${columnFilter.id}-range`,
          label: `${columnLabel}: ${rangeLabel}`,
        });
      }

      continue;
    }

    if (typeof filterValue === "string" && filterValue) {
      const valueLabel =
        columnFilter.id === "renewal_date"
          ? formatIsoDate(filterValue)
          : filterValue;

      activeActions.push({
        clear: () => column.setFilterValue(undefined),
        id: `filter-${columnFilter.id}-${filterValue}`,
        label: `${columnLabel}: ${valueLabel}`,
      });
    }
  }

  return (
    <>
      <Card className="p-0 gap-0">
        <div className="flex flex-wrap items-center gap-2 p-4">
          <div className="relative w-full max-w-sm">
            <Input
              className="h-9 w-full pr-8"
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder="Search all columns..."
              value={globalFilter}
            />
            {globalFilter && (
              <Button
                aria-label="Clear search"
                className="absolute top-1/2 right-1 size-6 -translate-y-1/2 p-0"
                onClick={() => setGlobalFilter("")}
                size="icon-xs"
                variant="ghost"
              >
                <XIcon className="size-3.5" />
              </Button>
            )}
          </div>
          {activeActions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activeActions.map((action) => (
                <Button
                  className="h-7 gap-1.5 px-2 text-xs font-normal group"
                  key={action.id}
                  onClick={action.clear}
                  size="sm"
                  variant="outline"
                >
                  {action.label}
                  <XIcon className="size-3.5 text-muted-foreground group-hover:text-destructive" />
                </Button>
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <div className="flex gap-2 items-center">
                <div className="text-muted-foreground flex-1 text-sm">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <Button
                  onClick={() => {
                    toast.promise(
                      new Promise<string>((resolve) => {
                        setTimeout(() => {
                          resolve("Selected data exported successfully");
                        }, 2000);
                      }),
                      {
                        error: (err: Error) => {
                          return {
                            title: `Error: ${err.message}`,
                          };
                        },
                        loading: { title: `Exporting selected data...` },
                        success: (data: string) => {
                          return {
                            closable: true,
                            description: `${data}`,
                            title: `Success`,
                          };
                        },
                      },
                    );
                  }}
                  size="sm"
                >
                  Export
                </Button>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    className="ml-auto data-popup-open:bg-accent data-popup-open:hover:bg-accent"
                    variant="outline"
                  >
                    Visibility
                  </Button>
                }
              />
              <DropdownMenuContent align="end" matchAnchorWidth={false}>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItemContent
                        checked={column.getIsVisible()}
                        className="capitalize"
                        indicatorIcon={<Check />}
                        indicatorPlacement="end"
                        key={column.id}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItemContent>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="overflow-hidden border-t border-b min-h-120">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="hover:bg-muted/30 bg-muted/30 h-12"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="bg-muted/30"
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="data-[state=selected]:bg-accent/20 border-0"
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-56 hover:bg-card">
                  <TableCell
                    className="text-center hover:bg-card text-muted-foreground"
                    colSpan={columns.length}
                  >
                    No matching rows.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TableFooter
          disableNext={!table.getCanNextPage()}
          disablePrev={!table.getCanPreviousPage()}
          onNext={() => table.nextPage()}
          onPageSizeChange={(size) => table.setPageSize(Number(size))}
          onPrev={() => table.previousPage()}
          pageCount={table.getPageCount()}
          rowCount={table.getFilteredRowModel().rows.length}
          state={table.getState()}
        />
      </Card>
      <DropdownMenu
        handle={columnMenuHandle}
        onOpenChange={handleOpenChange}
        open={menuOpen}
        triggerId={activeTrigger}
      >
        {({ payload }) => {
          const column = payload ? table.getColumn(payload) : null;

          if (!column) return null;
          const meta = column.columnDef.meta;
          const menuType = meta?.menuType ?? "sort";

          return (
            <DropdownMenuContent
              align="start"
              matchAnchorWidth={false}
              showArrow
              side="right"
            >
              {menuType === "radio-filter" && meta?.filterOptions && (
                <DropdownMenuRadioGroup
                  onValueChange={(val) => {
                    column.setFilterValue(val);
                  }}
                  value={(column.getFilterValue() as string) ?? ""}
                >
                  {meta.filterOptions.map((option) => (
                    <DropdownMenuRadioItemContent
                      closeOnClick
                      indicatorPlacement="end"
                      key={option}
                      value={option}
                    >
                      {option}
                    </DropdownMenuRadioItemContent>
                  ))}
                  {(column.getFilterValue() as string[])?.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="justify-between"
                        closeOnClick
                        onClick={() => column.setFilterValue(undefined)}
                        variant="destructive"
                      >
                        Clear
                        <Trash className="ml-auto" />
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuRadioGroup>
              )}
              {menuType === "checkbox-filter" && meta?.filterOptions && (
                <div className="flex flex-col gap-1 p-1">
                  {meta.filterOptions.map((option) => {
                    const currentFilterValue =
                      (column.getFilterValue() as string[]) ?? [];
                    const isChecked = currentFilterValue.includes(option);

                    return (
                      <DropdownMenuCheckboxItemContent
                        checked={isChecked}
                        indicatorPlacement="end"
                        key={option}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([
                              ...currentFilterValue,
                              option,
                            ]);
                          } else {
                            column.setFilterValue(
                              currentFilterValue.filter((v) => v !== option),
                            );
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItemContent>
                    );
                  })}

                  {(column.getFilterValue() as string[])?.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="justify-between"
                        closeOnClick
                        onClick={() => column.setFilterValue(undefined)}
                        variant="destructive"
                      >
                        Clear <Trash />
                      </DropdownMenuItem>
                    </>
                  )}
                </div>
              )}
              {menuType === "sort" && (
                <>
                  <DropdownMenuItem
                    className="text-sm justify-between"
                    disabled={column.getIsSorted() === "asc"}
                    onClick={() => {
                      column.toggleSorting(false);
                    }}
                  >
                    Asc <ArrowUpIcon className="size-3.5" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm justify-between"
                    disabled={column.getIsSorted() === "desc"}
                    onClick={() => {
                      column.toggleSorting(true);
                    }}
                  >
                    Desc <ArrowDownIcon className="size-3.5" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-sm justify-between"
                    disabled={!column.getIsSorted()}
                    onClick={() => column.clearSorting()}
                    variant="destructive"
                  >
                    Clear <Trash className="size-3.5" />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          );
        }}
      </DropdownMenu>
      <ActionDropdown />
      <AccountDialog />
      <DeleteAccoundDialog />
      <DialogOutsideScrollDemo />
    </>
  );
}
