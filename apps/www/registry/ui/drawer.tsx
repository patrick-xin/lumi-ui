"use client";

import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { cva, type VariantProps } from "class-variance-authority";
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

const viewportVariants = cva("fixed inset-0 flex", {
  defaultVariants: {
    side: "bottom",
    layout: "fullBleed",
  },
  variants: {
    side: {
      bottom: "items-end justify-center",
      left: "items-stretch justify-start",
      right: "items-stretch justify-end",
      top: "items-start justify-center",
    },
    layout: {
      fullBleed: "",
      inset: "",
      responsive: "",
    },
  },
  compoundVariants: [
    { side: "right", layout: "inset", class: "p-4 sm:p-6" },
    { side: "right", layout: "responsive", class: "p-4 sm:p-0" },
    { side: "bottom", layout: "inset", class: "p-4 sm:p-6" },
    { side: "bottom", layout: "responsive", class: "p-4 sm:p-0" },
    { side: "top", layout: "inset", class: "p-4 sm:p-6" },
    { side: "top", layout: "responsive", class: "p-4 sm:p-0" },
    { side: "left", layout: "inset", class: "p-4 sm:p-6" },
    { side: "left", layout: "responsive", class: "p-4 sm:p-0" },
  ],
});

const popupVariants = cva(
  cn(
    "relative flex flex-col gap-2 bg-background text-foreground outline outline-border",
    "drawer-popup overflow-y-auto overscroll-contain group/drawer-content *:data-[slot=scroll-area-root]:min-h-0",
  ),
  {
    defaultVariants: {
      side: "bottom",
      layout: "fullBleed",
    },
    variants: {
      side: {
        bottom: cn(
          "w-full h-auto",
          "px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
          "sm:px-6 sm:pt-4 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
        ),
        left: cn("p-4 sm:p-6"),
        right: cn("p-4 sm:p-6"),
        top: cn(
          "w-full h-auto",
          "px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
          "sm:px-6 sm:pb-6 sm:pt-[calc(1.5rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
        ),
      },
      layout: {
        fullBleed: "",
        inset: "",
        responsive: "",
      },
    },
    compoundVariants: [
      { side: "right", layout: "fullBleed", class: "rounded-none" },
      { side: "right", layout: "inset", class: "rounded-2xl" },
      {
        side: "right",
        layout: "responsive",
        class: "rounded-2xl sm:rounded-none",
      },
      { side: "bottom", layout: "fullBleed", class: "rounded-t-2xl" },
      { side: "bottom", layout: "inset", class: "rounded-2xl" },
      {
        side: "bottom",
        layout: "responsive",
        class: "rounded-2xl sm:rounded-b-none",
      },
      { side: "top", layout: "fullBleed", class: "rounded-b-2xl" },
      { side: "top", layout: "inset", class: "rounded-2xl" },
      {
        side: "top",
        layout: "responsive",
        class: "rounded-2xl sm:rounded-t-none",
      },
      { side: "left", layout: "fullBleed", class: "rounded-none" },
      { side: "left", layout: "inset", class: "rounded-2xl" },
      {
        side: "left",
        layout: "responsive",
        class: "rounded-2xl sm:rounded-none",
      },
    ],
  },
);

function DrawerContent({
  className,
  children,
  side = "bottom",
  layout = "fullBleed",
  ...props
}: BaseDrawer.Popup.Props &
  Omit<VariantProps<typeof popupVariants>, "layout"> & {
    layout?: DrawerLayout;
  }) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={viewportVariants({ side, layout })}
        data-side={side}
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(popupVariants({ side, layout }), className)}
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
