# Composing components

Tailwind Variants allows you to easily compose components using the `extend` prop or the resultant function.

## Using the `extend` prop

The `extend` prop allows you to extend the component including its variants, slots, `defaultVariants` and `compoundVariants`. It automatically merges the values of same keys and offers TypeScript autocomplete.

### Basic example

```jsx
import { tv } from 'tailwind-variants';
 
const baseButton = tv({
  base: 'font-semibold py-1 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200'
});
 
const buyButton = tv({
  extend: baseButton,
  base: 'text-sm text-white bg-blue-500 hover:bg-blue-600 shadow-lg uppercase'
});
 
return (
  <div className="flex gap-3">
    <button className={baseButton()}>Button</button>
    <button className={buyButton()}>Buy button</button>
  </div>
);
```

## Extending components with variants

Components with variants will inherit their variants when composed.

```javascript
import { tv } from 'tailwind-variants';
 
const baseButton = tv({
  base: 'font-semibold text-white rounded-full',
  variants: {
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500'
    },
    size: {
      small: 'py-0 px-2 text-xs',
      medium: 'py-1 px-3 text-sm'
    }
  }
});
 
const myButton = tv({
  extend: baseButton,
  variants: {
    isSquared: {
      true: 'rounded-sm'
    }
  }
});
 
myButton({ color: 'primary', size: 'medium', isSquared: true });
```

## Extending with Defaults & Compound Variants

You can also extend components with `defaultVariants` and `compoundVariants`.

```javascript
import { tv } from 'tailwind-variants';
 
const baseButton = tv({
  base: 'font-semibold text-white rounded-full',
  variants: {
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500'
    }
  },
  defaultVariants: {
    color: 'primary'
  },
  compoundVariants: [
    {
      color: 'primary',
      className: 'uppercase'
    }
  ]
});
 
const myButton = tv({
  extend: baseButton
});
 
myButton();
```

## Extending components with slots

Components with slots will inherit their slots when composed.

```jsx
import { tv } from 'tailwind-variants';
 
const cardBase = tv({
  slots: {
    base: 'md:flex bg-slate-100 rounded-xl p-4',
    avatar: 'w-24 h-24 rounded-full mx-auto',
    wrapper: 'flex-1 space-y-4',
    name: 'text-sm text-sky-500',
    role: 'text-sm text-slate-700'
  }
});
 
const myCard = tv({
  extend: cardBase
});
 
const { base, avatar, wrapper, name, role } = myCard();
 
return (
  <figure className={base()}>
    <img className={avatar()} src="/avatar.png" />
    <div className={wrapper()}>
      <div className={name()}>Zoey Lang</div>
      <div className={role()}>Full-stack developer</div>
    </div>
  </figure>
);
```

## Using the result

You can use the result of the `tv()` function to compose your components. However, this method is not type-safe and you will have to use the `class` / `className` prop to pass the result to the new component.

```javascript
import { tv } from 'tailwind-variants';
 
const baseButton = tv({
  base: 'font-medium text-sm px-3 py-1 bg-blue-500 text-white rounded-full'
});
 
const actionButton = tv({
  base: [baseButton(), 'bg-red-500', 'rounded-xs']
});
```