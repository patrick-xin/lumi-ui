import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  MailIcon,
  MapIcon,
  PieChart,
  PlusIcon,
  Settings2,
  SquareTerminal,
  UserIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import { Badge } from "@/registry/ui/badge";
import {
  InsetContent,
  InsetPanel,
  InsetRoot,
  MainContent,
  RightSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  type ThreeColumnLayout,
} from "./sidebar";

const GROUP_ID = "sink-three-column-layout";

const sidebarData = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
      title: "Playground",
      url: "#",
    },
    {
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
      title: "Models",
      url: "#",
    },
    {
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
      title: "Documentation",
      url: "#",
    },
    {
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
      title: "Settings",
      url: "#",
    },
  ],
  projects: [
    { icon: Frame, name: "Design Engineering", url: "#" },
    { icon: PieChart, name: "Sales & Marketing", url: "#" },
    { icon: MapIcon, name: "Travel", url: "#" },
  ],
  teams: [
    { logo: GalleryVerticalEnd, name: "Acme Inc", plan: "Enterprise" },
    { logo: AudioWaveform, name: "Acme Corp.", plan: "Startup" },
    { logo: Command, name: "Evil Corp.", plan: "Free" },
  ],
  user: {
    email: "m@example.com",
    name: "Lumi UI",
  },
};

function parseLayoutCookie(
  rawCookie: string | undefined,
): ThreeColumnLayout | undefined {
  if (!rawCookie) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(rawCookie) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return undefined;
    }

    return parsed as ThreeColumnLayout;
  } catch {
    return undefined;
  }
}

export default async function Page() {
  const cookieStore = await cookies();
  const defaultLayout = parseLayoutCookie(cookieStore.get(GROUP_ID)?.value);

  return (
    <SidebarProvider
      defaultLayout={defaultLayout}
      groupId={GROUP_ID}
      header={
        <header className="text-sidebar-foreground flex shrink-0 items-center gap-3 border-b border-sidebar-border p-4 backdrop-blur-sm">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold sm:text-lg">
              Draggable side panels with dual collapse controls
            </div>
          </div>
        </header>
      }
    >
      <Sidebar
        className="bg-sidebar/20 data-[state=collapsed]:pl-0 py-4 pr-0 pl-4"
        contentClassName="bg-sidebar text-sidebar-foreground rounded-xl border border-sidebar-border shadow-sm"
      >
        <SidebarContent>
          <SidebarTrigger className="data-[state=collapsed]:mx-auto data-[state=expanded]:ml-auto data-[state=expanded]:mr-2" />

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton isActive={item.isActive}>
                              {subItem.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton>
                      <project.icon className="size-4" />
                      <span>{project.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="New Workspace" variant="outline">
                <PlusIcon className="size-4" />
                <span>New Workspace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={sidebarData.user.name}>
                <UserIcon className="size-4" />
                <span>{sidebarData.user.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <InsetRoot>
          <InsetPanel>
            <InsetContent>
              <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
                {["MRR", "Conversion", "Retention"].map((metric) => (
                  <div
                    className="bg-muted/50 space-y-2 rounded-lg border p-4"
                    key={metric}
                  >
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {metric}
                    </p>
                    <p className="text-xl font-semibold">
                      {metric === "MRR"
                        ? "$128,420"
                        : metric === "Conversion"
                          ? "7.8%"
                          : "93.2%"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Compared to the last 30 days.
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 px-4 pb-4">
                {Array.from({ length: 24 }, (_, index) => index + 1).map(
                  (item) => (
                    <div
                      className="bg-background flex items-start gap-3 rounded-lg border p-3"
                      key={item}
                    >
                      <div className="bg-primary/10 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                        {item}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="truncate text-sm font-medium">
                          Activity #{item}: synced updates for the dashboard
                          stream.
                        </p>
                        <p className="text-muted-foreground text-xs">
                          This row exists to validate center panel scrolling
                          while both sidebars stay resizable.
                        </p>
                      </div>
                      <Badge
                        className="shrink-0"
                        variant={item % 3 === 0 ? "default" : "secondary"}
                      >
                        {item % 3 === 0 ? "Live" : "Queued"}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </InsetContent>
          </InsetPanel>
        </InsetRoot>
      </MainContent>

      <RightSidebar
        className="bg-sidebar/20 py-2 pr-2 pl-0 sm:py-4 sm:pr-4 sm:pl-0"
        contentClassName="bg-sidebar text-sidebar-foreground rounded-xl border border-sidebar-border shadow-sm"
      >
        <SidebarContent>
          <SidebarTrigger
            className="data-[state=collapsed]:mx-auto data-[state=expanded]:mr-auto data-[state=expanded]:ml-2"
            side="right"
          />

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.teams.map((team) => (
                  <SidebarMenuItem key={team.name}>
                    <SidebarMenuButton tooltip={team.name}>
                      <team.logo className="size-4" />
                      <span>{team.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip={sidebarData.user.name}>
                    <UserIcon className="size-4" />
                    <span>{sidebarData.user.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={sidebarData.user.email}>
                    <MailIcon className="size-4" />
                    <span>{sidebarData.user.email}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {sidebarData.navMain.slice(0, 2).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} variant="outline">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </RightSidebar>
    </SidebarProvider>
  );
}
