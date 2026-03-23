# Overriding styles

All Tailwind Variants components provide an optional `class` / `className` for overriding classes on any component.

## Overriding styles on a single component

```javascript
import { tv } from 'tailwind-variants';
 
const button = tv({
  base: 'font-semibold text-white py-1 px-3 rounded-full',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700'
    }
  }
});
 
button({
  color: 'secondary',
  class: 'bg-pink-500' // overrides the color variant
});
```

## Overriding styles on a component with slots

```jsx
import { tv } from 'tailwind-variants';
 
const card = tv({
  slots: {
    base: 'md:flex bg-slate-100 rounded-xl p-4',
    avatar: 'w-24 h-24 rounded-full mx-auto',
    wrapper: 'flex-1 space-y-4',
    name: 'text-sm text-sky-500',
    role: 'text-sm text-slate-700'
  }
});
 
const { base, avatar, wrapper, name, role } = card();
 
return (
  <figure className={base({ class: 'bg-purple-100' })}>
    <img className={avatar()} src="/avatar.png" />
    <div className={wrapper()}>
      <div className={name({ class: 'text-purple-500' })}>
        Zoey Lang
      </div>
      <div className={role({ class: 'text-purple-100' })}>
        Full-stack developer
      </div>
    </div>
  </figure>
);
```