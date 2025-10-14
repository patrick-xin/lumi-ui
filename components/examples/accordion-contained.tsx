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
      className="mx-auto w-96 max-w-[calc(100vw-6rem)]"
    >
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>What is accordion?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          A collapsible component that organizes content into expandable
          sections.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Is it customizable?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Yes. You can style it with tailwind classes to match your design
          system.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Is it animated?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Yes. Smooth expand and collapse transitions are built in.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem disabled>
        <AccordionHeader>
          <AccordionTrigger>Can it be disabled?</AccordionTrigger>
        </AccordionHeader>
      </AccordionItem>
    </Accordion>
  );
}
