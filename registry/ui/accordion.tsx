"use client";

import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const accordionItemVariants = cva("border-b", {
  variants: {
    variant: {
      underline: "last:border-b-0",
      contained: "border-0",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const accordionTriggerVariants = cva(
  "flex flex-1 items-start justify-between gap-4 text-sm text-left font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        underline: "py-3 hover:underline [&[data-panel-open]>svg]:rotate-180",
        contained:
          "group relative rounded-md items-center bg-background hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50 py-2 pr-1 pl-3 focus-visible:z-10",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

const accordionPanelContentVariants = cva("text-sm", {
  variants: {
    variant: {
      underline: "pt-0 pb-4",
      contained: "p-3 text-muted-foreground rounded-md",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

type AccordionContextValue = {
  variant: VariantProps<typeof accordionTriggerVariants>["variant"];
};

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within <Accordion>");
  }
  return context;
}

function Accordion({
  variant = "underline",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionTriggerVariants>) {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root data-slot="accordion" {...props} />
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const { variant } = useAccordionContext();
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const { variant } = useAccordionContext();
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(accordionTriggerVariants({ variant }), className)}
      {...props}
    >
      {children}
      {variant === "contained" ? (
        <PlusIcon className="group-hover:text-foreground text-muted-foreground mr-2 size-4 shrink-0 transition-all ease-out group-data-[panel-open]:rotate-45 data-[panel-open]:text-foreground" />
      ) : (
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  );
}

function AccordionHeader(
  props: React.ComponentProps<typeof AccordionPrimitive.Header>,
) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className="flex"
      {...props}
    />
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  const { variant } = useAccordionContext();
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] ease-out",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
      )}
      {...props}
    >
      <div
        className={cn(accordionPanelContentVariants({ variant }), className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
};
