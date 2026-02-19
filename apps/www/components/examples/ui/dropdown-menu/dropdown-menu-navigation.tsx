"use client";

import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function NavigationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            Navigate <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent matchAnchorWidth={false}>
        <DropdownMenuLinkItem
          className="flex items-center gap-2 justify-between w-full"
          href="https://google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google <ExternalLinkIcon className="size-4" />
        </DropdownMenuLinkItem>
        <DropdownMenuLinkItem
          render={
            <Link className="w-full" href="/docs/components">
              Go to Components
            </Link>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
