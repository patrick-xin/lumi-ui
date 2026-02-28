"use client";

import {
  CheckCircle2,
  ChevronsUpDownIcon,
  Circle,
  CircleDashed,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/registry/lib/utils";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

export function SelectCustomRenderDemo() {
  return (
    <Select<Status> itemToStringValue={(status) => status.value}>
      <SelectTriggerGroup
        indicatorIcon={<ChevronsUpDownIcon />}
        placeholder="Select a status"
      >
        {(selected: Status) => {
          if (!selected) return null;

          const Icon = selected.icon;
          return (
            <span className="flex items-center gap-2">
              <Icon className={cn("size-4", selected.color)} />
              <span>{selected.label}</span>
            </span>
          );
        }}
      </SelectTriggerGroup>
      <SelectContent alignItemWithTrigger>
        {statuses.map((status) => (
          <SelectItemContent key={status.value} value={status}>
            <div className="flex items-center gap-2">
              <status.icon className={cn("size-4", status.color)} />
              <span>{status.label}</span>
            </div>
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}

type Status = {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

const statuses: Status[] = [
  {
    color: "text-muted-foreground",
    icon: CircleDashed,
    label: "Backlog",
    value: "backlog",
  },
  {
    color: "text-muted-foreground",
    icon: Circle,
    label: "Todo",
    value: "todo",
  },
  {
    color: "text-blue-500",
    icon: HelpCircle,
    label: "In Progress",
    value: "in-progress",
  },
  {
    color: "text-green-500",
    icon: CheckCircle2,
    label: "Done",
    value: "done",
  },
  {
    color: "text-red-500",
    icon: XCircle,
    label: "Canceled",
    value: "canceled",
  },
];
