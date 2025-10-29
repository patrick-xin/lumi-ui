import { Input as InputPrimitive } from "@base-ui-components/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  `
    w-full min-w-0 shadow-xs transition-[color,box-shadow] border-input rounded-md border bg-transparent dark:bg-input/30 
    placeholder:text-muted-foreground
    file:text-foreground file:text-sm file:font-medium disabled:pointer-events-none file:inline-flex file:h-7 file:border-0 file:bg-transparent
    disabled:cursor-not-allowed disabled:opacity-50
   focus-visible:border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50
    selection:bg-primary selection:text-primary-foreground 
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  `,
  {
    variants: {
      variant: {
        sm: "h-8 px-2 text-sm",
        md: "h-9 px-3 py-1 text-base md:text-sm",
        lg: "h-11 px-4 text-lg md:text-base",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  },
);

export function Input({
  variant,
  className,
  type,
  ...props
}: React.ComponentProps<typeof InputPrimitive> &
  VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}
