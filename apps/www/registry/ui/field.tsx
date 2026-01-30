"use client";

import { Field as BaseField } from "@base-ui/react/field";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { inputVariants } from "@/registry/ui/input";
import { cn } from "@/registry/lib/utils";

function Field({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={cn(
        "group relative flex flex-col gap-3",
        "has-[[data-slot=checkbox]]:flex-row has-[[data-slot=checkbox]]:gap-2",
        className,
      )}
      data-slot="field"
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
      className={cn(
        "inline-flex items-center gap-2 text-sm leading-none font-medium select-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        "group-has-required:after:content-['*'] group-has-required:after:text-destructive group-has-required:after:-ml-0.5 group-has-required:pointer-events-none",
        className,
      )}
      data-slot="field-label"
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
      className={cn(inputVariants({ inputSize, variant }), className)}
      data-slot="field-control"
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
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="field-description"
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
      className={cn("flex items-center gap-2", className)}
      data-slot="field-item"
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
      className={cn("text-sm text-destructive text-balance", className)}
      data-slot="field-error"
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
