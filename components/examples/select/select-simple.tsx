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
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Pattern 1: Auto-Label Lookup</h3>
      <p className="text-xs text-muted-foreground">
        The trigger automatically displays the label text.
      </p>

      {/* Pass 'items' here so Base UI knows how to map value -> label */}
      <Select items={statuses}>
        <SelectTrigger className="w-[200px]">
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
    </div>
  );
}
