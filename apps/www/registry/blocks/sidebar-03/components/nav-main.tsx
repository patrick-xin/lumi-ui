"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/registry/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Collapsible defaultOpen={item.isActive}>
              <CollapsibleTrigger
                className="group/collapsible data-panel-open:bg-sidebar-accent data-panel-open:text-sidebar-accent-foreground"
                render={
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      side: "right",
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto text-muted-foreground transition-[transform,colors] duration-200 group-data-panel-open/collapsible:rotate-90 group-data-panel-open/collapsible:text-foreground group-hover/collapsible:text-sidebar-foreground" />
                  </SidebarMenuButton>
                }
              />
              <CollapsiblePanel>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        }
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsiblePanel>
            </Collapsible>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
