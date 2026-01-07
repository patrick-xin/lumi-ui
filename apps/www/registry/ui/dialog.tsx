"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Dialog as BaseDialog } from "@base-ui/react";
import { cva, VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";

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
        "fixed inset-0 min-h-dvh bg-black/70 backdrop-blur-xs supports-backdrop-filter:bg-background/80 animate-backdrop",
        "supports-[-webkit-touch-callout:none]:absolute",
        className
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
      className={cn("bg-background rounded p-4 sm:p-6 shadow-md", className)}
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
        className
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

const viewportVariants = cva("fixed inset-0", {
  variants: {
    layout: {
      center: "grid place-items-center p-4",
      optical: "grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
      sheet: "flex items-end sm:items-center justify-center sm:p-4 animate-fade-up sm:animate-dialog",
      stacked: "contents", 
      scrollable: "flex items-center justify-center overflow-hidden py-6 [@media(min-height:600px)]:pb-12 [@media(min-height:600px)]:pt-8",
    },
  },
  defaultVariants: {
    layout: "optical",
  },
});

const popupVariants = cva(
  "bg-background", 
  {
    variants: {
      layout: {
        center: "relative grid w-full gap-4 shadow-lg max-w-lg rounded-lg border animate-dialog",
        optical: "grid w-full gap-4 shadow-xl max-w-lg rounded-xl border ",
        sheet: "relative grid gap-4 shadow-lg w-full rounded-t-[1.25rem] rounded-b-none border-t px-6 pb-8 pt-6 sm:max-w-lg sm:rounded-lg sm:border sm:px-6 sm:pb-6 sm:pt-6",
        stacked: cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "grid gap-4 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg rounded animate-dialog",
          "top-[calc(50%+1.25rem*var(--nested-dialogs))] scale-[calc(1-0.05*var(--nested-dialogs))]",
          "data-nested-dialog-open:after:absolute data-nested-dialog-open:after:inset-0 data-nested-dialog-open:after:rounded-[inherit] data-nested-dialog-open:after:bg-black/5"
        ),
        scrollable: cn(
          "relative flex flex-col gap-6 overflow-hidden",
          "min-h-0 max-h-full max-w-full w-[min(40rem,calc(100vw-2rem))]",
          "rounded-md outline animate-dialog"
        ),
      },
      intent: {
        default: "outline-1 outline-border dark:-outline-offset-1",
        destructive: "outline-2 outline-destructive/20 border-destructive/50",
      }
    },
    defaultVariants: {
      layout: "center",
      intent: "default",
    },
  }
);

interface DialogContentProps
  extends React.ComponentProps<typeof BaseDialog.Popup>,
    VariantProps<typeof popupVariants> {
  showCloseButton?: boolean;
}

function DialogContent({
  children,
  className,
  showCloseButton = false,
  layout = "sheet",
  intent = "default",
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport className={viewportVariants({ layout })}>
        <DialogPopup
          className={cn(popupVariants({ layout, intent }), className)}
          data-slot="dialog-content"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose
              render={
                <Button
                  size="icon-sm"
                  variant="outline"
                  className={cn(
                    "absolute right-2 top-2",
                    layout === "sheet" && "max-sm:top-5 max-sm:right-5"
                  )}
                >
                  <XIcon className="size-4" />
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

const DialogStackedContent = (props: Omit<DialogContentProps, "layout">) => (
  <DialogContent layout="stacked" {...props} />
);

const DialogScrollableContent = (props: Omit<DialogContentProps, "layout">) => (
  <DialogContent layout="scrollable" {...props} />
);

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
  DialogScrollArea,
  DialogFooter,
  DialogClose,
  createDialogHandle,
  popupVariants,
  viewportVariants,
  // Composite component
  DialogContent,
  DialogScrollableContent,
  DialogStackedContent,
};
