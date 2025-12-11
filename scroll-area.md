---
title: Scroll Area
subtitle: A native scroll container with custom scrollbars.
description: A high-quality, unstyled React scroll area that provides a native scroll container with custom scrollbars.
---

# Scroll Area

A high-quality, unstyled React scroll area that provides a native scroll container with custom scrollbars.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className="h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]">
      <ScrollArea.Viewport className="h-full overscroll-contain rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
        <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-[1.375rem] text-gray-900">
          <p>
            Vernacular architecture is building done outside any academic tradition, and without
            professional guidance. It is not a particular architectural movement or style, but
            rather a broad category, encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both historical and extant and
            classical and modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and built by engineers.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is constrained by the
            materials available in its particular region and reflects local traditions and cultural
            practices. The study of vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of local builders, who
            were rarely given any attribution for the work. More recently, vernacular architecture
            has been examined by designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a broader interest in
            sustainable design.
          </p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto">
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
```

### CSS Modules

This example shows how to implement the component using CSS Modules.

```css
/* index.module.css */
.ScrollArea {
  box-sizing: border-box;
  width: 24rem;
  height: 8.5rem;
  max-width: calc(100vw - 8rem);
}

.Viewport {
  height: 100%;
  border-radius: 0.375rem;
  outline: 1px solid var(--color-gray-200);
  outline-offset: -1px;
  overscroll-behavior: contain;

  &:focus-visible {
    outline: 2px solid var(--color-blue);
  }
}

.Content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: 0.75rem;
  padding-left: 1rem;
  padding-right: 1.5rem;
}

.Paragraph {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: var(--color-gray-900);
}

.Scrollbar {
  display: flex;
  justify-content: center;
  background-color: var(--color-gray-200);
  width: 0.25rem;
  border-radius: 0.375rem;
  margin: 0.5rem;
  opacity: 0;
  transition: opacity 150ms;
  pointer-events: none;

  &[data-scrolling] {
    transition-duration: 0ms;
  }

  &[data-hovering],
  &[data-scrolling] {
    opacity: 1;
    pointer-events: auto;
  }

  &::before {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 100%;
  }
}

.Thumb {
  width: 100%;
  border-radius: inherit;
  background-color: var(--color-gray-500);
}
```

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import styles from './index.module.css';

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className={styles.ScrollArea}>
      <ScrollArea.Viewport className={styles.Viewport}>
        <ScrollArea.Content className={styles.Content}>
          <p className={styles.Paragraph}>
            Vernacular architecture is building done outside any academic tradition, and without
            professional guidance. It is not a particular architectural movement or style, but
            rather a broad category, encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both historical and extant and
            classical and modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and built by engineers.
          </p>
          <p className={styles.Paragraph}>
            This type of architecture usually serves immediate, local needs, is constrained by the
            materials available in its particular region and reflects local traditions and cultural
            practices. The study of vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of local builders, who
            were rarely given any attribution for the work. More recently, vernacular architecture
            has been examined by designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a broader interest in
            sustainable design.
          </p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
```

## Anatomy

Import the component and assemble its parts:

```jsx title="Anatomy"
import { ScrollArea } from '@base-ui-components/react/scroll-area';

<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content />
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>;
```

## Examples

### Both scrollbars

Use `<ScrollArea.Corner>` to prevent the scrollbars from intersecting.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export default function ExampleScrollAreaBoth() {
  return (
    <ScrollArea.Root className="h-80 w-80 max-w-[calc(100vw-8rem)]">
      <ScrollArea.Viewport className="h-full overscroll-contain rounded-lg border border-gray-200 focus-visible:outline focus-visible:outline-blue-800 focus-visible:outline-offset-2">
        <ScrollArea.Content className="p-5">
          <ul className="m-0 grid list-none grid-cols-[repeat(10,6.25rem)] grid-rows-[repeat(10,6.25rem)] gap-3 p-0">
            {Array.from({ length: 100 }, (_, i) => (
              <li
                key={i}
                className="flex items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-600"
              >
                {i + 1}
              </li>
            ))}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="relative flex rounded bg-gray-200 opacity-0 transition-opacity pointer-events-none before:absolute before:content-[''] data-[orientation=vertical]:m-2 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=horizontal]:m-2 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:-bottom-2 data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0">
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="relative flex rounded bg-gray-200 opacity-0 transition-opacity pointer-events-none before:absolute before:content-[''] data-[orientation=vertical]:m-2 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=horizontal]:m-2 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:-bottom-2 data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
```

### CSS Modules

This example shows how to implement the component using CSS Modules.

```css
/* index.module.css */
.ScrollArea {
  box-sizing: border-box;
  width: 20rem;
  height: 20rem;
  max-width: calc(100vw - 8rem);
}

.Viewport {
  height: 100%;
  border-radius: 0.5rem;
  outline: 1px solid var(--color-gray-200);
  outline-offset: -1px;
  overscroll-behavior: contain;

  &:focus-visible {
    outline: 2px solid var(--color-blue);
  }
}

.Content {
  padding: 1.25rem;
}

.Grid {
  display: grid;
  grid-template-columns: repeat(10, 6.25rem);
  grid-template-rows: repeat(10, 6.25rem);
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.Item {
  border-radius: 0.5rem;
  background-color: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.Scrollbar {
  display: flex;
  position: relative;
  background-color: var(--color-gray-200);
  border-radius: 0.375rem;
  margin: 0.5rem;
  opacity: 0;
  transition: opacity 150ms;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
  }

  &[data-scrolling] {
    transition-duration: 0ms;
  }

  &[data-hovering],
  &[data-scrolling] {
    opacity: 1;
    pointer-events: auto;
  }

  &[data-orientation='vertical'] {
    width: 0.25rem;
    margin: 0.5rem;

    &::before {
      width: 1.25rem;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &[data-orientation='horizontal'] {
    height: 0.25rem;
    margin: 0.5rem;

    &::before {
      width: 100%;
      height: 1.25rem;
      left: 0;
      right: 0;
      bottom: -0.5rem;
    }
  }
}

.Thumb {
  width: 100%;
  border-radius: inherit;
  background-color: var(--color-gray-500);
}
```

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import styles from './index.module.css';

export default function ExampleScrollAreaBoth() {
  return (
    <ScrollArea.Root className={styles.ScrollArea}>
      <ScrollArea.Viewport className={styles.Viewport}>
        <ScrollArea.Content className={styles.Content}>
          <ul className={styles.Grid}>
            {Array.from({ length: 100 }, (_, i) => (
              <li key={i} className={styles.Item}>
                {i + 1}
              </li>
            ))}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={styles.Scrollbar} orientation="horizontal">
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
```

### Gradient scroll fade

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export default function ExampleScrollAreaScrollFade() {
  return (
    <ScrollArea.Root className="box-border h-48 w-96 max-w-[calc(100vw-8rem)] rounded-lg bg-[var(--color-gray-50)]">
      <ScrollArea.Viewport className="h-full rounded-md overscroll-contain bg-[var(--color-gray-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 before:[--scroll-area-overflow-y-start:inherit] after:[--scroll-area-overflow-y-end:inherit] before:content-[''] after:content-[''] before:block after:block before:absolute after:absolute before:left-0 after:left-0 before:w-full after:w-full before:pointer-events-none after:pointer-events-none before:rounded-md after:rounded-md before:transition-[height] after:transition-[height] before:duration-100 after:duration-100 before:ease-out after:ease-out before:top-0 after:bottom-0 before:bg-[linear-gradient(to_bottom,var(--color-gray-50),transparent)] after:bg-[linear-gradient(to_top,var(--color-gray-50),transparent)] before:[height:min(40px,var(--scroll-area-overflow-y-start))] after:[height:min(40px,var(--scroll-area-overflow-y-end,40px))]">
        <ScrollArea.Content className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-[1.375rem] text-gray-900">
          <p>
            Vernacular architecture is building done outside any academic tradition, and without
            professional guidance. It is not a particular architectural movement or style, but
            rather a broad category, encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both historical and extant and
            classical and modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and built by engineers.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is constrained by the
            materials available in its particular region and reflects local traditions and cultural
            practices. The study of vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of local builders, who
            were rarely given any attribution for the work. More recently, vernacular architecture
            has been examined by designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a broader interest in
            sustainable design.
          </p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="pointer-events-none m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity duration-150 data-[hovering]:pointer-events-auto data-[hovering=true]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering=true]:opacity-100 data-[scrolling]:pointer-events-auto data-[scrolling=true]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling=true]:opacity-100 data-[scrolling]:duration-0 data-[scrolling=true]:duration-0 before:absolute before:h-full before:w-5 before:content-['']">
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
```

### CSS Modules

This example shows how to implement the component using CSS Modules.

```css
/* index.module.css */
.ScrollArea {
  box-sizing: border-box;
  width: 24rem;
  height: 12rem;
  max-width: calc(100vw - 8rem);
  background-color: var(--color-gray-50);
  border-radius: 0.5rem;
}

.Viewport {
  height: 100%;
  border-radius: 0.375rem;
  overscroll-behavior: contain;
  background: var(--color-gray-50);

  &:focus-visible {
    outline: 2px solid var(--color-blue);
  }

  &::before,
  &::after {
    content: '';
    display: block;
    left: 0;
    width: 100%;
    position: absolute;
    pointer-events: none;
    border-radius: 0.375rem;
    transition: height 0.1s ease-out;
  }

  &::before {
    --scroll-area-overflow-y-start: inherit;
    top: 0;
    height: min(40px, var(--scroll-area-overflow-y-start));
    background: linear-gradient(to bottom, var(--color-gray-50), transparent);
  }

  &::after {
    --scroll-area-overflow-y-end: inherit;
    bottom: 0;
    height: min(40px, var(--scroll-area-overflow-y-end, 40px));
    background: linear-gradient(to top, var(--color-gray-50), transparent);
  }
}

.Content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: 0.75rem;
  padding-left: 1rem;
  padding-right: 1.5rem;
}

.Paragraph {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: var(--color-gray-900);
}

.Scrollbar {
  display: flex;
  justify-content: center;
  background-color: var(--color-gray-200);
  width: 0.25rem;
  border-radius: 0.375rem;
  margin: 0.5rem;
  opacity: 0;
  transition: opacity 150ms;
  pointer-events: none;

  &[data-scrolling] {
    transition-duration: 0ms;
  }

  &[data-hovering],
  &[data-scrolling] {
    opacity: 1;
    pointer-events: auto;
  }

  &::before {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 100%;
  }
}

.Thumb {
  width: 100%;
  border-radius: inherit;
  background-color: var(--color-gray-500);
}

.ScrollUp {
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;

  [data-overflow-y-start] & {
    opacity: 1;
    pointer-events: auto;
  }
}
```

```tsx
/* index.tsx */
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import styles from './index.module.css';

export default function ExampleScrollAreaScrollFade() {
  return (
    <ScrollArea.Root className={styles.ScrollArea}>
      <ScrollArea.Viewport className={styles.Viewport}>
        <ScrollArea.Content className={styles.Content}>
          <p className={styles.Paragraph}>
            Vernacular architecture is building done outside any academic tradition, and without
            professional guidance. It is not a particular architectural movement or style, but
            rather a broad category, encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both historical and extant and
            classical and modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and built by engineers.
          </p>
          <p className={styles.Paragraph}>
            This type of architecture usually serves immediate, local needs, is constrained by the
            materials available in its particular region and reflects local traditions and cultural
            practices. The study of vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of local builders, who
            were rarely given any attribution for the work. More recently, vernacular architecture
            has been examined by designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a broader interest in
            sustainable design.
          </p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
```

Use the viewport overflow CSS variables to fade the scroll edges, which gradually increases in strength as the user scrolls away from the edges.

The CSS variables do not inherit by default to improve rendering performance in complex scroll areas with deep subtrees. To use them in child elements (or pseudo-elements on `<ScrollArea.Viewport>`), you must manually set each variable to `inherit`.

```css title="scroll-area.module.css" {15,22}
.Viewport {
  &::before,
  &::after {
    content: '';
    display: block;
    left: 0;
    width: 100%;
    position: absolute;
    pointer-events: none;
    border-radius: 0.375rem;
    transition: height 0.1s ease-out;
  }

  &::before {
    --scroll-area-overflow-y-start: inherit;
    top: 0;
    height: min(40px, var(--scroll-area-overflow-y-start));
    background: linear-gradient(to bottom, var(--color-gray-50), transparent);
  }

  &::after {
    --scroll-area-overflow-y-end: inherit;
    bottom: 0;
    height: min(40px, var(--scroll-area-overflow-y-end, 40px));
    background: linear-gradient(to top, var(--color-gray-50), transparent);
  }
}
```

For SSR, a fallback can be used as part of the `var()` function to provide a default height.

```css title="SSR fallback" ", 40px"
.Viewport::after {
  height: min(40px, var(--scroll-area-overflow-y-end, 40px));
}
```

## API reference

### Root

Groups all parts of the scroll area.
Renders a `<div>` element.

**Root Props:**

| Prop                  | Type                                                                                 | Default | Description                                                                                                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| overflowEdgeThreshold | `number \| Partial<{ xStart: number, xEnd: number, yStart: number, yEnd: number }>`  | `0`     | The threshold in pixels that must be passed before the overflow edge attributes are applied.&#xA;Accepts a single number for all edges or an object to configure them individually.          |
| className             | `string \| ((state: ScrollArea.Root.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style                 | `CSSProperties \| ((state: ScrollArea.Root.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render                | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Root.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Root Data Attributes:**

| Attribute             | Type | Description                                                       |
| :-------------------- | :--- | :---------------------------------------------------------------- |
| data-has-overflow-x   | -    | Present when the scroll area content is wider than the viewport.  |
| data-has-overflow-y   | -    | Present when the scroll area content is taller than the viewport. |
| data-overflow-x-end   | -    | Present when there is overflow on the horizontal end side.        |
| data-overflow-x-start | -    | Present when there is overflow on the horizontal start side.      |
| data-overflow-y-end   | -    | Present when there is overflow on the vertical end side.          |
| data-overflow-y-start | -    | Present when there is overflow on the vertical start side.        |

**Root CSS Variables:**

| Variable                    | Type     | Default | Description                      |
| :-------------------------- | :------- | :------ | :------------------------------- |
| --scroll-area-corner-height | `number` | -       | The scroll area's corner height. |
| --scroll-area-corner-width  | `number` | -       | The scroll area's corner width.  |

### Viewport

The actual scrollable container of the scroll area.
Renders a `<div>` element.

**Viewport Props:**

| Prop      | Type                                                                                     | Default | Description                                                                                                                                                                                  |
| :-------- | :--------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: ScrollArea.Viewport.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: ScrollArea.Viewport.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Viewport.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Viewport Data Attributes:**

| Attribute             | Type | Description                                                       |
| :-------------------- | :--- | :---------------------------------------------------------------- |
| data-has-overflow-x   | -    | Present when the scroll area content is wider than the viewport.  |
| data-has-overflow-y   | -    | Present when the scroll area content is taller than the viewport. |
| data-overflow-x-end   | -    | Present when there is overflow on the horizontal end side.        |
| data-overflow-x-start | -    | Present when there is overflow on the horizontal start side.      |
| data-overflow-y-end   | -    | Present when there is overflow on the vertical end side.          |
| data-overflow-y-start | -    | Present when there is overflow on the vertical start side.        |

**Viewport CSS Variables:**

| Variable                       | Type     | Default | Description                                            |
| :----------------------------- | :------- | :------ | :----------------------------------------------------- |
| --scroll-area-overflow-x-end   | `number` | -       | The distance from the horizontal end edge in pixels.   |
| --scroll-area-overflow-x-start | `number` | -       | The distance from the horizontal start edge in pixels. |
| --scroll-area-overflow-y-end   | `number` | -       | The distance from the vertical end edge in pixels.     |
| --scroll-area-overflow-y-start | `number` | -       | The distance from the vertical start edge in pixels.   |

### Content

A container for the content of the scroll area.
Renders a `<div>` element.

**Content Props:**

| Prop      | Type                                                                                    | Default | Description                                                                                                                                                                                  |
| :-------- | :-------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: ScrollArea.Content.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: ScrollArea.Content.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Content.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Scrollbar

A vertical or horizontal scrollbar for the scroll area.
Renders a `<div>` element.

**Scrollbar Props:**

| Prop        | Type                                                                                      | Default      | Description                                                                                                                                                                                  |
| :---------- | :---------------------------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orientation | `'horizontal' \| 'vertical'`                                                              | `'vertical'` | Whether the scrollbar controls vertical or horizontal scroll.                                                                                                                                |
| className   | `string \| ((state: ScrollArea.Scrollbar.State) => string \| undefined)`                  | -            | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style       | `CSSProperties \| ((state: ScrollArea.Scrollbar.State) => CSSProperties \| undefined)`    | -            | -                                                                                                                                                                                            |
| keepMounted | `boolean`                                                                                 | `false`      | Whether to keep the HTML element in the DOM when the viewport isn’t scrollable.                                                                                                              |
| render      | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Scrollbar.State) => ReactElement)` | -            | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Scrollbar Data Attributes:**

| Attribute             | Type                         | Description                                                       |
| :-------------------- | :--------------------------- | :---------------------------------------------------------------- |
| data-orientation      | `'horizontal' \| 'vertical'` | Indicates the orientation of the scrollbar.                       |
| data-has-overflow-x   | -                            | Present when the scroll area content is wider than the viewport.  |
| data-has-overflow-y   | -                            | Present when the scroll area content is taller than the viewport. |
| data-hovering         | -                            | Present when the pointer is over the scroll area.                 |
| data-overflow-x-end   | -                            | Present when there is overflow on the horizontal end side.        |
| data-overflow-x-start | -                            | Present when there is overflow on the horizontal start side.      |
| data-overflow-y-end   | -                            | Present when there is overflow on the vertical end side.          |
| data-overflow-y-start | -                            | Present when there is overflow on the vertical start side.        |
| data-scrolling        | -                            | Present when the users scrolls inside the scroll area.            |

**Scrollbar CSS Variables:**

| Variable                   | Type     | Default | Description                     |
| :------------------------- | :------- | :------ | :------------------------------ |
| --scroll-area-thumb-height | `number` | -       | The scroll area thumb's height. |
| --scroll-area-thumb-width  | `number` | -       | The scroll area thumb's width.  |

### Thumb

The draggable part of the the scrollbar that indicates the current scroll position.
Renders a `<div>` element.

**Thumb Props:**

| Prop      | Type                                                                                  | Default | Description                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: ScrollArea.Thumb.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: ScrollArea.Thumb.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Thumb.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Thumb Data Attributes:**

| Attribute        | Type                         | Description                                 |
| :--------------- | :--------------------------- | :------------------------------------------ |
| data-orientation | `'horizontal' \| 'vertical'` | Indicates the orientation of the scrollbar. |

### Corner

A small rectangular area that appears at the intersection of horizontal and vertical scrollbars.
Renders a `<div>` element.

**Corner Props:**

| Prop      | Type                                                                                   | Default | Description                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: ScrollArea.Corner.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: ScrollArea.Corner.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: ScrollArea.Corner.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |
