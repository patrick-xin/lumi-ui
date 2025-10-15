import { GradientBorders } from "@/components/gradient-borders";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function ComponentPreviewTabs({
  component,
  source,
}: React.ComponentProps<"div"> & {
  component: React.ReactNode;
  source: React.ReactNode;
}) {
  return (
    <Tabs variant="ghost" defaultValue="preview">
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>
      <TabsPanel
        className="relative flex items-center justify-center h-[450px]"
        value="preview"
      >
        <GradientBorders
          colorVar="--primary"
          baseOpacity={40}
          enableHover={false}
        />
        <div className="w-full h-[450px] flex justify-center items-center">
          {component}
        </div>
      </TabsPanel>
      <TabsPanel value="code" className="relative h-[450px]">
        <div className="*:[figure]:h-[450px] *:[figure]:overflow-scroll *:[figure]:no-scrollbar">
          {source}
        </div>
      </TabsPanel>
    </Tabs>
  );
}
