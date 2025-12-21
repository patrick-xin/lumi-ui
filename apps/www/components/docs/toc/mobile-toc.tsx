"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { ChevronDown } from "lucide-react";
import { type ComponentProps, useState } from "react";
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

function TocTrigger({
  handle,
  open,
  items,
  activeHeading,
}: {
  handle: any;
  open: boolean;
  items: TOCItemType[];
  activeHeading: string | null;
}) {
  const activeItem = activeHeading
    ? items.find((item) => item.url === `#${activeHeading}`)
    : null;

  return (
    <DialogTrigger
      handle={handle}
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
  const [tocHandle] = useState(() => createDialogHandle());
  const itemIds = items.map((item) => item.url.slice(1));
  const activeHeading = useTocActiveItem(itemIds);

  return (
    <div
      {...props}
      className={cn(
        "fixed z-50 h-10 w-full top-(--header-height) inset-x-0 bg-background/10 backdrop-blur-md border-b border-border/20",
        open && "border-0",
        className,
      )}
    >
      <TocTrigger
        handle={tocHandle}
        open={open}
        items={items}
        activeHeading={activeHeading}
      />
      <Dialog handle={tocHandle} open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogPopup
            className={cn(
              "fixed top-[calc(var(--header-height)+2.5rem)] h-[calc(100vh-var(--header-height)-2.5rem)] w-screen z-50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-100",
            )}
          >
            <TocContent
              items={items}
              activeHeading={activeHeading}
              setOpen={setOpen}
            />
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
