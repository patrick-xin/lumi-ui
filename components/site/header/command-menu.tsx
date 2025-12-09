"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { ArrowDown, ArrowUp, CornerDownLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useIsMac } from "@/hooks/use-is-mac";
import { useMounted } from "@/hooks/use-mounted";
import { IconMap } from "@/lib/icons";
import { getSearchGroups } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import {
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/registry/ui/autocomplete";
import { Button } from "@/registry/ui/button";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import type { DocRoot, NavGroup, NavItem } from "@/types";

export function CommandMenu({ tree }: { tree: DocRoot }) {
  const navGroups = getSearchGroups(tree);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter();
  const isMac = useIsMac();
  const isMounted = useMounted();
  const isNavigatingRef = React.useRef(false);

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

  const handleOpenChange = () => {
    isNavigatingRef.current = false;
    setIsOpen(true);
  };

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (item: NavItem) => {
    isNavigatingRef.current = true; // Mark that we are navigating
    router.push(item.url);
    setIsOpen(false);
    setInputValue("");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleOpenChange}
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
      <Autocomplete.Root
        modal
        autoHighlight
        open={isOpen}
        onOpenChange={setIsOpen}
        items={navGroups}
        value={inputValue}
        onValueChange={handleValueChange}
        itemToStringValue={(item) => item.label}
        onOpenChangeComplete={(open) => !open && setInputValue("")}
      >
        <Autocomplete.Portal>
          <Autocomplete.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Autocomplete.Positioner
            positionMethod="fixed"
            className="inset-0 z-0 bottom-0 pointer-events-none flex justify-center items-center"
          >
            <Autocomplete.Popup
              finalFocus={() => !isNavigatingRef.current}
              className={cn(
                "relative px-4 pt-3 pb-12 bg-background rounded-md border border-input",
                "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
                "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
                "pointer-events-auto w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
                "-translate-y-12",
              )}
            >
              <AutocompleteInput
                className="focus-visible:border-none focus-visible:ring-0!"
                placeholder="Search documentation..."
              />
              <div className="mt-2 overflow-y-auto no-scrollbar h-80">
                <AutocompleteList className="max-h-full no-scrollbar">
                  {(group: NavGroup) => (
                    <AutocompleteGroup key={group.value} items={group.items}>
                      <AutocompleteGroupLabel className="text-muted-foreground text-sm mb-1">
                        {group.value}
                      </AutocompleteGroupLabel>
                      <AutocompleteCollection>
                        {(item: NavItem) => {
                          const Icon =
                            (item.icon as React.ElementType) ||
                            IconMap[item.folderName] ||
                            IconMap.default;

                          return (
                            <AutocompleteItem
                              onClick={() => handleSelect(item)}
                              key={item.value}
                              value={item}
                              className="text-foreground data-[highlighted]:text-accent-foreground data-[highlighted]:border-accent data-[highlighted]:bg-accent/50 h-9 rounded-md border border-transparent px-1.5 font-medium relative flex cursor-default items-center py-1.5 text-sm outline-hidden select-none gap-3"
                            >
                              <Icon className="size-4 text-muted-foreground" />
                              {item.label}
                              {item.status && item.status === "new" && (
                                <span className="inline-block size-2 mt-px rounded-full bg-primary ml-6" />
                              )}
                            </AutocompleteItem>
                          );
                        }}
                      </AutocompleteCollection>
                    </AutocompleteGroup>
                  )}
                </AutocompleteList>
                <AutocompleteEmpty className="text-center py-12 text-muted-foreground">
                  No results found.
                </AutocompleteEmpty>
                <div className="absolute bottom-0 inset-x-0 border-t">
                  <div className="py-2 px-4 flex items-center gap-3">
                    <div className="inline-flex items-center gap-1">
                      <Kbd>
                        <ArrowUp />
                      </Kbd>
                      <Kbd>
                        <ArrowDown />
                      </Kbd>
                      <span className="text-xs text-muted-foreground">
                        Navigate
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <Kbd>
                        <CornerDownLeftIcon />
                      </Kbd>
                      <span className="text-xs text-muted-foreground">
                        Go to Page
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </>
  );
}
