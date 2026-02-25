import type { Column } from "@tanstack/react-table";
import { SearchIcon, User } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/ui/combobox";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";
import { TooltipTrigger } from "@/registry/ui/tooltip";
import { OWNER_NAMES } from "./data";
import { headerTooltipHandle } from "./index";

interface ColumnHeaderComboboxProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  filterValue: string | null;
}

export function ColumnHeaderCombobox<TData, TValue>({
  filterValue,
  column,
}: ColumnHeaderComboboxProps<TData, TValue>) {
  return (
    <Combobox
      autoHighlight
      items={OWNER_NAMES}
      modal
      onValueChange={(value) => {
        column.setFilterValue(value);
      }}
      value={filterValue}
    >
      <div className="flex gap-1 items-center text-left">
        <ComboboxTrigger
          render={(props, state) => (
            <TooltipTrigger
              {...props}
              disabled={state.open}
              handle={headerTooltipHandle}
              payload={{ text: "Filter by owner" }}
              render={
                <Button
                  className="data-popup-open:bg-accent data-popup-open:hover:bg-accent justify-start cursor-pointer"
                  size="sm"
                  variant="ghost"
                >
                  <ComboboxValue
                    placeholder={<span className="text-foreground">Owner</span>}
                  />
                  <span className="size-4">
                    {!filterValue && <User className="size-4" />}
                  </span>
                </Button>
              }
            />
          )}
        />
      </div>
      <ComboboxContent matchAnchorWidth={false}>
        <ComboboxInputGroup
          addonIcon={<SearchIcon />}
          inputClassName="text-sm"
          placeholder="Find owner..."
          variant="ghost"
        />
        <Separator />
        <ScrollArea className="h-48" gradientScrollFade noScrollBar>
          <ComboboxEmpty>No owner found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItemContent
                indicatorPlacement="end"
                key={item}
                value={item}
              >
                {item}
              </ComboboxItemContent>
            )}
          </ComboboxList>
        </ScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
