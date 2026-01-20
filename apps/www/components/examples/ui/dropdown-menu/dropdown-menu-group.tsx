"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItemContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

export function GroupedMenu() {
  const [sortBy, setSortBy] = React.useState("date");
  const [showMinimap, setShowMinimap] = React.useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="w-40 justify-between" variant="outline">
            View <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Sort</DropdownMenuGroupLabel>
          <DropdownMenuRadioGroup onValueChange={setSortBy} value={sortBy}>
            <DropdownMenuRadioItemContent value="date">
              Date
            </DropdownMenuRadioItemContent>
            <DropdownMenuRadioItemContent value="name">
              Name
            </DropdownMenuRadioItemContent>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Workspace</DropdownMenuGroupLabel>
          <DropdownMenuCheckboxItemContent
            checked={showMinimap}
            onCheckedChange={setShowMinimap}
          >
            Show Minimap
          </DropdownMenuCheckboxItemContent>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
