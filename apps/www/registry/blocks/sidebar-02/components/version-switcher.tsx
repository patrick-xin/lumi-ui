"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/ui/sidebar";
import {
  BadgeCheckIcon,
  ChevronsUpDown,
  GalleryVerticalEnd,
} from "lucide-react";
import * as React from "react";

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[];
  defaultVersion: string;
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground justify-between px-2 gap-2"
                size="lg"
              >
                <span>
                  <GalleryVerticalEnd className="size-4" />
                </span>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="text-muted-foreground">
                    v{selectedVersion}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent matchAnchorWidth>
            {versions.map((version) => (
              <DropdownMenuCheckboxItemContent
                checked={version === selectedVersion}
                closeOnClick
                indicatorIcon={<BadgeCheckIcon />}
                indicatorPlacement="end"
                key={version}
                onCheckedChange={() => setSelectedVersion(version)}
              >
                v{version}
              </DropdownMenuCheckboxItemContent>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
