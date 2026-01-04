import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/registry/ui/tabs";

export function TabsUnderline() {
  return (
    <div className="flex gap-2">
      <Tabs className="w-86" defaultValue="1">
        <TabsList className="w-full gap-4 p-0 bg-transparent border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l">
          <TabsTab value="1">Tab One</TabsTab>
          <TabsTab value="2">Tab Two</TabsTab>
          <TabIndicator className="bg-foreground bottom-0 left-0 h-0.5 translate-x-(--active-tab-left) data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:translate-y-0 data-[orientation=vertical]:-start-[calc(--spacing(1)-0.5px)]" />
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
      <Tabs className="w-86" defaultValue="1" orientation="vertical">
        <TabsList className="gap-4 p-0 bg-transparent border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l">
          <TabsTab value="1">Tab One</TabsTab>
          <TabsTab value="2">Tab Two</TabsTab>
          <TabIndicator className="bg-foreground bottom-0 left-0 h-0.5 translate-x-(--active-tab-left) data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:translate-y-0 data-[orientation=vertical]:-start-[calc(--spacing(1)-0px)]" />
        </TabsList>
        <TabsPanel value="1">
          <div className="bg-accent p-4 h-full">
            <p>Tab One</p>
          </div>
        </TabsPanel>
        <TabsPanel value="2">
          <div className="bg-secondary p-4 h-full">
            <p>Tab Two</p>
          </div>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
