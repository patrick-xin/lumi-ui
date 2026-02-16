---
title: Drawer
subtitle: A panel that slides in from the edge of the screen.
description: A high-quality, unstyled React drawer component with swipe-to-dismiss gestures.
---

# Drawer

A high-quality, unstyled React drawer component with swipe-to-dismiss gestures.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

export default function ExampleDrawer() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Open drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-[var(--viewport-padding)]">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(20rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-[3rem] bg-gray-50 p-6 pr-[calc(1.5rem+3rem)] text-gray-900 outline outline-1 outline-gray-200 overflow-y-auto overscroll-contain touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[ending-style]:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[starting-style]:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6 dark:outline-gray-300">
            <Drawer.Content className="mx-auto w-full max-w-[32rem]">
              <Drawer.Title className="-mt-1.5 mb-1 text-lg font-medium">Drawer</Drawer.Title>
              <Drawer.Description className="mb-6 text-base text-gray-600">
                This is a drawer that slides in from the side. You can swipe to dismiss it.
              </Drawer.Description>
              <div className="flex justify-end gap-4">
                <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```


## Anatomy

Import the component and assemble its parts:

```jsx title="Anatomy"
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

<Drawer.Provider>
  <Drawer.IndentBackground />
  <Drawer.Indent>
    <Drawer.Root>
      <Drawer.Trigger />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <Drawer.Title />
              <Drawer.Description />
              <Drawer.Close />
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  </Drawer.Indent>
</Drawer.Provider>;
```

Drawer supports swipe gestures to dismiss. Set `swipeDirection` to control which direction dismisses the drawer. `<Drawer.Content>` allows text selection of its children without swipe interference when using a mouse pointer.

## Examples

### Position

Positioning is handled by your styles. `swipeDirection` defaults to `"down"` for bottom sheets. Use `"up"`, `"left"`, or `"right"` for other drawer positions.

```tsx title="Swipe directions"
<Drawer.Root swipeDirection="right">
```

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

export default function ExampleDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Open bottom drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
          <Drawer.Popup className="-mb-[3rem] w-full max-h-[calc(80vh+3rem)] rounded-t-2xl bg-gray-50 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] pt-4 text-gray-900 outline outline-1 outline-gray-200 overflow-y-auto overscroll-contain touch-auto [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[ending-style]:[transform:translateY(calc(100%-3rem))] data-[starting-style]:[transform:translateY(calc(100%-3rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:outline-gray-300">
            <div className="w-12 h-1 mx-auto mb-4 rounded-full bg-gray-300" />
            <Drawer.Content className="mx-auto w-full max-w-[32rem]">
              <Drawer.Title className="mb-1 text-lg font-medium text-center">
                Notifications
              </Drawer.Title>
              <Drawer.Description className="mb-6 text-base text-gray-600 text-center">
                You are all caught up. Good job!
              </Drawer.Description>
              <div className="flex justify-center gap-4">
                <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

### Nested drawers

Use the `[data-nested-drawer-open]` selector and the `--nested-drawers` CSS variable to style drawers when a nested drawer is open.

This demo stacks nested drawers using a constant peek so the frontmost drawer stays anchored to the bottom while the ones behind it are scaled down and lifted. It also uses the `--drawer-height` and `--drawer-frontmost-height` CSS variables to handle varying drawer heights.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
'use client';
import * as React from 'react';
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

export default function ExampleDrawerNested() {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [thirdOpen, setThirdOpen] = React.useState(false);

  return (
    <Drawer.Root
      open={firstOpen}
      onOpenChange={(nextOpen) => {
        setFirstOpen(nextOpen);
        if (!nextOpen) {
          setSecondOpen(false);
          setThirdOpen(false);
        }
      }}
    >
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Open drawer stack
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
          <Drawer.Popup className={popupClassName}>
            <div className={handleClassName} />
            <Drawer.Content className={contentClassName}>
              <Drawer.Title className="mb-1 text-lg font-medium text-center">Account</Drawer.Title>
              <Drawer.Description className="mb-6 text-base text-gray-600 text-center">
                Nested drawers can be styled to stack, while each drawer remains independently focus
                managed.
              </Drawer.Description>

              <div className="flex items-center justify-end gap-4">
                <div className="mr-auto">
                  <Drawer.Root
                    open={secondOpen}
                    onOpenChange={(nextOpen) => {
                      setSecondOpen(nextOpen);
                      if (!nextOpen) {
                        setThirdOpen(false);
                      }
                    }}
                  >
                    <Drawer.Trigger className="text-base font-medium text-blue-800 rounded px-1.5 py-0.5 -m-0.5 hover:bg-blue-800/5 active:bg-blue-800/10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800">
                      Security settings
                    </Drawer.Trigger>
                    <Drawer.Portal>
                      <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                        <Drawer.Popup className={popupClassName}>
                          <div className={handleClassName} />
                          <Drawer.Content className={contentClassName}>
                            <Drawer.Title className="mb-1 text-lg font-medium text-center">
                              Security
                            </Drawer.Title>
                            <Drawer.Description className="mb-6 text-base text-gray-600 text-center">
                              Review sign-in activity and update your security preferences.
                            </Drawer.Description>

                            <ul className="mb-6 list-disc pl-5 text-gray-700">
                              <li>Passkeys enabled</li>
                              <li>2FA via authenticator app</li>
                              <li>3 signed-in devices</li>
                            </ul>

                            <div className="flex items-center justify-end gap-4">
                              <div className="mr-auto">
                                <Drawer.Root open={thirdOpen} onOpenChange={setThirdOpen}>
                                  <Drawer.Trigger className="text-base font-medium text-blue-800 rounded px-1.5 py-0.5 -m-0.5 hover:bg-blue-800/5 active:bg-blue-800/10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800">
                                    Advanced options
                                  </Drawer.Trigger>
                                  <Drawer.Portal>
                                    <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                                      <Drawer.Popup className={popupClassName}>
                                        <div className={handleClassName} />
                                        <Drawer.Content className={contentClassName}>
                                          <Drawer.Title className="mb-1 text-lg font-medium text-center">
                                            Advanced
                                          </Drawer.Title>
                                          <Drawer.Description className="mb-6 text-base text-gray-600 text-center">
                                            This drawer is taller to demonstrate variable-height
                                            stacking.
                                          </Drawer.Description>

                                          <div className="grid gap-1.5 mb-4">
                                            <label
                                              className="text-sm font-medium text-gray-700"
                                              htmlFor="device-name-tw"
                                            >
                                              Device name
                                            </label>
                                            <input
                                              id="device-name-tw"
                                              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800"
                                              defaultValue="Personal laptop"
                                            />
                                          </div>

                                          <div className="grid gap-1.5 mb-6">
                                            <label
                                              className="text-sm font-medium text-gray-700"
                                              htmlFor="notes-tw"
                                            >
                                              Notes
                                            </label>
                                            <textarea
                                              id="notes-tw"
                                              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-gray-900 resize-y focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800"
                                              defaultValue="Rotate recovery codes and revoke older sessions."
                                              rows={3}
                                            />
                                          </div>

                                          <div className="flex justify-end">
                                            <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                                              Done
                                            </Drawer.Close>
                                          </div>
                                        </Drawer.Content>
                                      </Drawer.Popup>
                                    </Drawer.Viewport>
                                  </Drawer.Portal>
                                </Drawer.Root>
                              </div>

                              <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                                Close
                              </Drawer.Close>
                            </div>
                          </Drawer.Content>
                        </Drawer.Popup>
                      </Drawer.Viewport>
                    </Drawer.Portal>
                  </Drawer.Root>
                </div>

                <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const popupClassName =
  "[--bleed:3rem] [--peek:1rem] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))] group/popup relative -mb-[3rem] w-full max-h-[calc(80vh+3rem)] [height:var(--drawer-height,auto)] rounded-t-2xl bg-gray-50 px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] text-gray-900 outline outline-1 outline-gray-200 overflow-y-auto overscroll-contain touch-auto shadow-[0_2px_10px_rgb(0_0_0/0.1)] data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0)] [transform-origin:50%_calc(100%-var(--bleed))] [transform:translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:inset-0 after:rounded-[inherit] after:bg-transparent after:pointer-events-none after:content-[''] after:transition-[background-color] after:duration-[450ms] after:ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[swiping]:duration-0 data-[nested-drawer-swiping]:duration-0 data-[ending-style]:[transform:translateY(calc(100%-var(--bleed)))] data-[starting-style]:[transform:translateY(calc(100%-var(--bleed)))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[nested-drawer-open]:h-[calc(var(--height)+var(--bleed))] data-[nested-drawer-open]:overflow-hidden data-[nested-drawer-open]:after:bg-black/5 dark:outline-gray-300 [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),height_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]";

const contentClassName =
  'mx-auto w-full max-w-[32rem] transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100';

const handleClassName =
  'mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300 transition-opacity duration-[200ms] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100';
```


### Snap points

Use `snapPoints` to snap a bottom sheet drawer to preset heights. Numbers between 0 and 1 represent fractions of the viewport height, and numbers greater than 1 are treated as pixel values. String values support `px` and `rem` units (for example, `'148px'` or `'30rem'`).

```tsx title="Snap points"
const snapPoints = ['148px', 1];
const [snapPoint, setSnapPoint] = React.useState<Drawer.Root.SnapPoint | null>(snapPoints[0]);

<Drawer.Root snapPoints={snapPoints} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
  {/* ... */}
</Drawer.Root>;
```

Apply the snap point offset in your styles when using vertical drawers:

```css title="Snap point offset"
.DrawerPopup {
  transform: translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y)));
}
```

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
'use client';
import * as React from 'react';
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

const TOP_MARGIN_REM = 1;
const VISIBLE_SNAP_POINTS_REM = [30];

function toViewportSnapPoint(heightRem: number) {
  return `${heightRem + TOP_MARGIN_REM}rem`;
}

const snapPoints = [...VISIBLE_SNAP_POINTS_REM.map(toViewportSnapPoint), 1];

export default function ExampleDrawerSnapPoints() {
  return (
    <Drawer.Root snapPoints={snapPoints}>
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Open snap drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center touch-none">
          <Drawer.Popup
            className="relative flex w-full max-h-[calc(100dvh-var(--top-margin))] min-h-0 flex-col overflow-visible rounded-t-2xl bg-gray-50 text-gray-900 outline outline-1 outline-gray-200 touch-none shadow-[0_-16px_48px_rgb(0_0_0/0.12),0_6px_18px_rgb(0_0_0/0.06)] [--bleed:3rem] [padding-bottom:max(0px,calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] [transform:translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-[var(--bleed)] after:bg-gray-50 after:content-[''] data-[swiping]:select-none data-[ending-style]:[transform:translateY(100%)] data-[starting-style]:[transform:translateY(100%)] data-[starting-style]:[padding-bottom:0] data-[ending-style]:[padding-bottom:0] data-[starting-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] data-[ending-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:outline-gray-300"
            style={{ '--top-margin': `${TOP_MARGIN_REM}rem` } as React.CSSProperties}
          >
            <div className="shrink-0 border-b border-gray-200 px-6 pt-3.5 pb-3 touch-none dark:border-gray-300">
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-300" />
              <Drawer.Title className="mt-2.5 cursor-default text-center text-lg font-medium">
                Snap points
              </Drawer.Title>
            </div>
            <Drawer.Content className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-auto px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <div className="mx-auto w-full max-w-[350px]">
                <Drawer.Description className="mb-4 text-base text-gray-600 text-center">
                  Drag the sheet to snap between a compact peek and a near full-height view.
                </Drawer.Description>
                <div className="grid gap-3 mb-6" aria-hidden>
                  {Array.from({ length: 20 }, (_, index) => (
                    <div
                      key={index}
                      className="h-12 rounded-xl border border-gray-200 bg-gray-100"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end gap-4">
                  <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                    Close
                  </Drawer.Close>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

By default, the drawer can skip snap points when swiping quickly. Specify the `snapToSequentialPoints` prop to disable velocity-based skipping so the snap target is determined by drag distance (you can still drag past multiple points).

### Indent effect

Scale the background down when any drawer opens by wrapping your app in `<Drawer.Provider>` and use `<Drawer.IndentBackground>` + `<Drawer.Indent>` at the top of your tree. Any `<Drawer.Root>` within the provider notifies it when it mounts, which activates the indent parts (they receive `[data-active]` state attributes).

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
'use client';
import * as React from 'react';
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

export default function ExampleDrawer() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <Drawer.Provider>
      <div ref={setPortalContainer} className="[--bleed:3rem] relative w-full overflow-hidden">
        <Drawer.IndentBackground className="absolute inset-0 bg-black dark:bg-gray-300" />
        <Drawer.Indent className="[--indent-progress:var(--drawer-swipe-progress)] [--indent-radius:calc(1rem*(1-var(--indent-progress)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))] relative min-h-[320px] bg-gray-50 border border-gray-200 p-4 text-gray-900 [transition:transform_0.4s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] origin-[center_top] will-change-transform [transform:scale(1)_translateY(0)] [transition-duration:calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))] data-[active]:[transform:scale(calc(0.98+(0.02*var(--indent-progress))))_translateY(calc(0.5rem*(1-var(--indent-progress))))] data-[active]:[border-top-left-radius:var(--indent-radius)] data-[active]:[border-top-right-radius:var(--indent-radius)]">
          <div className="flex min-h-[320px] items-center justify-center">
            <Drawer.Root modal={false}>
              <Drawer.Trigger className="box-border flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium leading-6 text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                Open drawer
              </Drawer.Trigger>
              <Drawer.Portal container={portalContainer}>
                <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] absolute inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
                <Drawer.Viewport className="absolute inset-0 flex items-end justify-center">
                  <Drawer.Popup className="box-border w-full max-h-[calc(80vh+var(--bleed))] -mb-[var(--bleed)] rounded-t-2xl outline outline-1 outline-gray-200 bg-gray-50 px-6 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--bleed))] text-gray-900 overflow-y-auto overscroll-contain transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [transform:translateY(var(--drawer-swipe-movement-y))] data-[swiping]:select-none data-[ending-style]:[transform:translateY(calc(100%-var(--bleed)))] data-[starting-style]:[transform:translateY(calc(100%-var(--bleed)))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:outline-gray-300">
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300" />
                    <Drawer.Content className="mx-auto w-full max-w-[32rem]">
                      <Drawer.Title className="mt-0 mb-1 text-lg leading-7 font-medium tracking-[-0.0025em] text-center">
                        Notifications
                      </Drawer.Title>
                      <Drawer.Description className="mb-6 text-base leading-6 text-gray-600 text-center">
                        You are all caught up. Good job!
                      </Drawer.Description>
                      <div className="flex justify-center gap-4">
                        <Drawer.Close className="box-border flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium leading-6 text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                          Close
                        </Drawer.Close>
                      </div>
                    </Drawer.Content>
                  </Drawer.Popup>
                </Drawer.Viewport>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </Drawer.Indent>
      </div>
    </Drawer.Provider>
  );
}
```

### Non-modal

Set `modal={false}` to opt out of focus trapping and `disablePointerDismissal` to keep the drawer open on outside clicks.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

export default function ExampleDrawer() {
  return (
    <Drawer.Root swipeDirection="right" modal={false} disablePointerDismissal>
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Open non-modal drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-[var(--viewport-padding)] pointer-events-none">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] pointer-events-auto h-full w-[calc(20rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-[3rem] bg-gray-50 p-6 pr-[calc(1.5rem+3rem)] text-gray-900 outline outline-1 outline-gray-200 overflow-y-auto overscroll-contain touch-auto shadow-[0_-16px_48px_rgb(0_0_0/0.12),0_6px_18px_rgb(0_0_0/0.06)] data-[starting-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] data-[ending-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] [transform:translateX(var(--drawer-swipe-movement-x))] transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[ending-style]:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[starting-style]:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6 dark:outline-gray-300">
            <Drawer.Content className="mx-auto w-full max-w-[32rem]">
              <Drawer.Title className="-mt-1.5 mb-1 text-lg font-medium">
                Non-modal drawer
              </Drawer.Title>
              <Drawer.Description className="mb-6 text-base text-gray-600">
                This drawer does not trap focus and ignores outside clicks. Use the close button or
                swipe to dismiss it.
              </Drawer.Description>
              <div className="flex justify-end gap-4">
                <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```


### Mobile navigation

You can build a full-screen mobile navigation sheet using Drawer parts, including a flick-to-dismiss from the top gesture.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';
import { ScrollArea } from '@base-ui/react/scroll-area';

const ITEMS = [
  { href: '#', label: 'Overview' },
  { href: '#', label: 'Components' },
  { href: '#', label: 'Utilities' },
  { href: '#', label: 'Releases' },
] as const;

const LONG_LIST = Array.from({ length: 50 }, (_, i) => ({
  href: '#',
  label: `Item ${i + 1}`,
}));

export default function ExampleDrawerMobileNav() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="box-border flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 m-0 outline-none text-base font-medium leading-6 text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1">
        Open mobile menu
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:1] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-[100dvh] bg-[linear-gradient(to_bottom,rgb(0_0_0/5%)_0,rgb(0_0_0/10%)_50%)] opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-[backdrop-filter,opacity] duration-[600ms] ease-[var(--ease-out-fast)] backdrop-blur-[1.5px] supports-[-webkit-touch-callout:none]:absolute data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:backdrop-blur-0 data-[ending-style]:backdrop-blur-0 data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]" />
        <Drawer.Viewport className="group fixed inset-0">
          <ScrollArea.Root
            style={{ position: undefined }}
            className="box-border h-full overscroll-contain transition-[transform,translate] duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[starting-style]:translate-y-[100dvh] group-data-[ending-style]:pointer-events-none"
          >
            <ScrollArea.Viewport className="box-border h-full overscroll-contain touch-auto">
              <ScrollArea.Content className="flex min-h-full items-end justify-center pt-8 md:py-16 md:px-16">
                <Drawer.Popup className="group box-border w-full max-w-[42rem] outline-none transition-transform duration-[800ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] [transform:translateY(var(--drawer-swipe-movement-y))] data-[swiping]:select-none data-[ending-style]:[transform:translateY(max(100dvh,100%))] data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]">
                  <nav
                    aria-label="Navigation"
                    className="relative flex flex-col rounded-t-2xl bg-gray-50 px-6 pt-4 pb-6 text-gray-900 shadow-[0_10px_64px_-10px_rgb(36_40_52/20%),0_0.25px_0_1px_var(--color-gray-200)] outline outline-1 outline-gray-200 transition-shadow duration-[350ms] ease-[cubic-bezier(0.375,0.015,0.545,0.455)] group-data-[ending-style]:shadow-[0_10px_64px_-10px_rgb(36_40_52/0%),0_0.25px_0_1px_rgb(0_0_0/0%)] dark:outline-gray-300 dark:shadow-[0_0_0_1px_var(--color-gray-200)] dark:group-data-[ending-style]:shadow-[0_0_0_1px_rgb(0_0_0/0%)] md:rounded-xl"
                  >
                    <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center">
                      <div aria-hidden className="h-9 w-9" />
                      <div className="h-1 w-12 justify-self-center rounded-full bg-gray-300" />
                      <Drawer.Close
                        aria-label="Close menu"
                        className="flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 active:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M0.75 0.75L6 6M11.25 11.25L6 6M6 6L0.75 11.25M6 6L11.25 0.75"
                            stroke="currentcolor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Drawer.Close>
                    </div>

                    <Drawer.Content className="w-full">
                      <Drawer.Title className="m-0 mb-1 text-lg font-medium leading-7 tracking-[-0.0025em]">
                        Menu
                      </Drawer.Title>
                      <Drawer.Description className="m-0 mb-5 text-base leading-6 text-gray-600">
                        Scroll the long list. Flick down from the top to dismiss.
                      </Drawer.Description>

                      <div className="pb-8">
                        <ul className="grid list-none gap-1 p-0 m-0">
                          {ITEMS.map((item) => (
                            <li key={item.label} className="flex">
                              <NextLink
                                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1"
                                href={item.href}
                              >
                                {item.label}
                              </NextLink>
                            </li>
                          ))}
                        </ul>

                        <ul aria-label="Long list" className="mt-6 grid list-none gap-1 p-0 m-0">
                          {LONG_LIST.map((item) => (
                            <li key={item.label} className="flex">
                              <NextLink
                                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-900 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1"
                                href={item.href}
                              >
                                {item.label}
                              </NextLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Drawer.Content>
                  </nav>
                </Drawer.Popup>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="pointer-events-none absolute m-[0.4rem] flex w-[0.25rem] justify-center rounded-[1rem] opacity-0 transition-opacity duration-[250ms] data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-[75ms] data-[scrolling]:delay-[0ms] hover:pointer-events-auto hover:opacity-100 hover:duration-[75ms] hover:delay-[0ms] md:w-[0.4375rem] data-[ending-style]:opacity-0 data-[ending-style]:duration-[250ms]">
              <ScrollArea.Thumb className="w-full rounded-[inherit] bg-gray-500 before:absolute before:content-[''] before:top-1/2 before:left-1/2 before:h-[calc(100%+1rem)] before:w-[calc(100%+1rem)] before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```


### Action sheet with separate destructive action

This demo builds an action sheet with a grouped list of actions plus a separate destructive action button.

## Demo

### Tailwind

This example shows how to implement the component using Tailwind CSS.

```tsx
/* index.tsx */
'use client';
import * as React from 'react';
import { DrawerPreview as Drawer } from '@base-ui/react/drawer';

const ACTIONS = ['Unfollow', 'Mute', 'Add to Favourites', 'Add to Close Friends', 'Restrict'];

export default function ExampleDrawerUncontained() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800">
        Open action sheet
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.4] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
          <Drawer.Popup className="box-border pointer-events-none flex w-full max-w-[28rem] flex-col gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] outline-none focus-visible:outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[starting-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]">
            <Drawer.Content className="pointer-events-auto overflow-hidden rounded-2xl bg-gray-50 text-gray-900 outline outline-1 outline-gray-200 dark:outline-gray-300">
              <Drawer.Title className="sr-only">Profile actions</Drawer.Title>
              <Drawer.Description className="sr-only">
                Choose an action for this user.
              </Drawer.Description>

              <ul
                className="m-0 list-none divide-y divide-gray-200 p-0"
                aria-label="Profile actions"
              >
                {ACTIONS.map((action, index) => (
                  <li key={action}>
                    {index === 0 && (
                      <Drawer.Close className="sr-only">Close action sheet</Drawer.Close>
                    )}
                    <button
                      type="button"
                      className="block w-full border-0 bg-transparent px-5 py-4 text-center text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </Drawer.Content>
            <div className="pointer-events-auto overflow-hidden rounded-2xl bg-gray-50 outline outline-1 outline-gray-200 dark:outline-gray-300">
              <button
                type="button"
                className="block w-full border-0 bg-transparent px-5 py-4 text-center text-base text-red-700 select-none hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none"
                onClick={() => setOpen(false)}
              >
                Block User
              </button>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```




The drawer can render different content depending on which trigger opened it. This is achieved by passing a `payload` to the `<Drawer.Trigger>` and using the function-as-a-child pattern in `<Drawer.Root>`.

```jsx title="Detached triggers with payload"
const demoDrawer = Drawer.createHandle<{ title: string }>();

<Drawer.Trigger handle={demoDrawer} payload={{ title: 'Profile' }}>
  Profile
</Drawer.Trigger>

<Drawer.Trigger handle={demoDrawer} payload={{ title: 'Settings' }}>
  Settings
</Drawer.Trigger>

<Drawer.Root handle={demoDrawer}>
  {({ payload }) => (
    <Drawer.Portal>
      <Drawer.Popup>
        <Drawer.Content>
          <Drawer.Title>{payload?.title}</Drawer.Title>
        </Drawer.Content>
      </Drawer.Popup>
    </Drawer.Portal>
  )}
</Drawer.Root>
```

### Stacking and animations

Use CSS transitions or animations to animate drawer opening, closing, swipe interactions, and nested stacking. The `data-starting-style` attribute is applied when a drawer starts to open, and `data-ending-style` is applied when it starts to close.

The `--nested-drawers` CSS variable can be used to determine stack depth. The frontmost drawer has index `0`.

```css title="Stack depth"
.DrawerPopup {
  --stack-step: 0.05;
  --stack-scale: calc(1 - (var(--nested-drawers) * var(--stack-step)));
  transform: translateY(var(--drawer-swipe-movement-y)) scale(var(--stack-scale));
}
```

When stacked drawers have varying heights, use the `--drawer-height` and `--drawer-frontmost-height` variables to keep collapsed drawers aligned with the frontmost one.

```css title="Variable-height stacking"
.DrawerPopup {
  --bleed: 3rem;
  --stack-height: max(
    0px,
    calc(var(--drawer-frontmost-height, var(--drawer-height)) - var(--bleed))
  );
  height: var(--drawer-height, auto);
}

.DrawerPopup[data-nested-drawer-open] {
  height: calc(var(--stack-height) + var(--bleed));
  overflow: hidden;
}
```

The `data-nested-drawer-open` attribute marks drawers behind the frontmost drawer. Use it with `data-nested-drawer-swiping` to dim or hide parent drawer content while keeping it visible during nested swipe interactions.

```css title="Nested content visibility" "data-nested-drawer-open" "data-nested-drawer-swiping"
.DrawerContent {
  transition: opacity 300ms;
}

.DrawerPopup[data-nested-drawer-open] .DrawerContent {
  opacity: 0;
}

.DrawerPopup[data-nested-drawer-open][data-nested-drawer-swiping] .DrawerContent {
  opacity: 1;
}
```

The `--drawer-swipe-movement-x`, `--drawer-swipe-movement-y`, and `--drawer-snap-point-offset` CSS variables can be used to create smooth drag and snap offsets:

```css title="Swipe and snap offset" "--drawer-swipe-movement-x" "--drawer-swipe-movement-y"
.DrawerPopup[data-swipe-direction='right'] {
  transform: translateX(var(--drawer-swipe-movement-x));
}

.DrawerPopup[data-swipe-direction='down'] {
  transform: translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y)));
}
```

The `data-swipe-direction` attribute can be used with `data-ending-style` to animate directional dismissal:

```css title="Swipe dismissal direction" "data-swipe-direction"
.DrawerPopup[data-ending-style][data-swipe-direction='right'] {
  transform: translateX(100%);
}

.DrawerPopup[data-ending-style][data-swipe-direction='down'] {
  transform: translateY(100%);
}
```

Use `--drawer-swipe-progress` to fade the backdrop as the drawer is swiped, and `--drawer-swipe-strength` to scale release transition durations based on swipe velocity.

```css title="Backdrop and release timing"
.DrawerBackdrop {
  --backdrop-opacity: 0.2;
  opacity: calc(var(--backdrop-opacity) * (1 - var(--drawer-swipe-progress)));
}

.DrawerPopup[data-ending-style],
.DrawerBackdrop[data-ending-style] {
  transition-duration: calc(var(--drawer-swipe-strength) * 400ms);
}

.DrawerPopup[data-swiping],
.DrawerBackdrop[data-swiping] {
  transition-duration: 0ms;
}
```

## API reference

### Provider

Provides a shared context for coordinating global Drawer UI,
such as indent/background effects based on whether any Drawer is open.

**Provider Props:**

| Prop     | Type        | Default | Description |
| :------- | :---------- | :------ | :---------- |
| children | `ReactNode` | -       | -           |

### IndentBackground

An element placed before \<Drawer.Indent> to render a background layer
that can be styled based on whether any drawer is open.

**IndentBackground Props:**

| Prop      | Type                                                                                         | Default | Description                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Drawer.IndentBackground.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Drawer.IndentBackground.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Drawer.IndentBackground.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Indent

A wrapper element intended to contain your app's main UI.
Applies `data-active` when any drawer within the nearest \<Drawer.Provider> is open.

**Indent Props:**

| Prop      | Type                                                                               | Default | Description                                                                                                                                                                                  |
| :-------- | :--------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Drawer.Indent.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Drawer.Indent.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Drawer.Indent.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Root

Groups all parts of the drawer.
Doesn't render its own HTML element.

**Root Props:**

| Prop                                                    | Type                                                                                                    | Default | Description                                                                                                                                                                                                                                                             |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultOpen                                             | `boolean`                                                                                               | `false` | Whether the drawer is initially open.To render a controlled drawer, use the `open` prop instead.                                                                                                                                                                        |
| open                                                    | `boolean`                                                                                               | -       | Whether the drawer is currently open.                                                                                                                                                                                                                                   |
| onOpenChange                                            | `((open: boolean, eventDetails: Drawer.Root.ChangeEventDetails) => void)`                               | -       | Event handler called when the drawer is opened or closed.                                                                                                                                                                                                               |
| snapPoints                                              | `DrawerSnapPoint[]`                                                                                     | -       | Snap points used to position the drawer.&#xA;Use numbers between 0 and 1 to represent fractions of the viewport height,&#xA;numbers greater than 1 as pixel values, or strings in `px`/`rem` units&#xA;(for example, `'148px'` or `'30rem'`).                           |
| defaultSnapPoint                                        | `DrawerSnapPoint \| null`                                                                               | -       | The initial snap point value when uncontrolled.                                                                                                                                                                                                                         |
| snapPoint                                               | `DrawerSnapPoint \| null`                                                                               | -       | The currently active snap point. Use with `onSnapPointChange` to control the snap point.                                                                                                                                                                                |
| onSnapPointChange                                       | `((snapPoint: DrawerSnapPoint \| null, eventDetails: Drawer.Root.SnapPointChangeEventDetails) => void)` | -       | Callback fired when the snap point changes.                                                                                                                                                                                                                             |
| actionsRef                                              | `RefObject<Drawer.Root.Actions \| null>`                                                                | -       | A ref to imperative actions.\* `unmount`: When specified, the drawer will not be unmounted when closed.&#xA;Instead, the `unmount` function must be called to unmount the drawer manually.&#xA;Useful when the drawer's animation is controlled by an external library. |
| \* `close`: Closes the drawer imperatively when called. |
| defaultTriggerId                                        | `string \| null`                                                                                        | -       | ID of the trigger that the drawer is associated with.&#xA;This is useful in conjunction with the `defaultOpen` prop to create an initially open drawer.                                                                                                                 |
| disablePointerDismissal                                 | `boolean`                                                                                               | `false` | Determines whether the drawer should close on outside clicks.                                                                                                                                                                                                           |
| handle                                                  | `Drawer.Handle<Payload>`                                                                                | -       | A handle to associate the drawer with a trigger.&#xA;If specified, allows detached triggers to control the drawer's open state.&#xA;Can be created with the Drawer.createHandle() method.                                                                               |
| modal                                                   | `boolean \| 'trap-focus'`                                                                               | `true`  | Determines if the drawer enters a modal state when open.\* `true`: user interaction is limited to just the drawer: focus is trapped, document page scroll is locked, and pointer interactions on outside elements are disabled.                                         |

- `false`: user interaction with the rest of the document is allowed.
- `'trap-focus'`: focus is trapped inside the drawer, but document page scroll is not locked and pointer interactions outside of it remain enabled. |
  | onOpenChangeComplete | `((open: boolean) => void)` | - | Event handler called after any animations complete when the drawer is opened or closed. |
  | snapToSequentialPoints | `boolean` | `false` | Disables velocity-based snap skipping so drag distance determines the next snap point. |
  | swipeDirection | `DrawerSwipeDirection` | `'down'` | The swipe direction used to dismiss the drawer. |
  | triggerId | `string \| null` | - | ID of the trigger that the drawer is associated with.&#xA;This is useful in conjunction with the `open` prop to create a controlled drawer.&#xA;There's no need to specify this prop when the drawer is uncontrolled (i.e. when the `open` prop is not set). |
  | children | `ReactNode \| PayloadChildRenderFunction<Payload>` | - | The content of the drawer. |

### Trigger

A button that opens the drawer.
Renders a `<button>` element.

**Trigger Props:**

| Prop         | Type                                                                                | Default | Description                                                                                                                                                                                          |
| :----------- | :---------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| handle       | `DrawerHandle<Payload>`                                                             | -       | A handle to associate the trigger with a drawer.&#xA;Can be created with the Drawer.createHandle() method.                                                                                           |
| nativeButton | `boolean`                                                                           | `true`  | Whether the component renders a native `<button>` element when replacing it&#xA;via the `render` prop.&#xA;Set to `false` if the rendered element is not a button (e.g. `<div>`).                    |
| payload      | `Payload`                                                                           | -       | A payload to pass to the drawer when it is opened.                                                                                                                                                   |
| id           | `string`                                                                            | -       | ID of the trigger. In addition to being forwarded to the rendered element,&#xA;it is also used to specify the active trigger for drawers in controlled mode (with the Drawer.Root `triggerId` prop). |
| className    | `string \| ((state: Drawer.Trigger.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                             |
| style        | `CSSProperties \| ((state: Drawer.Trigger.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                                    |
| render       | `ReactElement \| ((props: HTMLProps, state: Drawer.Trigger.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render.         |

### Portal

A portal element that moves the popup to a different part of the DOM.
By default, the portal element is appended to `<body>`.
Renders a `<div>` element.

**Portal Props:**

| Prop        | Type                                                                                | Default | Description                                                                                                                                                                                  |
| :---------- | :---------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container   | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null` | -       | A parent element to render the portal element into.                                                                                                                                          |
| className   | `string \| ((state: Drawer.Portal.State) => string \| undefined)`                   | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style       | `CSSProperties \| ((state: Drawer.Portal.State) => CSSProperties \| undefined)`     | -       | -                                                                                                                                                                                            |
| keepMounted | `boolean`                                                                           | `false` | Whether to keep the portal mounted in the DOM while the popup is hidden.                                                                                                                     |
| render      | `ReactElement \| ((props: HTMLProps, state: Drawer.Portal.State) => ReactElement)`  | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Backdrop

An overlay displayed beneath the popup.
Renders a `<div>` element.

**Backdrop Props:**

| Prop        | Type                                                                                 | Default | Description                                                                                                                                                                                  |
| :---------- | :----------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| forceRender | `boolean`                                                                            | `false` | Whether the backdrop is forced to render even when nested.                                                                                                                                   |
| className   | `string \| ((state: Drawer.Backdrop.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style       | `CSSProperties \| ((state: Drawer.Backdrop.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render      | `ReactElement \| ((props: HTMLProps, state: Drawer.Backdrop.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Backdrop CSS Variables:**

| Variable                | Type     | Default | Description                               |
| :---------------------- | :------- | :------ | :---------------------------------------- |
| --drawer-swipe-progress | `number` | -       | The swipe progress of the drawer gesture. |

### Viewport

A positioning container for the drawer popup that can be made scrollable.
Renders a `<div>` element.

**Viewport Props:**

| Prop      | Type                                                                                 | Default | Description                                                                                                                                                                                  |
| :-------- | :----------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className | `string \| ((state: Drawer.Viewport.State) => string \| undefined)`                  | -       | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state.                                                                                     |
| style     | `CSSProperties \| ((state: Drawer.Viewport.State) => CSSProperties \| undefined)`    | -       | -                                                                                                                                                                                            |
| render    | `ReactElement \| ((props: HTMLProps, state: Drawer.Viewport.State) => ReactElement)` | -       | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

### Popup

A container for the drawer contents.
Renders a `<div>` element.

**Popup Props:**

| Prop         | Type                                                                                                                   | Default | Description                                                                              |
| :----------- | :--------------------------------------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------- |
| initialFocus | `boolean \| RefObject<HTMLElement \| null> \| ((openType: InteractionType) => boolean \| void \| HTMLElement \| null)` | -       | Determines the element to focus when the drawer is opened.\* `false`: Do not move focus. |

- `true`: Move focus based on the default behavior (first tabbable element or popup).
- `RefObject`: Move focus to the ref element.
- `function`: Called with the interaction type (`mouse`, `touch`, `pen`, or `keyboard`).&#xA;Return an element to focus, `true` to use the default behavior, or `false`/`undefined` to do nothing. |
  | finalFocus | `boolean \| RefObject<HTMLElement \| null> \| ((closeType: InteractionType) => boolean \| void \| HTMLElement \| null)` | - | Determines the element to focus when the drawer is closed.\* `false`: Do not move focus.
- `true`: Move focus based on the default behavior (trigger or previously focused element).
- `RefObject`: Move focus to the ref element.
- `function`: Called with the interaction type (`mouse`, `touch`, `pen`, or `keyboard`).&#xA;Return an element to focus, `true` to use the default behavior, or `false`/`undefined` to do nothing. |
  | className | `string \| ((state: Drawer.Popup.State) => string \| undefined)` | - | CSS class applied to the element, or a function that&#xA;returns a class based on the component’s state. |
  | style | `CSSProperties \| ((state: Drawer.Popup.State) => CSSProperties \| undefined)` | - | - |
  | render | `ReactElement \| ((props: HTMLProps, state: Drawer.Popup.State) => ReactElement)` | - | Allows you to replace the component’s HTML element&#xA;with a different tag, or compose it with another component.Accepts a `ReactElement` or a function that returns the element to render. |

**Popup Data Attributes:**

| Attribute                  | Type                                  | Description                                                          |
| :------------------------- | :------------------------------------ | :------------------------------------------------------------------- |
| data-expanded              | -                                     | Present when the drawer is at the expanded (full-height) snap point. |
| data-nested-drawer-open    | -                                     | Present when a nested drawer is open.                                |
| data-nested-drawer-swiping | -                                     | Present when a nested drawer is being swiped.                        |
| data-swipe-direction       | `'up' \| 'down' \| 'left' \| 'right'` | Indicates the swipe direction.                                       |
| data-swipe-dismiss         | -                                     | Present when the drawer is dismissed by swiping.                     |
| data-swiping               | -                                     | Present when the drawer is being swiped.                             |

**Popup CSS Variables:**

| Variable                   | Type     | Default | Description                                                                  |
| :------------------------- | :------- | :------ | :--------------------------------------------------------------------------- |
| --drawer-frontmost-height  | `CSS`    | -       | The height of the frontmost open drawer in the current nested drawer stack.  |
| --drawer-height            | `CSS`    | -       | The height of the drawer popup.                                              |
| --drawer-snap-point-offset | `CSS`    | -       | The snap point offset used for translating the drawer.                       |
| --drawer-swipe-movement-x  | `CSS`    | -       | The swipe movement on the X axis.                                            |
| --drawer-swipe-movement-y  | `CSS`    | -       | The swipe movement on the Y axis.                                            |
| --drawer-swipe-strength    | `number` | -       | A scalar (0.1-1) used to scale the swipe release transition duration in CSS. |
| --nested-drawers           | `number` | -       | The number of nested drawers that are currently open.                        |

