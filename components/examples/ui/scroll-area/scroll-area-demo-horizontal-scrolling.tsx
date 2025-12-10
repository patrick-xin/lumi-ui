import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area";

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="flex h-48 w-32 shrink-0 items-center justify-center rounded-md bg-accent"
            key={String(i)}
          >
            <span className="font-medium text-sm">Item {i + 1}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
