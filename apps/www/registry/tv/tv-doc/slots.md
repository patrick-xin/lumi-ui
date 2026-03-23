# Slots

Slots allow you to separate a component into multiple parts.

## Basic Usage

You can add slots by using the `slots` key. There's no limit to how many slots you can add.

```javascript
import { tv } from 'tailwind-variants';
 
const card = tv({
  slots: {
    base: 'md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-gray-900',
    avatar:
      'w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto drop-shadow-lg',
    wrapper: 'flex-1 pt-6 md:p-8 text-center md:text-left space-y-4',
    description: 'text-md font-medium',
    infoWrapper: 'font-medium',
    name: 'text-sm text-sky-500 dark:text-sky-400',
    role: 'text-sm text-slate-700 dark:text-slate-500'
  }
});
 
const { base, avatar, wrapper, description, infoWrapper, name, role } = card();
 
return (
  <figure className={base()}>
    <img
      className={avatar()}
      src="/intro-avatar.png"
      alt=""
      width="384"
      height="512"
    />
    <div className={wrapper()}>
      <blockquote>
        <p className={description()}>
          “Tailwind variants allows you to reduce repeated code in your project
          and make it more readable. They fixed the headache of building a
          design system with TailwindCSS.”
        </p>
      </blockquote>
      <figcaption className={infoWrapper()}>
        <div className={name()}>Zoey Lang</div>
        <div className={role()}>Full-stack developer, HeroUI</div>
      </figcaption>
    </div>
  </figure>
);
```

## Slots with variants

### React Example

```jsx
import { useState } from 'react';
import { tv } from 'tailwind-variants';
// Import your components
import { RadioGroup, Radio } from '@components';
 
const item = tv({
  slots: {
    base: 'flex flex-col mb-4 sm:flex-row p-6 bg-white dark:bg-stone-900 drop-shadow-xl rounded-xl',
    imageWrapper:
      'flex-none w-full sm:w-48 h-48 mb-6 sm:mb-0 sm:h-auto relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-xl before:bg-[#18000E] before:bg-gradient-to-r before:from-[#010187]',
    img: 'sm:scale-125 absolute z-10 top-2 sm:left-2 inset-0 w-full h-full object-cover rounded-lg',
    title:
      'relative w-full flex-none mb-2 text-2xl font-semibold text-stone-900 dark:text-white',
    price: 'relative font-semibold text-xl dark:text-white',
    previousPrice: 'relative line-through font-bold text-neutral-500 ml-3',
    percentOff: 'relative font-bold text-green-500 ml-3',
    sizeButton:
      'cursor-pointer select-none relative font-semibold rounded-full w-10 h-10 flex items-center justify-center active:opacity-80 dark:text-white peer-checked:text-white',
    buyButton:
      'text-xs sm:text-sm px-4 h-10 rounded-lg shadow-lg uppercase font-semibold tracking-wider text-white active:opacity-80',
    addToBagButton:
      'text-xs sm:text-sm px-4 h-10 rounded-lg uppercase font-semibold tracking-wider border-2 active:opacity-80'
  },
  variants: {
    color: {
      primary: {
        buyButton: 'bg-blue-500 shadow-blue-500/50',
        sizeButton: 'peer-checked:bg-blue',
        addToBagButton: 'text-blue-500 border-blue-500'
      },
      secondary: {
        buyButton: 'bg-purple-500 shadow-purple-500/50',
        sizeButton: 'peer-checked:bg-purple',
        addToBagButton: 'text-purple-500 border-purple-500'
      },
      success: {
        buyButton: 'bg-green-500 shadow-green-500/50',
        sizeButton: 'peer-checked:bg-green',
        addToBagButton: 'text-green-500 border-green-500'
      }
    }
  }
});
 
const itemSizes = ['xs', 's', 'm', 'l', 'xl'];
 
const App = () => {
  const [size, setSize] = useState('xs');
  const [color, setColor] = useState('primary');
 
  const {
    base,
    imageWrapper,
    img,
    title,
    price,
    previousPrice,
    percentOff,
    sizeButton,
    buyButton,
    addToBagButton
  } = item({ color });
 
  return (
    <div>
      <div className={base()}>
        <div className={imageWrapper()}>
          <img alt="" className={img()} loading="lazy" src="/shoes-1.png" />
        </div>
        <div className="flex-auto pl-4 sm:pl-8">
          <div className="relative flex flex-wrap items-baseline">
            <h1 className={title()}>Nike Adapt BB 2.0</h1>
            <div className={price()}>$279.97</div>
            <div className={previousPrice()}>$350</div>
            <div className={percentOff()}>20% off</div>
          </div>
          <div className="my-4 flex items-baseline">
            <div className="flex space-x-3 text-sm font-medium">
              {itemSizes.map((itemSize) => (
                <label key={itemSize}>
                  <input
                    checked={size === itemSize}
                    className="peer sr-only"
                    name="size"
                    type="radio"
                    value={itemSize}
                    onChange={() => setSize(itemSize)}
                  />
                  <div className={sizeButton()}>{itemSize.toUpperCase()}</div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button className={buyButton()}>Buy now</button>
            <button className={addToBagButton()}>Add to bag</button>
          </div>
        </div>
      </div>
      <RadioGroup label="Select color:" value={color} onChange={setColor}>
        <Radio value="primary">Primary</Radio>
        <Radio value="secondary">Secondary</Radio>
        <Radio value="success">Success</Radio>
      </RadioGroup>
    </div>
  );
};
 
export default App;
```

## Slots with compound variants

Like variants, you can also define the styles for each slot when using compound variants. The slots can be passed to `class` or `className` as an object.

```javascript
import { tv } from 'tailwind-variants';
 
const alert = tv({
  slots: {
    root: 'rounded py-3 px-5 mb-4',
    title: 'font-bold mb-1',
    message: ''
  },
  variants: {
    variant: {
      outlined: {
        root: 'border'
      },
      filled: {
        root: ''
      }
    },
    severity: {
      error: '',
      success: ''
    }
  },
  compoundVariants: [
    {
      variant: 'outlined',
      severity: 'error',
      class: {
        root: 'border-red-700 dark:border-red-500',
        title: 'text-red-700 dark:text-red-500',
        message: 'text-red-600 dark:text-red-500'
      }
    },
    {
      variant: 'outlined',
      severity: 'success',
      class: {
        root: 'border-green-700 dark:border-green-500',
        title: 'text-green-700 dark:text-green-500',
        message: 'text-green-600 dark:text-green-500'
      }
    },
    {
      variant: 'filled',
      severity: 'error',
      class: {
        root: 'bg-red-100 dark:bg-red-800',
        title: 'text-red-900 dark:text-red-50',
        message: 'text-red-700 dark:text-red-200'
      }
    },
    {
      variant: 'filled',
      severity: 'success',
      class: {
        root: 'bg-green-100 dark:bg-green-800',
        title: 'text-green-900 dark:text-green-50',
        message: 'text-green-700 dark:text-green-200'
      }
    }
  ],
  defaultVariants: {
    variant: 'filled',
    severity: 'success'
  }
});
 
const { root, message, title } = alert({ severity, variant });
 
return (
  <div className={root()}>
    <div className={title()}>Oops, something went wrong</div>
    <div className={message()}>
      Something went wrong saving your changes. Try again later.
    </div>
  </div>
);
```

## Compound slots

Compound slots allow applying classes to multiple slots at once. This avoids having to repeat the same classes in multiple slots.

```javascript
import { tv } from 'tailwind-variants';
 
const pagination = tv({
  slots: {
    base: 'flex flex-wrap relative gap-1 max-w-fit',
    item: 'data-[active="true"]:bg-blue-500 data-[active="true"]:text-white',
    prev: '',
    next: ''
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {}
    }
  },
  defaultVariants: {
    size: 'md'
  },
  compoundSlots: [
    // if you dont specify any variant, it will always be applied
    {
      slots: ['item', 'prev', 'next'],
      class: [
        'flex',
        'flex-wrap',
        'truncate',
        'box-border',
        'outline-none',
        'items-center',
        'justify-center',
        'bg-neutral-100',
        'hover:bg-neutral-200',
        'active:bg-neutral-300',
        'text-neutral-500'
      ] // --> these classes will be applied to all slots
    },
    // if you specify a variant, it will only be applied if the variant is active
    {
      slots: ['item', 'prev', 'next'],
      size: 'xs',
      class: 'w-7 h-7 text-xs' // --> these classes will be applied to all slots if size is xs
    },
    {
      slots: ['item', 'prev', 'next'],
      size: 'sm',
      class: 'w-8 h-8 text-sm' // --> these classes will be applied to all slots if size is sm
    },
    {
      slots: ['item', 'prev', 'next'],
      size: 'md',
      class: 'w-9 h-9 text-base' // --> these classes will be applied to all slots if size is md
    }
  ]
});
```

### React Implementation

```jsx
const App = () => {
  const { base, item, prev, next } = pagination();
 
  return (
    <ul aria-label="pagination navigation" className={base()}>
      <li
        aria-label="Go to previous page"
        className={prev()}
        data-disabled="true"
        role="button"
      >
        {'<'}
      </li>
      <li aria-label="page 1" className={item()} role="button">
        1
      </li>
      <li aria-label="page 2" className={item()} role="button">
        2
      </li>
      <li
        aria-label="page 3"
        className={item()}
        data-active="true"
        role="button"
      >
        3
      </li>
      <li aria-label="page 4" className={item()} role="button">
        4
      </li>
      <li aria-label="page 5" className={item()} role="button">
        5
      </li>
      <li aria-hidden="true" className={item()} role="button">
        ...
      </li>
      <li aria-label="page 10" className={item()} role="button">
        10
      </li>
      <li aria-label="Go to next page" className={next()} role="button">
        {'>'}
      </li>
    </ul>
  );
};
 
export default App;
```

## Slot variant overrides

Some component libraries use class render props to allow customizing the class name of a component based on internal state. Tailwind Variants supports slot level variant overrides to make it simple to override the selected variant(s) per slot as necessary.

```javascript
import { tv } from 'tailwind-variants';
 
const card = tv({
  slots: {
    base: 'flex gap-2',
    tab: 'rounded'
  },
  variants: {
    color: {
      primary: {
        tab: 'text-blue-500 dark:text-blue-400'
      },
      secondary: {
        tab: 'text-purple-500 dark:text-purple-400'
      }
    },
    isSelected: {
      true: {
        tab: 'font-bold'
      }
    }
  }
});
 
const { base, tab } = card({ color: 'primary' });
 
return (
  <Tabs className={base()}>
    {items.map((item) => (
      <Tab className={({ isSelected }) => tab({ isSelected })} id={item.id}>
        {item.label}
      </Tab>
    ))}
  </Tabs>
);
```