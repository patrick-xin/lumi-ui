"use client";

import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";

const AlertDialog = (({ ...props }: React.ComponentProps<typeof BaseAlertDialog.Root>) => (
  <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />
)) as typeof BaseAlertDialog.Root;

const AlertDialogTrigger = (({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Trigger>) => (
  <BaseAlertDialog.Trigger
    data-slot="alert-dialog-trigger"
    className={cn(className)}
    {...props}
  />
)) as typeof BaseAlertDialog.Trigger;

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Portal>) {
  return (
    <BaseAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
  return (
    <BaseAlertDialog.Backdrop
      data-slot="alert-dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        "transition-all duration-200",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "data-[nested-dialog-open]:opacity-0", 
        "supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "scale-[calc(1-0.1*var(--nested-dialogs,0))]",
          "translate-y-[calc(-50%+1.25rem*var(--nested-dialogs,0))]",
          "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-lg data-[nested-dialog-open]:after:bg-black/10",
          className
        )}
        {...props}
      />
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
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
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
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) {
  return (
    <BaseAlertDialog.Close
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) {
  return (
    <BaseAlertDialog.Close
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

const createAlertDialogHandle = BaseAlertDialog.createHandle

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogBackdrop,
  createAlertDialogHandle,
};