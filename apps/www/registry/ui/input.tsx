import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/registry/lib/utils";

const inputVariants = cva(
  [
    "bg-transparent w-full min-w-0 rounded-md shadow-sm border border-input cursor-text transition-[color,box-shadow,border,ring] appearance-none duration-150 px-3",
    "placeholder:text-muted-foreground",
    "file:text-foreground file:inline-flex file:items-center file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
    // focus state
    "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
    // selection state
    "selection:bg-primary selection:text-primary-foreground",
    // disabled state
    "disabled:cursor-default disabled:opacity-50",
    // invalid state
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
  ],
  {
    defaultVariants: {
      inputSize: "default",
      variant: "default",
    },
    variants: {
      inputSize: {
        default: "h-9 py-1.5 text-base md:text-sm",
        lg: "h-10 py-2 text-base md:text-sm",
        sm: "h-8 py-1 text-sm",
      },
      variant: {
        default: "dark:bg-input/30",
        ghost:
          "border-transparent shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none",
        transparent: "bg-transparent",
      },
    },
  },
);

function Input({
  variant,
  inputSize,
  className,
  type,
  ...props
}: React.ComponentProps<typeof BaseInput> &
  VariantProps<typeof inputVariants>) {
  return (
    <BaseInput
      className={cn(inputVariants({ inputSize, variant }), className)}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input, inputVariants };
