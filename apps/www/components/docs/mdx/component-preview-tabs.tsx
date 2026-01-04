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
    <Tabs defaultValue="preview" variant="ghost">
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>
      <TabsPanel
        className="relative flex items-center justify-center h-[420px]"
        value="preview"
      >
        <GradientBorders
          baseOpacity={40}
          colorVar="--primary"
          enableHover={false}
        />
        <div className="w-full min-h-[420px] flex justify-center items-center p-10 has-[[data-slot='accordion']]:items-start has-[[data-slot='menu-trigger']]:items-start [&_input]:max-w-xs">
          {component}
        </div>
      </TabsPanel>
      <TabsPanel className="relative h-[420px]" value="code">
        <div className="*:[figure]:h-[420px] *:[figure]:overflow-scroll *:[figure]:no-scrollbar">
          {source}
        </div>
      </TabsPanel>
    </Tabs>
  );
}
