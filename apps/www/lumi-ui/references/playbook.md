# Lumi Playbook

Primary execution guide. Load official docs only when a task needs component-specific details.

## Table of Contents

- [Lumi Playbook](#lumi-playbook)
  - [Table of Contents](#table-of-contents)
  - [Mode Selection](#mode-selection)
  - [Preflight (Always)](#preflight-always)
  - [Knowledge Resolution Order](#knowledge-resolution-order)
  - [Code Conventions](#code-conventions)
    - [Wrapper anatomy](#wrapper-anatomy)
    - [Composite assembly](#composite-assembly)
    - [Typing patterns](#typing-patterns)
    - [Touch target pattern](#touch-target-pattern)
    - [Render prop composition](#render-prop-composition)
  - [CSS Strategy (Hybrid)](#css-strategy-hybrid)
    - [Utility-to-component mapping](#utility-to-component-mapping)
  - [Composition Rules](#composition-rules)
  - [Forms Rules](#forms-rules)
  - [Patch Policy](#patch-policy)
  - [Final Checks](#final-checks)

## Mode Selection

- `bootstrap`: project does not have Lumi wiring yet.
- `integrate`: project already has Lumi wrappers and needs incremental changes.

## Preflight (Always)

1. Detect shadcn config file (`components.json`):

   - Add registry if missing:
     ```json
     "registries": {
       "@lumi-ui": "https://lumiui.dev/r/{name}.json"
     }
     ```

2. Detect global stylesheet and verify/add baseline contract:

   - `.root { isolation: isolate; }`
   - `@utility animate-popup`
   - `@utility animate-fade-up`
   - `@utility animate-fade-down`
   - `@utility animate-fade-zoom`
   - `@utility animate-fade`
   - `@utility highlight-on-active`
   - Also verify `animate-slide-left` and `animate-slide-right` if Sheet component is used.

3. Detect app root wrapper location:

   - Next.js: `app/layout.tsx` — `<div className="root">{children}</div>`
   - TanStack Start/Vite: route root (e.g., `src/routes/__root.tsx`)

4. Detect existing wrapper conventions:
   - Import paths from `@/components/ui/*`
   - Token and class conventions
   - Component file style and naming

## Knowledge Resolution Order

1. **Project code** — existing wrappers and styles are the first source of truth.
2. **Lumi docs/examples** — use component docs listed in `official/llms.txt`.
3. **Base UI API docs** — for behavior, events, and type signatures.
4. **Local installed Base UI source/types** — use `node_modules/@base-ui/react` when docs differ from installed version.

## Code Conventions

### Wrapper anatomy

Every Lumi wrapper follows this structure:

```tsx
function ComponentName({ className, ...props }: BaseX.Part.Props) {
  return (
    <BaseX.Part
      data-slot="component-name"
      className={cn("token-classes", className)}
      {...props}
    />
  );
}
```

Rules:

- `data-slot` — required on every wrapper, kebab-case, matches export name.
- `cn()` — merge default classes with consumer `className` (consumer always last).
- `{...props}` — spread last to allow overrides.
- Props typed as `BaseX.Part.Props` or `React.ComponentProps<typeof BaseX.Part>`.

### Composite assembly

Composites wrap Portal + positioning + popup into a single component:

```tsx
// Popup-style (Combobox, Select, Popover, Dropdown, Tooltip)
Portal → Positioner → Popup

// Overlay-style (Dialog, AlertDialog, Sheet)
Portal → Backdrop + Viewport → Popup
```

Composites use `cva` for variant systems when a component has layout modes:

```tsx
const popupVariants = cva("base-classes", {
  variants: { layout: { center: "...", responsive: "..." } },
  defaultVariants: { layout: "center" },
});
```

### Typing patterns

```tsx
// Namespace-style (preferred for components with generics)
function Dialog<Payload>({ ...props }: BaseDialog.Root.Props<Payload>) {}

// ComponentProps-style (for simple wrappers)
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {}

// Extended props for composites
type DialogContentProps = BaseDialog.Popup.Props &
  VariantProps<typeof popupVariants> & {
    showCloseButton?: boolean;
  };
```

### Touch target pattern

Touch-friendly hit areas via `pointer-coarse` media query:

```tsx
className =
  "pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10";
```

### Render prop composition

Use Base UI `render` to compose elements without `asChild`:

```tsx
<DialogClose render={<Button size="icon-sm" variant="outline" />}>
  <XIcon className="size-4" />
</DialogClose>
```

## CSS Strategy (Hybrid)

- Keep only baseline shared utilities globally.
- Add component-specific CSS on demand from Lumi examples.
- Never replace the entire global CSS block when patching.
- Append missing rules only; keep edits idempotent.

### Utility-to-component mapping

| Utility               | Components                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `animate-popup`       | Popover, Dropdown Menu, Select, Combobox, Tooltip, Context Menu, Preview Card, Menubar                   |
| `animate-fade-up`     | Dialog (responsive), Sheet (bottom)                                                                      |
| `animate-fade-down`   | Dialog (top layout)                                                                                      |
| `animate-fade-zoom`   | Dialog (center layout), Alert Dialog                                                                     |
| `animate-fade`        | Backdrops, Dialog (stacked/element-outside)                                                              |
| `animate-slide-left`  | Sheet (right side)                                                                                       |
| `animate-slide-right` | Sheet (left side)                                                                                        |
| `highlight-on-active` | Combobox items, Select items, Autocomplete items, Dropdown Menu items, Context Menu items, Menubar items |

Always verify actual class names in copied component files before editing.

## Composition Rules

- In feature code, import from `@/components/ui/*`.
- Prefer existing Lumi composites first; use primitives for explicit customization.
- Do not use Radix `asChild`; use Base UI `render` prop.
- Preserve ref forwarding and prop spread behavior.
- For wrapper internals, preserve `render`/`useRender`/`mergeProps` semantics.

## Forms Rules

- Choose one form mode per task:
  - Native Base UI constraints (simpler, no extra deps).
  - RHF + Zod (advanced validation, complex forms).
- For RHF default path, read `forms-rhf-quickstart.md` first.
- Open `official/forms/rhf.md` only for advanced component-specific cases.

## Patch Policy

- Prefer minimal diffs.
- Do not rewrite unrelated component internals.
- Respect existing tokens, spacing, and utility style.
- If docs and project disagree, follow project code + installed package behavior.

## Final Checks

- Imports in feature code come from `@/components/ui/*`.
- `.root` wrapper and baseline utilities exist.
- Every wrapper has `data-slot`.
- No old `asChild` usage.
- No arbitrary color values unless explicitly requested.
- Updated components compile with existing typing patterns.
