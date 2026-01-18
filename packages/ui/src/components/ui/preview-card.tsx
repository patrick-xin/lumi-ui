"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";
import { cn } from "@lumi-ui/ui/lib/utils";
import { ArrowSvg } from "@lumi-ui/ui/arrow-svg";

function PreviewCard({
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Root>) {
  return <BasePreviewCard.Root data-slot="preview-card" {...props} />;
}

function PreviewCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Trigger>) {
  return (
    <BasePreviewCard.Trigger  className={cn(className)} data-slot="preview-card-trigger" {...props} />
  );
}

function PreviewPortal({
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Portal>) {
  return <BasePreviewCard.Portal data-slot="preview-card-portal" {...props} />;
}

function PreviewBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Backdrop>) {
  return (
    <BasePreviewCard.Backdrop className={cn(className)} data-slot="preview-card-backdrop" {...props} />
  );
}

function PreviewPositioner({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Positioner>) {
  return (
    <BasePreviewCard.Positioner
      className={cn(className)}
      data-slot="preview-card-positioner"
      {...props}
    />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup>) {
  return (
    <BasePreviewCard.Popup
      className={cn(className)}
      data-slot="preview-card-popup"
      {...props}
    />
  );
}

function PreviewCardArrow({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Arrow>) {
  return (
    <BasePreviewCard.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      data-slot="preview-card-arrow"
      {...props}
    >
      <ArrowSvg />
    </BasePreviewCard.Arrow>
  );
}

function PreviewCardContent({
  children,
  className,
  align = "center",
  sideOffset = 4,
  showArrow = false,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup> & {
  children: React.ReactNode;
  align?: "center" | "start" | "end";
  sideOffset?: number;
  showArrow?: boolean;
}) {
  return (
    <BasePreviewCard.Portal data-slot="preview-card-portal">
      <BasePreviewCard.Positioner
        align={align}
        data-slot="preview-card-positioner"
        sideOffset={sideOffset}
        
      >
        <BasePreviewCard.Popup
          className={cn(
            "bg-popover text-popover-foreground w-64 rounded-md p-4 shadow-md outline outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          data-slot="preview-card-content"
          {...props}
        >
          {showArrow && <PreviewCardArrow />}
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}

export {
  PreviewCard,
  PreviewCardTrigger,
  PreviewPortal,
  PreviewBackdrop,
  PreviewPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
  // Composite component
  PreviewCardContent,
};
