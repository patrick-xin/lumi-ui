---
title: Slider
subtitle: An easily stylable range input.
description: A high-quality, unstyled React slider component that works like a range input and is easy to style.
---

# Slider

A high-quality, unstyled React slider component that works like a range input and is easy to style.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { Slider } from '@base-ui/react/slider';

export default function ExampleSlider() {
  return (
    <Slider.Root defaultValue={25}>
      <Slider.Control className="flex w-56 touch-none items-center py-3 select-none">
        <Slider.Track className="h-1 w-full rounded-sm bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none">
          <Slider.Indicator className="rounded-sm bg-gray-700 select-none" />
          <Slider.Thumb
            aria-label="Volume"
            className="size-4 rounded-full bg-white outline-1 outline-gray-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue-800"
          />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
```

## Usage guidelines

- **Form controls must have an accessible name**: Prefer `<Slider.Label>`, or provide an `aria-label` on each `<Slider.Thumb>` when no visible label is rendered. See [Labeling a slider](/react/components/slider.md) and the [forms guide](/react/handbook/forms.md).


## Examples

### Range slider

To create a range slider:

1. Pass an array of values and place a `<Slider.Thumb>` for each value in the array
2. Additionally for server-side rendering, specify a numeric `index` for each thumb that corresponds to the index of its value in the value array

Thumbs can be configured to behave differently when they collide during pointer interactions using the `thumbCollisionBehavior` prop on `<Slider.Root>`.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { Slider } from '@base-ui/react/slider';

export default function RangeSlider() {
  return (
    <Slider.Root defaultValue={[25, 45]}>
      <Slider.Control className="flex w-56 touch-none items-center py-3 select-none">
        <Slider.Track className="h-1 w-full rounded-sm bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none">
          <Slider.Indicator className="rounded-sm bg-gray-700 select-none" />
          <Slider.Thumb
            index={0}
            aria-label="Minimum value"
            className="size-4 rounded-full bg-white outline-1 outline-gray-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue-800"
          />
          <Slider.Thumb
            index={1}
            aria-label="Maximum value"
            className="size-4 rounded-full bg-white outline-1 outline-gray-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue-800"
          />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
```

### Thumb alignment

Set `thumbAlignment="edge"` to inset the thumb such that its edge aligns with the edge of the control when the value is at `min` or `max`, without overflowing the control like the default `"center"` alignment.

A client-only alternative `thumbAlignment="edge-client-only"` can be used to reduce bundle size but only renders after React hydration.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { Slider } from '@base-ui/react/slider';

export default function EdgeAlignedThumb() {
  return (
    <Slider.Root thumbAlignment="edge" defaultValue={25}>
      <Slider.Control className="flex w-56 touch-none items-center py-3 select-none">
        <Slider.Track className="h-1 w-full rounded-sm bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none">
          <Slider.Indicator className="rounded-sm bg-gray-700 select-none" />
          <Slider.Thumb className="size-4 rounded-full bg-white outline-1 outline-gray-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue-800" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
```

### Labeling a slider

A single-thumb slider without a visible label (such as a volume control) can be labeled using `aria-label` on `<Slider.Thumb>`:

```tsx title="Slider with invisible label" {5}
<Slider.Root>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb aria-label="Volume" />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

A visible label can be created using `<Slider.Label>`:

```tsx title="Slider with visible label" {2}
<Slider.Root>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

For a multi-thumb range slider with a visible label, add `aria-label` on each `<Slider.Thumb>` to distinguish them:

```tsx title="Labeling multi-thumb range sliders" {6-7}
<Slider.Root defaultValue={[25, 75]}>
  <Slider.Label>Price range</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb index={0} aria-label="Minimum price" />
      <Slider.Thumb index={1} aria-label="Maximum price" />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

### Form integration

To use a slider in a form, pass the slider `name` to `<Slider.Root>`:

```tsx title="Using Slider in a form" {2}
<Form>
  <Slider.Root name="volume">
    <Slider.Label>Volume</Slider.Label>
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
        <Slider.Thumb />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
</Form>
```

For grouped multi-thumb range sliders in forms, [Fieldset](/react/components/fieldset.md) can provide the shared visible label while each thumb keeps its own `aria-label`:

```tsx title="Using Fieldset with a multi-thumb slider" {2,3,7-8}
<Field.Root>
  <Fieldset.Root render={<Slider.Root />}>
    <Fieldset.Legend>Price range</Fieldset.Legend>
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
        <Slider.Thumb index={0} aria-label="Minimum price" />
        <Slider.Thumb index={1} aria-label="Maximum price" />
      </Slider.Track>
    </Slider.Control>
  </Fieldset.Root>
</Field.Root>
```

## API reference

### Root

Groups all parts of the slider.
Renders a `<div>` element.

**Root Props:**

| Prop          | Type                                                                                  | Default | Description                                                                                                                                                                                                                                                                                                        |
| :------------ | :------------------------------------------------------------------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | `string`                                                                              | -       | Identifies the field when a form is submitted.                                                                                                                                                                                                                                                                     |
| defaultValue  | `number \| number[]`                                                                  | -       | The uncontrolled value of the slider when it’s initially rendered.To render a controlled slider, use the `value` prop instead.                                                                                                                                                                                     |
| value         | `number \| number[]`                                                                  | -       | The value of the slider.&#xA;For ranged sliders, provide an array with two values.                                                                                                                                                                                                                                 |
| onValueChange | `((value: number \| number[], eventDetails: Slider.Root.ChangeEventDetails) => void)` | -       | Callback function that is fired when the slider's value changed.&#xA;You can pull out the new value by accessing `event.target.value` (any).The `eventDetails.reason` indicates what triggered the change:\* `'input-change'` when the hidden range input emits a change event (for example, via form integration) |

- `'track-press'` when the control track is pressed
- `'drag'` while dragging a thumb
- `'keyboard'` for keyboard input
- `'none'` when the change is triggered without a specific interaction |
  | onValueCommitted | `((value: number \| number[], eventDetails: Slider.Root.CommitEventDetails) => void)` | - | Callback function that is fired when the `pointerup` is triggered.&#xA;**Warning**: This is a generic event not a change event.The `eventDetails.reason` indicates what triggered the commit:\* `'drag'` while dragging a thumb
- `'track-press'` when the control track is pressed
- `'keyboard'` for keyboard input
- `'input-change'` when the hidden range input emits a change event (for example, via form integration)
- `'none'` when the commit occurs without a specific interaction |
  | locale | `Intl.LocalesArgument` | - | The locale used by `Intl.NumberFormat` when formatting the value.&#xA;Defaults to the user's runtime locale. |
  | thumbAlignment | `'center' \| 'edge' \| 'edge-client-only'` | `'center'` | How the thumb(s) are aligned relative to `Slider.Control` when the value is at `min` or `max`:\* `center`: The center of the thumb is aligned with the control edge
- `edge`: The thumb is inset within the control such that its edge is aligned with the control edge
- `edge-client-only`: Same as `edge` but renders after React hydration on the client, reducing bundle size in return |
  | thumbCollisionBehavior | `'push' \| 'swap' \| 'none'` | `'push'` | Controls how thumbs behave when they collide during pointer interactions.\* `'push'` (default): Thumbs push each other without restoring their previous positions when dragged back.
- `'swap'`: Thumbs swap places when dragged past each other.
- `'none'`: Thumbs cannot move past each other; excess movement is ignored. |
  | step | `number` | `1` | The granularity with which the slider can step through values. (A "discrete" slider.)&#xA;The `min` prop serves as the origin for the valid values.&#xA;We recommend (max - min) to be evenly divisible by the step. |
  | largeStep | `number` | `10` | The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down. |
  | minStepsBetweenValues | `number` | `0` | The minimum steps between values in a range slider. |
  | min | `number` | `0` | The minimum allowed value of the slider.&#xA;Should not be equal to max. |
  | max | `number` | `100` | The maximum allowed value of the slider.&#xA;Should not be equal to min. |
  | format | `Intl.NumberFormatOptions` | - | Options to format the input value. |
  | disabled | `boolean` | `false` | Whether the slider should ignore user interaction. |
  | orientation | `Orientation` | `'horizontal'` | The component orientation. |
  | className | `string \| ((state: Slider.Root.State) => string \| undefined)` | - | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state. |
  | style | `CSSProperties \| ((state: Slider.Root.State) => CSSProperties \| undefined)` | - | - |
  | render | `ReactElement \| ((props: HTMLProps, state: Slider.Root.State) => ReactElement)` | - | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Root Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |

### Label

An accessible label that is automatically associated with the slider thumbs.
Renders a `<div>` element.

**Label Props:**

| Prop      | Type                                                                             | Default | Description                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Slider.Root.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Slider.Root.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Slider.Root.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Value

Displays the current value of the slider as text.
Renders an `<output>` element.

**Value Props:**

| Prop      | Type                                                                              | Default | Description                                                                                                                                                                                  |
| :-------- | :-------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children  | `((formattedValues: string[], values: number[]) => ReactNode) \| null`            | -       | -                                                                                                                                                                                            |
| className | `string \| ((state: Slider.Value.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Slider.Value.State) => CSSProperties \| undefined)`    | -       | \*                                                                                                                                                                                           |
| render    | `ReactElement \| ((props: HTMLProps, state: Slider.Value.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Value Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |

### Control

The clickable, interactive part of the slider.
Renders a `<div>` element.

**Control Props:**

| Prop      | Type                                                                                | Default | Description                                                                                                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Slider.Control.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Slider.Control.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Slider.Control.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Control Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |

### Track

Contains the slider indicator and represents the entire range of the slider.
Renders a `<div>` element.

**Track Props:**

| Prop      | Type                                                                              | Default | Description                                                                                                                                                                                  |
| :-------- | :-------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Slider.Track.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Slider.Track.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Slider.Track.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Track Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |

### Indicator

Visualizes the current value of the slider.
Renders a `<div>` element.

**Indicator Props:**

| Prop      | Type                                                                                  | Default | Description                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Slider.Indicator.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Slider.Indicator.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Slider.Indicator.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Indicator Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |

### Thumb

The draggable part of the slider at the tip of the indicator.
Renders a `<div>` element and a nested `<input type="range">`.

**Thumb Props:**

| Prop             | Type                                                                              | Default | Description                                                                                                                                                                                                                                      |
| :--------------- | :-------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getAriaLabel     | `((index: number) => string) \| null`                                             | -       | A function which returns a string value for the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) attribute of the `input`.                                                        |
| getAriaValueText | `((formattedValue: string, value: number, index: number) => string) \| null`      | -       | A function which returns a string value for the [`aria-valuetext`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuetext) attribute of the `input`.&#xA;This is important for screen reader users. |
| index            | `number`                                                                          | -       | The index of the thumb which corresponds to the index of its value in the&#xA;`value` or `defaultValue` array.&#xA;This prop is required to support server-side rendering for range sliders&#xA;with multiple thumbs.                            |
| onBlur           | `FocusEventHandler<HTMLInputElement>`                                             | -       | A blur handler forwarded to the `input`.                                                                                                                                                                                                         |
| onFocus          | `FocusEventHandler<HTMLInputElement>`                                             | -       | A focus handler forwarded to the `input`.                                                                                                                                                                                                        |
| tabIndex         | `number`                                                                          | -       | Optional tab index attribute forwarded to the `input`.                                                                                                                                                                                           |
| disabled         | `boolean`                                                                         | `false` | Whether the thumb should ignore user interaction.                                                                                                                                                                                                |
| inputRef         | `Ref<HTMLInputElement>`                                                           | -       | A ref to access the nested input element.                                                                                                                                                                                                        |
| className        | `string \| ((state: Slider.Thumb.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                                                                         |
| style            | `CSSProperties \| ((state: Slider.Thumb.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                                                                                |
| render           | `ReactElement \| ((props: HTMLProps, state: Slider.Thumb.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render.                                                     |

**Thumb Data Attributes:**

| Attribute        | Type                         | Description                                                               |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------ |
| data-dragging    | -                            | Present while the user is dragging.                                       |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the slider.                                  |
| data-disabled    | -                            | Present when the slider is disabled.                                      |
| data-valid       | -                            | Present when the slider is in valid state (when wrapped in Field.Root).   |
| data-invalid     | -                            | Present when the slider is in invalid state (when wrapped in Field.Root). |
| data-dirty       | -                            | Present when the slider's value has changed (when wrapped in Field.Root). |
| data-touched     | -                            | Present when the slider has been touched (when wrapped in Field.Root).    |
| data-focused     | -                            | Present when the slider is focused (when wrapped in Field.Root).          |
| data-index       | -                            | Indicates the index of the thumb in range sliders.                        |
