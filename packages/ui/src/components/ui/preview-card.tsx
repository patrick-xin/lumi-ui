"use client";

import {
  PreviewCard as BasePreviewCard,
  type PreviewCardTriggerProps,
} from "@base-ui/react/preview-card";
import type * as React from "react";
import { cn } from "../../lib/utils";
import { ArrowSvg } from "./arrow-svg";

function PreviewCard<Payload>(props: BasePreviewCard.Root.Props<Payload>) {
  return <BasePreviewCard.Root data-slot="preview-card" {...props} />;
}

function PreviewCardTrigger<Payload>({
  className,
  ...props
}: PreviewCardTriggerProps<Payload>) {
  return (
    <BasePreviewCard.Trigger
      className={className}
      data-slot="preview-card-trigger"
      {...props}
    />
  );
}

function PreviewPortal({ className, ...props }: BasePreviewCard.Portal.Props) {
  return (
    <BasePreviewCard.Portal
      className={className}
      data-slot="preview-card-portal"
      {...props}
    />
  );
}

function PreviewBackdrop({
  className,
  ...props
}: BasePreviewCard.Backdrop.Props) {
  return (
    <BasePreviewCard.Backdrop
      className={className}
      data-slot="preview-card-backdrop"
      {...props}
    />
  );
}

function PreviewPositioner({
  className,
  ...props
}: BasePreviewCard.Positioner.Props) {
  return (
    <BasePreviewCard.Positioner
      className={className}
      data-slot="preview-card-positioner"
      {...props}
    />
  );
}

function PreviewCardPopup({
  className,
  ...props
}: BasePreviewCard.Popup.Props) {
  return (
    <BasePreviewCard.Popup
      className={className}
      data-slot="preview-card-popup"
      {...props}
    />
  );
}

function PreviewCardArrow({
  className,
  ...props
}: BasePreviewCard.Arrow.Props) {
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
  side = "bottom",
  alignOffset = 6,
  sideOffset = 4,
  showArrow = false,
  ...props
}: BasePreviewCard.Popup.Props & {
  children: React.ReactNode;
  align?: BasePreviewCard.Positioner.Props["align"];
  alignOffset?: BasePreviewCard.Positioner.Props["alignOffset"];
  side?: BasePreviewCard.Positioner.Props["side"];
  sideOffset?: BasePreviewCard.Positioner.Props["sideOffset"];
  showArrow?: boolean;
}) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        align={align}
        alignOffset={alignOffset}
        data-slot="preview-card-positioner"
        side={side}
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

const createPreviewCardHandle = BasePreviewCard.createHandle;

export {
  PreviewCard,
  PreviewCardTrigger,
  PreviewPortal,
  PreviewBackdrop,
  PreviewPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
  createPreviewCardHandle,
  // Composite component
  PreviewCardContent,
};
