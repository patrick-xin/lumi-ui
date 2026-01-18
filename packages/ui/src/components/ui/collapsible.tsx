"use client"

import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lumi-ui/ui/lib/utils";

const panelVariants = cva("overflow-hidden", {
  variants: {
    animation: {
      css: "h-[var(--collapsible-panel-height)] data-[starting-style]:h-0 data-[ending-style]:h-0 transition-all duration-150",
      none: "",
    },
  },
  defaultVariants: {
    animation: "css",
  },
})

function Collapsible({ ...props }: React.ComponentProps<typeof BaseCollapsible.Root>) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

interface CollapsiblePanelProps
  extends React.ComponentProps<typeof BaseCollapsible.Panel>,
    VariantProps<typeof panelVariants> {}

function CollapsiblePanel({
  className,
  animation,
  ...props
}: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-panel"
      className={cn(panelVariants({ animation }), className)}
      {...props}
    />
  )
}

export { Collapsible, CollapsiblePanel, CollapsibleTrigger }