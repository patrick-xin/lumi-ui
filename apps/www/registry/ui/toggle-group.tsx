"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/registry/ui/toggle";

const toggleGroupVariants = cva(
  "flex items-center justify-center w-fit relative data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
  {
    compoundVariants: [
      {
        className:
          "*:data-[slot=toggle-group-item]:rounded-none *:data-[slot=toggle-group-item]:only:rounded-md *:data-[slot=toggle-group-item]:data-pressed:shadow-none data-[orientation=horizontal]:*:data-[slot=toggle-group-item]:first:rounded-l-md data-[orientation=horizontal]:*:data-[slot=toggle-group-item]:last:rounded-r-md data-[orientation=vertical]:*:data-[slot=toggle-group-item]:first:rounded-t-md data-[orientation=vertical]:*:data-[slot=toggle-group-item]:last:rounded-b-md",
        spacing: "none",
      },
      {
        className:
          "data-[orientation=horizontal]:-space-x-px data-[orientation=vertical]:-space-y-px",
        spacing: "none",
        variant: "outline",
      },
    ],
    defaultVariants: {
      size: "md",
      spacing: "none",
      variant: "default",
    },
    variants: {
      size: {
        default: "",
        lg: "*:data-[slot=toggle-group-item]:h-10 *:data-[slot=toggle-group-item]:px-2.5 *:data-[slot=toggle-group-item]:min-w-10",
        md: "",
        sm: "*:data-[slot=toggle-group-item]:h-8 *:data-[slot=toggle-group-item]:px-1.5 *:data-[slot=toggle-group-item]:min-w-8 *:data-[slot=toggle-group-item]:text-xs",
        xs: "*:data-[slot=toggle-group-item]:h-7 *:data-[slot=toggle-group-item]:px-1 *:data-[slot=toggle-group-item]:min-w-7 *:data-[slot=toggle-group-item]:text-xs",
      },
      spacing: {
        lg: "gap-3",
        md: "gap-2",
        none: "gap-0",
        sm: "gap-1",
      },
      variant: {
        default: "",
        outline:
          "*:data-[slot=toggle-group-item]:border *:data-[slot=toggle-group-item]:data-pressed:border-primary/15",
      },
    },
  },
);

function ToggleGroup({
  className,
  spacing = "none",
  variant,
  size,
  children,
  ...props
}: BaseToggleGroup.Props &
  VariantProps<typeof toggleGroupVariants> &
  VariantProps<typeof toggleVariants>) {
  return (
    <BaseToggleGroup
      className={cn(toggleGroupVariants({ size, spacing, variant }), className)}
      data-slot="toggle-group"
      {...props}
    >
      {children}
    </BaseToggleGroup>
  );
}

function ToggleGroupItem({
  className,
  children,
  size,
  variant,
  ...props
}: BaseToggle.Props & VariantProps<typeof toggleVariants>) {
  return (
    <BaseToggle
      className={cn(toggleVariants({ size, variant }), className)}
      data-slot="toggle-group-item"
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
