"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { ChevronDown } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  useContext,
  useState,
} from "react";
import { useTocActiveItem } from "@/hooks/use-toc-active-Item";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Dialog, DialogPopup, DialogTrigger } from "@/registry/ui/dialog";

const TocContext = createContext<{
  items: TOCItemType[];
  activeHeading: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function useTocContext() {
  const context = useContext(TocContext);
  if (!context) {
    throw new Error("useTocContext must be used within a TocProvider");
  }
  return context;
}

function TocTrigger() {
  const { open, items, activeHeading } = useTocContext();

  const activeItem = activeHeading
    ? items.find((item) => item.url === `#${activeHeading}`)
    : null;

  return (
    <DialogTrigger
      render={
        <Button
          variant="ghost"
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2.5 rounded-none px-4 py-2.5 text-xs sm:text-sm",
            "text-muted-foreground hover:text-primary hover:bg-transparent transition-colors shadow-none",
            "focus-visible:outline-none focus-visible:ring-0 md:px-6",
          )}
        >
          <span className="flex-1 truncate text-left">
            {!open && activeItem ? activeItem.title : "Table of Contents"}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      }
    />
  );
}

function TocContent() {
  const { items, activeHeading, setOpen } = useTocContext();

  return (
    <div className="flex flex-col p-4 text-sm">
      {items.map((item) => {
        const isActive = item.url === `#${activeHeading}`;
        return (
          <a
            key={item.url}
            href={item.url}
            data-active={isActive}
            onClick={() => setOpen(false)}
            className={cn(
              "border-l py-2 transition-colors text-xs hover:text-primary",
              isActive
                ? "text-primary border-primary"
                : "text-muted-foreground",
            )}
            style={{
              paddingLeft: `${12 * Math.max(item.depth - 1, 0) + 12}px`,
            }}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
}

export interface PageTOCPopoverProps extends ComponentProps<"div"> {
  items: TOCItemType[];
}

export function MobileToc({ items, className, ...props }: PageTOCPopoverProps) {
  const [open, setOpen] = useState(false);

  const itemIds = items.map((item) => item.url.slice(1));
  const activeHeading = useTocActiveItem(itemIds);

  const contextValue = { items, activeHeading, open, setOpen };

  return (
    <TocContext.Provider value={contextValue}>
      <div
        {...props}
        className={cn(
          "fixed z-50 h-10 w-full top-(--header-height) inset-x-0 bg-background/10 backdrop-blur-md border-b border-border/20",
          open && "border-0",
          className,
        )}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <TocTrigger />
          <DialogPopup
            showCloseButton={false}
            classNames={{
              popup: cn(
                "mx-0 w-screen max-w-none! rounded-none p-0 border-0 shadow-none",
                "top-[calc(var(--header-height)+2.5rem)] translate-y-0 left-0 translate-x-0",
                "max-h-[calc(100vh-var(--header-height)-2.5rem)]",
                "data-[starting-style]:!scale-100 data-[ending-style]:!scale-100",
                "bg-background/80 backdrop-blur border-b",
              ),
              backdrop: cn("bg-transparent"),
            }}
          >
            <TocContent />
          </DialogPopup>
        </Dialog>
      </div>
    </TocContext.Provider>
  );
}
