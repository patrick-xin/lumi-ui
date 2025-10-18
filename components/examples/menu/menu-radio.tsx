"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Menu,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/registry/ui/menu";

export function RadioItemsMenu() {
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            Sort By <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup className="w-32">
        <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <MenuRadioItem value="date">Date</MenuRadioItem>
          <MenuRadioItem value="name">Name</MenuRadioItem>
          <MenuRadioItem value="type">Type</MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
}
