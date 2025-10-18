"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>What is Lumi UI?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lumi UI is an open-source component library designed for building
          beautiful and accessible user interfaces with React.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>What is tech stack?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lumi is built on top of Base UI and Tailwind CSS, providing a solid
          foundation of accessibility and reliability.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Can I customize the components?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Absolutely. Components are built with Tailwind CSS and CVA, making
          them easy to style and extend to match your brand.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
