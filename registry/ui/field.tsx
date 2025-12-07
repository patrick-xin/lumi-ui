"use client";

import * as React from "react";
import { Field as BaseField } from "@base-ui-components/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Separator } from "@/registry/ui/separator";

const fieldVariants = cva(
  "group/field grid w-full gap-2", 
  {
    variants: {
      orientation: {
        vertical: "grid-cols-1",
        horizontal: [
          "grid-cols-[max-content_1fr] items-start gap-x-4 gap-y-1",
        ],
        responsive: [
          "grid-cols-1",
          "@md/field-group:grid-cols-[max-content_1fr] @md/field-group:items-start @md/field-group:gap-x-4 @md/field-group:gap-y-1",
          "@md/field-group:[&>[data-slot=field-label]]:mt-2",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

interface FieldProps
  extends React.ComponentProps<typeof BaseField.Root>,
    VariantProps<typeof fieldVariants> {}

function Field({ className, orientation, ...props }: FieldProps) {
  return (
    <BaseField.Root
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Item>) {
  return (
    <BaseField.Item
      data-slot="field-item"
      className={cn(
        "flex items-center gap-2", 
        "space-y-0",
        "data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "group-data-[slot=field-item]/field:font-normal", 
        "group-data-[orientation=horizontal]/field:justify-self-start",
        className
      )}
      {...props}
    />
  );
}

export const controlStyles = cn(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive"
);

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Control>) {
  return (
    <BaseField.Control
      data-slot="field-control"
      className={cn(controlStyles, className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "flex flex-col gap-2",
        "group-data-[orientation=horizontal]/field:col-start-2",
        className
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn(
        "text-[0.8rem] font-medium text-destructive",
        "group-data-[orientation=horizontal]/field:col-start-2",
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn(
        "text-[0.8rem] text-muted-foreground",
        "group-data-[orientation=horizontal]/field:col-start-2",
        className
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

const fieldGroupVariants = cva(
  "@container/field-group flex w-full flex-col",
  {
    variants: {
      spacing: {
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
);

type FieldGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldGroupVariants>;

function FieldGroup({ className, spacing, ...props }: FieldGroupProps) {
  return (
    <div
      role="group"
      data-slot="field-group"
      className={cn(fieldGroupVariants({ spacing }), className)}
      {...props}
    />
  );
}

export {
  Field,
  FieldItem,
  FieldLabel,
  FieldControl,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldSeparator,
  FieldGroup,
};