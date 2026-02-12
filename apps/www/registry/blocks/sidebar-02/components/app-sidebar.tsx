import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/ui/sidebar";
import { NavMain } from "./nav-main";
import { VersionSwitcher } from "./version-switcher";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher
          defaultVersion={data.versions[0]}
          versions={data.versions}
        />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea gradientScrollFade>
          <NavMain items={data.navMain} />
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        render={<a href={item.url}>{item.title}</a>}
                        tooltip={{
                          children: "hello",
                        }}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}

const data = {
  navMain: [
    {
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          isActive: true,
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
      title: "Dashboard",
      url: "#",
    },
    {
      items: [
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Roles & Permissions",
          url: "#",
        },
        {
          title: "Teams",
          url: "#",
        },
        {
          title: "Invitations",
          url: "#",
        },
        {
          title: "Activity Logs",
          url: "#",
        },
      ],
      title: "User Management",
      url: "#",
    },
    {
      items: [
        {
          title: "All Projects",
          url: "#",
        },
        {
          title: "Active Projects",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
        {
          title: "Templates",
          url: "#",
        },
      ],
      title: "Projects",
      url: "#",
    },
    {
      items: [
        {
          title: "Transactions",
          url: "#",
        },
        {
          title: "Subscriptions",
          url: "#",
        },
        {
          title: "Invoices",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Payment Methods",
          url: "#",
        },
      ],
      title: "Sales & Revenue",
      url: "#",
    },
    {
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Security",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "API Keys",
          url: "#",
        },
        {
          title: "Webhooks",
          url: "#",
        },
      ],
      title: "Settings",
      url: "#",
    },
  ],
  user: {
    email: "m@example.com",
    name: "Lumi UI",
  },
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
};
