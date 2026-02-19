# Customization

A guide to customizing the behavior of Base UI components.

## Base UI events

Change events such as `onOpenChange`, `onValueChange`, and `onPressedChange` are custom to Base UI. They can be emitted by various different DOM events, effects, or even during rendering.

```js
onOpenChange: (open, eventDetails) => void
onValueChange: (value, eventDetails) => void
onPressedChange: (pressed, eventDetails) => void
```

The `eventDetails` property is passed as a second argument to Base UI event handlers:

```tsx
interface BaseUIChangeEventDetails {
  reason: string;
  event: Event;
  cancel: () => void;
  allowPropagation: () => void;
  isCanceled: boolean;
  isPropagationAllowed: boolean;
}
```

- `reason` — why the change event occurred. Most IDEs show possible values after typing `reason === '`.
- `event` — the native DOM event that caused the change.
- `cancel` — stops the component from changing its internal state.
- `allowPropagation` — allows the DOM event to propagate in cases where Base UI stops it.
- `isCanceled` — whether the change event has been canceled.
- `isPropagationAllowed` — whether the DOM event is allowed to propagate.

### Canceling a Base UI event

```tsx
<Tooltip.Root
  onOpenChange={(open, eventDetails) => {
    if (eventDetails.reason === "trigger-press") {
      eventDetails.cancel();
    }
  }}
>
  ...
</Tooltip.Root>
```

This lets you leave the component uncontrolled as its internal state is prevented from updating.

### Allowing propagation of the DOM event

In most components, pressing Esc stops propagation so parent popups don't close simultaneously. Customize with `allowPropagation()`:

```tsx
<Tooltip.Root
  onOpenChange={(open, eventDetails) => {
    if (eventDetails.reason === "escape-key") {
      eventDetails.allowPropagation();
    }
  }}
>
  ...
</Tooltip.Root>
```

## Preventing Base UI from handling a React event

Use `preventBaseUIHandler()` on the event object:

```tsx
<NumberField.Input
  onPaste={(event) => {
    event.preventBaseUIHandler();
  }}
/>
```

Use as an escape hatch when there isn't a prop to customize the behavior. In various cases, native events are used instead of React events, so this method has no effect.

## Controlling components with state

Components are uncontrolled by default (manage their own state internally).

```tsx
// Uncontrolled
<Dialog.Root>
  <Dialog.Trigger /> {/* Opens the dialog when clicked. */}
</Dialog.Root>
```

A component can be made controlled by passing external state to a prop (`open`, `value`) and the state's setter to its change handler (`onOpenChange`, `onValueChange`):

```tsx
// Controlled
const [open, setOpen] = React.useState(false);

React.useEffect(() => {
  const timeout = setTimeout(() => {
    setOpen(true);
  }, 1000);
  return () => clearTimeout(timeout);
}, []);

return (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    No trigger is needed in this case.
  </Dialog.Root>
);
```

This also allows you to read the state of the component outside of the root component.
