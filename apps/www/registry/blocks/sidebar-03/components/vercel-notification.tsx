"use client";

import {
  ArchiveIcon,
  BellIcon,
  CalendarIcon,
  MessageCircleDashed,
  MessageCircleIcon,
  PlusIcon,
  Settings,
  TypeIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Input } from "@/registry/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/registry/ui/sheet";
import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/registry/ui/tabs";
import { DashboardOnboardingDialog } from "./onboarding-dialog";

const NotificationContext = React.createContext<
  | {
      open: boolean;
      setOpen: (open: boolean) => void;
      onClose: () => void;
      onBoardingOpen: boolean;
      setOnBoardingOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationContext.Provider",
    );
  }
  return context;
};

export const Notifications = () => {
  const [open, setOpen] = React.useState(false);
  const [onBoardingOpen, setOnBoardingOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <NotificationContext.Provider
        value={{
          onBoardingOpen,
          onClose: handleClose,
          open,
          setOnBoardingOpen,
          setOpen,
        }}
      >
        <NotificationContent />
      </NotificationContext.Provider>

      <DashboardOnboardingDialog
        open={onBoardingOpen}
        setOpen={setOnBoardingOpen}
      />
    </>
  );
};

const NotificationContent = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotificationSheet />;
  }

  return <NotificationPopover />;
};

const NotificationSheet = () => {
  const { open, setOpen } = useNotification();
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        className="relative"
        render={
          <Button
            aria-label="Notifications, you have unread messages"
            size="icon-sm"
            variant="outline"
          >
            <span>
              <BellIcon />
            </span>
            <span className="absolute -top-1 right-0 size-2.5 bg-green-600 rounded-full" />
            <span className="sr-only">You have unread messages</span>
          </Button>
        }
      />
      <SheetContent
        className="flex flex-col p-0 bg-background duration-300 h-[50dvh] max-h-[50dvh] overflow-hidden"
        side="bottom"
      >
        <UnderLineTabs />
      </SheetContent>
    </Sheet>
  );
};

function NotificationPopover() {
  const { open, setOpen } = useNotification();
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-label="Notifications, you have unread messages"
            size="icon-sm"
            variant="outline"
          >
            <span>
              <BellIcon />
            </span>

            <span className="absolute -top-1 -right-1 pointer-events-none">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
              </span>
            </span>
            <span className="sr-only">You have unread messages</span>
          </Button>
        }
      />
      <PopoverContent
        align="center"
        className="flex flex-col p-0 w-96 duration-300 h-[50dvh] max-h-[50dvh] overflow-hidden"
        matchAnchorWidth={false}
        side="bottom"
      >
        <UnderLineTabs />
      </PopoverContent>
    </Popover>
  );
}

const UnderLineTabs = () => {
  const { onClose, setOnBoardingOpen } = useNotification();
  return (
    <Tabs className="h-full" defaultValue="all">
      <div className="flex justify-between h-12 items-center border-b">
        <TabsList className="gap-6 h-full">
          <TabsTab
            className="w-16 cursor-pointer hover:text-foreground"
            value="all"
          >
            All
          </TabsTab>
          <TabsTab
            className="w-16 cursor-pointer hover:text-foreground"
            value="unread"
          >
            Unread
          </TabsTab>
          <TabsTab
            className="w-16 cursor-pointer hover:text-foreground"
            value="archived"
          >
            Archived
          </TabsTab>
          <TabIndicator className="bg-foreground -bottom-0.5 left-px h-0.5 translate-x-(--active-tab-left) translate-y-0" />
        </TabsList>
        <Button className="mr-2" size="icon-sm" variant="ghost">
          <Settings />
        </Button>
      </div>

      <TabsPanel
        className="h-full flex flex-col min-h-0"
        keepMounted
        value="all"
      >
        <ScrollArea
          className="flex flex-col flex-1 min-h-0 h-full"
          gradientScrollFade
          noScrollBar
        >
          <ol className="list-none group w-full">
            <li className="group/link border-b border-muted hover:bg-accent transition-colors">
              <button
                className="outline-none flex justify-between items-center gap-4 p-4 cursor-pointer"
                onClick={() => {
                  setOnBoardingOpen(true);
                  onClose();
                }}
                type="button"
              >
                <span>
                  <MessageCircleDashed className="size-4" />
                </span>

                <div className="flex flex-col justify-start gap-0.5 flex-1 text-left text-primary">
                  <span className="text-sm">Welcome to Lumi UI</span>
                  <span className="text-xs text-muted-foreground">
                    just now
                  </span>
                </div>
              </button>
            </li>
            {Array.from({ length: 30 }).map((_, index) => (
              <li
                className="group/link border-b border-muted last:border-0 hover:bg-accent transition-colors"
                key={index}
              >
                <a
                  className="outline-none flex justify-between items-center gap-4 p-4"
                  href="#"
                  onClick={onClose}
                >
                  <span>
                    <MessageCircleDashed className="size-4" />
                  </span>

                  <div className="flex flex-col justify-start gap-0.5 flex-1">
                    <span className="text-sm">
                      New notification {index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {index + 1} mins ago
                    </span>
                  </div>

                  <div className="opacity-0 group-hover/link:opacity-100 transition-opacity w-8">
                    <Button
                      className="cursor-pointer rounded-full text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      size="icon-sm"
                      title="Archive"
                      variant="ghost"
                    >
                      <ArchiveIcon />
                    </Button>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </ScrollArea>
        <div className="border-t border-input flex-none">
          <Button
            className="w-full rounded-none cursor-pointer hover:bg-accent shadow-none"
            onClick={onClose}
            variant="unstyled"
          >
            View All
          </Button>
        </div>
      </TabsPanel>
      <TabsPanel
        className="h-full flex flex-col min-h-0"
        keepMounted
        value="unread"
      >
        <ScrollArea className="flex-1 min-h-0" gradientScrollFade noScrollBar>
          <ol className="list-none group">
            {Array.from({ length: 20 }).map((_, index) => (
              <li
                className="group/link border-b border-muted last:border-0 hover:bg-muted transition-colors"
                key={index}
              >
                <a
                  className="outline-none flex justify-between items-center gap-4 p-4"
                  href="#"
                  onClick={onClose}
                >
                  <span>
                    <MessageCircleIcon className="size-4" />
                  </span>
                  <div className="flex flex-col justify-start gap-0.5 flex-1">
                    <span className="text-sm">
                      Unread notification {index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {index + 1} mins ago
                    </span>
                  </div>
                  <div className="w-8 opacity-0" />
                </a>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </TabsPanel>
      <TabsPanel className="flex flex-col h-full" keepMounted value="archived">
        <ScrollArea
          className="flex-1 min-h-0 flex flex-col relative"
          gradientScrollFade
          noScrollBar
        >
          <div className="flex gap-2 py-2 px-4 items-center">
            <Input placeholder="Search" variant="transparent" />
            <FilterDropdown />
          </div>
          <div className="flex justify-center items-center absolute inset-x-0 top-[calc(50%-3rem)]">
            <span className="text-muted-foreground flex flex-col items-center gap-2">
              <span className="bg-muted rounded-full p-3">
                <ArchiveIcon className="size-5" />
              </span>
              No archived notifications
            </span>
          </div>
        </ScrollArea>
      </TabsPanel>
    </Tabs>
  );
};

const FilterDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button aria-label="Filter notifications" variant="outline" />}
      >
        <PlusIcon />
        Filter
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36"
        matchAnchorWidth={false}
      >
        <DropdownMenuItem>
          <UserIcon /> Author
          <span className="sr-only">Filter by author</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarIcon /> Date
          <span className="sr-only">Filter by date</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TypeIcon /> Type
          <span className="sr-only">Filter by type</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
