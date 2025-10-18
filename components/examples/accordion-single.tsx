"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export default function AccordionSingle() {
  return (
    <Accordion
      multiple={false}
      defaultValue={["item-1"]}
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            How is this different from shadcn/ui?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Lumi UI enhances upon shadcn/ui by offering a more consistent API,
          additional component variants, and new features, while maintaining the
          same core principles.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>What are the key dependencies?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          The component library relies on React, Tailwind CSS, Base UI, and CVA
          (Class Variance Authority) to provide its functionality and styling.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Where can I report a bug?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          You can open an issue on our official GitHub repository. Please
          provide as much detail as possible to help us resolve it quickly.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
