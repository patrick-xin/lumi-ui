"use client";

import * as React from "react";
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { ArrowSvg } from "@/registry/ui/arrow-svg";

import { cn } from "@/lib/utils";

function PreviewCard({
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Root>) {
  return <BasePreviewCard.Root data-slot="preview-card" {...props} />;
}

function PreviewCardTrigger({
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Trigger>) {
  return (
    <BasePreviewCard.Trigger data-slot="preview-card-trigger" {...props} />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup>) {
  return (
    <BasePreviewCard.Popup data-slot="preview-card-popup"
    className={cn("", className)} {...props} />
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
      <BasePreviewCard.Positioner align={align} sideOffset={sideOffset}>
        <BasePreviewCard.Popup
          data-slot="preview-card-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-64 rounded-md p-4 shadow-md outline outline-border dark:-outline-offset-1",
            "animate-popup",
            className,
          )}
          {...props}
        >
          {showArrow && (
            <BasePreviewCard.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg variant="popover" />
            </BasePreviewCard.Arrow>
          )}
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}


export { PreviewCard, PreviewCardTrigger, PreviewCardContent };
