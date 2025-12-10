"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react";
import { XIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";

import { cn } from "@/lib/utils";

function Dialog<Payload>({ ...props }: BaseDialog.Root.Props<Payload>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger<Payload>({ ...props }: BaseDialog.Trigger.Props<Payload>) {
  return <BaseDialog.Trigger<Payload> data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: BaseDialog.Portal.Props) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogViewport({ className, ...props }: BaseDialog.Viewport.Props) {
  return (
    <BaseDialog.Viewport
      className={cn(
        "fixed inset-0 grid place-items-center p-4 sm:p-6",
        "outline-none",
        className,
      )}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/50",
        "transition-all duration-150",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({ className, children, ...props }: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Popup
      data-slot="dialog-popup"
      className={cn("relative bg-background p-6", className)}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

function DialogContent({
  children,
  className,
  showCloseButton = true,
  ...props
}: BaseDialog.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup
          className={cn(
            "grid gap-4 rounded-lg border shadow-lg overflow-hidden",
            "w-full max-w-[calc(100%-2rem)] max-h-full min-h-0 sm:max-w-lg",
            "-mt-8",
            "transition-all duration-150",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "data-[nested-dialog-open]:scale-[calc(1-0.04*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:translate-y-[calc(1rem*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/10 data-[nested-dialog-open]:after:content-['']",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              render={
                <Button variant="ghost" size="icon-sm">
                  <XIcon />
                  <span className="sr-only">Close</span>
                </Button>
              }
            />
          )}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}

function DialogClose({ className, ...props }: BaseDialog.Close.Props) {
  return (
    <BaseDialog.Close
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

const createDialogHandle = BaseDialog.createHandle;

export {
  Dialog,
  DialogViewport,
  DialogClose,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogBackdrop,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  createDialogHandle,
  // Pre-assembled component
  DialogContent,
};
