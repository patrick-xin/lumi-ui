"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionSummary,
} from "@lumi-ui/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionSummary>Item 1</AccordionSummary>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          repellendus?
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionSummary>Item 2</AccordionSummary>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          repellendus?
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionSummary>Item 3</AccordionSummary>
        <AccordionPanel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          repellendus?
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
