"use client";

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
} from "@lumi-ui/ui/combobox";
import { Separator } from "@lumi-ui/ui/separator";
import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";

export function ComboboxInputInsidePopupRefDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <Combobox defaultValue={teamMembers[0]} items={teamMembers}>
      <div
        className="p-2 flex rounded-md border w-56 justify-between items-center"
        ref={containerRef}
      >
        <span className="text-sm p-1">
          <a href="#">
            <ComboboxValue />
          </a>
        </span>

        <ComboboxTrigger className="group hover:bg-accent data-[popup-open]:bg-accent p-1 rounded-md">
          <ComboboxIcon>
            <ChevronDownIcon className="size-4 group-data-[popup-open]:rotate-180" />
          </ComboboxIcon>
        </ComboboxTrigger>
      </div>

      <ComboboxContent positionerAnchor={containerRef}>
        <ComboboxInputGroup placeholder="Find member..." variant="ghost" />
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
