"use client";

import { Field as BaseField } from "@base-ui/react/field";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { inputVariants } from "@/registry/ui/input";

function Field({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      data-slot="field"
      className={cn(
        "group relative flex flex-col gap-3",
        "has-[[data-slot=checkbox]]:flex-row has-[[data-slot=checkbox]]:gap-2",
        className,
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
        "inline-flex items-center gap-2 text-sm leading-none font-medium select-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "group-has-required:after:content-['*'] group-has-required:after:text-destructive group-has-required:after:-ml-0.5 group-has-required:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

function FieldControl({
  className,
  inputSize = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseField.Control> & {
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
  variant?: VariantProps<typeof inputVariants>["variant"];
}) {
  return (
    <BaseField.Control
      data-slot="field-control"
      className={cn(inputVariants({ inputSize, variant }), className)}
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
      className={cn("text-sm text-muted-foreground", className)}
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
      className={cn("flex items-center gap-2", className)}
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
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
}

const FieldValidity = BaseField.Validity;

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldItem,
  FieldError,
  FieldValidity,
};
