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
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@/registry/ui/autocomplete";

interface Command {
  id: string;
  label: string;
  group: "Suggestions" | "Settings";
  icon: React.ReactNode;
}

const commands: Command[] = [
  { group: "Settings", icon: <User />, id: "c1", label: "Profile" },
  { group: "Suggestions", icon: <Mail />, id: "c2", label: "Mail" },
  { group: "Settings", icon: <Settings />, id: "c3", label: "Settings" },
  { group: "Settings", icon: <UserPlus />, id: "c4", label: "New Team" },
  {
    group: "Suggestions",
    icon: <MessageSquare />,
    id: "c5",
    label: "New Message",
  },
  {
    group: "Suggestions",
    icon: <PlusCircle />,
    id: "c6",
    label: "Add new item",
  },
];

function groupCommands(items: Command[]) {
  const groups: { [key: string]: Command[] } = {};
  items.forEach((item) => {
    (groups[item.group] = groups[item.group] || []).push(item);
  });
  return Object.entries(groups).map(([value, items]) => ({ items, value }));
}

const groupedCommands = groupCommands(commands);

export function AutocompleteGroupedDemo() {
  return (
    <Autocomplete
      items={groupedCommands}
      itemToStringValue={(item) => item.label}
    >
      <AutocompleteInputGroup
        className="w-72"
        placeholder="Type a command or search..."
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        <AutocompleteList>
          {(group: { value: string; items: Command[] }) => (
            <AutocompleteGroup items={group.items} key={group.value}>
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
      </AutocompleteContent>
    </Autocomplete>
  );
}
