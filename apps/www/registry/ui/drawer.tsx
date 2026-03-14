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
      className={className}
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
      className={className}
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
        "fixed inset-0 min-h-dvh bg-black/20 backdrop-blur-xs",
        "transition-opacity data-[swiping]:duration-0",
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
      className={cn("fixed inset-0", className)}
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
      className={cn("touch-auto", className)}
      data-slot="drawer-popup"
      {...props}
    >
      {children}
    </BaseDrawer.Popup>
  );
}

function DrawerInner({ className, ...props }: BaseDrawer.Content.Props) {
  return (
    <BaseDrawer.Content
      className={cn("mx-auto w-full touch-auto", className)}
      data-slot="drawer-inner"
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
    side: "bottom",
  },
  variants: {
    side: {
      bottom: "items-end justify-center",
      left: "[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] items-stretch justify-start p-[var(--viewport-padding)]",
      right:
        "[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] items-stretch justify-end p-[var(--viewport-padding)]",
      top: "items-start justify-center",
    },
  },
});

const popupVariants = cva(
  cn(
    "relative flex flex-col gap-4 h-auto bg-background text-foreground group/drawer-content outline outline-border touch-auto",
    "overflow-y-auto overscroll-contain",
    "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
    "data-[swiping]:select-none data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
    "[&>[data-slot=scroll-area-root]]:min-h-0",
  ),
  {
    defaultVariants: {
      side: "bottom",
    },
    variants: {
      side: {
        bottom: cn(
          "w-full rounded-t-2xl h-auto",
          // adjust max height
          "max-h-[calc(80vh+var(--drawer-bleed))]",
          "-mb-(--drawer-bleed) px-4 sm:px-6 pt-4 pb-[calc(1.2rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
          "[transform:translateY(var(--drawer-swipe-movement-y))]",
          "data-[ending-style]:[transform:translateY(calc(100%-var(--drawer-bleed)+2px))] data-[starting-style]:[transform:translateY(calc(100%-var(--drawer-bleed)+2px))]",
        ),
        left: cn(
          "-ml-(--drawer-bleed) p-4 pl-[calc(1.2rem+var(--drawer-bleed))]",
          // adjust width
          "w-[calc(24rem+var(--drawer-bleed))] max-w-[calc(100vw-var(--drawer-bleed)+var(--drawer-bleed))] h-full",
          "supports-[-webkit-touch-callout:none]:[--drawer-bleed:0px]",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[ending-style]:[transform:translateX(calc(-100%+var(--drawer-bleed)-var(--viewport-padding)-2px))] data-[starting-style]:[transform:translateX(calc(-100%+var(--drawer-bleed)-var(--viewport-padding)-2px))]",
          "supports-[-webkit-touch-callout:none]:ml-0 supports-[-webkit-touch-callout:none]:w-[24rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pl-6",
        ),
        right: cn(
          "-mr-(--drawer-bleed) p-4 pr-[calc(1.2rem+var(--drawer-bleed))]",
          // adjust width
          "w-[calc(24rem+var(--drawer-bleed))] max-w-[calc(100vw-var(--drawer-bleed)+var(--drawer-bleed))] h-full",
          "supports-[-webkit-touch-callout:none]:[--drawer-bleed:0px]",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[ending-style]:[transform:translateX(calc(100%-var(--drawer-bleed)+var(--viewport-padding)+2px))] data-[starting-style]:[transform:translateX(calc(100%-var(--drawer-bleed)+var(--viewport-padding)+2px))]",
          "supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[24rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6",
        ),
        top: cn(
          "w-full rounded-b-2xl h-auto",
          // adjust max height
          "max-h-[calc(80vh+var(--drawer-bleed))]",
          "-mt-(--drawer-bleed) px-4 sm:px-6 pb-4 pt-[calc(1.2rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
          "[transform:translateY(var(--drawer-swipe-movement-y))]",
          "data-[ending-style]:[transform:translateY(calc(-100%+var(--drawer-bleed)-2px))] data-[starting-style]:[transform:translateY(calc(-100%+var(--drawer-bleed)-2px))]",
        ),
      },
    },
  },
);

function DrawerContent({
  className,
  children,
  side = "bottom",
  ...props
}: BaseDrawer.Popup.Props & VariantProps<typeof popupVariants>) {
  return (
    <DrawerPortal>
      <DrawerBackdrop
        className={cn(
          "[--backdrop-opacity:0.2] dark:[--backdrop-opacity:0.7] bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        )}
      />
      <BaseDrawer.Viewport
        className={viewportVariants({ side })}
        data-slot="drawer-viewport"
      >
        <BaseDrawer.Popup
          className={cn(popupVariants({ side }), className)}
          data-side={side}
          data-slot="drawer-content"
          {...props}
        >
          {side === "bottom" && (
            <div className="w-12 h-1 flex-none mx-auto rounded-full bg-muted" />
          )}
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

const createDrawerHandle = BaseDrawer.createHandle;

export {
  createDrawerHandle,
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  // Composite component
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerInner,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  popupVariants,
  viewportVariants,
};
