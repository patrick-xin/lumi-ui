"use client";

import { Dialog as BaseSheet } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function Sheet(props: BaseSheet.Root.Props) {
  return <BaseSheet.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ className, ...props }: BaseSheet.Trigger.Props) {
  return (
    <BaseSheet.Trigger
      className={className}
      data-slot="sheet-trigger"
      {...props}
    />
  );
}

function SheetPortal({ className, ...props }: BaseSheet.Portal.Props) {
  return (
    <BaseSheet.Portal
      className={className}
      data-slot="sheet-portal"
      {...props}
    />
  );
}

function SheetViewport({
  className,
  side,
  inset = false,
  ...props
}: BaseSheet.Viewport.Props & {
  side?: VariantProps<typeof popupVariants>["side"];
  inset?: boolean;
}) {
  return (
    <BaseSheet.Viewport
      className={cn(
        "fixed inset-0",
        side === "bottom" && "grid grid-rows-[1fr_auto]",
        side === "top" && "grid grid-rows-[auto_1fr]",
        side === "left" && "flex justify-start",
        side === "right" && "flex justify-end",
        inset && "p-4 sm:p-6",
      )}
      data-slot="sheet-viewport"
      {...props}
    />
  );
}

function SheetBackdrop({ className, ...props }: BaseSheet.Backdrop.Props) {
  return (
    <BaseSheet.Backdrop
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/20 backdrop-blur-xs animate-fade",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      data-slot="sheet-backdrop"
      {...props}
    />
  );
}

function SheetPopup({ className, children, ...props }: BaseSheet.Popup.Props) {
  return (
    <BaseSheet.Popup
      className={cn("bg-background", className)}
      data-slot="sheet-popup"
      {...props}
    >
      {children}
    </BaseSheet.Popup>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: BaseSheet.Title.Props) {
  return (
    <BaseSheet.Title
      className={cn("text-xl font-semibold", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: BaseSheet.Description.Props) {
  return (
    <BaseSheet.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2", className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetClose({ className, ...props }: BaseSheet.Close.Props) {
  return (
    <BaseSheet.Close className={className} data-slot="sheet-close" {...props} />
  );
}

const popupVariants = cva(
  "relative flex flex-col gap-4 p-4 sm:p-6 bg-background text-foreground max-h-full w-full overflow-hidden",
  {
    defaultVariants: {
      side: "right",
    },
    variants: {
      side: {
        bottom: "row-start-2 animate-fade-up border-t",
        left: "max-w-md animate-slide-right border-r w-[calc(100%-3rem)]",
        right: "max-w-md animate-slide-left border-l w-[calc(100%-3rem)]",
        top: "animate-fade-down border-b",
      },
    },
  },
);

interface SheetContentProps
  extends BaseSheet.Popup.Props,
    VariantProps<typeof popupVariants> {
  showCloseButton?: boolean;
  inset?: boolean;
  backdropClassName?: string;
}

function SheetContent({
  className,
  children,
  showCloseButton = false,
  side = "right",
  inset = false,
  backdropClassName,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetBackdrop className={cn(backdropClassName)} />
      <SheetViewport inset={inset} side={side}>
        <BaseSheet.Popup
          className={cn(
            popupVariants({ side }),
            inset &&
              "rounded-md outline-1 outline-border dark:outline-offset-1 border-none",
            className,
          )}
          data-slot="sheet-content"
          {...props}
        >
          {children}
          {showCloseButton && (
            <BaseSheet.Close
              aria-label="Close"
              className="absolute top-2 right-2"
              data-slot="sheet-close"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </BaseSheet.Close>
          )}
        </BaseSheet.Popup>
      </SheetViewport>
    </SheetPortal>
  );
}

const createSheetHandle = BaseSheet.createHandle;

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetViewport,
  SheetBackdrop,
  SheetPopup,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  createSheetHandle,
  // Composite component
  SheetContent,
};
