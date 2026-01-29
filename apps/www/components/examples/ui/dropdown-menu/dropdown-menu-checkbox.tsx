"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { BadgeCheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

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
          indicatorIcon={<BadgeCheckIcon />}
          indicatorPlacement="end"
          onCheckedChange={setShowSidebar}
        >
          Show Sidebar
        </DropdownMenuCheckboxItemContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
