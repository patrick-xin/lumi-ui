import { ScrollArea } from "@lumi-ui/ui/scroll-area";

export function ScrollAreaGradientScrollFadeDemo() {
  return (
    <ScrollArea
      gradientScrollFade
      className="h-50 w-96 max-w-md border rounded-md"
    >
      <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm text-muted-foreground">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
            key={String(i)}
          >
            <span className="font-medium text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
