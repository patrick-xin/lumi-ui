import { GradientBorders } from "@/components/gradient-borders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

export function ComponentPreviewTabs({
  component,
  source,
}: React.ComponentProps<"div"> & {
  component: React.ReactNode;
  source: React.ReactNode;
}) {
  return (
    <Tabs variant={"ghost"} defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        className="relative p-10 flex items-center justify-center min-h-full"
        value="preview"
      >
        <GradientBorders
          colorVar="--primary"
          baseOpacity={40}
          enableHover={false}
        />
        <div className="h-72 self-center overflow-auto flex justify-center items-center">
          {component}
        </div>
      </TabsContent>
      <TabsContent value="code">{source}</TabsContent>
    </Tabs>
  );
}
