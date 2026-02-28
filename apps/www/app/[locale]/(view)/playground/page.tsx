import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Layout } from "react-resizable-panels";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AIChat } from "@/registry/blocks/sidebar-03/components/ai-chat";
import { AppSidebar } from "@/registry/blocks/sidebar-03/components/app-sidebar";
import { DashboardCommand } from "@/registry/blocks/sidebar-03/components/dashboard-command";
import { DashboardContent } from "@/registry/blocks/sidebar-03/components/dashboard-content";
import { Notifications } from "@/registry/blocks/sidebar-03/components/vercel-notification";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb";
import { Separator } from "@/registry/ui/separator";
import {
  MainContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/ui/sidebar";

const GROUP_ID = "main-layout-persistence";
const ONBOARDING_COOKIE_NAME = "dashboard-01-onboarding-dismissed";

export default async function Page() {
  const cookieStore = await cookies();
  const layoutCookie = cookieStore.get(GROUP_ID);
  const onboardingCookie = cookieStore.get(ONBOARDING_COOKIE_NAME);
  const defaultLayout: Layout = layoutCookie
    ? JSON.parse(layoutCookie.value)
    : undefined;
  const showOnboarding = onboardingCookie?.value !== "1";

  return (
    <NuqsAdapter>
      <SidebarProvider
        collapsibleType="icon"
        defaultLayout={defaultLayout}
        groupId={GROUP_ID}
      >
        <AppSidebar />
        <MainContent className="bg-background">
          <header className="flex h-14 bg-background z-10 sticky top-0 items-center gap-2 p-2 sm:p-4">
            <SidebarTrigger />
            <Separator className="mr-2 h-4" orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/docs/introduction">
                    Docs
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Playground</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex gap-2">
              <Notifications />
              <ThemeSwitcher />
              <ModeSwitcher />
              <DashboardCommand />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 sm:pt-0">
            <DashboardContent showOnboarding={false} />
          </div>
        </MainContent>
        <AIChat />
      </SidebarProvider>
    </NuqsAdapter>
  );
}
