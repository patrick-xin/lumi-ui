"use client";

import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/registry/ui/button";
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

        <ComboboxTrigger
          render={
            <Button
              className="group data-popup-open:bg-accent hover:bg-accent"
              size="icon-xs"
              variant="ghost"
            />
          }
        >
          <ComboboxIcon>
            <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-popup-open:rotate-180" />
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
