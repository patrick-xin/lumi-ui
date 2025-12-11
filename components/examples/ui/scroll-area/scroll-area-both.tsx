import { ScrollArea } from "@/registry/ui/scroll-area";

export default function ScrollAreaBothDemo() {
  return (
    <ScrollArea className="h-80 max-w-80 rounded-lg border">
      <ul className="m-0 grid list-none grid-cols-[repeat(10,6.25rem)] grid-rows-[repeat(10,6.25rem)] gap-3 p-4">
        {Array.from({ length: 100 }, (_, i) => (
          <li
            key={String(i)}
            className="flex shrink-0 text-sm items-center justify-center rounded-md bg-accent/30"
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
