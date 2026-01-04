import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/registry/ui/tabs";

export function TabsSolid() {
  return (
    <div className="flex gap-2">
      <Tabs className="w-86" defaultValue="1">
        <TabsList className="gap-1 rounded-md bg-card data-[orientation=vertical]:gap-1.5 data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-1.5">
          <TabsTab
            className="text-muted-foreground data-[active]:text-foreground hover:bg-accent/50 data-[active]:bg-accent/70"
            value="1"
          >
            Tab One
          </TabsTab>
          <TabsTab
            className="text-muted-foreground data-[active]:text-foreground hover:bg-accent/50 data-[active]:bg-accent/70"
            value="2"
          >
            Tab Two
          </TabsTab>
          <TabIndicator className="" />
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
