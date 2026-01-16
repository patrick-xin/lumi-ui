"use client";

import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  MapIcon,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/ui/sidebar";
import { NavMain } from "@/registry/blocks/sidebar-05/components/nav-main";
import { NavProjects } from "@/registry/blocks/sidebar-05/components/nav-projects";
import { NavSecondary } from "@/registry/blocks/sidebar-05/components/nav-secondary";
import { NavUser } from "@/registry/blocks/sidebar-05/components/nav-user";

const data = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
      title: "Playground",
      url: "#",
    },
    {
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
      title: "Models",
      url: "#",
    },
    {
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
      title: "Documentation",
      url: "#",
    },
    {
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
      title: "Settings",
      url: "#",
    },
  ],
  navSecondary: [
    {
      icon: LifeBuoy,
      title: "Support",
      url: "#",
    },
    {
      icon: Send,
      title: "Feedback",
      url: "#",
    },
  ],
  projects: [
    {
      icon: Frame,
      name: "Design Engineering",
      url: "#",
    },
    {
      icon: PieChart,
      name: "Sales & Marketing",
      url: "#",
    },
    {
      icon: MapIcon,
      name: "Travel",
      url: "#",
    },
  ],
  user: {
    avatar: "https://github.com/patrick-xin.png",
    email: "m@example.com",
    name: "shadcn",
  },
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              }
              size="lg"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
