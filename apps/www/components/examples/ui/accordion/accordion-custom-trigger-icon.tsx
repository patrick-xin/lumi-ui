import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/ui/accordion";

const items = [
  {
    label: "Item 1",
    value: "item-1",
  },
  {
    label: "Item 2",
    value: "item-2",
  },
  {
    label: "Item 3",
    value: "item-3",
  },
];

export function AccordionCustomTriggerIconDemo() {
  return (
    <Accordion className="w-full max-w-sm space-y-2">
      {items.map((item) => (
        <AccordionItem
          className="border-0 my-2"
          disabled={item.value === "item-3"}
          key={item.value}
          value={item.value}
        >
          <AccordionHeader>
            <AccordionTrigger
              className={cn(
                "py-2 px-3 rounded-md items-center bg-background hover:bg-accent  hover:text-accent-foreground",
                // Use data-[panel-open] to style trigger and svg
                "data-[panel-open]:bg-accent dark:data-[panel-open]:bg-accent/50 dark:hover:bg-accent/50 [&[data-panel-open]>svg]:rotate-45",
              )}
            >
              {item.label}
              <Plus className="size-4" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="py-2 px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
            repellendus?
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
