import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "h-9 px-3 py-1 w-full min-w-0 rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm dark:bg-input/30",
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
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

function Input({
  variant,
  className,
  type,
  ...props
}: React.ComponentProps<typeof BaseInput> &
  VariantProps<typeof inputVariants>) {
  return (
    <BaseInput
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
