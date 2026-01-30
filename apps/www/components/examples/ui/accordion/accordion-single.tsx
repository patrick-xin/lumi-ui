"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionSummary,
} from "@/registry/ui/accordion";

export default function AccordionSingleDemo() {
  return (
    <Accordion multiple defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionSummary>
          How is this different from shadcn/ui?
        </AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionSummary>What are the key dependencies?</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionSummary>Where can I report a bug?</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
