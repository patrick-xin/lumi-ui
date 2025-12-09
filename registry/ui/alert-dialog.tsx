"use client";

import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { buttonVariants } from "@/registry/ui/button";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

const AlertDialog = (({
  ...props
}: BaseAlertDialog.Root.Props) => (
  <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />
)) as typeof BaseAlertDialog.Root;

const AlertDialogTrigger = (({
  className,
  ...props
}: BaseAlertDialog.Trigger.Props) => (
  <BaseAlertDialog.Trigger
    data-slot="alert-dialog-trigger"
    className={cn(className)}
    {...props}
  />
));

function AlertDialogPortal({
  ...props
}: BaseAlertDialog.Portal.Props) {
  return <BaseAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogBackdrop({
  className,
  ...props
}: BaseAlertDialog.Backdrop.Props) {
  return (
    <BaseAlertDialog.Backdrop
      data-slot="alert-dialog-backdrop"
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/80",
        "transition-all duration-200",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "data-[nested-dialog-open]:opacity-0",
        "supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogPopup({
  className,
  ...props
}: BaseAlertDialog.Popup.Props) {
  return (
    <BaseAlertDialog.Popup
      data-slot="alert-dialog-popup"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogViewport({
  className,
  ...props
}: BaseAlertDialog.Viewport.Props) {
  return (
    <BaseAlertDialog.Viewport
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4",
        className,
      )}
      data-slot="alert-dialog-viewport"
      {...props}
    />
  );
}


function AlertDialogContent({
  className,
  ...props
}: BaseAlertDialog.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPopup
          className={cn(
            "grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg",
            "scale-[calc(1-0.1*var(--nested-dialogs,0))]",
            "translate-y-[calc(-50%+1.25rem*var(--nested-dialogs,0))]",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-lg data-[nested-dialog-open]:after:bg-black/10",
            className,
          )}
        {...props}
      />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: BaseAlertDialog.Title.Props) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: BaseAlertDialog.Description.Props) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogClose({
  className,
  variant,
  ...props
}: BaseAlertDialog.Close.Props & VariantProps<typeof buttonVariants>) {
  return (
    <BaseAlertDialog.Close
      data-slot="alert-dialog-close"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

const createAlertDialogHandle = BaseAlertDialog.createHandle;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogPortal,
  AlertDialogBackdrop,
  createAlertDialogHandle,
  // Pre assembled components
  AlertDialogContent,
};
