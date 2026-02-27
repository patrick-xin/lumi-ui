import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export const DEFAULT_PAGE_SIZE = 10;
const VALUE_SEPARATOR = ",";
const SORT_PART_SEPARATOR = ":";

const parsePositiveInt = (value: string | null, fallback: number) => {
  if (!value) return fallback;
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) || parsedValue <= 0 ? fallback : parsedValue;
};

export const parsePageIndex = (value: string | null) =>
  parsePositiveInt(value, 1) - 1;

export const parsePageSize = (value: string | null) =>
  parsePositiveInt(value, DEFAULT_PAGE_SIZE);

export const parseSorting = (value: string | null): SortingState => {
  if (!value) return [];

  return value
    .split(VALUE_SEPARATOR)
    .map((item) => {
      const [id, direction] = item.split(SORT_PART_SEPARATOR);
      if (!id) return null;

      return {
        desc: direction === "desc",
        id,
      };
    })
    .filter((item): item is SortingState[number] => item !== null);
};

export const parseColumnVisibility = (
  value: string | null,
): VisibilityState => {
  if (!value) return {};

  return value
    .split(VALUE_SEPARATOR)
    .map((columnId) => columnId.trim())
    .filter(Boolean)
    .reduce<VisibilityState>((visibility, columnId) => {
      visibility[columnId] = false;
      return visibility;
    }, {});
};

const parseStringArray = (value: string | null) =>
  value
    ? value
        .split(VALUE_SEPARATOR)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

export const parseColumnFilters = (
  params: Pick<URLSearchParams, "get">,
): ColumnFiltersState => {
  const filters: ColumnFiltersState = [];

  const owner = params.get("owner");
  if (owner) {
    filters.push({ id: "owner", value: owner });
  }

  const region = params.get("region");
  if (region) {
    filters.push({ id: "region", value: region });
  }

  const stage = parseStringArray(params.get("stage"));
  if (stage.length > 0) {
    filters.push({ id: "stage", value: stage });
  }

  const priority = params.get("priority");
  if (priority) {
    filters.push({ id: "priority", value: priority });
  }

  const renewalFrom = params.get("renewalFrom") ?? undefined;
  const renewalTo = params.get("renewalTo") ?? undefined;
  const renewalDate = params.get("renewalDate");

  if (renewalFrom || renewalTo) {
    filters.push({
      id: "renewal_date",
      value: {
        from: renewalFrom,
        to: renewalTo,
      },
    });
  } else if (renewalDate) {
    filters.push({ id: "renewal_date", value: renewalDate });
  }

  return filters;
};

export const getStringFilterValue = (
  columnFilters: ColumnFiltersState,
  columnId: string,
) => {
  const filterValue = columnFilters.find(
    (filter) => filter.id === columnId,
  )?.value;

  return typeof filterValue === "string" && filterValue.length > 0
    ? filterValue
    : undefined;
};

export const getStringArrayFilterValue = (
  columnFilters: ColumnFiltersState,
  columnId: string,
) => {
  const filterValue = columnFilters.find(
    (filter) => filter.id === columnId,
  )?.value;

  return Array.isArray(filterValue)
    ? filterValue.filter(
        (value): value is string =>
          typeof value === "string" && value.length > 0,
      )
    : [];
};

export const sortAndJoin = (values: string[]) =>
  [...values].sort().join(VALUE_SEPARATOR);

export const serializeSorting = (sorting: SortingState) =>
  sorting
    .map(
      (item) => `${item.id}${SORT_PART_SEPARATOR}${item.desc ? "desc" : "asc"}`,
    )
    .join(VALUE_SEPARATOR);

export const serializeColumnVisibility = (columnVisibility: VisibilityState) =>
  sortAndJoin(
    Object.entries(columnVisibility)
      .filter(([, isVisible]) => isVisible === false)
      .map(([columnId]) => columnId),
  );

export const arePaginationEqual = (
  left: PaginationState,
  right: PaginationState,
) => left.pageIndex === right.pageIndex && left.pageSize === right.pageSize;

export const areSortingEqual = (left: SortingState, right: SortingState) =>
  serializeSorting(left) === serializeSorting(right);

export const areColumnFiltersEqual = (
  left: ColumnFiltersState,
  right: ColumnFiltersState,
) => JSON.stringify(left) === JSON.stringify(right);

export const areColumnVisibilityEqual = (
  left: VisibilityState,
  right: VisibilityState,
) => serializeColumnVisibility(left) === serializeColumnVisibility(right);
