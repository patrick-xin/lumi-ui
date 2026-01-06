"use client";

import { Dialog as BaseDialog } from "@base-ui/react";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { ScrollArea } from "@/registry/ui/scroll-area";

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
      className={cn("fixed inset-0 outline-none", className)}
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
      className={cn(
        "fixed inset-0 min-h-dvh bg-black/70 animate-backdrop",
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
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup
      className={cn(
        "bg-background rounded p-4 sm:p-6",
        className,
      )}
      data-slot="dialog-popup"
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

function DialogClose({ ...props }: BaseDialog.Close.Props) {
  return (
    <BaseDialog.Close aria-label="Close" data-slot="dialog-close" {...props} />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) {
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
}: React.ComponentProps<typeof BaseDialog.Description>) {
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

function DialogScrollArea({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      className={cn("flex-1 min-h-0 w-full pr-4", className)}
      data-slot="dialog-scroll-area"
      {...props}
    />
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
        <DialogPopup
          className={cn(
            "grid gap-4 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-background rounded animate-dialog",
            "outline outline-1 outline-border dark:-outline-offset-1",
            className,
          )}
          data-slot="dialog-content"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose
              render={
                <Button size="icon-sm" variant="outline">
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

function DialogStackedContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPopup
        className={cn(
          "fixed left-1/2 -translate-x-1/2 -translate-y-1/2",
          "grid gap-4 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-background rounded animate-dialog",
          "outline outline-1 outline-border dark:-outline-offset-1",
          "top-[calc(50%+1.25rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))]",
          "data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/20",
          className,
        )}
        data-slot="dialog-stacked-content"
        {...props}
      />
    </DialogPortal>
  );
}

function DialogScrollableContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport
        className={cn(
          "flex items-center justify-center overflow-hidden",
          "py-6 [@media(min-height:600px)]:pb-12 [@media(min-height:600px)]:pt-8",
        )}
      >
        <DialogPopup
          className={cn(
            "flex flex-col gap-6 overflow-hidden",
            "min-h-0 max-h-full max-w-full w-[min(40rem,calc(100vw-2rem))]",
            "rounded-md outline outline-border dark:-outline-offset-1 animate-dialog",
            className,
          )}
          data-slot="dialog-scrollable-content"
          {...props}
        >
          {children}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}

const createDialogHandle = BaseDialog.createHandle;

export {
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
  DialogScrollArea,
  createDialogHandle,
  // Composite component
  DialogContent,
  DialogStackedContent,
  DialogScrollableContent,
};
