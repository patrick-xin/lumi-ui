"use client";

import { buttonVariants } from "@lumi-ui/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/ui/combobox";
import { Separator } from "@/registry/ui/separator";

export function ComboboxInputInsidePopupDemo() {
  return (
    <Combobox items={teamMembers} defaultValue={teamMembers[0]}>
      <ComboboxTrigger
        className={buttonVariants({
          variant: "outline",
          className: "justify-between px-3 w-64",
        })}
      >
        <ComboboxValue />
        <ComboboxIcon>
          <ChevronsUpDownIcon />
        </ComboboxIcon>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Find member..." variant="ghost" />
        <Separator />
        <ComboboxEmpty>No member found.</ComboboxEmpty>
        <ComboboxList>
          {(member: TeamMember) => (
            <ComboboxItem key={member.id} value={member}>
              {member.label}
            </ComboboxItem>
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
  { id: "1", value: "alex.d", role: "Product", label: "Alex Davis" },
  { id: "2", value: "sarah.k", role: "Engineering", label: "Sarah King" },
  { id: "3", value: "james.w", role: "Design", label: "James Wilson" },
  { id: "4", value: "maria.g", role: "Marketing", label: "Maria Garcia" },
  { id: "5", value: "david.c", role: "Engineering", label: "David Chen" },
  { id: "6", value: "emma.r", role: "Product", label: "Emma Roberts" },
];
