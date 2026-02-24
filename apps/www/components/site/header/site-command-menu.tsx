"use client";

import { useIsMac } from "@lumi-ui/ui/hooks/use-is-mac";
import { ArrowDown, ArrowUp, CornerDownLeftIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as React from "react";
import { IconMap } from "@/lib/icons";
import { getResourceLinkIcon } from "@/lib/resource-link-icon";
import { getSearchGroups } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandMenu,
  CommandMenuContent,
  CommandMenuFooter,
  CommandMenuTrigger,
  CommandScrollArea,
} from "@/registry/ui/command-menu";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import type { DocRoot, NavGroup, NavItem } from "@/types";

export function SiteCommandMenu({ tree }: { tree: DocRoot }) {
  const navGroups = getSearchGroups(tree);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const t = useTranslations("CommandMenu");
  const isMac = useIsMac();

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

  function handleItemClick(item: NavItem) {
    const isExternalUrl =
      item.url.startsWith("http") || item.url.startsWith("https");
    setIsOpen(false);
    if (isExternalUrl) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  }

  return (
    <CommandMenu onOpenChange={setIsOpen} open={isOpen}>
      <CommandMenuTrigger
        render={
          <Button
            className={cn(
              "relative h-8 px-2 md:px-4 justify-start md:w-48 lg:w-56 xl:w-64",
            )}
            onClick={() => setIsOpen(true)}
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
        }
      />
      <CommandMenuContent
        aria-label="Command menu"
        className="max-w-lg shadow-primary/20 shadow-2xl"
      >
        <Command
          autoHighlight="always"
          inline
          items={navGroups}
          keepHighlight
          open
        >
          <CommandInput
            autoFocus
            className="caret-primary"
            inputSize="lg"
            placeholder={t("placeholder")}
            variant="ghost"
          />

          <CommandEmpty>No results found.</CommandEmpty>
          <CommandScrollArea gradientScrollFade noScrollBar>
            <CommandList>
              {(group: NavGroup) => (
                <React.Fragment key={group.value}>
                  <CommandGroup items={group.items} key={group.value}>
                    <CommandGroupLabel className="font-medium">
                      {group.value}
                    </CommandGroupLabel>
                    <CommandCollection>
                      {(item: NavItem) => {
                        const resourceIcon = getResourceLinkIcon(
                          item.label,
                          "command",
                        );
                        const Icon =
                          (item.icon as React.ElementType) ||
                          IconMap[item.folderName] ||
                          IconMap.default;

                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => handleItemClick(item)}
                            value={item}
                          >
                            {resourceIcon ?? (
                              <Icon className="size-4 text-muted-foreground" />
                            )}
                            {item.label}
                            {item.status && item.status === "new" && (
                              <span className="inline-block size-2 mt-px rounded-full bg-primary ml-6" />
                            )}
                          </CommandItem>
                        );
                      }}
                    </CommandCollection>
                  </CommandGroup>
                </React.Fragment>
              )}
            </CommandList>
          </CommandScrollArea>
        </Command>
        <CommandMenuFooter className="hidden md:flex">
          <div className="flex items-center gap-1">
            <Kbd>
              <ArrowUp />
            </Kbd>
            <Kbd>
              <ArrowDown />
            </Kbd>
            <span className="text-xs">{t("navigation")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
            <span className="text-xs">{t("goToPage")}</span>
          </div>
        </CommandMenuFooter>
      </CommandMenuContent>
    </CommandMenu>
  );
}
