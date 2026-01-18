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
import { Button } from "@lumi-ui/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@lumi-ui/ui/combobox";
import { Separator } from "@lumi-ui/ui/separator";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@lumi-ui/ui/tooltip";

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
        autoHighlight
        items={statuses}
        itemToStringLabel={(status: ProjectStatus) => status.label}
        onOpenChange={setOpen}
        onValueChange={(val) => {
          setProjectStatus(val);
        }}
        open={open}
        value={projectStatus}
      >
        <ComboboxTrigger
          render={
            <TooltipTrigger
              handle={projectStatusTooltipHandle}
              render={
                <Button
                  className="text-xs data-popup-open:bg-accent dark:data-popup-open:bg-accent/30 min-w-24 rounded-sm"
                  size="sm"
                  variant="glow"
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
        <ComboboxContent className="rounded-sm" matchAnchorWidth={false}>
          <ComboboxInput
            className="px-3 placeholder:text-xs caret-primary"
            inputSize="sm"
            onKeyDown={handleInputKeyDown}
            placeholder="Press 1-5 to change status"
            variant="ghost"
          />
          <Separator />
          <ComboboxEmpty>No matching statuses.</ComboboxEmpty>
          <ComboboxList>
            {(status: ProjectStatus) => (
              <ComboboxItem
                className={cn(
                  "flex items-center justify-between text-sm px-4",
                  "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1.5 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
                )}
                key={status.value}
                value={status}
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
      <Tooltip
        disabled={open}
        disableHoverablePopup
        handle={projectStatusTooltipHandle}
      >
        <TooltipContent
          className="bg-accent text-accent-foreground border border-primary/10 rounded-sm"
          showArrow={false}
          side="bottom"
          sideOffset={6}
        >
          <p>Change project status</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

type ProjectStatus = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
};

const statuses: ProjectStatus[] = [
  {
    color: "text-orange-500",
    count: 1,
    icon: CircleDashed,
    label: "Backlog",
    value: "backlog",
  },
  {
    color: "text-zinc-500",
    count: 2,
    icon: Circle,
    label: "Planned",
    value: "planned",
  },
  {
    color: "text-yellow-500",
    count: 3,
    icon: CircleDot,
    label: "In Progress",
    value: "in-progress",
  },
  {
    color: "text-blue-500",
    count: 4,
    icon: CheckCircle2,
    label: "Completed",
    value: "completed",
  },
  {
    color: "text-zinc-500",
    count: 5,
    icon: XCircle,
    label: "Canceled",
    value: "canceled",
  },
];
