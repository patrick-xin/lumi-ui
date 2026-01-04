import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsGhostDemo() {
  return (
    <Tabs className="w-86" defaultValue="1">
      <TabsList className="gap-3 bg-transparent data-[orientation=vertical]:py-0 data-[orientation=vertical]:gap-4">
        <TabsTab
          className="text-muted-foreground data-[active]:text-foreground data-[orientation=vertical]:p-0"
          value="1"
        >
          Tab One
        </TabsTab>
        <TabsTab
          className="text-muted-foreground data-[active]:text-foreground data-[orientation=vertical]:p-0"
          value="2"
        >
          Tab Two
        </TabsTab>
      </TabsList>
      <TabsPanel value="1">
        <div className="bg-accent p-4">
          <p>Tab One</p>
        </div>
      </TabsPanel>
      <TabsPanel value="2">
        <div className="bg-secondary p-4">
          <p>Tab Two</p>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
