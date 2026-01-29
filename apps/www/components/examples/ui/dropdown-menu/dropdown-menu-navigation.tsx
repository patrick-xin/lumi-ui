"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

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
        <DropdownMenuItem
          render={
            <a
              className="flex items-center gap-2 justify-between w-full"
              href="https://google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google <ExternalLinkIcon className="size-4" />
            </a>
          }
        />
        <DropdownMenuItem
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
