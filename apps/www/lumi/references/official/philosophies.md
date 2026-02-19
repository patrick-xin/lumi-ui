# Philosophies

The architectural decisions that make Lumi UI robust, accessible, and AI-friendly.

## The Dual Layer Architecture

Most component libraries force a choice: either use opinionated components that are fast but inflexible, or use primitives that are powerful but slow to implement. Lumi refuses that false dichotomy.

### Why Two Layers?

Development happens at different velocities:

**During Prototyping:** You want to ship features fast. You don't care about custom layouts — you just need a working dropdown _now_.

**During Polishing:** You need pixel-perfect control. The standard layout doesn't work for your design. You're willing to trade speed for precision.

### Composites = Velocity

Pre-assembled components that combine structure, styling, and logic into a single import. They handle boilerplate like portals, positioning, and default layouts.

**Trade-off:** You accept our opinions about structure and styling in exchange for not thinking about them.

**Best for:** MVPs, internal tools, maintaining consistency, and 80% of use cases.

### Primitives = Control

Thin wrappers around Base UI that provide state management, accessibility, and keyboard navigation — but enforce _zero visual layout_. You compose them however you want.

**Trade-off:** You write more code but get complete control over DOM structure and styling.

**Best for:** Unique designs, complex interactions, components that don't fit standard patterns.

### Why Not Just One?

1. **Only Composites:** Limits creativity. Developers fork or abandon the library when they hit walls.
2. **Only Primitives:** Slows down common tasks. Every dropdown requires 20+ lines of boilerplate.

The dual-layer approach gives you an escape hatch without abandoning the fast path.

## Designed for AI-Assisted Development

Modern development is human + AI. Lumi UI's structure is optimized so that AI assistants generate correct, idiomatic code on the first attempt.

### Flat Semantic Exports

```tsx
// AI-friendly
import {
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
} from "@/components/ui/combobox";

// Nested namespaces - AI struggles
import { Combobox } from "@base-ui/react/combobox";
// AI must now infer: Combobox.Input? Combobox.Item? ComboboxInput?
```

**Why this matters:**

- Reduces token usage in AI context windows
- Makes component relationships explicit in import statements
- Eliminates ambiguity in autocomplete suggestions

### Composites as Living Examples

Composite components serve as **executable documentation**. When an AI reads the codebase, it sees complete, working reference implementations.

```tsx
// This teaches AI agents: "This is how you use ComboboxPortal + ComboboxPositioner + ComboboxPopup"
function ComboboxContent({
  className,
  children,
  sideOffset = 6,
  align = "start",
  matchAnchorWidth = true,
  positionerAnchor,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  align?: BaseCombobox.Positioner.Props["align"];
  matchAnchorWidth?: boolean;
  positionerAnchor?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <BaseCombobox.Portal data-slot="combobox-portal">
      <BaseCombobox.Positioner
        data-slot="combobox-positioner"
        sideOffset={sideOffset}
        align={align}
        anchor={positionerAnchor}
      >
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            "bg-popover text-popover-foreground rounded-sm shadow-md",
            "outline outline-1 outline-border dark:-outline-offset-1",
            "overflow-hidden overflow-y-auto",
            "max-w-[var(--available-width)] max-h-[min(23rem,var(--available-height))]",
            "animate-popup",
            matchAnchorWidth && "w-[var(--anchor-width)]",
            className
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}
```

The AI effectively learns by example within the project context, reducing hallucination and improving first-try accuracy.

### Immutable Logic Blocks

Primitives are **stable building blocks**. AI agents should use primitives to build new features in _application files_, not attempt to modify core component logic.

**The contract:** Primitives handle the hard parts (accessibility, state, keyboard nav). Your code handles composition and styling. This boundary makes AI assistance more reliable.

## The Hit-Test Philosophy

### The Problem

If a hover highlight is applied directly to an item with padding, the clickable/hoverable area shrinks visually. This leads to a less forgiving UX.

### The Solution

Use **pseudo-elements** to separate the visual highlight from the interactive container:

```css
data-[highlighted]:relative data-[highlighted]:z-0
data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm
data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground
```

**Result:** The entire row is clickable (great UX), while the visual highlight is inset and rounded (great design). This pattern appears in `ComboboxItem`, `DropdownMenuItem`, `ListboxOption`, and similar components.

See `highlights.md` for implementation details and customization.

## Unified Design Language

### The Utility Pattern

Tailwind utilities provide consistent styling across components:

- **Animation:** All interactive elements use globally configured animation utilities (`animate-popup`, `animate-fade-up`, `animate-fade-zoom`, `animate-fade-down`). Transitions feel cohesive across the entire application.
- **Highlighted elements:** All interactive elements use `highlight-on-active`.

**Why global utilities?** Consistency by default. Every component animates and behaves the same way unless explicitly overridden. See `animation-guide.md` and `highlights.md` for details.

### Theme System

Adopts the shadcn/ui CSS variable approach for theming.

### The Wrapper Pattern

Every primitive follows this structure:

```tsx
function ComboboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot="combobox-trigger" // For global CSS targeting
      className={cn(
        "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className // Merge styles
      )}
      aria-label="Open popup"
      {...props} // Forward all Base UI props
    />
  );
}
```

This pattern ensures:

1. Full Base UI API compatibility
2. Consistent styling hooks via `data-slot`
3. Easy customization via `className`

## Trade-Offs

### Optimized For

- Developer velocity for common patterns
- Full control when needed
- AI-assisted coding reliability
- Accessibility without configuration
- Consistent UX across components

### Sacrificed

- **Minimal bundle size:** Both layers are included. Manually delete unused primitives if needed.
- **Framework agnostic:** React-only (Base UI is React-first).
- **More components to remember:** Composites have specific props and API.
