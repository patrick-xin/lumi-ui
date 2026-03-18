"use client";

import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/tv/combobox";
import { buttonVariants } from "@/registry/ui/button";
import { Separator } from "@/registry/ui/separator";

export function ComboboxInputInsidePopupDemo() {
  return (
    <div className="flex flex-col gap-1">
      <Combobox defaultValue={teamMembers[0]} items={teamMembers}>
        <ComboboxLabel>Team Member</ComboboxLabel>
        <ComboboxTrigger
          className={buttonVariants({
            className: "justify-between px-3 w-64",
            variant: "secondary",
          })}
        >
          <ComboboxValue />
          <ComboboxIcon>
            <ChevronsUpDownIcon />
          </ComboboxIcon>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInputGroupContent
            addonIcon={<SearchIcon />}
            className="flex-1"
            inputSize="lg"
            placeholder="Find member..."
          />
          <Separator />
          <ComboboxEmpty>No member found.</ComboboxEmpty>
          <ComboboxList>
            {(member: TeamMember) => (
              <ComboboxItemContent
                indicatorPlacement="end"
                key={member.id}
                value={member}
              >
                {member.label}
              </ComboboxItemContent>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
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
