"use client";

import type { MenuRootChangeEventDetails } from "@base-ui/react";
import type {
  PaginationState,
  RowData,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, Check, Trash, XIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import * as React from "react";
import { createAlertDialogHandle } from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import { Card, CardDescription, CardTitle } from "@/registry/ui/card";
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
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/registry/ui/tooltip";
import { ActionDropdown } from "./action-dropdown";
import { columns } from "./columns";
import { type Action, DEAL_ROWS } from "./data";
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
import {
  DEFAULT_PAGE_SIZE,
  getStringArrayFilterValue,
  getStringFilterValue,
  parseColumnFilters,
  parseColumnVisibility,
  parseSorting,
  serializeColumnVisibility,
  serializeSorting,
  sortAndJoin,
} from "./url-state";
import {
  formatIsoDate,
  getColumnActionLabel,
  isRenewalDateRangeFilterValue,
} from "./utils";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    menuType?: "sort" | "radio-filter" | "checkbox-filter" | "custom";
    filterOptions?: readonly string[];
  }
}

export const columnMenuHandle = createDropdownMenuHandle<string>();
export const actionMenuHandle = createDropdownMenuHandle<Action>();
export const deleteAlertDialogHandle = createAlertDialogHandle<Action>();
export const accountDialogHandle = createDialogHandle<Action>();
export const paymentDialogHandle = createDialogHandle<Action>();
export const headerTooltipHandle = createTooltipHandle<{ text: string }>();

type ActiveAction = {
  clear: () => void;
  id: string;
  label: string;
};

const resolveUpdater = <T,>(
  updaterOrValue: T | ((oldValue: T) => T),
  currentValue: T,
) =>
  typeof updaterOrValue === "function"
    ? (updaterOrValue as (oldValue: T) => T)(currentValue)
    : updaterOrValue;

const asPositiveInt = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;

export function DataTable() {
  const [urlState, setUrlState] = useQueryStates(
    {
      hidden: parseAsString,
      owner: parseAsString,
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
      priority: parseAsString,
      query: parseAsString.withDefault(""),
      region: parseAsString,
      renewalDate: parseAsString,
      renewalFrom: parseAsString,
      renewalTo: parseAsString,
      sort: parseAsString,
      stage: parseAsString,
    },
    {
      history: "replace",
    },
  );

  const globalFilter = urlState.query;
  const sorting = React.useMemo(
    () => parseSorting(urlState.sort),
    [urlState.sort],
  );
  const columnVisibility = React.useMemo(
    () => parseColumnVisibility(urlState.hidden),
    [urlState.hidden],
  );
  const columnFilters = React.useMemo(
    () =>
      parseColumnFilters({
        get: (key: string) => {
          if (key === "owner") return urlState.owner;
          if (key === "region") return urlState.region;
          if (key === "stage") return urlState.stage;
          if (key === "priority") return urlState.priority;
          if (key === "renewalDate") return urlState.renewalDate;
          if (key === "renewalFrom") return urlState.renewalFrom;
          if (key === "renewalTo") return urlState.renewalTo;
          return null;
        },
      }),
    [
      urlState.owner,
      urlState.priority,
      urlState.region,
      urlState.renewalDate,
      urlState.renewalFrom,
      urlState.renewalTo,
      urlState.stage,
    ],
  );
  const pagination = React.useMemo(
    () =>
      ({
        pageIndex: asPositiveInt(urlState.page, 1) - 1,
        pageSize: asPositiveInt(urlState.pageSize, DEFAULT_PAGE_SIZE),
      }) satisfies PaginationState,
    [urlState.page, urlState.pageSize],
  );
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [actionMenuOpen, setActionMenuOpen] = React.useState(false);
  const [actionActiveTrigger, setActionActiveTrigger] = React.useState<
    string | null
  >(null);
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
  const handleActionOpenChange = (
    isOpen: boolean,
    eventDetails: MenuRootChangeEventDetails,
  ) => {
    setActionMenuOpen(isOpen);
    if (isOpen) {
      setActionActiveTrigger(eventDetails.trigger?.id ?? null);
    } else {
      setActionActiveTrigger(null);
    }
  };

  const table = useReactTable({
    columns,
    data: DEAL_ROWS,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onColumnFiltersChange: (updaterOrValue) => {
      const nextColumnFilters = resolveUpdater(updaterOrValue, columnFilters);
      const owner = getStringFilterValue(nextColumnFilters, "owner");
      const region = getStringFilterValue(nextColumnFilters, "region");
      const stage = getStringArrayFilterValue(nextColumnFilters, "stage");
      const priority = getStringFilterValue(nextColumnFilters, "priority");

      const renewalFilterValue = nextColumnFilters.find(
        (filter) => filter.id === "renewal_date",
      )?.value;

      let renewalDate: string | null = null;
      let renewalFrom: string | null = null;
      let renewalTo: string | null = null;

      if (typeof renewalFilterValue === "string" && renewalFilterValue.length) {
        renewalDate = renewalFilterValue;
      } else if (isRenewalDateRangeFilterValue(renewalFilterValue)) {
        renewalFrom = renewalFilterValue.from ?? null;
        renewalTo = renewalFilterValue.to ?? null;
      }

      void setUrlState({
        owner: owner ?? null,
        page: 1,
        priority: priority ?? null,
        region: region ?? null,
        renewalDate,
        renewalFrom,
        renewalTo,
        stage: stage.length > 0 ? sortAndJoin(stage) : null,
      });
    },
    onColumnVisibilityChange: (updaterOrValue) => {
      const nextColumnVisibility = resolveUpdater(
        updaterOrValue,
        columnVisibility,
      );
      const hiddenColumns = serializeColumnVisibility(nextColumnVisibility);
      void setUrlState({
        hidden: hiddenColumns || null,
      });
    },
    onGlobalFilterChange: (updaterOrValue) => {
      const nextGlobalFilter = resolveUpdater(updaterOrValue, globalFilter);
      void setUrlState({
        page: 1,
        query: nextGlobalFilter || null,
      });
    },
    onPaginationChange: (updaterOrValue) => {
      const nextPagination = resolveUpdater(updaterOrValue, pagination);
      void setUrlState({
        page: asPositiveInt(nextPagination.pageIndex + 1, 1),
        pageSize: asPositiveInt(nextPagination.pageSize, DEFAULT_PAGE_SIZE),
      });
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updaterOrValue) => {
      const nextSorting = resolveUpdater(updaterOrValue, sorting);
      void setUrlState({
        page: 1,
        sort: serializeSorting(nextSorting) || null,
      });
    },
    state: {
      columnFilters,
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
        table.setSorting((currentSorting) =>
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
      <Card className="p-0 gap-0 w-full">
        <div className="p-4 pb-0">
          <CardTitle className="text-base">
            Accounts Table with Tanstack Table
          </CardTitle>
          <CardDescription>
            Manage accounts settings and preferences.
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2 p-4">
          <div className="relative w-full max-w-xl flex items-center">
            <Input
              className="h-9 w-full pr-8"
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder="Search all columns..."
              value={globalFilter}
            />
            {globalFilter && (
              <Button
                aria-label="Clear search"
                className="absolute top-1/2 right-1 size-6 -translate-y-1/2 p-0"
                onClick={() => table.setGlobalFilter("")}
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
                table.getRowModel().rows.map((row) => {
                  const isActionMenuRowOpen =
                    actionMenuOpen &&
                    actionActiveTrigger ===
                      `action-menu-trigger-${row.original.id}`;

                  return (
                    <TableRow
                      className="data-[state=selected]:bg-accent/30 data-[action-open=true]:bg-accent/30 hover:bg-accent/30 border-0"
                      data-action-open={
                        isActionMenuRowOpen ? "true" : undefined
                      }
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
                  );
                })
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
                  {meta.filterOptions.map((option: string) => (
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
                  {meta.filterOptions.map((option: string) => {
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
      <ActionDropdown
        onOpenChange={handleActionOpenChange}
        open={actionMenuOpen}
        triggerId={actionActiveTrigger}
      />
      <AccountDialog />
      <DeleteAccoundDialog />
      <DialogOutsideScrollDemo />
      <TooltipProvider delay={0}>
        <Tooltip handle={headerTooltipHandle}>
          {({ payload }) => {
            return (
              <TooltipContent sideOffset={8}>{payload?.text}</TooltipContent>
            );
          }}
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
