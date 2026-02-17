# Installation

## 1. Initialize Project & Install Base Theme

```bash
npx shadcn@latest init https://lumiui.dev/r/init.json
```

This initializes your project, installs dependencies, sets up the base Lumi UI theme, and configures a CSS isolation rule (`.root { isolation: isolate }`) in your global styles.

## 2. Configure Lumi UI Registry

Update `components.json` to include the Lumi UI component registry:

```json
{
  "registries": {
    "@lumi-ui": "https://lumiui.dev/r/{name}.json"
  }
}
```

## 3. Apply Root Layout Wrapper

Wrap your main application content in a `div` with class name `root`:

```tsx
<body>
  <div className="root">{children}</div>
</body>
```

This ensures all Lumi UI styles are correctly scoped and isolated. Required for Base UI portals to work correctly.

## 4. Add CSS Utilities

Paste the following into your global styles:

```css
/* Popups Animation */
@utility animate-popup {
  @apply origin-[var(--transform-origin)] transition-[opacity,scale,transform] ease-[cubic-bezier(0.23,1,0.32,1)] duration-150;
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
}

/* Dialogs Animation */
@utility animate-fade-up {
  @apply transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)];
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    translate: 0 100%;
  }
}

@utility animate-fade-down {
  @apply transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)];
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    translate: 0 -100%;
  }
}

@utility animate-slide-left {
  @apply transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)];
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    translate: 100% 0;
  }
}

@utility animate-slide-right {
  @apply transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)];
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    translate: -100% 0;
  }
}

@utility animate-fade-zoom {
  @apply transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)];
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    scale: 0.94;
  }
}

@utility animate-fade {
  @apply transition-all duration-200;
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
  }
}

/* Active Highlight */
@utility highlight-on-active {
  @apply data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground;
}
```
