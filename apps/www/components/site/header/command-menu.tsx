"use client";

import { useIsMac } from "@lumi-ui/ui/hooks/use-is-mac";
import { useMounted } from "@lumi-ui/ui/hooks/use-mounted";
import { Kbd, KbdGroup } from "@lumi-ui/ui/kbd";
import { ArrowDown, ArrowUp, CornerDownLeftIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";
import type { DocRoot, NavGroup, NavItem } from "@/types";

export function CommandMenu({ tree }: { tree: DocRoot }) {
  const navGroups = getSearchGroups(tree);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter();
  const t = useTranslations("CommandMenu");
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
        autoHighlight
        items={navGroups}
        itemToStringValue={(item) => item.label}
        modal
        onOpenChange={setIsOpen}
        onOpenChangeComplete={(open) => !open && setInputValue("")}
        onValueChange={handleValueChange}
        open={isOpen}
        value={inputValue}
      >
        <AutocompletePortal>
          <AutocompleteBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-xs animate-fade" />
          <AutocompletePositioner
            className="inset-0 z-0 bottom-0 pointer-events-none flex justify-center items-center"
            positionMethod="fixed"
          >
            <AutocompletePopup
              className={cn(
                "relative bg-popover text-popover-foreground rounded outline outline-input animate-fade",
                "pointer-events-auto w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
                "-translate-y-16 sm:-translate-y-32 max-w-[var(--available-width)]",
                "mx-4",
              )}
              finalFocus={() => !isNavigatingRef.current}
            >
              <AutocompleteInputGroup
                className="caret-primary"
                inputSize="lg"
                placeholder={t("placeholder")}
                showClear
                variant="ghost"
              />
              <Separator />
              <ScrollArea
                className="h-96 pt-2 sm:pb-12"
                gradientScrollFade
                noScrollBar
              >
                <AutocompleteEmpty className="text-center text-base py-12 text-muted-foreground">
                  {t("noResults")}
                </AutocompleteEmpty>
                <AutocompleteList>
                  {(group: NavGroup) => (
                    <AutocompleteGroup
                      className="my-2 first:mt-0 last:mb-0"
                      items={group.items}
                      key={group.value}
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
                              className="font-medium flex items-center text-sm gap-3 data-[highlighted]:before:inset-x-1 data-[highlighted]:before:rounded-md py-2.5"
                              key={item.value}
                              onClick={() => handleSelect(item)}
                              value={item}
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
  const t = useTranslations("CommandMenu");
  const isMac = useIsMac();
  return (
    <Button
      className={cn(
        "relative h-8 px-2 md:px-4 justify-start md:w-48 lg:w-56 xl:w-64",
      )}
      onClick={handleOpenChange}
      variant="glow"
    >
      <span className="hidden lg:inline-flex text-muted-foreground">
        {t("placeholder")}
      </span>
      <span className="inline-flex lg:hidden">
        <Search className="size-4" />
      </span>
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
  const t = useTranslations("CommandMenu");
  return (
    <div className="hidden sm:block absolute h-10 bottom-0 inset-x-0 border-t bg-popover text-popover-foreground rounded-b-md">
      <div className="py-2 px-4 flex items-center gap-3">
        <div className="inline-flex items-center gap-1">
          <Kbd>
            <ArrowUp />
          </Kbd>
          <Kbd>
            <ArrowDown />
          </Kbd>
          <span className="text-xs text-muted-foreground">
            {t("navigation")}
          </span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <span className="text-xs text-muted-foreground">{t("goToPage")}</span>
        </div>
      </div>
    </div>
  );
};
