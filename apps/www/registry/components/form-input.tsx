"use client";

import type * as React from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Textarea } from "@/registry/ui/textarea";

type FormInputProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof FieldControl>,
  "name" | "defaultValue"
> & {
  name: Path<T>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  rules?: RegisterOptions<T, Path<T>>;
  className?: string;
  controlClassName?: string;
  multiline?: boolean;
  isRequired?: boolean;
};

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  rules,
  variant,
  className,
  controlClassName,
  isRequired = false,
  multiline = false,

  ...props
}: FormInputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { ref, value, onChange, onBlur, disabled },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <Field
          className={className}
          dirty={isDirty}
          invalid={invalid}
          name={name}
          touched={isTouched}
        >
          {label && (
            <FieldLabel aria-required={!!rules?.required || isRequired}>
              {label}
            </FieldLabel>
          )}
          <FieldControl
            className={controlClassName}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            render={
              multiline ? <Textarea className="min-h-16 py-2" /> : undefined
            }
            value={value || ""}
            variant={variant}
            {...props}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError match={!!error}>{error?.message}</FieldError>
        </Field>
      )}
      rules={rules}
    />
  );
};

export { FormInput };
