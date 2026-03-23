import { Input as BaseInput } from "@base-ui/react/input";
import { cx, tv, type VariantProps } from "tailwind-variants";

const inputVariant = {
  default: cx("bg-input/30"),
  transparent: cx("bg-transparent"),
  ghost: cx("bg-transparent shadow-none rounded-none outline-none"),
};

const baseStyles = cx([
  "rounded-md outline outline-border shadow-sm transition-[color,box-shadow,ring,outline] duration-150",
  "w-full min-w-0 cursor-text text-base md:text-sm",
  "data-disabled:cursor-default aria-disabled:cursor-default",
]);

const focusVisibleRing = cx(
  "focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10",
);

const focusWithinRing = cx(
  "focus-within:outline focus-within:outline-ring focus-within:ring-4 focus-within:ring-ring/10",
);

const inputStyles = tv({
  base: [
    baseStyles,
    "appearance-none",
    "placeholder:text-muted-foreground placeholder:text-sm",
    "selection:bg-primary selection:text-primary-foreground",
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20",
    "data-invalid:outline data-invalid:outline-destructive/80 data-invalid:ring-4 data-invalid:ring-destructive/20",
  ],
  variants: {
    variant: {
      default: cx(inputVariant.default, focusVisibleRing),
      transparent: cx(inputVariant.transparent, focusVisibleRing),
      ghost: inputVariant.ghost,
    },
    inputSize: {
      default: "h-9 py-1.5 px-2.5",
      lg: "h-10 py-2 px-3",
      sm: "h-8 py-1 px-2.5",
    },
    file: {
      true: "file:text-foreground file:inline-flex file:items-center file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
    },
    disabled: {
      true: [
        "disabled:cursor-default disabled:opacity-50",
        "data-disabled:cursor-default data-disabled:opacity-50",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

const inputContainerStyles = tv({
  base: [baseStyles, "flex items-center"],
  variants: {
    variant: {
      default: cx(inputVariant.default, focusWithinRing),
      transparent: cx(inputVariant.transparent, focusWithinRing),
      ghost: inputVariant.ghost,
    },
    inputSize: {
      default: "min-h-9 px-2",
      lg: "min-h-10 px-3",
      sm: "min-h-8 px-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

type InputStylesProps = VariantProps<typeof inputStyles>;
type InputContainerStylesProps = VariantProps<typeof inputContainerStyles>;

function Input({
  variant,
  inputSize,
  className,
  ...props
}: Omit<BaseInput.Props, "className"> &
  InputStylesProps & { className?: string }) {
  return (
    <BaseInput
      className={inputStyles({ variant, inputSize, className })}
      {...props}
    />
  );
}

export {
  Input,
  inputContainerStyles,
  inputStyles,
  inputVariant,
  type InputContainerStylesProps,
  type InputStylesProps,
};
