import { Button } from "@lumi-ui/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@lumi-ui/ui/popover";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@lumi-ui/ui/tabs";
import { InfoIcon } from "lucide-react";
import { StatsChart } from "./stats-chart";

export const InfoMenu = () => {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <InfoIcon /> Info
      </PopoverTrigger>
      <PopoverContent align="end" side="top">
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
