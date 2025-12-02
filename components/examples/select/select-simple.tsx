"use client";

import {
  CheckCircle2,
  Circle,
  CircleDashed,
  HelpCircle,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleDashed,
    color: "text-muted-foreground",
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
    color: "text-muted-foreground",
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: HelpCircle,
    color: "text-blue-500",
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
    color: "text-red-500",
  },
];

export function SelectSimple() {
  return (
    <Select items={statuses}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
