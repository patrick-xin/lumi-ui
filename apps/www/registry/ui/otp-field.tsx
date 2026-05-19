"use client";

import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus } from "lucide-react";
import { cn } from "@/registry/lib/utils";

const otpFieldInputVariants = cva(
  [
    "box-border rounded-md border border-input bg-transparent text-center font-medium tabular-nums",
    "appearance-none outline-0 transition-[color,box-shadow,border,ring,outline] duration-150",
    "dark:bg-input/30",
    "placeholder:text-muted-foreground",
    "focus-visible:z-10 input-ring-visible focus-visible:border-ring",
    "disabled:cursor-default disabled:opacity-50",
    "data-disabled:cursor-default data-disabled:opacity-50",
    "aria-invalid:outline aria-invalid:outline-destructive/80 aria-invalid:ring-4 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:outline-destructive aria-invalid:focus-visible:ring-destructive/20",
    "data-invalid:outline data-invalid:outline-destructive/80 data-invalid:ring-4 data-invalid:ring-destructive/20 data-invalid:border-destructive",
    "data-invalid:focus-visible:border-destructive data-invalid:focus-visible:outline-destructive data-invalid:focus-visible:ring-destructive/20",
  ],
  {
    defaultVariants: {
      inputSize: "default",
    },
    variants: {
      inputSize: {
        default: "h-9 w-9 text-sm",
        sm: "h-8 w-8 text-sm",
        lg: "h-11 w-10 text-base",
      },
    },
  },
);

function OTPFieldRoot({ className, ...props }: BaseOTPField.Root.Props) {
  return (
    <BaseOTPField.Root
      className={cn(
        "flex items-center gap-2 data-disabled:opacity-50",
        className,
      )}
      data-slot="otp-field"
      {...props}
    />
  );
}

function OTPFieldInput({
  className,
  inputSize,
  ...props
}: BaseOTPField.Input.Props & VariantProps<typeof otpFieldInputVariants>) {
  return (
    <BaseOTPField.Input
      className={cn(otpFieldInputVariants({ inputSize }), className)}
      data-slot="otp-field-input"
      {...props}
    />
  );
}

function OTPFieldSeparator({
  className,
  children,
  ...props
}: BaseOTPField.Separator.Props) {
  return (
    <BaseOTPField.Separator
      className={cn(
        "flex w-4 items-center justify-center text-muted-foreground",
        className,
      )}
      data-slot="otp-field-separator"
      {...props}
    >
      {children ?? <Minus />}
    </BaseOTPField.Separator>
  );
}

type OTPFieldProps = BaseOTPField.Root.Props &
  VariantProps<typeof otpFieldInputVariants> & {
    inputClassName?: string;
  };

function OTPField({
  className,
  inputClassName,
  inputSize,
  length,
  ...props
}: OTPFieldProps) {
  return (
    <OTPFieldRoot className={className} length={length} {...props}>
      {Array.from({ length }, (_, index) => (
        <OTPFieldInput
          aria-label={`Character ${index + 1} of ${length}`}
          className={inputClassName}
          inputSize={inputSize}
          key={index}
        />
      ))}
    </OTPFieldRoot>
  );
}

export {
  OTPFieldRoot,
  OTPFieldInput,
  OTPFieldSeparator,
  otpFieldInputVariants,
  // Composite component
  OTPField,
};
