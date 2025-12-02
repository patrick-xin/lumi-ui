"use client";

import { Dialog as BaseDialog } from "@base-ui-components/react";
import type { VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

function Dialog({
  ...props
}: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/50 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({
  classNames,
  children,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentProps<typeof BaseDialog.Popup>, "className"> & {
  showCloseButton?: boolean;
  classNames?: {
    backdrop?: string;
    popup?: string;
    close?: string;
  };
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogBackdrop className={cn(classNames?.backdrop)} />
      <BaseDialog.Popup
        data-slot="dialog-popup"
        className={cn(
          "bg-background grid gap-4 w-full max-w-[calc(100%-2rem)] rounded-lg border p-6 shadow-lg sm:max-w-lg",
          "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          "transition-all duration-150",
          "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
          classNames?.popup,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <BaseDialog.Close
            data-slot="dialog-close"
            className={cn(
              "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              classNames?.close,
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </DialogPortal>
  );
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof BaseDialog.Close> &
  VariantProps<typeof buttonVariants>) {
  return (
    <BaseDialog.Close
      data-slot="dialog-close"
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
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogBackdrop,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
