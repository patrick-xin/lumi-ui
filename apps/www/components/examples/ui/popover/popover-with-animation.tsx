"use client";

import { BellIcon, ListIcon, UserIcon } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarImage } from "@/registry/ui/avatar";
import { Button, buttonVariants } from "@/registry/ui/button";
import {
  createPopoverHandle,
  Popover,
  PopoverArrow,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
} from "@/registry/ui/popover";

const demoPopover = createPopoverHandle<React.ComponentType>();

export function PopoverWithAnimationDemo() {
  return (
    <div className="flex gap-4">
      <PopoverTrigger
        className={buttonVariants({ size: "icon", variant: "outline" })}
        handle={demoPopover}
        payload={NotificationsPanel}
      >
        <BellIcon aria-label="Notifications" />
      </PopoverTrigger>
      <PopoverTrigger
        className={buttonVariants({ size: "icon", variant: "outline" })}
        handle={demoPopover}
        payload={ActivityPanel}
      >
        <ListIcon aria-label="Activity" />
      </PopoverTrigger>
      <PopoverTrigger
        className={buttonVariants({ size: "icon", variant: "outline" })}
        handle={demoPopover}
        payload={ProfilePanel}
      >
        <UserIcon aria-label="Profile" />
      </PopoverTrigger>

      <Popover handle={demoPopover}>
        {({ payload: Payload }) => (
          <PopoverPortal>
            <PopoverPositioner
              className={`
                transition-[top,left,right,bottom,transform]
                duration-[0.35s]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                data-instant:transition-none`}
              sideOffset={8}
            >
              <PopoverPopup
                className={`
                  h-(--popup-height,auto) w-(--popup-width,auto) bg-popover shadow-md outline outline-border dark:-outline-offset-1 rounded-md
                  max-w-[500px] origin-(--transform-origin)
                  transition-[width,height,opacity,scale]
                  duration-[0.35s]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  data-ending-style:scale-90
                  data-ending-style:opacity-0 data-instant:transition-none
                  data-starting-style:scale-90
                  data-starting-style:opacity-0`}
              >
                <PopoverArrow
                  className={`
                    flex
                    transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-[side=bottom]:top-[-8px]
                    data-[side=left]:right-[-13px]
                    data-[side=left]:rotate-90
                    data-[side=right]:left-[-13px]
                    data-[side=right]:-rotate-90
                    data-[side=top]:bottom-[-8px]
                    data-[side=top]:rotate-180`}
                />
                <PopoverViewport
                  className={`
                    overflow-clip p-[1rem_1.5rem]
                    [&_[data-current]]:w-[calc(var(--popup-width)-3rem)]
                    [&_[data-current]]:translate-x-0
                    [&_[data-current]]:opacity-100
                    [&_[data-current]]:transition-[translate,opacity]
                    [&_[data-current]]:duration-[350ms,175ms]
                    [&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2
                    data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0
                    data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2
                    data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0
                    [&_[data-previous]]:w-[calc(var(--popup-width)-3rem)]
                    [&_[data-previous]]:translate-x-0
                    [&_[data-previous]]:opacity-100
                    [&_[data-previous]]:transition-[translate,opacity]
                    [&_[data-previous]]:duration-[350ms,175ms]
                    [&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2
                    data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0
                    data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2
                    data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0`}
                >
                  {Payload !== undefined && <Payload />}
                </PopoverViewport>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <React.Fragment>
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
    </React.Fragment>
  );
}

function ProfilePanel() {
  return (
    <div className="-mx-2 grid grid-cols-[auto_auto] gap-x-4">
      <PopoverTitle className="col-start-2 col-end-3 row-start-1 row-end-2">
        Jason Eventon
      </PopoverTitle>
      <Avatar className="col-start-1 col-end-2 row-start-1 row-end-3 inline-flex h-12 w-12 items-center justify-center">
        <AvatarImage
          className="h-full w-full object-cover"
          height="48"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          width="48"
        />
      </Avatar>
      <span className="col-start-2 col-end-3 row-start-2 row-end-3 text-sm">
        Pro plan
      </span>
      <div className="col-start-1 col-end-3 row-start-3 row-end-4 mt-2 flex flex-col gap-2 border-t pt-2 text-sm">
        <Button
          className="justify-start px-0"
          nativeButton={false}
          render={<a href="/">Profile settings</a>}
          variant="link"
        >
          Profile settings
        </Button>
        <Button>Log out</Button>
      </div>
    </div>
  );
}

function ActivityPanel() {
  return (
    <React.Fragment>
      <PopoverTitle>Activity</PopoverTitle>
      <PopoverDescription>
        Nothing interesting happened recently.
      </PopoverDescription>
    </React.Fragment>
  );
}
