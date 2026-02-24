import type { TableState } from "@tanstack/react-table";
import { Button } from "@/registry/ui/button";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

export function TableFooter({
  state,
  disablePrev,
  disableNext,
  pageCount,
  rowCount,
  onPrev,
  onNext,
  onPageSizeChange,
}: {
  state: TableState;
  disablePrev: boolean;
  disableNext: boolean;
  pageCount: number;
  rowCount: number;
  onPrev: () => void;
  onNext: () => void;
  onPageSizeChange: (size: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-muted-foreground">{rowCount} row(s)</span>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          Page {state.pagination.pageIndex + 1} of {pageCount}
        </span>
        <div className="flex items-center gap-2">
          <Button
            disabled={disablePrev}
            onClick={onPrev}
            size="sm"
            variant="outline"
          >
            Prev
          </Button>
          <Button
            disabled={disableNext}
            onClick={onNext}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
        <Select
          onValueChange={(value) => onPageSizeChange(Number(value))}
          value={state.pagination.pageSize}
        >
          <SelectTriggerGroup />
          <SelectContent alignItemWithTrigger>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItemContent key={pageSize} value={pageSize}>
                Show {pageSize}
              </SelectItemContent>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
