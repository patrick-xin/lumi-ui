"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 text-sm font-medium rounded-md whitespace-nowrap transition-all",
    "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
    "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-6 has-[>svg]:px-4 text-base",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-offset-2 focus-visible:ring-primary/30",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/30 text-destructive dark:hover:bg-destructive/40 focus-visible:outline-destructive focus-visible:outline-offset-2 focus-visible:ring-destructive/30",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
        glow: "bg-transparent border hover:bg-accent dark:hover:bg-accent/30 shadow-md shadow-primary/10 dark:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border shadow-xs bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60",
        secondary:
          "bg-secondary text-secondary-foreground border border-primary/5 hover:bg-secondary/80",
        unstyled: "bg-transparent hover:bg-transparent",
      },
    },
  },
);

const Button = ({
  className,
  variant,
  size,
  isLoading,
  disabled,
  focusableWhenDisabled,
  ...props
}: BaseButton.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  }) => {
  return (
    <BaseButton
      className={cn(buttonVariants({ className, size, variant }))}
      disabled={disabled || isLoading}
      focusableWhenDisabled={focusableWhenDisabled || isLoading}
      {...props}
    />
  );
};

export { Button, buttonVariants };
