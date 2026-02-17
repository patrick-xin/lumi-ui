# Hit-Test & Highlights

Lumi UI prioritizes usability by strictly separating an element's **interactive hit area** from its **visual highlight**. This ensures that controls remain forgiving and easy to interact with, even when the visual design calls for inset or floating styles.

## The Pseudo-Element Solution
Lumi UI keeps the interactive container full-width. We use CSS pseudo-elements (`::before`) to render the *visual* background.
*   **Interactive Zone:** The list item remains `width: 100%` with `0 margin`. The mouse detects the hover at the very edge of the container.
*   **Visual Zone:** The `::before` pseudo-element is absolutely positioned inside the item with insets (e.g., `inset-x-1`), creating the illusion of a floating selection without sacrificing usability.

Comparison of two methods:
- Pseudo-element: Uses absolute positioning for the background. The actual list item remains full-width, ensuring the user can click anywhere in the row (large hit area).
- Margin: Uses physical margins to indent the item. This creates "dead zones" on the far left and right edges where clicks will not register (constrained hit area).

## CSS Utility Definition

If installed via CLI, this is pre-configured. For manual installation, add to your CSS:

```css
@utility highlight-on-active {
  @apply data-[highlighted]:relative data-[highlighted]:z-0;

  @apply data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm;

  @apply data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground;
}
```

**Customization Note:** To customize these pseudo-element highlights (e.g., border-radius, inset), target the `::before` pseudo-element directly using Tailwind's `before:` modifier.

## Opting Out

You may prefer the traditional approach where the background is applied directly to the element.

**Note:** If you remove `highlight-on-active` and want to maintain the "inset" look, you need to manually add spacing (like `mx-1`) to the component. Be aware that this **reduces the hit area** by the amount of margin you add.

```tsx
<BaseSelect.Item
  data-slot="select-item"
  className={cn(
    "...",
    // 1. Remove the utility
    // "highlight-on-active",
    // 2. Adjust spacing/radius
    "mx-1 rounded-sm",
    // 3. Apply active styles
    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    className,
  )}
  {...props}
>
```

Alternatively, modify the global `@utility highlight-on-active` definition to change the `inset` values for a global design change.

## Component Compatibility

Uses `highlight-on-active`:
- Form Input: Combobox, Select, Autocomplete
- Overlays: DropdownMenu, Context Menu
- Miscellaneous: Menubar
