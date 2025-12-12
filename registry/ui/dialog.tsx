"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
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
      data-slot="dialog-viewport"
      className={cn("fixed inset-0 p-4 sm:p-6 outline-none", className)}
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
        "fixed inset-0 min-h-dvh bg-black/70 backdrop-blur-xs",
        "transition-all duration-150",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
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
      className={cn(
        "relative bg-background p-4 sm:p-6",
        "will-change-transform transition-all duration-150",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
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
      <DialogViewport className="grid place-items-center">
        <BaseDialog.Popup
          className={cn(
            "relative grid w-full max-w-[calc(100%-2rem)] gap-4 p-4",
            "bg-background bg-clip-padding rounded-lg border shadow-lg overflow-hidden",
            "min-h-0 max-h-full sm:max-w-lg sm:p-6 sm:rounded-md",
            "will-change-transform transition-all duration-150 origin-top",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "data-[nested-dialog-open]:scale-[calc(1-0.04*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:translate-y-[calc(1rem*var(--nested-dialogs))]",
            "data-[nested-dialog-open]:after:absolute",
            "data-[nested-dialog-open]:after:inset-0",
            "data-[nested-dialog-open]:after:rounded-[inherit]",
            "data-[nested-dialog-open]:after:bg-black/10",
            "data-[nested-dialog-open]:after:content-['']",
            "max-sm:data-[starting-style]:translate-y-4",
            "max-sm:data-[ending-style]:translate-y-4",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <BaseDialog.Close
              className={cn(
                "absolute top-2 right-2 rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none",
                "focus:ring-2 focus:ring-offset-2 focus:outline-hidden ring-offset-background focus:ring-ring",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
              )}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </BaseDialog.Close>
          )}
        </BaseDialog.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

function DialogClose({ ...props }: BaseDialog.Close.Props) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />;
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
        className,
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
