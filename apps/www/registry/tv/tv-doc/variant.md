# Variants

Variants allow you to create multiple versions of the same component.

## Adding variants

You can add variants by using the `variants` key. There's no limit to how many variants you can add.

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    }
  }
});
 
button({ color: 'secondary' });
/**
 * Result:
 * font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80 bg-purple-500
 * hover:bg-purple-700
 */
```

> [!TIP]
> You can also use the values as an array. e.g. `base: ['font-semibold', 'text-white', ...]`

## Multiple variants

You can add multiple variants to a single component.

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    size: {
      sm: 'py-1 px-3 text-xs',
      md: 'py-1.5 px-4 text-sm',
      lg: 'py-2 px-6 text-md'
    }
  }
});
 
button({ color: 'primary', size: 'sm' });
/**
 * Result:
 * font-semibold text-white rounded-full active:opacity-80 bg-blue-500 hover:bg-blue-700
 * py-1 px-3 text-xs
 */
 
button({ color: 'secondary', size: 'md' });
/**
 * Result:
 * font-semibold text-white rounded-full active:opacity-80 bg-purple-500 hover:bg-purple-700
 * py-1.5 px-4 text-sm
 */
 
button({ color: 'success', size: 'lg' });
/**
 * Result:
 * font-semibold text-white rounded-full active:opacity-80 bg-green-500 hover:bg-green-700
 * py-2 px-6 text-md
 */
```

## Boolean variants

You can also add boolean variants to a component. This is useful when you want to add a state variant e.g. `disabled`.

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  }
});
 
button({ color: 'secondary', disabled: true });
/**
 * Result:
 * font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80
 * hover:bg-purple-700 bg-gray-500 opacity-50 cursor-not-allowed pointer-events-none
 */
```

## Compound variants

Sometimes you might want to add a variant that depends on another variant. For example, you might want to add a color variant that depends on the `disabled` variant. This is possible by using the `compoundVariants` key.

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  },
  compoundVariants: [
    {
      color: 'success',
      disabled: true,
      class: 'bg-green-100 text-green-700 dark:text-green-800' // You can also use "className"
    }
  ]
});
 
button({ color: 'success', disabled: true });
/**
 * Result:
 * font-semibold text-sm py-1 px-4 rounded-full active:opacity-80 hover:bg-green-700
 * opacity-50 pointer-events-none bg-green-100 text-green-700 dark:text-green-800
 */
```

> [!NOTE]
> Note that the `compoundVariants` key is an array.

You can also target multiple variants at once:

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white text-md py-1.5 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  },
  compoundVariants: [
    {
      color: 'success',
      disabled: true,
      class: 'bg-green-100 text-green-700 dark:text-green-800'
    },
    {
      color: ['primary', 'secondary'],
      disabled: true,
      class: 'text-slate-400 bg-slate-200 dark:bg-slate-800 opacity-100'
    }
  ]
});
 
button({ color: 'primary', disabled: true });
/**
 * Result:
 * font-semibold text-md py-1.5 px-4 rounded-full active:opacity-80 hover:bg-blue-700
 * pointer-events-none text-slate-400 bg-slate-200 dark:bg-slate-800 opacity-100
 */
 
button({ color: 'secondary', disabled: true });
/**
 * Result:
 * font-semibold text-md py-1.5 px-4 rounded-full active:opacity-80 hover:bg-purple-700
 * pointer-events-none text-slate-400 bg-slate-200 dark:bg-slate-800 opacity-100
 */
```

## Default variants

You can also add a default variant to a component. This is useful when you want to add a predefined variants values to a component.

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    size: {
      sm: 'py-1 px-3 text-sm',
      md: 'py-1.5 px-4 text-md',
      lg: 'py-2 px-6 text-lg'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
 
button();
/**
 * Result:
 *
 * font-semibold text-white rounded-full active:opacity-80 bg-blue-500 hover:bg-blue-700
 * py-1 px-3 text-sm
 */
```