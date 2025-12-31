"use client";

import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <DropdownMenuItem
          render={
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Google <ExternalLinkIcon className="size-4" />
            </a>
          }
        />
        <DropdownMenuItem
          render={
            <Link href="/docs/components" className="w-full">
              Go to Components
            </Link>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
