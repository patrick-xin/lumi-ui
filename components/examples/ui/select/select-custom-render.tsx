"use client";

import {
  CheckCircle2,
  Circle,
  CircleDashed,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/registry/lib/utils";
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

export function SelectCustomRenderDemo() {
  return (
    <Select items={statuses}>
      <SelectTrigger>
        <SelectValue placeholder="Select a status">
          {(val) => {
            const selected = statuses.find((s) => s.value === val);
            if (!selected) return null;

            const Icon = selected.icon;
            return (
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", selected.color)} />
                <span>{selected.label}</span>
              </div>
            );
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <status.icon className={cn("h-4 w-4", status.color)} />
              <span>{status.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
