"use client";

import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { tv, type VariantProps } from "tailwind-variants";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";

function DrawerProvider({ ...props }: BaseDrawer.Provider.Props) {
  return <BaseDrawer.Provider data-slot="drawer-provider" {...props} />;
}

function DrawerIndent({ className, ...props }: BaseDrawer.Indent.Props) {
  return (
    <BaseDrawer.Indent
      className={cn(
        "drawer-indent relative bg-background text-foreground min-h-svh",
        className,
      )}
      data-slot="drawer-indent"
      {...props}
    />
  );
}

function DrawerIndentBackground({
  className,
  ...props
}: BaseDrawer.IndentBackground.Props) {
  return (
    <BaseDrawer.IndentBackground
      className={cn("absolute inset-0 bg-foreground/10", className)}
      data-slot="drawer-indent-background"
      {...props}
    />
  );
}

function Drawer<Payload>(props: BaseDrawer.Root.Props<Payload>) {
  return <BaseDrawer.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger<Payload>({
  className,
  ...props
}: BaseDrawer.Trigger.Props<Payload>) {
  return (
    <BaseDrawer.Trigger
      className={className}
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

function DrawerSwipeArea({ className, ...props }: BaseDrawer.SwipeArea.Props) {
  return (
    <BaseDrawer.SwipeArea
      className={cn("fixed", className)}
      data-slot="drawer-swipe-area"
      {...props}
    />
  );
}

function DrawerPortal({ ...props }: BaseDrawer.Portal.Props) {
  return <BaseDrawer.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerBackdrop({ className, ...props }: BaseDrawer.Backdrop.Props) {
  return (
    <BaseDrawer.Backdrop
      className={cn(
        "fixed inset-0 min-h-dvh transition-opacity bg-black/20 backdrop-blur-sm",
        "opacity-[calc(0.6*(1-var(--drawer-swipe-progress)))]",
        "duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-[swiping]:duration-0",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

function DrawerViewport({ className, ...props }: BaseDrawer.Viewport.Props) {
  return (
    <BaseDrawer.Viewport
      className={cn("group fixed inset-0", className)}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

function DrawerPopup({
  className,
  children,
  ...props
}: BaseDrawer.Popup.Props) {
  return (
    <BaseDrawer.Popup
      className={cn("group bg-background text-foreground", className)}
      data-slot="drawer-popup"
      {...props}
    >
      {children}
    </BaseDrawer.Popup>
  );
}

function DrawerSelectable({ className, ...props }: BaseDrawer.Content.Props) {
  return (
    <BaseDrawer.Content
      className={cn(
        "mx-auto w-full flex flex-col gap-4 *:data-[slot=scroll-area-root]:min-h-0",
        className,
      )}
      data-slot="drawer-selectable"
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: BaseDrawer.Title.Props) {
  return (
    <BaseDrawer.Title
      className={cn("text-lg font-semibold", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: BaseDrawer.Description.Props) {
  return (
    <BaseDrawer.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: BaseDrawer.Close.Props) {
  return (
    <BaseDrawer.Close
      className={cn("select-none", className)}
      data-slot="drawer-close"
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 md:gap-1 group-data-[side=bottom]/drawer-content:text-center",
        className,
      )}
      data-slot="drawer-header"
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 mt-auto", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

function DrawerDragHandle({
  className,
  stacked,
  ...props
}: React.ComponentProps<"div"> & { stacked?: boolean }) {
  return (
    <div
      className={cn(
        "w-12 h-1 flex-none mx-auto rounded-full bg-muted",
        stacked &&
          "transition-opacity duration-200 group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100",
        className,
      )}
      data-slot="drawer-drag-handle"
      {...props}
    />
  );
}

type DrawerLayout = "fullBleed" | "inset" | "responsive";

const drawerContentStyles = tv({
  slots: {
    viewport: "fixed inset-0 flex",
    popup: [
      "relative flex flex-col gap-2 bg-background text-foreground outline outline-border",
      "drawer-popup overflow-y-auto overscroll-contain group/drawer-content *:data-[slot=scroll-area-root]:min-h-0",
    ],
  },
  variants: {
    side: {
      bottom: {
        viewport: "items-end justify-center",
        popup: [
          "w-full h-auto",
          "px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
          "sm:px-6 sm:pt-4 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
        ],
      },
      left: {
        viewport: "items-stretch justify-start",
        popup: "p-4 sm:p-6",
      },
      right: {
        viewport: "items-stretch justify-end",
        popup: "p-4 sm:p-6",
      },
      top: {
        viewport: "items-start justify-center",
        popup: [
          "w-full h-auto",
          "px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
          "sm:px-6 sm:pb-6 sm:pt-[calc(1.5rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
        ],
      },
    },
    layout: {
      fullBleed: {},
      inset: { viewport: "p-4 sm:p-6", popup: "rounded-2xl" },
      responsive: { viewport: "p-4 sm:p-0" },
    },
  },
  compoundVariants: [
    { side: "bottom", layout: "fullBleed", class: { popup: "rounded-t-2xl" } },
    { side: "top", layout: "fullBleed", class: { popup: "rounded-b-2xl" } },
    {
      side: ["right", "left"],
      layout: "fullBleed",
      class: { popup: "rounded-none" },
    },
    {
      side: "bottom",
      layout: "responsive",
      class: { popup: "rounded-2xl sm:rounded-b-none" },
    },
    {
      side: "top",
      layout: "responsive",
      class: { popup: "rounded-2xl sm:rounded-t-none" },
    },
    {
      side: ["right", "left"],
      layout: "responsive",
      class: { popup: "rounded-2xl sm:rounded-none" },
    },
  ],
  defaultVariants: {
    side: "bottom",
    layout: "fullBleed",
  },
});

function DrawerContent({
  className,
  children,
  side = "bottom",
  layout = "fullBleed",
  ...props
}: Omit<BaseDrawer.Popup.Props, "className"> &
  VariantProps<typeof drawerContentStyles> & {
    layout?: DrawerLayout;
    className?: string;
  }) {
  const { viewport, popup } = drawerContentStyles({ side, layout });
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={viewport()}
        data-side={side}
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={popup({ class: className })}
          data-layout={layout}
          data-side={side}
          data-slot="drawer-content"
          {...props}
        >
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

function SnapDrawerContent({
  className,
  children,
  layout = "fullBleed",
  ...props
}: BaseDrawer.Popup.Props & {
  layout?: DrawerLayout;
}) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={cn(
          "fixed inset-0 flex items-end justify-center touch-none",
          layout === "inset" && "p-4 sm:p-6",
          layout === "responsive" && "p-4 sm:p-0",
        )}
        data-side="bottom"
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(
            "relative flex flex-col bg-background text-foreground outline outline-border",
            "drawer-snap-popup w-full",
            layout === "inset" && "rounded-2xl",
            layout === "fullBleed" && "rounded-t-2xl",
            layout === "responsive" &&
              "rounded-2xl sm:rounded-t-2xl sm:rounded-b-none",
            className,
          )}
          data-layout={layout}
          data-side="bottom"
          data-slot="drawer-content"
          {...props}
        >
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

function StackedDrawerContent({
  className,
  children,
  layout = "fullBleed",
  ...props
}: BaseDrawer.Popup.Props & {
  layout?: DrawerLayout;
}) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={cn(
          "fixed inset-0 flex items-end justify-center",
          layout === "inset" && "p-4 sm:p-6",
          layout === "responsive" && "p-4 sm:p-0",
        )}
        data-side="bottom"
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(
            "drawer-stacked-popup group/popup",
            "relative flex flex-col gap-4 bg-background text-foreground outline outline-border w-full",
            "px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
            "sm:px-6 sm:pt-6 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
            "overflow-y-auto overscroll-contain",
            "*:data-[slot=scroll-area-root]:min-h-0",
            layout === "inset" && "rounded-2xl",
            layout === "fullBleed" && "rounded-t-2xl",
            layout === "responsive" &&
              "rounded-2xl sm:rounded-t-2xl sm:rounded-b-none",
            className,
          )}
          data-layout={layout}
          data-side="bottom"
          data-slot="stacked-drawer-content"
          {...props}
        >
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

function StackedDrawerSelectable({
  className,
  ...props
}: BaseDrawer.Content.Props) {
  return (
    <DrawerSelectable
      className={cn(
        "flex flex-col gap-4",
        "transition-opacity duration-300 ease-smooth",
        "group-data-[nested-drawer-open]/popup:opacity-0",
        "group-data-[nested-drawer-swiping]/popup:opacity-100",
        className,
      )}
      data-slot="stacked-drawer-selectable"
      {...props}
    />
  );
}

const createDrawerHandle = BaseDrawer.createHandle;

export {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerSelectable,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerDragHandle,
  createDrawerHandle,
  // Composite components
  DrawerContent,
  SnapDrawerContent,
  StackedDrawerContent,
  StackedDrawerSelectable,
};
