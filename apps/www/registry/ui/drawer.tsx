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
      className={cn("absolute inset-0 bg-zinc-100 dark:bg-zinc-800", className)}
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
      className={className}
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
        "fixed inset-0 min-h-dvh bg-black",
        "[--backdrop-opacity:0.2] dark:[--backdrop-opacity:0.7]",
        "opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]",
        "transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-[swiping]:duration-0",
        "data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        "data-[starting-style]:opacity-0",
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
      className={cn(
        "group touch-auto bg-background text-foreground",
        className,
      )}
      data-slot="drawer-popup"
      {...props}
    >
      {children}
    </BaseDrawer.Popup>
  );
}

function DrawerInnerContent({ className, ...props }: BaseDrawer.Content.Props) {
  return (
    <BaseDrawer.Content
      className={cn("mx-auto w-full flex flex-col gap-4", className)}
      data-slot="drawer-inner-content"
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
        "gap-0.5 group-data-[side=bottom]/drawer-content:text-center md:gap-1 flex flex-col",
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
      className={cn("mt-auto flex flex-col gap-2", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

const viewportVariants = cva("fixed inset-0 flex", {
  defaultVariants: {
    layout: "default",
    side: "bottom",
  },
  variants: {
    layout: {
      default: "",
      snap: "items-end justify-center touch-none",
      stacked: "items-end justify-center",
    },
    side: {
      bottom: "items-end justify-center",
      left: "drawer-viewport items-stretch justify-start",
      right: "drawer-viewport items-stretch justify-end",
      top: "items-start justify-center",
    },
  },
});

const popupVariants = cva(
  cn(
    "relative flex flex-col",
    "bg-background text-foreground",
    "outline outline-border",
  ),
  {
    defaultVariants: {
      layout: "default",
      side: "bottom",
    },
    variants: {
      layout: {
        default: cn(
          "drawer-popup",
          "gap-4 overflow-y-auto overscroll-contain",
          "group/drawer-content",
          "[&>[data-slot=scroll-area-root]]:min-h-0",
        ),
        snap: cn("drawer-snap-popup", "w-full rounded-t-2xl"),
        stacked: cn(
          "drawer-stacked-popup group/popup",
          "gap-4 overflow-y-auto overscroll-contain",
          "w-full rounded-t-2xl",
          "px-4 sm:px-6 pt-4 pb-[calc(1.2rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
          "[&>[data-slot=scroll-area-root]]:min-h-0",
        ),
      },
      side: {
        bottom: cn(
          "w-full rounded-t-2xl",
          "px-4 sm:px-6 pt-4",
          "pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)]",
        ),
        left: cn(
          "p-4 pl-[calc(1.2rem+var(--drawer-bleed))]",
          "supports-[-webkit-touch-callout:none]:pl-6",
        ),
        right: cn(
          "p-4 pr-[calc(1.2rem+var(--drawer-bleed))]",
          "supports-[-webkit-touch-callout:none]:pr-6",
        ),
        top: cn(
          "w-full rounded-b-2xl h-auto",
          "px-4 sm:px-6 pb-4 pt-[calc(1.2rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
        ),
      },
    },
  },
);

function DrawerContent({
  className,
  children,
  side = "bottom",
  layout,
  ...props
}: BaseDrawer.Popup.Props &
  VariantProps<typeof popupVariants> & {
    layout?: "stacked" | "snap";
  }) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={viewportVariants({
          layout: layout ?? "default",
          side: layout ? null : side,
        })}
        data-side={layout ? "bottom" : side}
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(
            popupVariants({
              layout: layout ?? "default",
              side: layout ? null : side,
            }),
            className,
          )}
          data-side={layout ? "bottom" : side}
          data-slot="drawer-content"
          {...props}
        >
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
      data-slot="stacked-drawer-inner-content"
      {...props}
    />
  );
}

function DrawerDragHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-12 h-1 flex-none mx-auto rounded-full bg-muted",
        className,
      )}
      data-slot="drawer-drag-handle"
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
  DrawerInnerContent,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerDragHandle,
  createDrawerHandle,
  // Variants
  popupVariants,
  viewportVariants,
  // Composite component
  DrawerContent,
  StackedDrawerInnerContent,
};
