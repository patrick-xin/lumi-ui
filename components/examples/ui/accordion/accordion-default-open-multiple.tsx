"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export function Demo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["item-2", "item-3"]}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>defult closed</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, possimus.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>I'm default open</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, possimus.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>I'm default open as well</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, possimus.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
