"use client";

import { ThemeSwitcher } from "@lumi-ui/ui/blocks/sidebar-01/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@lumi-ui/ui/sidebar";
import {
  BookIcon,
  ChevronsUpDown,
  HouseIcon,
  LogOut,
  PenIcon,
  Settings,
  SmileIcon,
  UserIcon,
} from "lucide-react";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const { isCollapsed } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                className="data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground"
                size="lg"
              >
                {isCollapsed ? (
                  <UserIcon className="size-4 mx-auto" />
                ) : (
                  <>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </>
                )}
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            align="start"
            matchAnchorWidth={!isCollapsed}
            sideOffset={4}
          >
            <DropdownMenuItem className="justify-between">
              <div className="grid text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>

              <Settings />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="justify-between py-2">
                Feedback
                <SmileIcon />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between py-2">
                Homepage
                <HouseIcon />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between py-2"
                closeOnClick={false}
              >
                Theme
                <ThemeSwitcher
                  className="size-4 p-0 data-[popup-open]:text-foreground cursor-pointer"
                  side="right"
                  variant="ghost"
                />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between py-2">
                Changelog
                <PenIcon />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between py-2">
                Doc
                <BookIcon />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between py-2">
                Log out
                <LogOut />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
