"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/ui/menu";

export function CheckboxItemsMenu() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            Workspace <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup>
        <MenuCheckboxItem
          checked={showMinimap}
          onCheckedChange={setShowMinimap}
        >
          Show Minimap
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={showSidebar}
          onCheckedChange={setShowSidebar}
        >
          Show Sidebar
        </MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  );
}
