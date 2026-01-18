"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@lumi-ui/ui/accordion";

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

export function AccordionCustomTriggerWithoutIconDemo() {
  return (
    <Accordion className="w-full max-w-md">
      {items.map((item) => (
        <AccordionItem
          className="border rounded-md py-2 my-2 last:border-b"
          key={item.value}
          value={item.value}
        >
          <AccordionHeader>
            <AccordionTrigger className="px-4 cursor-pointer text-base font-semibold">
              {item.label}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="py-2 px-4 bg-background">
            {item.label}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
