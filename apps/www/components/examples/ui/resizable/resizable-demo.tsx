import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";

export const ResizableDemo = () => {
  return (
    <ResizableGroup
      className="max-w-md rounded-lg border md:min-w-[450px]"
      orientation="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableSeparator withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizableGroup orientation="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableSeparator withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
  );
};
