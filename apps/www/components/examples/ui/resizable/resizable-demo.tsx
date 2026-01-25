import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";

export const ResizableDemo = () => {
  return (
    <ResizableGroup
      className="max-w-lg rounded-md border text-sm text-muted-foreground"
      orientation="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          One
        </div>
      </ResizablePanel>
      <ResizableSeparator withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizableGroup orientation="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              Two
            </div>
          </ResizablePanel>
          <ResizableSeparator withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              Three
            </div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
  );
};
