"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useIsMac } from "@/hooks/use-is-mac";
import { useMounted } from "@/hooks/use-mounted";
import { IconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/ui/combobox";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import type { NavGroup, NavItem } from "@/types";

export function CommandMenu({ navGroups }: { navGroups: NavGroup[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMac = useIsMac();
  const isMounted = useMounted();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "relative h-8 w-full justify-start font-medium shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64",
            )}
          >
            <span className="hidden lg:inline-flex text-muted-foreground">
              Search documentation...
            </span>
            <span className="inline-flex lg:hidden">Search...</span>
            <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
              <KbdGroup>
                <Kbd className="border">{isMac ? "⌘" : "Ctrl"}</Kbd>
                <Kbd className="border">K</Kbd>
              </KbdGroup>
            </div>
          </Button>
        }
      />
      <DialogHeader className="sr-only">
        <DialogTitle>Search documentation...</DialogTitle>
        <DialogDescription>Search for a command to run...</DialogDescription>
      </DialogHeader>
      <DialogPopup
        showCloseButton={false}
        classNames={{
          popup: cn("px-2 py-2.5 min-h-96 gap-0"),
          backdrop: "backdrop-blur-xs",
        }}
      >
        <Combobox items={navGroups}>
          <div className="flex h-9 items-center gap-2 border px-3 bg-transparent border-input rounded-md">
            <SearchIcon className="size-4 shrink-0 opacity-50" />
            <ComboboxInput
              placeholder="Search documentation..."
              className="w-full bg-transparent h-12 outline-none text-sm"
            />
          </div>

          <div className="py-3 overflow-y-auto no-scrollbar h-96 relative scroll-pt-2 scroll-pb-1.5 rounded-md rounded-t-none ">
            <ComboboxList className="space-y-4">
              {(group: NavGroup) => (
                <ComboboxGroup
                  className="px-2"
                  key={group.value}
                  items={group.items}
                >
                  <ComboboxGroupLabel className="text-muted-foreground text-sm mb-1">
                    {group.value}
                  </ComboboxGroupLabel>

                  <ComboboxCollection>
                    {(item: NavItem) => {
                      const Icon = IconMap[item.folderName] || IconMap.default;

                      return (
                        <ComboboxItem
                          className="text-foreground data-[highlighted]:text-accent-foreground data-[highlighted]:border-input data-[highlighted]:bg-accent/50 h-9 rounded-md border border-transparent px-1.5 font-medium relative flex cursor-default items-center gap-2 py-1.5 text-sm outline-hidden select-none"
                          key={item.value}
                          value={item}
                          render={
                            <Link
                              className="flex gap-4 items-center"
                              onClick={() => setIsOpen(false)}
                              href={item.url}
                            >
                              <Icon className="size-4 text-muted-foreground" />
                              {item.label}
                              {item.status && item.status === "new" && (
                                <span className="inline-block size-2 mt-px rounded-full bg-primary ml-6" />
                              )}
                            </Link>
                          }
                        />
                      );
                    }}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
            <ComboboxEmpty className="px-4 text-sm absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              No results found.
            </ComboboxEmpty>
          </div>
        </Combobox>
      </DialogPopup>
    </Dialog>
  );
}
