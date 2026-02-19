"use client";

import { BadgeCheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItemContent,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function RadioItemsMenu() {
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="data-popup-open:bg-accent/60" variant="outline">
            Sort By <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup onValueChange={setSortBy} value={sortBy}>
          <DropdownMenuRadioItemContent value="date">
            Date
          </DropdownMenuRadioItemContent>
          <DropdownMenuRadioItemContent value="name">
            Name
          </DropdownMenuRadioItemContent>
          <DropdownMenuRadioItemContent
            indicatorIcon={<BadgeCheckIcon />}
            indicatorPlacement="end"
            value="type"
          >
            Type
          </DropdownMenuRadioItemContent>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
