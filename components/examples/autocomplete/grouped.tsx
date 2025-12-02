"use client";

import {
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import type * as React from "react";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/ui/autocomplete";
import { Label } from "@/registry/ui/label";

// --- Sample Data ---
interface Command {
  id: string;
  label: string;
  group: "Suggestions" | "Settings";
  icon: React.ReactNode;
}

const commands: Command[] = [
  { id: "c1", label: "Profile", group: "Settings", icon: <User /> },
  { id: "c2", label: "Mail", group: "Suggestions", icon: <Mail /> },
  { id: "c3", label: "Settings", group: "Settings", icon: <Settings /> },
  { id: "c4", label: "New Team", group: "Settings", icon: <UserPlus /> },
  {
    id: "c5",
    label: "New Message",
    group: "Suggestions",
    icon: <MessageSquare />,
  },
  {
    id: "c6",
    label: "Add new item",
    group: "Suggestions",
    icon: <PlusCircle />,
  },
];

function groupCommands(items: Command[]) {
  const groups: { [key: string]: Command[] } = {};
  items.forEach((item) => {
    (groups[item.group] = groups[item.group] || []).push(item);
  });
  return Object.entries(groups).map(([value, items]) => ({ value, items }));
}

const groupedCommands = groupCommands(commands);

export function GroupedCommandDemo() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete
        defaultOpen
        items={groupedCommands}
        itemToStringValue={(item) => item.label}
      >
        <Label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Command Palette
          <div className="relative">
            <AutocompleteInput
              showSearchIcon
              placeholder="Type a command or search..."
            />
            <AutocompleteClear className="right-3" />
          </div>
        </Label>
        <AutocompletePopup>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: { value: string; items: Command[] }) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(command: Command) => (
                    <AutocompleteItem key={command.id} value={command}>
                      {command.icon}
                      <span>{command.label}</span>
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
