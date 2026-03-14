"use client";

import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { cn } from "@/registry/lib/utils";
import {
  backdropBaseStyles,
  createDrawerHandle,
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerInnerContent,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  popupBaseStyles,
  popupBottomBaseStyles,
  viewportVariants,
} from "@/registry/ui/drawer";

const stackedPopupStyles = cn(
  popupBaseStyles,
  popupBottomBaseStyles,
  "group/popup",
  "[height:var(--drawer-height,auto)]",
  "px-4 sm:px-6 pt-4 pb-[calc(1.2rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
  // stacking CSS variables
  "[--peek:1rem]",
  "[--stack-progress:clamp(0,var(--drawer-swipe-progress),1)]",
  "[--stack-step:0.05]",
  "[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]",
  "[--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))]",
  "[--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)]",
  "[--shrink:calc(1-var(--scale))]",
  "[--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--drawer-bleed)))]",
  // transform with stacking
  "[transform-origin:50%_calc(100%-var(--drawer-bleed))]",
  "[transform:translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  // shadow
  "shadow-[0_2px_10px_rgb(0_0_0/0.1)]",
  "data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0)]",
  // pseudo overlay for nested open
  "after:absolute after:inset-0 after:rounded-[inherit] after:bg-transparent after:pointer-events-none after:content-['']",
  "after:transition-[background-color] after:duration-[450ms] after:ease-[cubic-bezier(0.32,0.72,0,1)]",
  // swipe behavior
  "data-[swiping]:duration-0",
  "data-[nested-drawer-swiping]:duration-0",
  // when nested drawer is open
  "data-[nested-drawer-open]:h-[calc(var(--height)+var(--drawer-bleed))]",
  "data-[nested-drawer-open]:overflow-hidden",
  "data-[nested-drawer-open]:after:bg-black/5",
  // explicit transition
  "[transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),height_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]",
);

function StackedDrawerContent({
  className,
  children,
  ...props
}: BaseDrawer.Popup.Props) {
  return (
    <DrawerPortal>
      <DrawerBackdrop className={backdropBaseStyles} />
      <BaseDrawer.Viewport
        className={viewportVariants({ side: "bottom" })}
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(stackedPopupStyles, className)}
          data-side="bottom"
          data-slot="drawer-content"
          {...props}
        >
          <DrawerDragHandle
            className={cn(
              "transition-opacity duration-200",
              "group-data-[nested-drawer-open]/popup:opacity-0",
              "group-data-[nested-drawer-swiping]/popup:opacity-100",
            )}
          />
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

function StackedDrawerInnerContent({
  className,
  ...props
}: BaseDrawer.Content.Props) {
  return (
    <DrawerInnerContent
      className={cn(
        "flex flex-col gap-4",
        "transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)]",
        "group-data-[nested-drawer-open]/popup:opacity-0",
        "group-data-[nested-drawer-swiping]/popup:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  createDrawerHandle,
  // Stacked-specific components
  StackedDrawerContent,
  StackedDrawerInnerContent,
};
