"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap active:bg-accent data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-2 min-w-9",
        lg: "h-10 px-2.5 min-w-10",
        sm: "h-8 px-1.5 min-w-8",
        xs: "h-7 px-1 min-w-7",
      },
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-secondary hover:text-secondary-foreground",
      },
    },
  },
);

interface ToggleProps
  extends React.ComponentProps<typeof BaseToggle>,
    VariantProps<typeof toggleVariants> {
  className?: string;
}

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <BaseToggle
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
