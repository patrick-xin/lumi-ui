"use client";

import { HelpCircleIcon, InfoIcon, OctagonAlert } from "lucide-react";
import { ArrowSvg } from "@/registry/ui/arrow-svg";
import { Button } from "@/registry/ui/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  TooltipViewport,
} from "@/registry/ui/tooltip";

const demoTooltip = createTooltipHandle<React.ComponentType>();

export default function TooltipAnimationDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <TooltipTrigger
          render={
            <Button variant={"outline"} size={"icon"}>
              <InfoIcon aria-label="Information" className="size-5" />
            </Button>
          }
          handle={demoTooltip}
          payload={InfoContent}
        />

        <TooltipTrigger
          render={
            <Button variant={"outline"} size={"icon"}>
              <HelpCircleIcon aria-label="Help" className="size-5" />
            </Button>
          }
          handle={demoTooltip}
          payload={HelpContent}
        />

        <TooltipTrigger
          render={
            <Button variant={"outline"} size={"icon"}>
              <OctagonAlert aria-label="Alert" className="size-5" />
            </Button>
          }
          handle={demoTooltip}
          payload={AlertContent}
        />
      </div>

      <Tooltip handle={demoTooltip}>
        {({ payload: Payload }) => (
          <TooltipPortal>
            <TooltipPositioner
              sideOffset={10}
              className="
                h-(--positioner-height) w-(--positioner-width)
                max-w-(--available-width)
                transition-[top,left,right,bottom,transform]
                duration-[0.35s]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                data-instant:transition-none"
            >
              <TooltipPopup
                className="
                  relative bg-foreground text-background z-50
                  h-(--popup-height,auto) w-(--popup-width,auto)
                  max-w-[500px]
                  rounded-md
                  text-sm
                  origin-(--transform-origin)
                  transition-[width,height,opacity,scale]
                  duration-[0.35s]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  data-ending-style:opacity-0 data-ending-style:scale-90
                  data-instant:transition-none
                  data-starting-style:opacity-0 data-starting-style:scale-90
                 "
              >
                <TooltipArrow
                  className="
                    flex
                    transition-[left]
                    duration-[0.35s]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-instant:transition-none
                    data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0
                    data-[side=left]:right-[-13px] data-[side=left]:rotate-90
                    data-[side=right]:left-[-13px] data-[side=right]:-rotate-90
                    data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
                >
                  <ArrowSvg />
                </TooltipArrow>

                <TooltipViewport
                  className="
                    [--viewport-inline-padding:0.5rem]
                    overflow-clip
                    px-[var(--viewport-inline-padding)] py-1
                    [&_[data-previous]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
                    [&_[data-previous]]:translate-x-0
                    [&_[data-previous]]:opacity-100
                    [&_[data-previous]]:transition-[translate,opacity]
                    [&_[data-previous]]:duration-[350ms,175ms]
                    [&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)]
                    [&_[data-current]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
                    [&_[data-current]]:translate-x-0
                    [&_[data-current]]:opacity-100
                    [&_[data-current]]:transition-[translate,opacity]
                    [&_[data-current]]:duration-[350ms,175ms]
                    [&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2
                    data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0
                    data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2
                    data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0
                    [[data-instant]_&_[data-previous]]:transition-none
                    [[data-instant]_&_[data-current]]:transition-none
                    data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2
                    data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0
                    data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2
                    data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"
                >
                  {Payload !== undefined && <Payload />}
                </TooltipViewport>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

function InfoContent() {
  return <span className="text-sm">This is information about the feature</span>;
}

function HelpContent() {
  return <span className="text-sm">Need help?</span>;
}

function AlertContent() {
  return <span className="text-sm">Warning: This action cannot be undone</span>;
}
