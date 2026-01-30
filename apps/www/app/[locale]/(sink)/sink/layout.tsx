import { AppSidebar } from "@/registry/blocks/sidebar-02/components/app-sidebar";
import { MainContent, SidebarProvider } from "@/registry/ui/sidebar";
import { cookies } from "next/headers";
import type { Layout } from "react-resizable-panels";

const GROUP_ID = "main-layout-persistence";

export default async function SinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
