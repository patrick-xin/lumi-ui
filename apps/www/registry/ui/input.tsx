import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/lib/utils";

// Base box appearance — shared between standalone inputs and containers
const inputBaseVariants = cva(
  [
    "rounded-md border border-input shadow-sm outline-0",
    "transition-[color,box-shadow,border,ring,outline] appearance-none duration-150",
    // disabled
    "disabled:cursor-default disabled:opacity-50",
    "data-disabled:cursor-default data-disabled:opacity-50",
    // invalid
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
    "data-invalid:outline data-invalid:outline-destructive/80 data-invalid:ring-4 data-invalid:ring-destructive/20",
  ],
  {
    defaultVariants: {
      inputSize: "default",
      variant: "default",
    },
    variants: {
      inputSize: {
        default: "min-h-9",
        lg: "min-h-10",
        sm: "min-h-8",
      },
      variant: {
        default: "dark:bg-input/30",
        transparent: "bg-transparent",
      },
    },
  },
);

// Text behavior — for the actual <input> element
const inputVariants = cva(
  [
    "w-full min-w-0 bg-transparent cursor-text text-base md:text-sm appearance-none outline-0",
    "placeholder:text-muted-foreground placeholder:text-sm",
    "file:text-foreground file:inline-flex file:items-center file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
    // selection
    "selection:bg-primary selection:text-primary-foreground",
  ],
  {
    defaultVariants: {
      inputSize: "default",
    },
    variants: {
      inputSize: {
        default: "py-1.5 px-2.5",
        lg: "py-2 px-3",
        sm: "py-1 px-2",
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
}: BaseInput.Props & VariantProps<typeof inputBaseVariants>) {
  return (
    <BaseInput
      className={cn(
        inputBaseVariants({ inputSize, variant }),
        inputVariants({ inputSize }),
        "input-ring-visible",
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input, inputBaseVariants, inputVariants };
