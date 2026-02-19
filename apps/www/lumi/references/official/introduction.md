# Introduction

Lumi UI gives you accessible, customizable React components that you own completely. Built on Base UI for robust behavior and styled with Tailwind CSS for maximum flexibility.

## What You Get

Different projects need different levels of control. Every Lumi UI component offers two paths to production.

### Composite Components (Build Fast)
Pre-assembled, production-ready components for common patterns. Use these when you want standard UI instantly.

**Use when:** Prototyping, building standard UIs, or maintaining consistency across your app.

### Primitive Components (Build Custom)
Raw, unstyled building blocks with full access to Base UI's hooks and logic, letting you compose complex interactions without fighting the library. Mix and match them with composites for maximum efficiency.

**Use when:** Creating unique layouts, implementing custom interactions, or the composite doesn't fit your needs.

> **Think of it this way:** Composites are finished furniture. Primitives are lumber and tools. Start with composites, drop down to primitives when you need more control.

## How It Works

### Robust Foundation via Base UI
Base UI (by the MUI team) provides enterprise-grade accessibility, rock-solid focus management, and a headless architecture.

### Style With Tailwind
Every component accepts `className` for styling. Uses the shadcn/ui CSS variable system — changing your theme variables automatically updates all components.

### Consistent Design Language
- **Animations:** All components use shared utilities (`animate-popup`, `animate-fade-up`, `animate-fade-zoom`, `animate-fade-down`) for cohesive transitions
- **Interactions:** Components follow the "hit-test" pattern for forgiving, clickable areas
- **Theming:** Pre-configured themes available

## Customization Levels

1. **Quick tweaks:** Add Tailwind classes via `className`
2. **Theme changes:** Modify CSS variables in your `globals.css`
3. **Full control:** Use primitives to build exactly what you need
4. **Mix and match:** Use primitives and composites to create unique layouts

## Key Conventions

**Naming Pattern:**
- Root: `Combobox`, `Dialog`, `Dropdown`
- Primitives: `ComboboxInput`, `ComboboxItem`, `DialogPopup`
- Composites: `ComboboxInputGroup`, `ComboboxContent`, `DialogContent`, `AccordionSummary`

**Props Pattern:**
All primitives forward props to Base UI, so you get the full Base UI API plus the styling system.
