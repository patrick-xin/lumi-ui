"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTocActiveItem } from "@/hooks/use-toc-active-Item";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";

const tocHandle = createDialogHandle();

function TocTrigger({
  open,
  items,
  activeHeading,
}: {
  open: boolean;
  items: TOCItemType[];
  activeHeading: string | null;
}) {
  const activeItem = activeHeading
    ? items.find((item) => item.url === `#${activeHeading}`)
    : null;

  return (
    <DialogTrigger
      handle={tocHandle}
      render={
        <Button
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2.5 rounded-none px-4 py-2.5 text-xs sm:text-sm",
            "text-muted-foreground shadow-none",
            "focus-visible:outline-none focus-visible:ring-0 md:px-6",
            "fixed z-50 h-10 w-full top-(--header-height) inset-x-0 bg-background backdrop-blur-md border-b supports-[backdrop-filter]:bg-background/80",
            open && "border-0",
          )}
          variant="unstyled"
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

function TocContent({
  items,
  activeHeading,
  setOpen,
}: {
  items: TOCItemType[];
  activeHeading: string | null;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col p-4">
      {items.map((item) => {
        const isActive = item.url === `#${activeHeading}`;
        return (
          <a
            className={cn(
              "border-l py-2 transition-colors text-xs sm:text-sm lg:text-base hover:text-primary",
              isActive
                ? "text-primary border-primary"
                : "text-muted-foreground",
            )}
            data-active={isActive}
            href={item.url}
            key={item.url}
            onClick={() => setOpen(false)}
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

export function MobileToc({
  className,
  items,
}: {
  items: TOCItemType[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const itemIds = items.map((item) => item.url.slice(1));
  const activeHeading = useTocActiveItem(itemIds);

  return (
    <div className={className}>
      <TocTrigger activeHeading={activeHeading} items={items} open={open} />
      <Dialog handle={tocHandle} onOpenChange={setOpen} open={open}>
        <DialogPortal>
          <DialogPopup
            animation="none"
            className={cn(
              "fixed top-[calc(var(--header-height)+2.5rem)] h-full w-screen p-0 z-50 overflow-y-auto transition-opacity min-h-[calc(100vh-var(--header-height)-2.5rem)] pb-32",
            )}
          >
            <ScrollArea gradientScrollFade>
              <TocContent
                activeHeading={activeHeading}
                items={items}
                setOpen={setOpen}
              />
            </ScrollArea>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
