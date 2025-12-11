"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react";
import { Button } from "@/registry/ui/button";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Dialog<Payload>({
  ...props
}: React.ComponentProps<typeof BaseDialog.Root<Payload>>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger<Payload>({
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger<Payload>>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Viewport>) {
  return (
    <BaseDialog.Viewport
      className={cn(
        "fixed inset-0 grid place-items-center p-4 sm:p-6",
        "outline-none",
        className
      )}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

function DialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/50",
        "transition-all duration-150",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
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
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup
          className={cn(
            "grid gap-4 rounded-lg border shadow-lg overflow-hidden -mt-8",
            "w-full max-w-[calc(100%-2rem)] max-h-full min-h-0 sm:max-w-lg",
            "transition-all duration-150",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "data-[nested-dialog-open]:scale-[calc(1-0.04*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:translate-y-[calc(1rem*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/10 data-[nested-dialog-open]:after:content-['']",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose
              className="absolute right-2 top-2"
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

function DialogClose({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return (
    <BaseDialog.Close
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) {
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
        className
      )}
      {...props}
    />
  );
}

const createDialogHandle = BaseDialog.createHandle;

export {
  createDialogHandle,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  // Pre-assembled component
  DialogContent,
};
