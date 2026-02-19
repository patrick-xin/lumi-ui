# Forms: React Hook Form + Zod

React Hook Form (RHF) provides performant, flexible form handling with minimal re-renders. Combined with Zod for schema validation, you get type-safe forms with excellent developer experience.

## Installation

```bash
npm install react-hook-form zod @hookform/resolvers
```

## Anatomy

```tsx
<FormProvider {...methods}>
  <Form onSubmit={methods.handleSubmit(onSubmit)}>
    {/* Option 1: Pre-built FormInput component */}
    <FormInput name="fieldName" label="Label" />

    {/* Option 2: Custom Controller wrapper */}
    <Controller
      control={methods.control}
      name="fieldName"
      render={({ field, fieldState }) => (
        <Field invalid={fieldState.invalid}>
          <FieldLabel>Label</FieldLabel>
          <CustomComponent {...field} />
          <FieldError match={!!fieldState.error}>
            {fieldState.error?.message}
          </FieldError>
        </Field>
      )}
    />
  </Form>
</FormProvider>
```

## Basic Usage

### 1. Define Schema

```tsx
import { z } from "zod";

export const formSchema = z.object({
  projectName: z
    .string()
    .min(5, "Project name must be at least 5 characters")
    .max(100, "Project name must be at most 100 characters"),
  email: z.email("Invalid email address"),
  priority: z.enum(["low", "medium", "high"]),
  budget: z.number().min(0).optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
```

### 2. Initialize Form

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { formSchema, type FormValues } from "./schema";

export function MyForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      projectName: "",
      email: "",
      priority: "medium",
      budget: undefined,
      services: [],
      acceptTerms: false,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Form fields go here */}
      </Form>
    </FormProvider>
  );
}
```

## FormInput Component

For simple inputs (text, email, password, textarea), use the pre-built `FormInput` component:

```tsx
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
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

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

export function FormInput<T extends FieldValues>({
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
}: FormInputProps<T>) {
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
}
```

### Using FormInput

```tsx
import { FormInput } from "@/components/form-input";

<FormInput<FormValues>
  name="projectName"
  label="Project Name"
  description="A short name for your project"
  placeholder="My Awesome Project"
  isRequired
/>

<FormInput<FormValues>
  name="email"
  label="Email Address"
  type="email"
  placeholder="you@example.com"
/>

<FormInput<FormValues>
  name="description"
  label="Description"
  multiline
  placeholder="Tell us about your project..."
/>
```

## Custom Controller Pattern

For complex components (Select, Autocomplete, Combobox, etc.), wrap them with Controller.

### Generic Pattern

```tsx
<Controller
  control={methods.control}
  name="fieldName"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field
      dirty={isDirty}
      invalid={invalid}
      name={name}
      touched={isTouched}
    >
      <FieldLabel>Label</FieldLabel>
      {/* Your component here */}
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Field State Props

| Prop | Type | Description |
|------|------|-------------|
| `dirty` | `boolean` | Field value has been modified |
| `invalid` | `boolean` | Field has validation errors |
| `touched` | `boolean` | Field has been focused and blurred |
| `name` | `string` | Field name for accessibility |

### Select

```tsx
<Controller
  control={methods.control}
  name="priority"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <FieldLabel aria-required>Priority</FieldLabel>
      <Select inputRef={ref} onValueChange={onChange} value={value}>
        <SelectTriggerGroup onBlur={onBlur} placeholder="Select priority" />
        <SelectContent>
          <SelectItemContent value="low">Low</SelectItemContent>
          <SelectItemContent value="medium">Medium</SelectItemContent>
          <SelectItemContent value="high">High</SelectItemContent>
        </SelectContent>
      </Select>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Autocomplete

```tsx
<Controller
  control={methods.control}
  name="framework"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <Autocomplete
        items={FRAMEWORKS}
        itemToStringValue={(item) => item.name}
        onValueChange={onChange}
        value={value}
      >
        <FieldLabel>Preferred Framework</FieldLabel>
        <AutocompleteInputGroup onBlur={onBlur} ref={ref} placeholder="e.g. Next.js" />
        <AutocompleteContent>
          <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item.id} value={item}>
                {item.name}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Number Field

```tsx
<Controller
  control={methods.control}
  name="budget"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <FieldLabel>Budget</FieldLabel>
      <NumberField inputRef={ref} min={1} max={100} onBlur={onBlur} onValueChange={onChange} value={value} />
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Slider (Range)

```tsx
<Controller
  control={methods.control}
  name="budgetRange"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <Fieldset>
        <FieldsetLegend>Budget Range</FieldsetLegend>
        <Slider inputRef={ref} min={1} max={100} step={1} onBlur={onBlur} onValueChange={onChange} value={value}>
          <SliderValue>{(_, values) => `$${values[0]}k - $${values[1]}k`}</SliderValue>
        </Slider>
      </Fieldset>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Radio Group

```tsx
<Controller
  control={methods.control}
  name="priority"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <Fieldset render={<RadioGroup inputRef={ref} onValueChange={onChange} value={value} />}>
        <FieldsetLegend>Priority</FieldsetLegend>
        <div className="flex gap-3">
          <FieldItem>
            <FieldLabel><Radio onBlur={onBlur} value="low" /> Low</FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel><Radio onBlur={onBlur} value="medium" /> Medium</FieldLabel>
          </FieldItem>
        </div>
      </Fieldset>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Checkbox

```tsx
<Controller
  control={methods.control}
  name="acceptTerms"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <FieldLabel>
        <Checkbox checked={value} inputRef={ref} onBlur={onBlur} onCheckedChange={onChange} />
      </FieldLabel>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Checkbox Group

```tsx
<Controller
  control={methods.control}
  name="services"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <Fieldset render={<CheckboxGroup onValueChange={onChange} value={value} />}>
        <FieldsetLegend>Services</FieldsetLegend>
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <FieldItem key={s.id}>
              <FieldLabel><Checkbox onBlur={onBlur} value={s.id} /> {s.label}</FieldLabel>
            </FieldItem>
          ))}
        </div>
      </Fieldset>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

### Switch

```tsx
<Controller
  control={methods.control}
  name="notifications"
  render={({
    field: { ref, name, value, onBlur, onChange },
    fieldState: { invalid, isTouched, isDirty, error },
  }) => (
    <Field dirty={isDirty} invalid={invalid} name={name} touched={isTouched}>
      <FieldLabel className="flex items-center justify-between rounded-lg border p-3">
        <span className="flex flex-col">
          <span className="font-medium">Enable Notifications</span>
          <span className="text-sm text-muted-foreground">Receive email updates</span>
        </span>
        <Switch checked={value} inputRef={ref} onBlur={onBlur} onCheckedChange={onChange} />
      </FieldLabel>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )}
/>
```

## FieldError Match Prop

```tsx
// Show error only when there's an error object
<FieldError match={!!error}>{error?.message}</FieldError>

// Show error for specific validation types
<FieldError match="valueMissing">This field is required</FieldError>
<FieldError match="typeMismatch">Invalid format</FieldError>
<FieldError match="tooShort">Value is too short</FieldError>
```

## Validation Modes

```tsx
const methods = useForm<FormValues>({
  mode: "onChange",     // Validate on every change
  // mode: "onBlur",    // Validate on blur
  // mode: "onSubmit",  // Validate on submit only (default)
  // mode: "all",       // Validate on change, blur, and submit
  // mode: "onTouched", // Validate on touched
  resolver: zodResolver(schema),
});
```

## Accessing Form State

```tsx
const {
  formState: { errors, isDirty, isValid, isSubmitting },
  watch,
  setValue,
  reset,
  trigger,  // Manually trigger validation
} = methods;

const projectName = watch("projectName");
setValue("priority", "high");
reset();
```

## Tips

1. Always pass `inputRef` to custom components for proper focus management
2. Use `onBlur` from field to trigger blur validation
3. Use `aria-required` on `FieldLabel` when field is required
4. Use `FormProvider` to access form methods in child components via `useFormContext`
5. `FieldItem` is useful for Checkbox/Radio layouts to properly align labels
6. `Fieldset` groups related fields like RadioGroup or CheckboxGroup with a legend
