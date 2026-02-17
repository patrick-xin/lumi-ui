# TypeScript

A guide to using TypeScript with Base UI.

## Namespaces

Base UI uses namespaces to organize types. Every component has two core interfaces:

- `Props` (such as `Tooltip.Root.Props`)
- `State` (such as `Tooltip.Root.State`)

### Props

When creating wrapping components, use the `Props` type to accept all underlying Base UI props:

```tsx
import { Tooltip } from "@base-ui/react/tooltip";

function MyTooltip(props: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />;
}
```

### State

The `State` type is the internal state of the component. For example, `Positioner` components have state describing position relative to their anchor:

```tsx
function renderPositioner(
  props: Popover.Positioner.Props,
  state: Popover.Positioner.State
) {
  return (
    <div {...props}>
      <ul>
        <li>The popover is {state.open ? "open" : "closed"}</li>
        <li>I am on the {state.side} side of the anchor</li>
        <li>I am aligned at the {state.align} of the side</li>
        <li>The anchor is {state.anchorHidden ? "hidden" : "visible"}</li>
      </ul>
      {props.children}
    </div>
  );
}

<Popover.Positioner render={renderPositioner} />;
```

### Events

Types relating to custom Base UI events are exported on component parts' namespaces:

- `ChangeEventDetails` (e.g., `Combobox.Root.ChangeEventDetails`) — object passed to change handlers like `onValueChange` and `onOpenChange`.
- `ChangeEventReason` (e.g., `Combobox.Root.ChangeEventReason`) — union of possible reason strings for a change event.

```tsx
function onValueChange(
  value: string,
  eventDetails: Combobox.Root.ChangeEventDetails
) {
  console.log(value, eventDetails);
}

function onOpenChange(
  open: boolean,
  eventDetails: Combobox.Root.ChangeEventDetails
) {
  console.log(open, eventDetails);
}
```

### Other accessible types

- `actionsRef` — imperative methods. E.g., `Menu.Root.Actions` for the `actionsRef` object prop on `<Menu.Root>`.
- `Toast.Root.ToastObject` — the complex toast object interface.
- `useRender.ComponentProps` — extended `React.ComponentProps` with `render` prop.
