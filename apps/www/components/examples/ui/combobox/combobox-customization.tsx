"use client";

import {
  Check,
  CheckCircle2,
  Circle,
  CircleDashed,
  CircleDot,
  XCircle,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/ui/combobox";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/ui/tooltip";
import { Separator } from "../../../../registry/ui/separator";

export type ProjectStatus = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
};

export const statuses: ProjectStatus[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleDashed,
    color: "text-orange-500",
    count: 1,
  },
  {
    value: "planned",
    label: "Planned",
    icon: Circle,
    color: "text-zinc-500",
    count: 2,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: CircleDot,
    color: "text-yellow-500",
    count: 3,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-blue-500",
    count: 4,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
    color: "text-zinc-500",
    count: 5,
  },
];

const projectStatusTooltipHandle = createTooltipHandle();

export function ProjectStatusPicker() {
  const [open, setOpen] = React.useState(false);
  const [projectStatus, setProjectStatus] =
    React.useState<ProjectStatus | null>(statuses[0]);
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (/^[1-5]$/.test(e.key)) {
      e.preventDefault();
      const index = parseInt(e.key, 10) - 1;
      const statusToSelect = statuses[index];

      if (statusToSelect) {
        setProjectStatus(statusToSelect);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Combobox
        items={statuses}
        itemToStringLabel={(status: ProjectStatus) => status.label}
        value={projectStatus}
        onValueChange={(val) => {
          setProjectStatus(val);
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxTrigger
          render={
            <TooltipTrigger
              handle={projectStatusTooltipHandle}
              render={
                <Button
                  size="sm"
                  variant="glow"
                  className="text-xs data-popup-open:bg-accent dark:data-popup-open:bg-accent/30 min-w-24 rounded-sm"
                >
                  <ComboboxValue>
                    {(item) => {
                      if (!item) return <span>Select status</span>;
                      const Icon = item.icon;
                      return (
                        <>
                          <Icon className={`size-4 ${item.color}`} />
                          <span>{item.label}</span>
                        </>
                      );
                    }}
                  </ComboboxValue>
                </Button>
              }
            />
          }
        />
        <ComboboxContent matchAnchorWidth={false} className="rounded-sm">
          <ComboboxInput
            placeholder="Press 1-5 to change status"
            variant="ghost"
            className="px-3 py-4 placeholder:text-sm caret-primary"
            onKeyDown={handleInputKeyDown}
          />
          <Separator />
          <ComboboxEmpty>No matching statuses.</ComboboxEmpty>
          <ComboboxList>
            {(status: ProjectStatus) => (
              <ComboboxItem
                key={status.value}
                value={status}
                className={cn(
                  "flex items-center justify-between rounded-sm text-sm",
                )}
              >
                <div className="flex items-center gap-3">
                  <status.icon className={cn("size-3.5", status.color)} />
                  <span className="font-medium">{status.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {projectStatus?.value === status.value && (
                    <Check className="size-3.5 text-muted-foreground" />
                  )}
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {status.count}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Tooltip handle={projectStatusTooltipHandle} disableHoverablePopup>
        <TooltipContent
          sideOffset={6}
          side="bottom"
          showArrow={false}
          className="bg-accent text-accent-foreground border border-primary/10 rounded-sm"
        >
          <p>Change project status</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
