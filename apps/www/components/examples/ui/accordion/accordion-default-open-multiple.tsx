"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionSummary,
} from "@/registry/ui/accordion";

export function AccordionDefaultOpenMultipleDemo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["item-2", "item-3"]}>
      <AccordionItem value="item-1">
        <AccordionSummary>defult closed</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionSummary>I'm default open</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionSummary>I'm default open as well</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
