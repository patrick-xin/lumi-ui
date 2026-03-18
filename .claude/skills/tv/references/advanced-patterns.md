# Advanced Patterns — tailwind-variants

Read this file when building complex slot components, multi-level composition, compound slots,
slot variant overrides, or custom tv wrappers.

## Table of Contents

1. [Compound Slots](#1-compound-slots)
2. [Slot Variant Overrides](#2-slot-variant-overrides)
3. [Multi-Level Extend Chains](#3-multi-level-extend-chains)
4. [Extending Slot Components](#4-extending-slot-components)
5. [Custom TV Wrapper — Full Pattern](#5-custom-tv-wrapper)
6. [Complex Real-World Example](#6-complex-real-world-example)

---

## 1. Compound Slots

`compoundSlots` applies the same classes to **multiple slots** at once, avoiding repetition.
It can be unconditional (always applied) or gated by variant values.

```ts
const pagination = tv({
  slots: {
    base: "flex flex-wrap gap-1",
    item: 'data-[active="true"]:bg-blue-500 data-[active="true"]:text-white',
    prev: "",
    next: "",
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: { size: "md" },
  compoundSlots: [
    // No variant condition → always applied to listed slots
    {
      slots: ["item", "prev", "next"],
      class: [
        "flex",
        "items-center",
        "justify-center",
        "rounded",
        "bg-neutral-100",
        "hover:bg-neutral-200",
        "text-neutral-600",
      ],
    },
    // Variant-gated → only when size matches
    {
      slots: ["item", "prev", "next"],
      size: "sm",
      class: "size-7 text-xs",
    },
    {
      slots: ["item", "prev", "next"],
      size: "md",
      class: "size-9 text-sm",
    },
    {
      slots: ["item", "prev", "next"],
      size: "lg",
      class: "size-11 text-base",
    },
  ],
});
```

**Key rules:**
- `slots` is an array of **slot names** (strings), not the slot classes themselves.
- Variant keys (`size`, `color`, etc.) go at the same level as `slots` and `class`.
- `class` can be a string or an array of strings.
- Compound slots are evaluated **after** regular slot variants, so they can add to or override.
- Use compound slots when 3+ slots share identical variant-dependent styles (sizing, spacing, colors).

---

## 2. Slot Variant Overrides

Slot functions accept variant overrides at call time. This is essential for render-prop patterns
where internal state determines variant values per-slot.

```ts
const tabs = tv({
  slots: {
    base: "flex gap-2",
    tab: "rounded px-3 py-1.5 text-sm transition-colors",
  },
  variants: {
    color: {
      primary: { tab: "text-blue-600 hover:bg-blue-50" },
      secondary: { tab: "text-purple-600 hover:bg-purple-50" },
    },
    isSelected: {
      true: { tab: "font-bold bg-blue-100" },
      false: { tab: "font-normal" },
    },
  },
});

// Component-level: set `color` once
const { base, tab } = tabs({ color: "primary" });

// Slot-level: override `isSelected` per item (e.g. from a render prop)
<Tabs className={base()}>
  {items.map((item) => (
    <Tab
      key={item.id}
      className={({ isSelected }) => tab({ isSelected })}
    >
      {item.label}
    </Tab>
  ))}
</Tabs>
```

**How it works:**
1. Call the tv result with component-wide variants: `tabs({ color: "primary" })`.
2. Each destructured slot function **still accepts variant props** to override at call time.
3. The override is **per-slot, per-call** — other slots are unaffected.

**When to use:** Any component library with class render props (React Aria, Radix, Headless UI)
where the component exposes internal state like `isSelected`, `isPressed`, `isFocused`.

---

## 3. Multi-Level Extend Chains

`extend` can be chained multiple levels deep. Each level inherits and merges everything.

```ts
// Level 0: Base interactive element
const interactiveBase = tv({
  base: "inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
});

// Level 1: Button base (extends interactive)
const buttonBase = tv({
  extend: interactiveBase,
  base: "font-semibold rounded-lg",
  variants: {
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
  },
  defaultVariants: { size: "md" },
});

// Level 2: Icon button (extends button)
const iconButtonStyles = tv({
  extend: buttonBase,
  base: "aspect-square p-0", // override padding since it's icon-only
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
    },
  },
});

// iconButtonStyles has: disabled (from level 0), size (merged at levels 1+2)
iconButtonStyles({ size: "sm", disabled: true });
```

**Merge behavior at each level:**
- `base`: concatenated (child appended to parent), conflicts resolved by tailwind-merge.
- `variants`: same variant name → child values override matching keys; parent-only keys preserved.
- `defaultVariants`: shallow merged (child wins on conflict).
- `compoundVariants`: concatenated (both parent and child arrays kept).

---

## 4. Extending Slot Components

Slot-based components can also be extended. Slots are merged by name.

```ts
const baseCard = tv({
  slots: {
    base: "rounded-xl bg-white shadow-sm",
    header: "flex items-center p-4",
    body: "p-4",
  },
  variants: {
    size: {
      sm: { base: "max-w-sm", body: "text-sm" },
      md: { base: "max-w-md", body: "text-base" },
    },
  },
});

const featureCard = tv({
  extend: baseCard,
  slots: {
    // base, header, body are inherited
    icon: "size-10 rounded-lg mb-2",       // new slot
    footer: "border-t border-gray-100 p-4", // new slot
  },
  variants: {
    highlighted: {
      true: {
        base: "ring-2 ring-blue-500",
        icon: "text-blue-600",
      },
    },
  },
});

// featureCard has slots: base, header, body, icon, footer
// featureCard has variants: size (inherited), highlighted (added)
const { base, header, body, icon, footer } = featureCard({ size: "md", highlighted: true });
```

---

## 5. Custom TV Wrapper

For design systems with custom Tailwind theme tokens, create a wrapper so every component
resolves custom classes correctly through tailwind-merge.

```ts
// styles/tv.ts
import type { TV } from "tailwind-variants";
import { tv as tvBase } from "tailwind-variants";

const COMMON_UNITS = ["sm", "md", "lg"];

const twMergeConfig = {
  theme: {
    spacing: ["divider"],               // custom spacing tokens
    radius: COMMON_UNITS,               // custom radius tokens
  },
  classGroups: {
    shadow: [{ shadow: COMMON_UNITS }],
    opacity: [{ opacity: ["disabled"] }],
    "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
    "border-w": [{ border: COMMON_UNITS }],
  },
};

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      theme: {
        ...config?.twMergeConfig?.theme,
        ...twMergeConfig.theme,
      },
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig.classGroups,
      },
    },
  });
```

Then every component imports `tv` from `styles/tv` instead of `tailwind-variants`.

**When to use a custom wrapper vs `createTV`:**
- `createTV` is simpler: `const tv = createTV({ twMerge: false })`. Use for simple config changes.
- Custom wrapper is more powerful: lets you merge config instead of replacing, add classGroups, 
  share theme tokens. Use when your Tailwind config has custom tokens.

---

## 6. Complex Real-World Example

A dialog component using slots, compound variants, compound slots, and TypeScript:

```ts
// dialog.variants.ts
import { tv, type VariantProps } from "tailwind-variants";

export const dialogStyles = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
    positioner: "fixed inset-0 z-50 flex items-center justify-center p-4",
    content: "relative w-full rounded-xl bg-white shadow-2xl outline-none",
    header: "flex items-center justify-between px-6 pt-6",
    title: "text-lg font-semibold text-gray-900",
    description: "mt-1 text-sm text-gray-500",
    body: "px-6 py-4",
    footer: "flex items-center gap-3 px-6 pb-6",
  },
  variants: {
    size: {
      sm: { content: "max-w-sm" },
      md: { content: "max-w-lg" },
      lg: { content: "max-w-2xl" },
      fullscreen: {
        content: "max-w-none h-full rounded-none",
        positioner: "p-0",
      },
    },
    scrollBehavior: {
      inside: { body: "overflow-y-auto max-h-[60vh]" },
      outside: { positioner: "overflow-y-auto" },
    },
  },
  compoundVariants: [
    {
      size: "fullscreen",
      scrollBehavior: "inside",
      class: {
        body: "max-h-none flex-1 overflow-y-auto",
        content: "flex flex-col",
      },
    },
  ],
  compoundSlots: [
    {
      slots: ["header", "body", "footer"],
      size: "sm",
      class: "px-4",
    },
  ],
  defaultVariants: {
    size: "md",
    scrollBehavior: "inside",
  },
});

export type DialogVariants = VariantProps<typeof dialogStyles>;
```

```tsx
// dialog.tsx
import { dialogStyles, type DialogVariants } from "./dialog.variants";

interface DialogProps extends DialogVariants {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, size, scrollBehavior, className, children }: DialogProps) {
  const { overlay, positioner, content, ...slots } = dialogStyles({ size, scrollBehavior });

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true">
      <div className={overlay()} onClick={onClose} />
      <div className={positioner()}>
        <div className={content({ class: className })}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Sub-components access slots via context or direct import
export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  // In practice, pass slots via React context from Dialog
  return <div className={className}>{children}</div>;
}
```

### Pattern: Exposing slot styles via React Context

For compound components where sub-components need access to variant-resolved slot functions:

```tsx
import { createContext, useContext } from "react";

// The return type of a slotted tv() call
type DialogSlots = ReturnType<typeof dialogStyles>;

const DialogContext = createContext<DialogSlots | null>(null);

function useDialogSlots() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog sub-components must be used within <Dialog>");
  return ctx;
}

export function Dialog({ size, scrollBehavior, ...props }: DialogProps) {
  const slots = dialogStyles({ size, scrollBehavior });

  return (
    <DialogContext.Provider value={slots}>
      {/* ... */}
    </DialogContext.Provider>
  );
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  const { title } = useDialogSlots();
  return <h2 className={title({ class: className })}>{children}</h2>;
}
```

---

## Anti-Patterns to Avoid

### ❌ Duplicating shared slot classes across variants

```ts
// BAD: repetition
compoundVariants: [
  { size: "sm", class: { item: "size-7 text-xs", prev: "size-7 text-xs", next: "size-7 text-xs" } },
]

// GOOD: use compoundSlots instead
compoundSlots: [
  { slots: ["item", "prev", "next"], size: "sm", class: "size-7 text-xs" },
]
```

### ❌ Using result-based composition when extend is available

```ts
// BAD: loses type safety, doesn't inherit variants
const myButton = tv({ base: [baseButton(), "bg-red-500"] });

// GOOD: preserves everything
const myButton = tv({ extend: baseButton, base: "bg-red-500" });
```

### ❌ Overloading a single compound variant instead of using compoundSlots

If you find yourself writing the same variant condition across 3+ compound variants
just to target different slots, refactor to compoundSlots.

### ❌ Not destructuring variant props before spreading to DOM

```tsx
// BAD: `color` and `size` end up as HTML attributes
<button {...props} className={buttonStyles(props)} />

// GOOD:
const { color, size, disabled, className, ...rest } = props;
<button {...rest} className={buttonStyles({ color, size, disabled, class: className })} />
```