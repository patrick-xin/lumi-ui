# Choose Your Build (v3+)

Starting from v3, Tailwind Variants offers two build options:

## Option 1: Original Build (with tailwind-merge)

For automatic Tailwind CSS conflict resolution, install `tailwind-merge` as a dependency:

```bash
npm install tailwind-merge
```

Then import from the default entry point:

```javascript
import { tv, createTV, cn, cnMerge, cx } from 'tailwind-variants';
```

## Option 2: Lite Build (without tailwind-merge)

For a smaller bundle size (~80% smaller), use the lite build which doesn't include `tailwind-merge`:

```javascript
import { tv, createTV, cn, cnMerge, cx } from 'tailwind-variants/lite';
```

> [!NOTE]
> The lite build doesn't support the `twMerge` and `twMergeConfig` options. Choose this if bundle size is critical and you don't need automatic conflict resolution. Both `cn`, `cnMerge`, and `cx` are available in both builds, with `cn` and `cnMerge` providing conflict resolution in the original build (v3.2.2+).

# Migration to v3

## v3.2.0 to v3.2.2

### Breaking Changes

#### `cn` split into `cn` and `cnMerge`

In v3.2.2, the `cn` function has been simplified to eliminate Proxy complexity. The function now returns a string directly with default `twMerge` config. For custom `twMerge` configuration, use the new `cnMerge` function.

**Before (v3.2.0 - v3.2.1):**

```javascript
import { cn } from 'tailwind-variants';
 
// cn could be called with config (using Proxy)
cn('px-2', 'px-4')({ twMerge: false }); // => "px-2 px-4"
cn('px-2', 'px-4')(); // => "px-4" (with default config)
```

**After (v3.2.2+):**

```javascript
import { cn, cnMerge } from 'tailwind-variants';
 
// cn now returns a string directly (no config support)
cn('px-2', 'px-4'); // => "px-4" (conflicts resolved with default config)
 
// cnMerge supports custom config via second function call
cnMerge('px-2', 'px-4')({ twMerge: false }); // => "px-2 px-4"
cnMerge('px-2', 'px-4')(); // => "px-4" (with default config)
```

### Migration Steps

1. If you were using `cn(...)` directly (most common case), no changes needed - it now works more intuitively by returning a string directly.
2. If you were using `cn(...)(config)` or `cn(...)( )`, migrate to `cnMerge`:

```javascript
// Before
cn('px-2', 'px-4')({ twMerge: false });
 
// After
cnMerge('px-2', 'px-4')({ twMerge: false });
```

### Benefits

- Better TypeScript support (no Proxy types)
- Clearer API intent
- Better performance (no Proxy overhead)
- Easier maintenance

---

## v3.1.1 to v3.2.0

### New Features

#### Introduction of `cx` function

A new lightweight utility function `cx` has been added for concatenating class names without `tailwind-merge` conflict resolution. This is useful when you don't need automatic conflict resolution and want a smaller bundle size.

```javascript
// v3.2.0+
import { cx, cn } from 'tailwind-variants';
 
// cx - no conflict resolution
cx('text-blue-500', 'text-red-500'); // => "text-blue-500 text-red-500"
 
// cn - with conflict resolution (original build)
cn('text-blue-500', 'text-red-500'); // => "text-red-500"
```

### Breaking Changes

#### `cnBase` should be replaced with `cx`

In v3.2.0+, `cnBase` should be replaced with the new `cx` function. The `cx` function provides the same functionality as `cnBase` (simple concatenation without conflict resolution) with a clearer name.

**Before (v3.1.1 and earlier):**

```javascript
import { cnBase } from 'tailwind-variants';
 
// ...
{cnBase("flex items-center justify-center gap-2", className)}
```

**After (v3.2.0+):**

```javascript
import { cx } from 'tailwind-variants';
 
// ...
{cx("flex items-center justify-center gap-2", className)}
```

> [!TIP]
> **Migration:** Replace all instances of `cnBase` with `cx`. The API is identical - both functions combine class names without conflict resolution.

#### `cn` now defaults `twMerge` to true

In v3.2.0+, the `cn` function in the original build now defaults `twMerge` to true and uses `tailwind-merge` for conflict resolution. This means conflicting Tailwind classes will be automatically resolved.

**Before (v3.1.1 and earlier):**

```javascript
cn('text-blue-500', 'text-red-500'); // => "text-blue-500 text-red-500" (both classes)
```

**After (v3.2.0+):**

```javascript
cn('text-blue-500', 'text-red-500'); // => "text-red-500" (conflict resolved)
```

**Migration:** If you relied on `cn` not merging conflicts, you can:
- Use the new `cx` function instead: `import { cx } from 'tailwind-variants'`
- Or continue using `cn` if conflict resolution is desired (recommended)

#### `defaultConfig` exported as value

Starting in v3.2.0, `defaultConfig` is now exported as an actual value (not just a type), allowing direct import and modification:

```javascript
// v3.2.0+
import { defaultConfig } from 'tailwind-variants';
 
defaultConfig.twMerge = false;
```

This enables easier global configuration management.

#### `responsiveVariants` removed

The `responsiveVariants` option has been removed. For more details, see the Tailwind v4 documentation.

### Bug Fixes

- Code is no longer minified in the build output (improves debugging experience)

---

## v2 to v3

### Breaking Changes

#### Introduction of `/lite` entry point (no `tailwind-merge`)

In v3, `tailwind-variants` is now offered in two builds:
1. **Original build** – includes `tailwind-merge` (same as before)
2. **Lite build** – excludes `tailwind-merge` for a smaller bundle and faster runtime

**What changed?**
- `tailwind-merge` is no longer lazily loaded; it's statically included in the original build only
- Lite build completely removes `tailwind-merge` and its config
- `createTV`, `tv`, and `cn` in the lite build no longer accept config (`tailwind-merge` config)
- The `cn` utility (previously `cnBase`) is now exported from both builds with enhanced functionality

### Migration Steps

If you use the default configuration with `twMerge: true` (conflict resolution enabled), make sure to install `tailwind-merge` in your project:

```bash
# npm
npm install tailwind-merge
 
# yarn
yarn add tailwind-merge
 
# pnpm
pnpm add tailwind-merge
```

If you do not need conflict resolution, switch to the lite build by importing from `tailwind-variants/lite`:

```javascript
import { createTV, tv, cn, cnBase } from "tailwind-variants/lite";
```

#### Enhanced `cn` utility (formerly `cnBase`)

The `cn` utility has been significantly enhanced to support functionality similar to `classnames` / `clsx`. It now properly filters and handles various input types and formats the final result.

```javascript
// v2
import { cnBase } from 'tailwind-variants';
 
// v3 - Original build (with tailwind-merge)
import { cn, cnBase } from 'tailwind-variants';
 
// v3 - Lite build (without tailwind-merge)
import { cn, cnBase } from 'tailwind-variants/lite';
```

> [!NOTE]
> Both `cn` and `cnBase` are exported for backwards compatibility, but `cn` is the recommended import.

### Performance Improvements

v3 includes significant performance improvements for projects using `tailwind-merge`:

| Test Case | v2 (ops/sec) | v3 (ops/sec) | Change |
| :--- | :--- | :--- | :--- |
| TV without slots & tw-merge | 1,397 | 572,465 | ⬆️ Up (~410x) |
| TV with slots & tw-merge | 692 | 306,297 | ⬆️ Up (~442x) |
| TV with custom tw-merge config | 700 | 359,269 | ⬆️ Up (~513x) |
"
