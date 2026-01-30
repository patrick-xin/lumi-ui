import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@/registry/ui/resizable";

export const ResizableNestedDemo = () => {
  return (
    <ResizableGroup
      className="max-w-lg rounded-md border min-h-72"
      orientation="horizontal"
    >
      <ResizablePanel minSize={50}>
        <div className="flex items-center justify-center size-full">left</div>
      </ResizablePanel>
      <ResizableSeparator />
      <ResizablePanel minSize={200}>
        <ResizableGroup orientation="vertical">
          <ResizablePanel minSize={20}>
            <div className="flex size-full items-center justify-center">
              top
            </div>
          </ResizablePanel>
          <ResizableSeparator />
          <ResizablePanel minSize={20}>
            <ResizableGroup>
              <ResizablePanel minSize={50}>
                <div className="flex size-full items-center justify-center">
                  left
                </div>
              </ResizablePanel>
              <ResizableSeparator />
              <ResizablePanel minSize={50}>
                <div className="flex size-full items-center justify-center">
                  right
                </div>
              </ResizablePanel>
            </ResizableGroup>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
      <ResizableSeparator />
      <ResizablePanel minSize={50}>
        <div className="flex size-full items-center justify-center">right</div>
      </ResizablePanel>
    </ResizableGroup>
  );
};
