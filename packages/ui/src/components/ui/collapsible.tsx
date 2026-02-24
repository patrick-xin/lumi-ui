"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const panelVariants = cva("overflow-hidden", {
  defaultVariants: {
    animation: "css",
  },
  variants: {
    animation: {
      css: "h-[var(--collapsible-panel-height)] data-[starting-style]:h-0 data-[ending-style]:h-0 transition-all duration-150",
      none: "",
    },
  },
});

function Collapsible({ ...props }: BaseCollapsible.Root.Props) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: BaseCollapsible.Trigger.Props) {
  return <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsiblePanel({
  className,
  animation,
  ...props
}: BaseCollapsible.Panel.Props & VariantProps<typeof panelVariants>) {
  return (
    <BaseCollapsible.Panel
      className={cn(panelVariants({ animation }), className)}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { Collapsible, CollapsiblePanel, CollapsibleTrigger };
