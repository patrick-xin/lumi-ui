"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function CheckboxItemsMenu() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            Workspace <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={showMinimap}
          onCheckedChange={setShowMinimap}
        >
          Show Minimap
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showSidebar}
          onCheckedChange={setShowSidebar}
        >
          Show Sidebar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
