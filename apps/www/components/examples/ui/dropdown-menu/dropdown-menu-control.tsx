"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function CloseOnClickMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            Options <ChevronDownIcon className="size-4" />
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
