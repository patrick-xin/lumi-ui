import { AIChat } from "@lumi-ui/ui/blocks/sidebar-01/components/ai-chat";
import { AppSidebar } from "@lumi-ui/ui/blocks/sidebar-01/components/app-sidebar";
import { ChartMixedAxes } from "@lumi-ui/ui/blocks/sidebar-01/components/chart-mixed-axes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lumi-ui/ui/breadcrumb";
import { Separator } from "@lumi-ui/ui/separator";
import {
  MainContent,
  SidebarProvider,
  SidebarTrigger,
} from "@lumi-ui/ui/sidebar";

import { cookies } from "next/headers";
import type { Layout } from "react-resizable-panels";

const GROUP_ID = "main-layout-persistence";

export default async function Page() {
  const cookieStore = await cookies();
  const layoutCookie = cookieStore.get(GROUP_ID);

  const defaultLayout: Layout = layoutCookie
    ? JSON.parse(layoutCookie.value)
    : undefined;

  return (
    <SidebarProvider
      collapsibleType="icon"
      defaultLayout={defaultLayout}
      groupId={GROUP_ID}
    >
      <AppSidebar />
      <MainContent>
        <header className="flex h-12 bg-background z-10 sticky top-0 items-center gap-2 p-2 sm:p-4">
          <SidebarTrigger />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Financial Performance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 sm:pt-0">
          <div className="h-120 2xl:h-150">
            <ChartMixedAxes />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
        </div>
      </MainContent>
      <AIChat />
    </SidebarProvider>
  );
}
