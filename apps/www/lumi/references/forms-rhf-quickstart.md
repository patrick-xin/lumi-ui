# RHF + Zod Quickstart

Use this file before loading `official/forms/rhf.md`.
Open the full file only when you need component-specific patterns beyond this baseline.

## Preconditions

- Ensure `react-hook-form`, `zod`, and `@hookform/resolvers` are installed.
- Ensure form components come from `@/components/ui/*`.
- Keep schema and form type linked with `z.infer`.

## Minimal Wiring Pattern

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export function ExampleForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(console.log)}>
        <Controller
          control={methods.control}
          name="email"
          render={({ field: { ref, ...field }, fieldState }) => (
            <Field
              name={field.name}
              dirty={fieldState.isDirty}
              touched={fieldState.isTouched}
              invalid={fieldState.invalid}
            >
              <FieldLabel>Email</FieldLabel>
              <FieldControl type="email" inputRef={ref} {...field} />
              <FieldError match={!!fieldState.error}>
                {fieldState.error?.message}
              </FieldError>
            </Field>
          )}
        />
      </Form>
    </FormProvider>
  );
}
```

## Controller Contract

- Always pass `name`, `dirty`, `touched`, and `invalid` to `Field`.
- Keep `FieldError` wired to `fieldState.error`.
- Pass `onBlur` through when a component supports blur-based validation.
- Pass `inputRef` or equivalent ref prop for focus behavior.

## Control Event Mapping

- `Select`: map RHF `onChange` to `onValueChange`.
- `Autocomplete` / `Combobox`: map RHF `onChange` to value change callbacks.
- `Checkbox` / `Switch`: map RHF `onChange` to checked change callbacks.
- `RadioGroup` / `CheckboxGroup`: set value at group root and map group-level change callbacks.
- `NumberField` / `Slider`: map RHF `onChange` to numeric/range value callbacks.

## Escalate to Full Reference When Needed

- Need complete examples for Select/Autocomplete/Slider/Radio/Checkbox/Switch:
  open `official/forms/rhf.md`.
- Need native-constraint mode (without RHF):
  open `official/forms/basic.md`.
