"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function DropdownMenuCheckboxDemo() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-56 justify-between"
        render={
          <Button>
            Workspace <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItemContent
          checked={showMinimap}
          onCheckedChange={setShowMinimap}
        >
          Show Minimap
        </DropdownMenuCheckboxItemContent>
        <DropdownMenuCheckboxItemContent
          checked={showSidebar}
          onCheckedChange={setShowSidebar}
        >
          Show Sidebar
        </DropdownMenuCheckboxItemContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
