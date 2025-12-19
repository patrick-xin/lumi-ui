import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "w-full min-w-0 rounded-md shadow-xs border border-input transition-[color,box-shadow] outline-none",
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "file:text-foreground file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      inputSize: {
        default: "h-9 px-2.5 py-1 text-base md:text-sm",
        sm: "h-8 px-2 text-sm",
        lg: "h-10 px-2.5 text-lg md:text-base",
      },
      variant:{
        default:"bg-transparent dark:bg-input/30",
        transparent:"bg-transparent",
        ghost: "border-transparent shadow-none focus-visible:border-ring focus-visible:shadow-xs",
      }
    },
    defaultVariants: {
      inputSize: "default",
      variant:"default",
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
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
