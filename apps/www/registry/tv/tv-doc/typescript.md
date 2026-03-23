# TypeScript

Tailwind Variants provides typing out of the box, but this page contains some further utilities and tips.

## Extract variants from a component

You can use the `VariantProps` utility to extract variants from a component.

```typescript
import { tv, type VariantProps } from 'tailwind-variants';
 
export const button = tv({
  base: 'px-4 py-1.5 rounded-full hover:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      neutral: 'bg-zinc-500 text-black dark:text-white'
    },
    flat: {
      true: 'bg-transparent'
    }
  },
  defaultVariants: {
    color: 'primary'
  },
  compoundVariants: [
    {
      color: 'primary',
      flat: true,
      class: 'bg-blue-500/40'
    }
  ]
});
 
type ButtonVariants = VariantProps<typeof button>;
 
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
}
 
export const Button = (props: ButtonProps) => {
  return <button className={button(props)}>{props.children}</button>;
};
```

## Required variants

Tailwind Variants doesn't offer a way to make variants required yet, but you can use TypeScript's Utility Types to achieve this.

```typescript
import { tv, type VariantProps } from 'tailwind-variants'
 
const buttonStyles = tv({
  base: "px-4 py-1.5 rounded-full",
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      neutral: "bg-zinc-500 text-white",
    },
    requiredFlat: {
      true: "bg-transparent",
      false: "bg-white",
    },
  }
});
 
type ButtonVariants = VariantProps<typeof buttonStyles>
 
export interface ButtonProps
  extends Omit<ButtonVariants, "requiredFlat">,
    Required<Pick<ButtonVariants, "requiredFlat">> {}
 
export const button = (props: ButtonProps) => buttonStyles(props);
 
// ❌ TypeScript Error:
// Property "requiredFlat" is missing in type "{}" but required in type "ButtonProps".
button({});
 
// ✅
button({ requiredFlat: true });
```