import { cookies } from "next/headers";
import type { Layout } from "react-resizable-panels";
import { ChartMixedAxes } from "@/components/examples/ui/chart/chart-demo";
import { AppSidebarIcon } from "@/components/sidebar/app-sidebar-icon";
import {
  MainContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar/sidebar";

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
      <AppSidebarIcon />
      <MainContent>
        <header className="flex h-16 shrink-0 items-center gap-2 p-2 sm:p-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4">
          <ChartMixedAxes />
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
    </SidebarProvider>
  );
}
