# Forms: Base UI (Native Constraints)

Built on Base UI Form and Field, leveraging the native Constraint Validation API. You can often build robust forms without needing React Hook Form or Zod, though they are fully supported.

## Anatomy

```tsx
<Form>
  <Field>
    <FieldLabel />
    <FieldControl />
    <FieldDescription />
    <FieldError />
  </Field>
  <Button type="submit" />
</Form>
```

## Basic Usage

```tsx
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";

export const BasicForm = () => {
  return (
    <Form onFormSubmit={(value) => console.log(value)}>
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <FieldControl minLength={3} required />
        <FieldDescription>Public display name.</FieldDescription>
        <FieldError />
      </Field>
      <Button>Submit</Button>
    </Form>
  );
```

## Supported Components

Pass the `name` prop to `<Field>` to include the wrapped control's value when a parent form is submitted. Supported controls:

- Input
- Select
- Autocomplete
- Combobox
- Radio Group
- Checkbox Group
- Checkbox
- Slider
- Switch
- Number Field

## Server Actions With Zod

Server actions with Zod validation are supported for both uncontrolled and controlled modes.

## Integration with React Hook Form

See `forms/rhf.md` for the full React Hook Form integration guide.
