"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  Book,
  Component,
  CornerDownLeftIcon,
  FileText,
  Github,
  Globe,
  Keyboard,
  LogOut,
  MessageSquare,
  Moon,
  Palette,
  Plus,
  Search,
  Settings,
  Terminal,
  Twitter,
  User,
  Webhook,
} from "lucide-react";
import * as React from "react";
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
  CommandSeparator,
  CommandShortcut,
} from "@/registry/ui/command-menu";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";

export function CommandMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "l") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <CommandMenu onOpenChange={setIsOpen} open={isOpen}>
      <CommandMenuTrigger render={<Button variant="glow" />}>
        Open with
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>L</Kbd>
        </KbdGroup>
      </CommandMenuTrigger>
      <CommandMenuContent aria-label="Command menu">
        <Command items={groupedItems}>
          <CommandInput
            autoFocus
            className="caret-primary"
            inputSize="lg"
            placeholder="Search documentation..."
            showClear
            variant="ghost"
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandScrollArea gradientScrollFade noScrollBar>
            <CommandList>
              {(group: Group) => (
                <React.Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => {
                        const Icon = item.icon;
                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => setIsOpen(false)}
                            value={item}
                          >
                            <Icon className="size-4 text-muted-foreground group-data-highlighted/command-item:text-foreground" />
                            {item.label}
                            {item.shortcut && (
                              <CommandShortcut className="hidden md:block">
                                {item.shortcut}
                              </CommandShortcut>
                            )}
                          </CommandItem>
                        );
                      }}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              )}
            </CommandList>
          </CommandScrollArea>
        </Command>

        <CommandMenuFooter className="hidden md:flex">
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd>
                <ArrowUpIcon />
              </Kbd>
              <Kbd>
                <ArrowDownIcon />
              </Kbd>
            </KbdGroup>
            <span>Navigate</span>
          </div>

          <div className="flex items-center gap-2">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
            <span>Activate</span>
          </div>
        </CommandMenuFooter>
      </CommandMenuContent>
    </CommandMenu>
  );
}

interface Item {
  value: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
}

interface Group {
  value: string;
  items: Item[];
}

const resources: Item[] = [
  { icon: FileText, label: "Documentation", shortcut: "⌘D", value: "docs" },
  { icon: Component, label: "Components", shortcut: "⌘C", value: "components" },
  { icon: Webhook, label: "Hooks", shortcut: "⌘H", value: "hooks" },
  { icon: Palette, label: "Themes", shortcut: "⌘T", value: "themes" },
  { icon: Book, label: "Guides", value: "guides" },
  { icon: Keyboard, label: "Shortcuts", value: "shortcuts" },
];

const actions: Item[] = [
  { icon: Plus, label: "New Project", shortcut: "⌘N", value: "new-project" },
  {
    icon: Search,
    label: "Search Files",
    shortcut: "⌘F",
    value: "search-files",
  },
  {
    icon: Moon,
    label: "Toggle Dark Mode",
    shortcut: "⌥D",
    value: "toggle-dark-mode",
  },
  { icon: Terminal, label: "Open Terminal", value: "terminal" },
  { icon: Settings, label: "Settings", shortcut: "⌘,", value: "settings" },
  { icon: User, label: "Profile", value: "profile" },
  { icon: LogOut, label: "Log Out", shortcut: "⌥Q", value: "logout" },
];

const community: Item[] = [
  { icon: Github, label: "GitHub", value: "github" },
  { icon: Twitter, label: "Twitter", value: "twitter" },
  { icon: MessageSquare, label: "Discord", value: "discord" },
  { icon: Globe, label: "Website", value: "website" },
];

const groupedItems: Group[] = [
  { items: resources, value: "Resources" },
  { items: actions, value: "Actions" },
  { items: community, value: "Community" },
];
