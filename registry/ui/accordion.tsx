"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ ...props }: BaseAccordion.Root.Props) {
  return <BaseAccordion.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: BaseAccordion.Item.Props) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(
        "border-b last:border-b-0 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Header>) {
  return (
    <BaseAccordion.Header
      data-slot="accordion-header"
      className={cn("flex", className)}
      {...props}
    />
  );
}

function AccordionSummary({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger
        className={cn(
          "flex flex-1 w-full items-center justify-between text-sm py-4 font-medium transition-all hover:underline text-left",
          "[&[data-panel-open]>svg]:rotate-180",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:shrink-0",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 text-muted-foreground pointer-events-none" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: BaseAccordion.Trigger.Props) {
  return (
    <BaseAccordion.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-center justify-between font-medium",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </BaseAccordion.Trigger>
  );
}

const panelVariants = cva(
  "overflow-hidden text-base",
  {
    variants: {
      animation: {
        css: "h-[var(--accordion-panel-height)] data-[starting-style]:h-0 data-[ending-style]:h-0 transition-[height] duration-200 ease-out",
        none: "",
      },
    },
    defaultVariants: {
      animation: "css",
    },
  },
);

interface AccordionPanelProps
  extends BaseAccordion.Panel.Props,
    VariantProps<typeof panelVariants> {}

function AccordionPanel({
  className,
  animation,
  children,
  ...props
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-panel"
      className={cn(panelVariants({ animation }))}
      {...props}
    >
      <div className={cn("pb-4 pt-0 text-sm", className)}>{children}</div>
    </BaseAccordion.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionHeader,
  AccordionSummary,
};
