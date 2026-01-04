import { Star } from "lucide-react";
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
      <Tabs className="w-86" defaultValue="1" orientation="vertical">
        <TabsList className="gap-4 bg-transparent border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l">
          <TabsTab className="text-lg" value="1">
            Tab One <Star />
          </TabsTab>
          <TabsTab className="text-lg" value="2">
            Tab Two <Star />
          </TabsTab>
          <TabIndicator className="bg-foreground  data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:-left-[1.5px] data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:translate-y-0 data-[orientation=vertical]:translate-x-0" />
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
