import type { FilterFn } from "@tanstack/react-table";
import { DATE_FORMATTER, type DealRow } from "./data";

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

export {
  formatIsoDate,
  getColumnActionLabel,
  isRenewalDateRangeFilterValue,
  parseIsoDate,
  renewalDateFilterFn,
};
