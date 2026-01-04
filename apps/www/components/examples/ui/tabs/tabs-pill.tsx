import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsPill() {
  return (
    <Tabs className="w-86" defaultValue="1">
      <TabsList>
        <TabsTab value="1">Tab One</TabsTab>
        <TabsTab value="2">Tab Two</TabsTab>
      </TabsList>
      <TabsPanel value="1">
        <div className="bg-accent p-4">
          <p>Tab One</p>
        </div>
      </TabsPanel>
      <TabsPanel value="2">
        <div className="bg-accent p-4">
          <p>Tab Two</p>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
