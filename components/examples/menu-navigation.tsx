"use client";

import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export function NavigationMenu() {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="outline">
            Navigate <ChevronDownIcon className="size-4" />
          </Button>
        }
      />
      <MenuPopup>
        <MenuItem
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
        <MenuItem
          render={
            <Link href="/docs/components" className="w-full">
              Go to Components
            </Link>
          }
        />
      </MenuPopup>
    </Menu>
  );
}
