"use client";

import { useIsMac } from "@lumi-ui/ui/hooks/use-is-mac";
import { useMounted } from "@lumi-ui/ui/hooks/use-mounted";
import { ArrowDown, ArrowUp, CornerDownLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { IconMap } from "@/lib/icons";
import { getSearchGroups } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import {
  Autocomplete,
  AutocompleteBackdrop,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/ui/autocomplete";
import { Button } from "@/registry/ui/button";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";
import type { DocRoot, NavGroup, NavItem } from "@/types";

export function CommandMenu({ tree }: { tree: DocRoot }) {
  const navGroups = getSearchGroups(tree);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter();

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
    isNavigatingRef.current = true;
    router.push(item.url);
    setIsOpen(false);
    setInputValue("");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CommandMenuTriggerButton handleOpenChange={handleOpenChange} />
      <Autocomplete
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
        <AutocompletePortal>
          <AutocompleteBackdrop className="fixed inset-0 bg-black/50" />
          <AutocompletePositioner
            positionMethod="fixed"
            className="inset-0 z-0 bottom-0 pointer-events-none flex justify-center items-center"
          >
            <AutocompletePopup
              finalFocus={() => !isNavigatingRef.current}
              className={cn(
                "relative bg-popover text-popover-foreground rounded outline outline-input animate-popup",
                "pointer-events-auto w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
                "-translate-y-32 max-w-[var(--available-width)]",
                "shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10",
              )}
            >
              <AutocompleteInputGroup
                placeholder="Search documentation..."
                variant="ghost"
                className="caret-primary"
                inputSize="lg"
                showClear
              />
              <Separator />
              <ScrollArea
                noScrollBar
                gradientScrollFade
                className="h-96 pt-2 pb-12"
              >
                <AutocompleteEmpty className="text-center text-base py-12 text-muted-foreground">
                  No results found.
                </AutocompleteEmpty>
                <AutocompleteList>
                  {(group: NavGroup) => (
                    <AutocompleteGroup
                      key={group.value}
                      items={group.items}
                      className="my-2 first:mt-0 last:mb-0"
                    >
                      <AutocompleteGroupLabel className="ml-1 mb-1 font-semibold uppercase">
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
                              className="font-medium flex items-center text-sm gap-3 data-[highlighted]:before:inset-x-1 data-[highlighted]:before:rounded-md py-2.5"
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
              </ScrollArea>
              <CommandMenuBottomBar />
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </>
  );
}

const CommandMenuTriggerButton = ({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) => {
  const isMac = useIsMac();
  return (
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
  );
};

const CommandMenuBottomBar = () => {
  return (
    <div className="absolute h-10 bottom-0 inset-x-0 border-t bg-popover text-popover-foreground rounded-b-md">
      <div className="py-2 px-4 flex items-center gap-3">
        <div className="inline-flex items-center gap-1">
          <Kbd>
            <ArrowUp />
          </Kbd>
          <Kbd>
            <ArrowDown />
          </Kbd>
          <span className="text-xs text-muted-foreground">Navigate</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <span className="text-xs text-muted-foreground">Go to Page</span>
        </div>
      </div>
    </div>
  );
};
