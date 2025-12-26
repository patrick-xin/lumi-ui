import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "bg-transparent w-full min-w-0 rounded-md shadow-xs border border-input transition-[color,box-shadow] outline-none",
    "focus-visible:border-ring/30 focus-visible:ring-1 focus-visible:ring-ring/10 focus-visible:ring-offset-1 focus-visible:ring-offset-ring/5",
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "file:text-foreground file:inline-flex file:items-center file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
],
  {
    variants: {
      inputSize: {
        default: "h-9 px-2.5 py-1 text-base md:text-sm",
        sm: "h-8 px-2 text-sm",
        lg: "h-10 px-3 text-lg md:text-base",
      },
      variant:{
        default:"dark:bg-input/30",
        transparent:"bg-transparent",
        ghost: "border-transparent shadow-none focus-visible:border-0 focus-visible:ring-0 transition-none focus-visible:ring-offset-0",
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
