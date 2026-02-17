# Composition

A guide to composing Base UI components with your own React components.

## Composing custom React components

Use the `render` prop to compose a Base UI part with your own React components.

For example, most triggers render a `<button>` by default. To use a custom button instead:

```tsx
<Menu.Trigger render={<MyButton size="md" />}>
  Open menu
</Menu.Trigger>
```

The custom component must forward the `ref`, and spread all the received props on its underlying DOM node.

## Composing multiple components

In situations where you need to compose multiple Base UI components with custom React components, `render` props can be nested as deeply as necessary. Working with Tooltip is a common example.

```tsx
<Dialog.Root>
  <Tooltip.Root>
    <Tooltip.Trigger
      render={
        <Dialog.Trigger
          render={
            <Menu.Trigger render={<MyButton size="md" />}>
              Open menu
            </Menu.Trigger>
          }
        />
      }
    />
    <Tooltip.Portal>...</Tooltip.Portal>
  </Tooltip.Root>
  <Dialog.Portal>...</Dialog.Portal>
</Dialog.Root>
```

## Changing the default rendered element

Use the `render` prop to override the rendered element of the component.

For example, `<Menu.Item>` renders a `<div>` by default. To render it as an `<a>` element:

```tsx
import { Menu } from "@base-ui/react/menu";

export default () => (
  <Menu.Root>
    <Menu.Trigger>Song</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item render={<a href="base-ui.com" />}>
            Add to Library
          </Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
);
```

Each Base UI component renders the most appropriate element by default, and rendering a different element is recommended only on a case-by-case basis.

## Render function

For performance-sensitive applications, pass a function to the `render` prop instead of a React element:

```tsx
<Switch.Thumb
  render={(props, state) =>
    <span {...props}>
      {state.checked ? <CheckedIcon /> : <UncheckedIcon />}
    </span>
  }
/>
```

Using a function gives you complete control over spreading props and allows you to render different content based on the component's state.
