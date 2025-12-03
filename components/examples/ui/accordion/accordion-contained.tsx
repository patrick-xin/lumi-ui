"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export function AccordionContained() {
  return (
    <Accordion
      variant="contained"
      defaultValue={["item-1"]}
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>How do I install it?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          You can install Lumi UI components via the CLI or by copying and
          pasting the component code directly into your project.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Is it open source?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Yes, code is available to everyone.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>How can I contribute?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          We welcome contributions! Please check out our contributing guide on
          GitHub to get started.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
