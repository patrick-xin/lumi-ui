"use client";

import { DrawerPreview as BaseDrawer } from "@base-ui/react/drawer";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function DrawerProvider(props: BaseDrawer.Provider.Props) {
  return <BaseDrawer.Provider data-slot="drawer-provider" {...props} />;
}

function DrawerIndent(props: BaseDrawer.Indent.Props) {
  return <BaseDrawer.Indent data-slot="drawer-indent" {...props} />;
}

function DrawerIndentBackground({
  className,
  ...props
}: BaseDrawer.IndentBackground.Props) {
  return (
    <BaseDrawer.IndentBackground
      className={cn(
        "fixed inset-0 pointer-events-none transition-transform duration-200 ease-out",
        className,
      )}
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
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: BaseDrawer.Portal.Props) {
  return <BaseDrawer.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerBackdrop({ className, ...props }: BaseDrawer.Backdrop.Props) {
  return (
    <BaseDrawer.Backdrop
      className="bg-black/20 backdrop-blur-xs fixed inset-0 min-h-dvh [--bleed:3rem] opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute animate-fade"
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

function DrawerViewport({ className, ...props }: BaseDrawer.Viewport.Props) {
  return (
    <BaseDrawer.Viewport
      className={cn(
        "fixed inset-0 flex justify-center overflow-hidden outline-none",
        className,
      )}
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
      className={cn("bg-background text-foreground w-full", className)}
      data-slot="drawer-popup"
      {...props}
    >
      {children}
    </BaseDrawer.Popup>
  );
}

function DrawerInnerContent(props: BaseDrawer.Content.Props) {
  return <BaseDrawer.Content data-slot="drawer-inner-content" {...props} />;
}

function DrawerClose(props: BaseDrawer.Close.Props) {
  return <BaseDrawer.Close data-slot="drawer-close" {...props} />;
}

function DrawerTitle(props: BaseDrawer.Title.Props) {
  const { className, ...rest } = props;
  return (
    <BaseDrawer.Title
      className={cn("text-lg font-semibold", className)}
      data-slot="drawer-title"
      {...rest}
    />
  );
}

function DrawerDescription(props: BaseDrawer.Description.Props) {
  const { className, ...rest } = props;
  return (
    <BaseDrawer.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...rest}
    />
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pr-12", className)}
      data-slot="drawer-header"
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

const drawerViewportVariants = cva("fixed inset-0 outline-none", {
  defaultVariants: {
    behavior: "default",
    side: "bottom",
  },
  variants: {
    behavior: {
      default: "",
      snap: "touch-none",
    },
    side: {
      bottom: "flex items-end justify-center",
      left: "flex items-stretch justify-start p-[var(--drawer-viewport-padding)] [--drawer-viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--drawer-viewport-padding:0.625rem]",
      right:
        "flex items-stretch justify-end p-[var(--drawer-viewport-padding)] [--drawer-viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--drawer-viewport-padding:0.625rem]",
      top: "flex items-start justify-center",
    },
  },
});

const drawerPopupVariants = cva(
  cn(
    "relative min-h-0 flex flex-col bg-background text-foreground shadow-lg outline outline-border dark:-outline-offset-1",
    "overflow-hidden",
    "transition-[transform,box-shadow,height,padding] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
    "drawer-popup-motion",
  ),
  {
    defaultVariants: {
      behavior: "default",
      side: "bottom",
      size: "default",
      stacked: false,
    },
    variants: {
      behavior: {
        default: "",
        snap: "min-h-0 flex flex-col overflow-visible touch-none",
      },
      side: {
        bottom: cn(
          "[--drawer-bleed:3rem]",
          "-mb-[var(--drawer-bleed)] w-full max-h-[calc(80vh+var(--drawer-bleed))]",
          "rounded-t-2xl rounded-b-none px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--drawer-bleed))]",
          "drawer-popup-motion-bottom",
        ),
        left: cn(
          "[--drawer-bleed:3rem] supports-[-webkit-touch-callout:none]:[--drawer-bleed:0px]",
          "-ml-[var(--drawer-bleed)] h-full w-[calc(var(--drawer-size)+var(--drawer-bleed))] max-w-[calc(100vw-3rem+var(--drawer-bleed))]",
          "rounded-r-2xl rounded-l-none p-6 pl-[calc(1.5rem+var(--drawer-bleed))]",
          "supports-[-webkit-touch-callout:none]:ml-0 supports-[-webkit-touch-callout:none]:w-[var(--drawer-size)] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-2xl supports-[-webkit-touch-callout:none]:pl-6",
          "drawer-popup-motion-left",
        ),
        right: cn(
          "[--drawer-bleed:3rem] supports-[-webkit-touch-callout:none]:[--drawer-bleed:0px]",
          "-mr-[var(--drawer-bleed)] h-full w-[calc(var(--drawer-size)+var(--drawer-bleed))] max-w-[calc(100vw-3rem+var(--drawer-bleed))]",
          "rounded-l-2xl rounded-r-none p-6 pr-[calc(1.5rem+var(--drawer-bleed))]",
          "supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[var(--drawer-size)] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-2xl supports-[-webkit-touch-callout:none]:pr-6",
          "drawer-popup-motion-right",
        ),
        top: cn(
          "[--drawer-bleed:3rem]",
          "-mt-[var(--drawer-bleed)] w-full max-h-[calc(80vh+var(--drawer-bleed))]",
          "rounded-b-2xl rounded-t-none px-6 pb-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px)+var(--drawer-bleed))]",
          "drawer-popup-motion-top",
        ),
      },
      size: {
        default: "[--drawer-size:24rem]",
        lg: "[--drawer-size:28rem]",
        sm: "[--drawer-size:20rem]",
      },
      stacked: {
        false: "",
        true: "drawer-popup-stacked-motion",
      },
    },
  },
);

const drawerBodyVariants = cva(
  "w-full flex flex-col gap-4 min-h-0 flex-1 overflow-y-auto overscroll-contain touch-auto",
  {
    defaultVariants: {
      align: "default",
      behavior: "default",
      stacked: false,
    },
    variants: {
      align: {
        centered: "mx-auto max-w-[32rem]",
        default: "",
      },
      behavior: {
        default: "",
        snap: "",
      },
      stacked: {
        false: "",
        true: "drawer-content-stacked-motion",
      },
    },
  },
);

interface DrawerContentProps
  extends Omit<BaseDrawer.Popup.Props, "children">,
    VariantProps<typeof drawerViewportVariants>,
    VariantProps<typeof drawerPopupVariants>,
    VariantProps<typeof drawerBodyVariants> {
  children: React.ReactNode;
  contentProps?: Omit<BaseDrawer.Content.Props, "children" | "className">;
  showCloseButton?: boolean;
  showHandle?: boolean;
}

function isVerticalSide(side: "bottom" | "left" | "right" | "top") {
  return side === "bottom" || side === "top";
}

function DrawerContent({
  children,
  className,
  showCloseButton = false,
  showHandle,
  side = "bottom",
  behavior = "default",
  size = "default",
  stacked = false,
  align = "default",
  contentProps,
  ...props
}: DrawerContentProps) {
  const resolvedSide = side ?? "bottom";
  const resolvedBehavior = isVerticalSide(resolvedSide)
    ? (behavior ?? "default")
    : "default";
  const resolvedStacked = stacked ?? false;

  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport
        className={cn(
          drawerViewportVariants({
            behavior: resolvedBehavior,
            side: resolvedSide,
          }),
        )}
        data-slot="drawer-content-viewport"
      >
        <BaseDrawer.Popup
          className={cn(
            drawerPopupVariants({
              behavior: resolvedBehavior,
              side: resolvedSide,
              size: size ?? "default",
              stacked: resolvedStacked,
            }),
            resolvedBehavior === "snap" &&
              resolvedSide === "bottom" &&
              "drawer-popup-snap-bottom-motion",
            className,
          )}
          data-slot="drawer-content"
          {...props}
        >
          {showHandle && (
            <div
              className={cn(
                "mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30",
                resolvedSide === "top" && "order-last mb-0 mt-4",
              )}
              data-slot="drawer-handle"
            />
          )}

          <BaseDrawer.Content
            className={cn(
              drawerBodyVariants({
                align: align ?? "default",
                behavior: resolvedBehavior,
                stacked: resolvedStacked,
              }),
            )}
            data-slot="drawer-content-body"
            {...contentProps}
          >
            {children}
          </BaseDrawer.Content>

          {showCloseButton && (
            <BaseDrawer.Close
              aria-label="Close"
              className={cn(
                "absolute top-3 z-10",
                resolvedSide === "right"
                  ? "right-[calc(var(--drawer-bleed,0px)+0.75rem)]"
                  : "right-3",
              )}
              data-slot="drawer-close"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </BaseDrawer.Close>
          )}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </DrawerPortal>
  );
}

const createDrawerHandle = BaseDrawer.createHandle;

export {
  Drawer,
  DrawerProvider,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerTrigger,
  DrawerPortal,
  DrawerViewport,
  DrawerBackdrop,
  DrawerPopup,
  DrawerInnerContent,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
  DrawerFooter,
  createDrawerHandle,
  // Composite component
  DrawerContent,
};
