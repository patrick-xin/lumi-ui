"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionSummary,
} from "@/registry/ui/accordion";

export function AccordionDisabledDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem>
        <AccordionSummary>What is accordion?</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionSummary>Is it customizable?</AccordionSummary>
        <AccordionPanel>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem disabled>
        <AccordionSummary>
          <div className="w-full h-12 bg-accent/30 rounded-md" />
        </AccordionSummary>
      </AccordionItem>
    </Accordion>
  );
}
