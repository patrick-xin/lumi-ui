"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/ui/menu";

export function GroupedMenu() {
  const [sortBy, setSortBy] = React.useState("date");
  const [showMinimap, setShowMinimap] = React.useState(true);

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            View <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Sort</MenuGroupLabel>
          <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <MenuRadioItem value="date">Date</MenuRadioItem>
            <MenuRadioItem value="name">Name</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Workspace</MenuGroupLabel>
          <MenuCheckboxItem
            checked={showMinimap}
            onCheckedChange={setShowMinimap}
          >
            Show Minimap
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
