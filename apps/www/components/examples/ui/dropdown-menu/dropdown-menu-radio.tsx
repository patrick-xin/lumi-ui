"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItemContent,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";

export function RadioItemsMenu() {
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            Sort By <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItemContent value="date">
            Date
          </DropdownMenuRadioItemContent>
          <DropdownMenuRadioItemContent value="name">
            Name
          </DropdownMenuRadioItemContent>
          <DropdownMenuRadioItemContent value="type">
            Type
          </DropdownMenuRadioItemContent>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
