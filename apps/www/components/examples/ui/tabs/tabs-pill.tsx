import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/registry/ui/tabs";

export function TabsPill() {
  return (
    <div className="flex gap-2">
      <Tabs className="w-86" defaultValue="1" orientation="vertical">
        <TabsList className="gap-1 p-1.5 rounded-sm bg-accent dark:bg-accent/50 text-accent-foreground data-[orientation=vertical]:h-48">
          <TabsTab
            className="text-muted-foreground data-[active]:text-foreground"
            value="1"
          >
            Tab One
          </TabsTab>
          <TabsTab
            className="text-muted-foreground data-[active]:text-foreground"
            value="2"
          >
            Tab Two
          </TabsTab>
          <TabIndicator className="rounded-sm bg-primary/60 top-1/2 -translate-y-1/2 left-0 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)" />
        </TabsList>
        <TabsPanel className="bg-accent p-4" value="1">
          Tab One
        </TabsPanel>
        <TabsPanel className="bg-secondary p-4" value="2">
          Tab Two
        </TabsPanel>
      </Tabs>
    </div>
  );
}
