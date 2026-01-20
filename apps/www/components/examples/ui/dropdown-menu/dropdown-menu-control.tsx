"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

export function CloseOnClickMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="w-48 justify-between" variant="outline">
            Options <ChevronDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>Save and Close</DropdownMenuItem>
        <DropdownMenuItem closeOnClick={false}>
          Log Action (Keep Open)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
