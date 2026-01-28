"use client";

import { NavMain } from "@lumi-ui/ui/blocks/sidebar-01/components/nav-main";
import { NavProjects } from "@lumi-ui/ui/blocks/sidebar-01/components/nav-projects";
import { NavUser } from "@lumi-ui/ui/blocks/sidebar-01/components/nav-user";
import { SearchCombobox } from "@lumi-ui/ui/blocks/sidebar-01/components/search-combobox";
import { TeamSwitcher } from "@lumi-ui/ui/blocks/sidebar-01/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@lumi-ui/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  MapIcon,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type * as React from "react";

// This is sample data.
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
  teams: [
    {
      logo: GalleryVerticalEnd,
      name: "Acme Inc",
      plan: "Enterprise",
    },
    {
      logo: AudioWaveform,
      name: "Acme Corp.",
      plan: "Startup",
    },
    {
      logo: Command,
      name: "Evil Corp.",
      plan: "Free",
    },
  ],
  user: {
    email: "m@example.com",
    name: "Lumi UI",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher />
        <SearchCombobox />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
