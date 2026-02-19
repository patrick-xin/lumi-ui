---
name: lumi
description: Install, integrate, and modify Lumi UI components. Use when tasks mention Lumi UI, shadcn-style component copying, Base UI render composition, `.root` scoping, animation/highlight utilities, or form wiring with React Hook Form and Zod.
---

# Lumi Skill

Lumi is a distribution pattern (like shadcn/ui), not a runtime library.
After components are copied, code is owned by the user project.

## Workflow

1. Pick mode.
   - `bootstrap`: set up a new project and install first components.
   - `integrate`: add or modify components in an existing project.

2. Run preflight.
   - Detect shadcn config (`components.json`); add Lumi registry if missing.
   - Detect global CSS with baseline utilities.
   - Detect app root wrapper (`.root` div).
   - Detect existing `@/components/ui/*` wrappers and local conventions.

3. Resolve knowledge (strict order).
   1. Project code — existing wrappers and styles are the first source of truth.
   2. Lumi docs/examples — via `references/official/llms.txt`.
   3. Base UI API docs — for behavior and signatures.
   4. Local `node_modules/@base-ui/react` — for version-accurate truth.

4. Apply minimal, idempotent patches.
   - Never overwrite full global CSS; append missing rules only.
   - Preserve existing design tokens and wrapper conventions.
   - Never overwrite existing project-owned files (especially `@/components/ui/*` and `@/lib/utils`); merge changes or create adjacent files instead.
   - For `shadcn add`, do not use `--overwrite`; if prompted about an existing file, keep the existing file by default.

5. Verify.
   - Feature code imports from `@/components/ui/*`.
   - No Radix `asChild`; uses Base UI `render` composition.
   - `.root` contract and baseline utilities present.
   - Forms use one mode consistently (native or RHF+Zod).

## Non-Negotiables

- Feature code imports from `@/components/ui/*`; never raw Base UI in feature files.
- No Radix `asChild`; use Base UI `render` prop.
- Token-based styling (`text-foreground`, `bg-popover`); no arbitrary color values.
- Preserve `data-slot` attributes on every wrapper.
- Preserve ref forwarding, prop spreading, and `render`/`useRender`/`mergeProps` semantics.
- Do not assume docs match project version; check local code and installed types when uncertain.
- Never replace user-customized wrappers or shared utilities (e.g., `button`, `utils`) unless the user explicitly requests that exact overwrite.

## References

- `references/playbook.md` — primary execution guide: preflight, code conventions, CSS strategy, composition rules, patching, and final checks.
- `references/forms-rhf-quickstart.md` — RHF + Zod minimal wiring. Escalate to full reference when needed.
- `references/official/llms.txt` — full component index with doc URLs.
- `references/official/introduction.md` — Lumi overview, dual-layer architecture, customization levels.
- `references/official/installation.md` — step-by-step setup, CSS utility definitions.
- `references/official/animation-guide.md` — animation system, component compatibility matrix.
- `references/official/highlights.md` — hit-test pattern, `highlight-on-active` utility.
- `references/official/philosophies.md` — architectural decisions and trade-offs.
- `references/official/baseui/composition.md` — `render` prop usage (replaces Radix `asChild`).
- `references/official/baseui/customization.md` — event handling, controlled components.
- `references/official/baseui/merge-props.md` — `mergeProps` utility for combining props.
- `references/official/baseui/typescript.md` — namespace types, Props/State patterns.
- `references/official/baseui/use-render.md` — `useRender` hook for custom render props.
- `references/official/forms/basic.md` — native form implementation with Base UI Field.
- `references/official/forms/rhf.md` — full React Hook Form integration guide.
