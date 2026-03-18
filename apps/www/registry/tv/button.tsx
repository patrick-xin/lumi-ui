import { Button as BaseButton } from "@base-ui/react/button";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2 text-sm font-medium rounded-md whitespace-nowrap transition-all",
    "select-none bg-clip-padding shrink-0",
    "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
    "aria-invalid:focus-visible:outline-destructive aria-invalid:focus-visible:outline-offset-2 aria-invalid:focus-visible:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
  ],
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
      default: [
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus-visible:outline-offset-2 focus-visible:ring-primary/30",
        "data-popup-open:bg-primary/90",
      ],
      destructive: [
        "text-white bg-destructive/80 hover:bg-destructive/70",
        "focus-visible:outline-destructive focus-visible:outline-offset-2 focus-visible:ring-destructive/30 aria-invalid:focus-visible:outline-offset-2",
        "data-popup-open:bg-destructive/70",
      ],
      ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
      glow: "bg-transparent border border-primary/30 dark:border-primary/15 hover:bg-accent dark:hover:bg-accent/30 shadow-md shadow-primary/10 dark:shadow-sm",
      link: "text-primary underline-offset-4 hover:underline aria-invalid:text-destructive",
      outline: [
        "border border-primary/30 dark:border-primary/15 shadow-xs bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60",
        "data-popup-open:bg-accent data-popup-open:text-accent-foreground dark:data-popup-open:bg-accent/60",
      ],
      secondary: [
        "bg-secondary text-secondary-foreground border border-primary/5 hover:bg-secondary/80",
        "data-popup-open:bg-secondary/80",
      ],
      unstyled: "bg-transparent hover:bg-transparent",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

type ButtonStylesProps = VariantProps<typeof buttonStyles>;

const Button = ({
  className,
  variant,
  size,
  isLoading,
  disabled,
  focusableWhenDisabled,
  ...props
}: Omit<BaseButton.Props, "className"> &
  ButtonStylesProps & {
    isLoading?: boolean;
    className?: string;
  }) => {
  return (
    <BaseButton
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || isLoading}
      focusableWhenDisabled={focusableWhenDisabled || isLoading}
      {...props}
    />
  );
};

export { Button, buttonStyles, type ButtonStylesProps };
