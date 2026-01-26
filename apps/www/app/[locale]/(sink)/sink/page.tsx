import { Separator } from "@lumi-ui/ui/separator";
import { cookies } from "next/headers";
import type { Layout } from "react-resizable-panels";
import { ChartClusterCpu } from "@/components/examples/ui/chart/chart-cluster-cpu";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
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
      collapsibleType="sidebar"
      defaultLayout={defaultLayout}
      groupId={GROUP_ID}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ChartClusterCpu />
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
      </SidebarInset>
    </SidebarProvider>
  );
}
