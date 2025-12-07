"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @private INTERNAL GUIDELINES FOR AI AGENTS
 * This interface defines the strict rules for this component.
 */
interface AGENTS_READ_THIS {
  LIBRARY: "Base UI (NOT Radix UI)";
  STRATEGY: "Use 'render' prop for composition. NEVER use 'asChild'.";
  ANATOMY: {
    Root: "Accordion - wraps everything";
    Item: "AccordionItem - wraps Header and Panel";
    Header: "AccordionHeader - REQUIRED wrapper for Trigger (a11y)";
    Trigger: "AccordionTrigger - the button";
    Panel: "AccordionPanel - the content";
  };
  CRITICAL_RULES: [
    "Base UI uses `render` prop to render other elements. Do not use `asChild` or `as`. ",
    "Panel MUST have `h-[var(--accordion-panel-height)]` class for animation",
    "Do NOT remove `AccordionHeader`, it is required for WAI-ARIA",
  ];
}



const accordionItemVariants = cva("border-b", {
  variants: {
    variant: {
      underline: "last:border-b-0",
      contained: "border-0 my-2",
      outline: "border rounded-md py-2 my-2",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const accordionTriggerVariants = cva(
  "flex flex-1 items-start justify-between gap-4 text-sm text-left font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 rounded-md",
  {
    variants: {
      variant: {
        underline: "py-4 hover:underline [&[data-panel-open]>svg]:rotate-180",
        contained:
          "group py-2 relative items-center bg-background hover:bg-accent px-3 hover:text-accent-foreground data-[panel-open]:bg-accent dark:data-[panel-open]:bg-accent/50 dark:hover:bg-accent/50 [&[data-panel-open]>svg]:rotate-45",
        outline: "px-3 hover:underline [&[data-panel-open]>svg]:rotate-180",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

const accordionPanelVariants = cva("text-sm", {
  variants: {
    variant: {
      underline: "pt-0 pb-4",
      contained: "py-2 px-3 text-muted-foreground rounded-md",
      outline: "py-2 px-4",
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

/**
 * The Root Accordion Component.
 * @param {boolean} multiple - Whether multiple items can be open at the same time. Default: `false`.
 * @param {any[]} value - Controlled value (array of item IDs).
 * @param {any[]} defaultValue - Initial uncontrolled value.
 * @param {boolean} disabled - Whether the component should ignore user interaction.
 * @example
 * // SINGLE OPEN (Default)
 * <Accordion>
 *   <AccordionItem value="item-1">...</AccordionItem>
 * </Accordion>
 * 
 * @example
 * // MULTIPLE OPEN + CONTAINED STYLE
 * <Accordion multiple variant="contained" defaultValue={["item-2", "item-3"]}>
 *   <AccordionItem value="item-1">...</AccordionItem>
 * </Accordion>
 */
function Accordion({
  variant = "underline",
  ...props
}: React.ComponentProps<typeof BaseAccordion.Root> &
  VariantProps<typeof accordionTriggerVariants>) {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <BaseAccordion.Root data-slot="accordion" {...props} />
    </AccordionContext.Provider>
  );
}

/**
 *@param {string} value - A unique value. If not provided, a unique ID is auto-generated.
 *@param {boolean} disabled - Disables this specific item.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item>) {
  const { variant } = useAccordionContext();
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * The interactive trigger button. Use `render` prop to render other elements, set `nativeButton={false}` to ensure proper accessibility semantics.
 * Icons are automatically injected based on the Accordion `variant`.
 * @example
 * // Render Button
 * <AccordionTrigger render={<Button/>}>
 * @example
 * // Render other element
 * <AccordionTrigger render={<div/>} nativeButton={false}>
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  const { variant } = useAccordionContext();
  return (
    <BaseAccordion.Trigger
      data-slot="accordion-trigger"
      className={cn(accordionTriggerVariants({ variant, className }))}
      {...props}
    >
      {children}
      {variant === "contained" ? (
        <PlusIcon className="text-muted-foreground size-4 shrink-0 transition-all ease-out" />
      ) : (
        <ChevronDownIcon className="text-muted-foreground translate-y-0.5 pointer-events-none size-4 shrink-0 transition-transform duration-200" />
      )}
    </BaseAccordion.Trigger>
  );
}

/**
 * Required wrapper for Accessibility (WAI-ARIA). Renders <h3/> by default.
 * @remarks Do not omit this component. It wraps the Trigger.
 */
function AccordionHeader(
  props: React.ComponentProps<typeof BaseAccordion.Header>,
) {
  return (
    <BaseAccordion.Header
      data-slot="accordion-header"
      className="flex"
      {...props}
    />
  );
}

/**
 * The content panel.
 * @remarks 
 * ANIMATION WARNING: This component relies on `var(--accordion-panel-height)`.
 */
function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Panel>) {
  const { variant } = useAccordionContext();
  return (
    <BaseAccordion.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm",
        "transition-[height] duration-200 ease-out",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
      )}
      {...props}
    >
      <div className={cn(accordionPanelVariants({ variant }), className)}>
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}

export {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
};
