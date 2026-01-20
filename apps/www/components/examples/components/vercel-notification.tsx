"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { useIsMobile } from "@lumi-ui/ui/hooks/use-mobile";
import { Input } from "@lumi-ui/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@lumi-ui/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@lumi-ui/ui/sheet";
import { TabIndicator, Tabs, TabsList, TabsTab } from "@lumi-ui/ui/tabs";
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

type TabType = "all" | "unread" | "archived";

const NotificationContext = React.createContext<
  | {
      open: boolean;
      setOpen: (open: boolean) => void;
      activeTab: TabType;
      setActiveTab: (tab: TabType) => void;
      onClose: () => void;
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

export const VercelNotification = () => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabType>("all");
  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider
      value={{
        activeTab,
        onClose: handleClose,
        open,
        setActiveTab,
        setOpen,
      }}
    >
      <NotificationContent />
    </NotificationContext.Provider>
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
      <SheetTrigger render={<TriggerButton />} />
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
      <PopoverTrigger render={<TriggerButton />} />
      <PopoverContent
        align="end"
        className="flex flex-col p-0 w-96 bg-background duration-300 h-[50dvh] max-h-[50dvh] overflow-hidden"
        matchAnchorWidth={false}
        side="bottom"
      >
        <UnderLineTabs />
      </PopoverContent>
    </Popover>
  );
}

const ContentContainer = () => {
  const { activeTab, onClose } = useNotification();
  if (activeTab === "all") {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <ol className="list-none group" data-tab={activeTab}>
          {Array.from({ length: 30 }).map((_, index) => (
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
                  <MessageCircleDashed className="size-4" />
                </span>

                <div className="flex flex-col justify-start gap-0.5 flex-1">
                  <span className="text-sm">New notification {index + 1}</span>
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
      </div>
    );
  }
  if (activeTab === "unread") {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <ol className="list-none group" data-tab={activeTab}>
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
      </div>
    );
  }
  if (activeTab === "archived")
    return (
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col">
        <div className="flex gap-2 py-2 px-4 items-center">
          <Input placeholder="Search" variant="transparent" />
          <FilterDropdown />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <span className="-mt-6 text-muted-foreground flex flex-col items-center gap-2">
            <span className="bg-muted rounded-full p-3">
              <ArchiveIcon className="size-5" />
            </span>
            No archived notifications
          </span>
        </div>
      </div>
    );
  return null;
};

const UnderLineTabs = () => {
  const { activeTab, setActiveTab, onClose } = useNotification();
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-2 bg-background h-12 flex-none">
        <Tabs
          className="h-full"
          onValueChange={(v) => setActiveTab(v as TabType)}
          value={activeTab}
        >
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
            <TabIndicator className="bg-foreground -bottom-0.5 left-0 h-0.5 translate-x-(--active-tab-left) translate-y-0" />
          </TabsList>
        </Tabs>
        <Button size="icon-sm" variant="ghost">
          <Settings />
        </Button>
      </div>
      {/* Content */}
      <ContentContainer />
      {/* Footer */}
      {activeTab === "all" && (
        <div className="bg-background border-t border-muted flex-none">
          <Button
            className="w-full rounded-none cursor-pointer hover:bg-muted shadow-none"
            onClick={onClose}
            variant="unstyled"
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};

const FilterDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Filter notifications"
            className="data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent"
            variant="outline"
          />
        }
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

const TriggerButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      aria-label="Notifications, you have unread messages"
      className="relative data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent rounded-full"
      size="icon-sm"
      variant="outline"
      {...props}
    >
      <span>
        <BellIcon />
      </span>
      <span className="absolute top-0 right-0 size-2.5 bg-green-600 rounded-full" />
      <span className="sr-only">You have unread messages</span>
    </Button>
  );
};
