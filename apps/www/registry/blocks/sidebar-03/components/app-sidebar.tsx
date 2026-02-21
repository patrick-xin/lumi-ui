"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Receipt,
  Settings2,
  ShieldCheck,
  SquareTerminal,
  TrendingUp,
  Users,
} from "lucide-react";
import { NavMain } from "@/registry/blocks/sidebar-03/components/nav-main";
import { NavProjects } from "@/registry/blocks/sidebar-03/components/nav-projects";
import { NavUser } from "@/registry/blocks/sidebar-03/components/nav-user";
import { SearchCombobox } from "@/registry/blocks/sidebar-03/components/search-combobox";
import { TeamSwitcher } from "@/registry/blocks/sidebar-03/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/registry/ui/sidebar";

const data = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Executive Summary", url: "#" },
        { title: "Live KPIs", url: "#" },
        { title: "Alerts & Anomalies", url: "#" },
      ],
      title: "Overview",
      url: "#",
    },
    {
      icon: PieChart,
      items: [
        { title: "Revenue & Margin", url: "#" },
        { title: "Cohorts & Retention", url: "#" },
        { title: "Forecasting", url: "#" },
        { title: "Attribution", url: "#" },
      ],
      title: "Performance",
      url: "#",
    },
    {
      icon: CreditCard,
      items: [
        { title: "Invoices", url: "#" },
        { title: "Transactions", url: "#" },
        { title: "Payouts", url: "#" },
        { title: "Disputes", url: "#" },
      ],
      title: "Billing",
      url: "#",
    },
    {
      icon: Users,
      items: [
        { title: "Accounts", url: "#" },
        { title: "Segments", url: "#" },
        { title: "Health Scores", url: "#" },
        { title: "Renewals", url: "#" },
      ],
      title: "Customers",
      url: "#",
    },
    {
      icon: Bot,
      items: [
        { title: "Insights", url: "#" },
        { title: "Rules & Workflows", url: "#" },
        { title: "Webhooks", url: "#" },
        { title: "Audit Trail", url: "#" },
      ],
      title: "Automation",
      url: "#",
    },
    {
      icon: BookOpen,
      items: [
        { title: "Playbooks", url: "#" },
        { title: "API Reference", url: "#" },
        { title: "Release Notes", url: "#" },
        { title: "Status", url: "#" },
      ],
      title: "Resources",
      url: "#",
    },
    {
      icon: Settings2,
      items: [
        { title: "Workspace", url: "#" },
        { title: "Members & Roles", url: "#" },
        { title: "Billing Settings", url: "#" },
        { title: "Limits & Usage", url: "#" },
      ],
      title: "Admin",
      url: "#",
    },
  ],

  projects: [
    { icon: Frame, name: "Executive Dashboard", url: "#" },
    { icon: TrendingUp, name: "Revenue Intelligence", url: "#" },
    { icon: Receipt, name: "Billing Operations", url: "#" },
    { icon: ShieldCheck, name: "Risk & Compliance", url: "#" },
  ],

  teams: [
    { logo: GalleryVerticalEnd, name: "Lumen Capital", plan: "Enterprise" },
    { logo: Command, name: "Arcadia Ventures", plan: "Scale" },
    { logo: AudioWaveform, name: "Kairo Studio", plan: "Pro" },
  ],

  user: {
    avatarUrl: "#",
    email: "m@example.com",
    name: "Lumi UI",
    role: "Admin",
  },
};

export function AppSidebar() {
  return (
    <Sidebar className="bg-background">
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
