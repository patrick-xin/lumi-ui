import { StatsChart } from "@/registry/blocks/dialog-02/components/stats-chart";
import { Button } from "@/registry/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@/registry/ui/tabs";
import { InfoIcon } from "lucide-react";

export const InfoMenu = () => {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <InfoIcon /> Info
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-secondary" side="top">
        <Tabs className="w-72" defaultValue="views">
          <TabsPanel value="downloads">
            <StatsChart data="downloads" />
          </TabsPanel>
          <TabsPanel value="views">
            <StatsChart data="views" />
          </TabsPanel>
          <TabsListContent>
            <TabsTab value="downloads">Downloads</TabsTab>
            <TabsTab value="views">Views</TabsTab>
          </TabsListContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
