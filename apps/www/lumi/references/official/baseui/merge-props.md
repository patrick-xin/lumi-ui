# mergeProps

A utility to merge multiple sets of React props, handling event handlers, className, and style props intelligently.

`mergeProps` helps you combine multiple prop objects (e.g., internal props + user props) into a single set of props you can spread onto an element. It behaves like `Object.assign` (rightmost wins) with a few special cases.

## How merging works

- For most keys (everything except `className`, `style`, and event handlers), the rightmost value wins:
  ```ts
  mergeProps({ id: "a", dir: "ltr" }, { id: "b" });
  // returns { id: 'b', dir: 'ltr' }
  ```
- `ref` is **not merged**. Only the rightmost ref is kept.
- `className` values are concatenated right-to-left (rightmost first):
  ```ts
  mergeProps({ className: "a" }, { className: "b" });
  // className is 'b a'
  ```
- `style` objects are merged, with rightmost keys overwriting earlier ones.
- Event handlers are merged and executed right-to-left (rightmost first):
  ```ts
  mergeProps({ onClick: a }, { onClick: b });
  // b runs before a
  ```
  - For React synthetic events, `event.preventBaseUIHandler()` prevents Base UI's internal logic from running (does not call `preventDefault()` or `stopPropagation()`).
  - For non-synthetic events (custom events with primitive/object values), all handlers always execute.

### Usage with render prop

When using the function form of the `render` prop, props are not merged automatically. Use `mergeProps` to combine Base UI's props with your own:

```tsx
<Toggle
  pressed={pressed}
  onPressedChange={setPressed}
  render={(props, state) => (
    <button type="button" {...mergeProps(props, { onClick: myHandler })}>
      {state.pressed ? "On" : "Off"}
    </button>
  )}
/>
```

## Passing a function instead of an object

Each argument can be a props object or a function that receives the merged props up to that point and returns a props object. The function's return value completely replaces the accumulated props.

```tsx
const merged = mergeProps(
  {
    onClick(event) {
      // Handler from previous props
    },
  },
  (props) => ({
    onClick(event) {
      props.onClick?.(event); // Manually call previous handler
      // Your logic here
    },
  })
);
```

## API reference

### mergeProps

Accepts up to 5 arguments, each being either a props object or a function that returns a props object. For more than 5 sets, use `mergePropsN` instead.

Merging rules:
- Rightmost object's fields overwrite conflicting ones
- Event handlers merged and called right-to-left
- `className` concatenated right-to-left
- `style` merged with rightmost overwriting
- `ref` is **not merged** (rightmost only)

**Parameters:**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| a | `InputProps<ElementType>` | Props object to merge. |
| b | `InputProps<ElementType>` | Props object to merge. Overwrites conflicting props from `a`. |
| c? | `InputProps<ElementType>` | Optional. Overwrites previous. |
| d? | `InputProps<ElementType>` | Optional. Overwrites previous. |
| e? | `InputProps<ElementType>` | Optional. Overwrites previous. |

**Returns:** `{}` — The merged props.

### mergePropsN

Accepts an array of props objects or functions. Slightly less efficient than `mergeProps` — only use when merging more than 5 sets.

**Parameters:**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| props | `InputProps<ElementType>[]` | Array of props to merge. |

**Returns:** `{}` — The merged props.
