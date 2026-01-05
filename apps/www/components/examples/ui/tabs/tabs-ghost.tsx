import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsGhostDemo() {
  return (
    <Tabs className="w-86" defaultValue="1">
      <TabsList
        // apply `w-fit` to make the tabs take up the minimum width
        className="gap-3 bg-transparent w-fit"
      >
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
      </TabsList>
      <TabsPanel className="p-4 rounded-md bg-accent text-sm" value="1">
        <p>Tab One</p>
      </TabsPanel>
      <TabsPanel className="p-4 rounded-md bg-secondary text-sm" value="2">
        <p>Tab Two</p>
      </TabsPanel>
    </Tabs>
  );
}
