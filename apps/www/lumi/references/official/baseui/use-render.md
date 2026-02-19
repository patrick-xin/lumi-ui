# useRender

Hook for enabling a `render` prop in custom components. Lets you build custom components that allow consumers to override the default rendered element.

## Basic example

A `render` prop for a custom Text component lets consumers replace the default `p` element:

```tsx
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

interface TextProps extends useRender.ComponentProps<"p"> {}

function Text(props: TextProps) {
  const { render, ...otherProps } = props;

  const element = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">({ className: "text-sm text-gray-900" }, otherProps),
  });

  return element;
}

// Usage:
<Text>Rendered as a paragraph</Text>
<Text render={<strong />}>Rendered as a strong tag</Text>
```

## Render function for state-based rendering

The callback version passes internal `state`:

```tsx
interface CounterState { odd: boolean }
interface CounterProps extends useRender.ComponentProps<"button", CounterState> {}

function Counter(props: CounterProps) {
  const { render, ...otherProps } = props;
  const [count, setCount] = React.useState(0);
  const state = React.useMemo(() => ({ odd: count % 2 === 1 }), [count]);

  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    children: <>Counter: <span>{count}</span></>,
    onClick() { setCount((prev) => prev + 1) },
  };

  return useRender({
    defaultTagName: "button",
    render,
    state,
    props: mergeProps<"button">(defaultProps, otherProps),
  });
}

// Usage:
<Counter
  render={(props, state) => (
    <button {...props}>
      {props.children} {state.odd ? "odd" : "even"}
    </button>
  )}
/>
```

## Merging props

Use `mergeProps` to safely merge props inside the callback version of `render`:

```tsx
import { mergeProps } from "@base-ui/react/merge-props";

<Component
  render={(props, state) => (
    <button
      {...mergeProps<"button">(props, {
        className: "my-custom-class",
      })}
    />
  )}
/>
```

## Merging refs

When building custom components, use the `ref` option in `useRender` to merge internal and external refs:

### React 19

```tsx
function Text({ render, ...props }: TextProps) {
  const internalRef = React.useRef<HTMLElement | null>(null);

  return useRender({
    defaultTagName: "p",
    ref: internalRef,
    props,
    render,
  });
}
```

### React 18 and 17

Use `React.forwardRef()` and pass both refs:

```tsx
const Text = React.forwardRef(function Text(
  { render, ...props }: TextProps,
  forwardedRef: React.ForwardedRef<HTMLElement>
) {
  const internalRef = React.useRef<HTMLElement | null>(null);

  return useRender({
    defaultTagName: "p",
    ref: [forwardedRef, internalRef],
    props,
    render,
  });
});
```

## TypeScript

Two interfaces for typing props:

- `useRender.ComponentProps` — external (public) props. Types the `render` prop and HTML attributes.
- `useRender.ElementProps` — internal (private) props. Types HTML attributes alone.

```tsx
interface ButtonProps extends useRender.ComponentProps<"button"> {}

function Button({ render, ...props }: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    children: "Click me",
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  });
}
```

## Migrating from Radix UI

Radix UI uses `asChild` prop; Base UI uses `render` prop.

```jsx
// Radix UI (asChild)
<Button asChild>
  <a href="/contact">Contact</a>
</Button>

// Base UI (render)
<Button render={<a href="/contact" />}>Contact</Button>
```

## API reference

### Input parameters

| Prop | Type | Description |
| :--- | :--- | :--- |
| defaultTagName | `keyof React.JSX.IntrinsicElements` | Default tag name when `render` is not provided. |
| render | `RenderProp<State>` | React element or function to override the default element. |
| props | `Record<string, unknown>` | Props spread on the rendered element, merged with internal props. |
| ref | `React.Ref \| React.Ref[]` | Refs to apply to the rendered element. |
| state | `State` | Component state passed to the render callback. |
| stateAttributesMapping | `StateAttributesMapping<State>` | Custom mapping for state to data-* attributes. |

### Return value

| Property | Type | Description |
| :--- | :--- | :--- |
| element | `React.ReactElement` | The rendered React element. |
