"use client";

import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { buttonVariants } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/ui/combobox";
import { Separator } from "@/registry/ui/separator";

export function ComboboxInputInsidePopupDemo() {
  return (
    <Combobox defaultValue={teamMembers[0]} items={teamMembers}>
      <ComboboxTrigger
        className={buttonVariants({
          className:
            "justify-between px-3 w-64 data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent",
          variant: "outline",
        })}
      >
        <ComboboxValue />
        <ComboboxIcon>
          <ChevronsUpDownIcon />
        </ComboboxIcon>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInputGroup
          addonIcon={<SearchIcon />}
          placeholder="Find member..."
          variant="ghost"
        />
        <Separator />
        <ComboboxEmpty>No member found.</ComboboxEmpty>
        <ComboboxList>
          {(member: TeamMember) => (
            <ComboboxItemContent key={member.id} value={member}>
              {member.label}
            </ComboboxItemContent>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

interface TeamMember {
  id: string;
  value: string;
  role: string;
  label: string;
}

const teamMembers: TeamMember[] = [
  { id: "1", label: "Alex Davis", role: "Product", value: "alex.d" },
  { id: "2", label: "Sarah King", role: "Engineering", value: "sarah.k" },
  { id: "3", label: "James Wilson", role: "Design", value: "james.w" },
  { id: "4", label: "Maria Garcia", role: "Marketing", value: "maria.g" },
  { id: "5", label: "David Chen", role: "Engineering", value: "david.c" },
  { id: "6", label: "Emma Roberts", role: "Product", value: "emma.r" },
];
