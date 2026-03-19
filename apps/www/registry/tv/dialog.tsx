"use client";

import { Dialog as BaseDialog } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";

function Dialog<Payload>({ ...props }: BaseDialog.Root.Props<Payload>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger<Payload>({
  ...props
}: BaseDialog.Trigger.Props<Payload>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: BaseDialog.Portal.Props) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogViewport({ className, ...props }: BaseDialog.Viewport.Props) {
  return (
    <BaseDialog.Viewport
      className={cn("fixed inset-0 outline-none", className)}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/20 backdrop-blur-xs animate-fade",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  ...props
}: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Popup
      className={cn("bg-background", className)}
      data-slot="dialog-popup"
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

function DialogClose({ ...props }: BaseDialog.Close.Props) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />;
}

function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      className={cn("text-lg leading-none font-semibold", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

const dialogContentStyles = tv({
  slots: {
    viewport: "fixed inset-0",
    popup:
      "bg-background rounded-md p-4 sm:p-6 shadow-md dark:shadow-xs overlay-outline",
    closeButton: "absolute right-2 top-2",
  },
  variants: {
    layout: {
      center: {
        viewport: "grid place-items-center p-4",
        popup: "relative grid w-full gap-4 shadow-lg max-w-lg rounded-lg animate-fade-zoom",
      },
      "element-outside": {
        viewport: [
          "flex flex-col items-center justify-center",
          "px-4 py-12 sm:py-16",
        ],
        popup: "flex h-full w-full justify-center pointer-events-none p-0 bg-transparent outline-0 animate-fade",
      },
      responsive: {
        viewport: "flex items-end sm:items-center justify-center sm:p-4",
        popup: [
          "relative grid gap-4 shadow-lg w-full rounded-t-[1.25rem] rounded-b-none border-t",
          "px-6 pb-8 pt-6 sm:max-w-lg sm:rounded-lg sm:px-6 sm:pb-6 sm:pt-6 animate-fade",
        ],
        closeButton: "max-sm:top-5 max-sm:right-5",
      },
      scrollable: {
        viewport: [
          "flex items-center justify-center overflow-hidden",
          "py-6 [@media(min-height:600px)]:pb-12 [@media(min-height:600px)]:pt-8",
        ],
        popup: [
          "relative overflow-hidden min-h-0 h-full max-h-full max-w-full",
          "[&>[data-slot=scroll-area-root]]:min-h-0",
          "flex flex-col gap-6 w-[min(40rem,calc(100vw-2rem))] rounded-md animate-fade-zoom",
        ],
      },
      stacked: {
        viewport: "contents",
        popup: [
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "grid gap-4 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg rounded animate-fade",
          "top-[calc(50%+0.75rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))]",
          "data-nested-dialog-open:after:absolute data-nested-dialog-open:after:inset-0 data-nested-dialog-open:after:rounded-[inherit] data-nested-dialog-open:after:bg-black/5",
        ],
      },
      top: {
        viewport: "grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        popup: "relative grid w-full gap-4 shadow-xl max-w-lg rounded-md animate-fade-down",
      },
    },
  },
  defaultVariants: {
    layout: "center",
  },
});

type DialogContentProps = Omit<BaseDialog.Popup.Props, "className"> &
  VariantProps<typeof dialogContentStyles> & {
    showCloseButton?: boolean;
    className?: string;
  };

function DialogContent({
  children,
  className,
  showCloseButton = false,
  layout = "responsive",
  ...props
}: DialogContentProps) {
  const { viewport, popup, closeButton } = dialogContentStyles({ layout });
  return (
    <DialogPortal>
      <DialogBackdrop />
      <BaseDialog.Viewport className={viewport()}>
        <BaseDialog.Popup
          className={popup({ class: className })}
          data-slot="dialog-content"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose
              render={
                <Button
                  className={closeButton()}
                  size="icon-sm"
                  variant="outline"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </Button>
              }
            />
          )}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </DialogPortal>
  );
}

const DialogElementOutsideContent = ({
  className,
  children,
  ...props
}: Omit<DialogContentProps, "layout" | "showCloseButton">) => {
  return (
    <DialogContent layout="element-outside" {...props}>
      <div
        className={cn(
          "pointer-events-auto h-full w-full flex flex-col",
          "shadow-md rounded bg-background",
          className,
        )}
      >
        {children}
      </div>
    </DialogContent>
  );
};

const createDialogHandle = BaseDialog.createHandle;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  createDialogHandle,
  dialogContentStyles,
  // Composite component
  DialogContent,
  DialogElementOutsideContent,
};
