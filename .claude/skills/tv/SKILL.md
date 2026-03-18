---
name: tv
description: >
  Master tailwind-variants (tv) for building type-safe, variant-driven React component styles.
  Use this skill whenever the task involves: creating or editing tv() definitions, slots,
  compoundVariants, compoundSlots, slot variant overrides, extend-based composition,
  VariantProps typing, createTV / custom tv wrappers, or designing a scalable component
  style system with tailwind-variants. Also trigger when the user mentions "tv", "tailwind-variants",
  "slots", "compoundVariants", "compoundSlots", "VariantProps", or asks to build a design system
  on top of Tailwind CSS with variant APIs. If the user references cva and wants to migrate or
  compare, this skill applies too.
---

# Tailwind Variants (tv) — Skill Reference

This skill teaches correct, scalable usage of `tailwind-variants` for React + TypeScript projects.

> **When you need advanced patterns** (compound slots, slot variant overrides, multi-level extend,
> custom tv wrappers), read `references/advanced-patterns.md` before writing code.

---

## 1. Installation & Imports (v3+)

```bash
# Original build (includes tailwind-merge for class conflict resolution)
npm install tailwind-variants tailwind-merge

# Lite build (~80% smaller, no conflict resolution)
npm install tailwind-variants
```

```ts
// Original build — use this by default
import { tv, type VariantProps } from "tailwind-variants";

// Lite build — only when bundle size is critical
import { tv, type VariantProps } from "tailwind-variants/lite";

// Utility functions (original build)
import { cn, cnMerge, cx } from "tailwind-variants";
// cn  → merges + resolves conflicts (returns string directly)
// cnMerge → like cn but accepts config: cnMerge("px-2","px-4")({ twMerge: false })
// cx  → simple concat, no conflict resolution
```

---

## 2. Core API Shape

Every `tv()` call accepts this structure:

```ts
const component = tv({
  // --- Without slots ---
  base: "...",              // string | string[]
  variants: { ... },
  compoundVariants: [ ... ],
  defaultVariants: { ... },
  extend: otherTv,          // inherit from another tv()

  // --- With slots ---
  slots: { ... },           // replaces `base` — cannot use both
  variants: { ... },        // values become { slotName: "classes" }
  compoundVariants: [ ... ],// class/className becomes { slotName: "classes" }
  compoundSlots: [ ... ],   // apply classes to multiple slots at once
  defaultVariants: { ... },
});
```

**Critical rule:** `base` and `slots` are mutually exclusive. Never combine them.

---

## 3. Variants

### Basic variants

```ts
const button = tv({
  base: "font-semibold rounded-full active:opacity-80",
  variants: {
    color: {
      primary: "bg-blue-500 text-white hover:bg-blue-700",
      secondary: "bg-purple-500 text-white hover:bg-purple-700",
    },
    size: {
      sm: "py-1 px-3 text-xs",
      md: "py-1.5 px-4 text-sm",
      lg: "py-2 px-6 text-base",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

button({ color: "secondary", size: "lg" });
button(); // uses defaultVariants
```

### Boolean variants

Use the key `true` (and optionally `false`) as the variant value:

```ts
const button = tv({
  base: "font-semibold rounded-full",
  variants: {
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
});

button({ disabled: true });
```

### Compound variants

Apply styles when **multiple variants match simultaneously**:

```ts
const button = tv({
  base: "font-semibold rounded-full",
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-purple-500 text-white",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      disabled: true,
      class: "bg-blue-300 text-blue-800", // overrides disabled + primary
    },
    // Target multiple variant values with array syntax:
    {
      color: ["primary", "secondary"],
      disabled: true,
      class: "ring-2 ring-offset-1",
    },
  ],
});
```

**Key points:**
- `compoundVariants` is always an **array** of objects.
- Use `class` or `className` (interchangeable) for the applied styles.
- Array syntax `color: ["primary", "secondary"]` matches **any** listed value.

---

## 4. Slots

Slots split a component into multiple styled parts. Each slot returns its own callable function.

### Basic slots

```ts
const card = tv({
  slots: {
    base: "flex flex-col gap-4 rounded-xl p-6 bg-white shadow-sm",
    header: "flex items-center justify-between",
    title: "text-lg font-semibold text-gray-900",
    body: "text-sm text-gray-600",
    footer: "flex items-center gap-2 pt-4 border-t border-gray-100",
  },
});

// Destructure — each slot is a callable function
const { base, header, title, body, footer } = card();

// In JSX:
<div className={base()}>
  <div className={header()}>
    <h3 className={title()}>Title</h3>
  </div>
  <div className={body()}>Content</div>
  <div className={footer()}>Footer</div>
</div>
```

### Slots with variants

When using slots, each variant value maps **slot names to class strings**:

```ts
const alert = tv({
  slots: {
    root: "rounded-lg p-4",
    icon: "size-5 shrink-0",
    content: "text-sm",
  },
  variants: {
    severity: {
      info: {
        root: "bg-blue-50 border border-blue-200",
        icon: "text-blue-600",
        content: "text-blue-800",
      },
      error: {
        root: "bg-red-50 border border-red-200",
        icon: "text-red-600",
        content: "text-red-800",
      },
    },
  },
  defaultVariants: {
    severity: "info",
  },
});

const { root, icon, content } = alert({ severity: "error" });
```

### Compound variants with slots

In compound variants, `class`/`className` becomes an **object keyed by slot name**:

```ts
const alert = tv({
  slots: {
    root: "rounded py-3 px-5",
    title: "font-bold mb-1",
    message: "",
  },
  variants: {
    variant: {
      outlined: { root: "border" },
      filled: { root: "" },
    },
    severity: {
      error: {},
      success: {},
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      severity: "error",
      class: {
        root: "border-red-700 dark:border-red-500",
        title: "text-red-700 dark:text-red-500",
        message: "text-red-600 dark:text-red-500",
      },
    },
    {
      variant: "filled",
      severity: "success",
      class: {
        root: "bg-green-100 dark:bg-green-800",
        title: "text-green-900 dark:text-green-50",
        message: "text-green-700 dark:text-green-200",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    severity: "success",
  },
});
```

### Overriding slot styles

Each slot function accepts `{ class: "..." }` or `{ className: "..." }`:

```ts
const { base, title } = card();

<div className={base({ class: "bg-purple-50" })}>
  <h3 className={title({ class: "text-purple-900" })}>Custom</h3>
</div>
```

> For **compoundSlots** and **slot variant overrides**, see `references/advanced-patterns.md`.

---

## 5. Composition via `extend`

`extend` inherits **everything**: base/slots, variants, defaultVariants, compoundVariants.

```ts
const baseButton = tv({
  base: "font-semibold rounded-full transition-colors",
  variants: {
    size: {
      sm: "py-1 px-3 text-xs",
      md: "py-1.5 px-4 text-sm",
    },
  },
  defaultVariants: { size: "md" },
});

const primaryButton = tv({
  extend: baseButton,
  base: "bg-blue-500 text-white hover:bg-blue-600",
  // Inherits `size` variant and its defaults
  variants: {
    elevated: {
      true: "shadow-lg shadow-blue-500/25",
    },
  },
});

primaryButton({ size: "sm", elevated: true }); // all variants available
```

**Rules:**
- The child's `base` is **merged into** the parent's base (not replaced).
- Same-key variants are **merged**: child values override matching keys, parent-only keys are kept.
- `compoundVariants` from both parent and child are **concatenated**.
- `defaultVariants` are **shallow merged** (child overrides parent).
- Slots are also inherited and merged by slot name.

---

## 6. TypeScript Patterns

### VariantProps — extract variant types from a tv definition

```ts
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "rounded-full font-semibold",
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
    size: {
      sm: "py-1 px-3 text-xs",
      md: "py-1.5 px-4 text-sm",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;
// { color?: "primary" | "secondary"; size?: "sm" | "md" }

interface ButtonProps
  extends React.ComponentPropsWithRef<"button">,
    ButtonVariants {
  children: React.ReactNode;
}

export function Button({ color, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ color, size, class: className })} {...props} />
  );
}
```

### Required variants

tv makes all variants optional by default. Use TypeScript utilities to require specific ones:

```ts
type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends Omit<ButtonVariants, "color">,
    Required<Pick<ButtonVariants, "color">> {}

// Now `color` is required, `size` is still optional
```

### Typed slot components

```ts
const cardStyles = tv({
  slots: {
    base: "rounded-xl p-6 bg-white shadow-sm",
    title: "text-lg font-semibold",
    body: "text-sm text-gray-600",
  },
  variants: {
    variant: {
      elevated: { base: "shadow-lg" },
      outlined: { base: "border border-gray-200 shadow-none" },
    },
  },
});

type CardVariants = VariantProps<typeof cardStyles>;

interface CardProps
  extends React.ComponentPropsWithRef<"div">,
    CardVariants {
  children: React.ReactNode;
}

export function Card({ variant, className, children, ...props }: CardProps) {
  const { base, title, body } = cardStyles({ variant });

  return (
    <div className={base({ class: className })} {...props}>
      {children}
    </div>
  );
}
```

---

## 7. Design System Conventions

Follow these conventions when building a scalable component style system with tv.

### File structure

```
styles/
  tv.ts             ← custom tv wrapper (createTV or wrapper fn)

components/
  button/
    button.variants.ts   ← tv() definition + exported types
    button.tsx           ← React component consuming the variants
  card/
    card.variants.ts
    card.tsx
```

### Custom tv wrapper (recommended for design systems)

Centralize tailwind-merge config so every component uses the same conflict resolution:

```ts
// styles/tv.ts
import type { TV } from "tailwind-variants";
import { tv as tvBase } from "tailwind-variants";

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      // Add your custom theme tokens and classGroups here
    },
  });
```

> For a complete wrapper with custom theme tokens and classGroups, see
> `references/advanced-patterns.md` § Custom TV Wrapper.

### Naming conventions

| Concept | Convention | Example |
|---------|-----------|---------|
| Variant file | `*.variants.ts` | `button.variants.ts` |
| tv definition | `const <name>Styles = tv({...})` | `buttonStyles`, `cardStyles` |
| Variant types | `type <Name>Variants = VariantProps<typeof <name>Styles>` | `ButtonVariants` |
| Slot names | semantic role, not visual | `root`, `trigger`, `content` (not `wrapper1`) |
| Boolean variants | state-like names | `disabled`, `selected`, `loading` |
| Enum variants | category names | `color`, `size`, `variant` |

### Variant taxonomy (standard variant names)

Align on these across your system for consistency:

- **`variant`**: visual treatment — `"solid" | "outlined" | "ghost" | "link"`
- **`color`**: color scheme — `"primary" | "secondary" | "danger" | "success" | "warning" | "neutral"`
- **`size`**: dimensions — `"xs" | "sm" | "md" | "lg" | "xl"`
- **Boolean**: `disabled`, `loading`, `selected`, `active`, `fullWidth`

### Component pattern — variant × color matrix

When `variant` (solid/outlined/ghost) × `color` (primary/danger) creates a matrix, keep `variant`
and `color` values as empty strings and define visuals entirely in `compoundVariants`:

```ts
// button.variants.ts
export const buttonStyles = tv({
  base: "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    variant: { solid: "", outlined: "bg-transparent border-2", ghost: "bg-transparent" },
    color: { primary: "", danger: "" },
    size: { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" },
    disabled: { true: "opacity-50 pointer-events-none" },
  },
  compoundVariants: [
    { variant: "solid", color: "primary", class: "bg-blue-600 text-white hover:bg-blue-700" },
    { variant: "solid", color: "danger", class: "bg-red-600 text-white hover:bg-red-700" },
    { variant: "outlined", color: "primary", class: "border-blue-600 text-blue-600 hover:bg-blue-50" },
    { variant: "ghost", color: "danger", class: "text-red-600 hover:bg-red-50" },
    // ...extend matrix as needed
  ],
  defaultVariants: { variant: "solid", color: "primary", size: "md" },
});
```

> For the full component file pattern (variants file + React component), see the Button example
> in Section 6 above — it demonstrates the complete `*.variants.ts` → `*.tsx` split.

---

## 8. Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `base` and `slots` together | They are mutually exclusive. Use `slots` with a `base` slot key instead. |
| Forgetting `class` is an **object** in slot compound variants | `class: { root: "...", title: "..." }` not `class: "..."` |
| Passing variant props directly to DOM | Destructure variant keys out before spreading: `const { size, color, ...rest } = props` |
| Not installing `tailwind-merge` with the original build | `npm install tailwind-merge` or use `tailwind-variants/lite` |
| Using `responsiveVariants` | Removed in v3. Handle responsive styles in Tailwind classes directly. |
| Calling a slot component without `()` | Each slot is a **function**: `className={base()}` not `className={base}` |