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
import { Separator } from "@/registry/ui/separator";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip";

export type ProjectStatus = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
};

export const statuses: ProjectStatus[] = [
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

export function ComboboxCustomizationDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-4 w-64">
        <ProjectStatusPicker />
        <ProjectPriorityPicker />
      </div>
    </TooltipProvider>
  );
}

const projectStatusTooltipHandle = createTooltipHandle();

function ProjectStatusPicker() {
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

type ProjectPriority = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
};

const NoPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="No Priority"
      className={cn("fill-current text-muted-foreground", className)}
      focusable="false"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Added fill="currentColor" to the rects so they react to color changes */}
      <rect
        fill="currentColor"
        height="1.5"
        opacity="0.9"
        rx="0.5"
        width="3"
        x="1.5"
        y="7.25"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        opacity="0.9"
        rx="0.5"
        width="3"
        x="6.5"
        y="7.25"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        opacity="0.9"
        rx="0.5"
        width="3"
        x="11.5"
        y="7.25"
      ></rect>
    </svg>
  );
};

const HighPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="High Priority"
      className={cn("fill-current text-muted-foreground", className)}
      focusable="false"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="6" rx="1" width="3" x="1.5" y="8"></rect>
      <rect height="9" rx="1" width="3" x="6.5" y="5"></rect>
      <rect height="12" rx="1" width="3" x="11.5" y="2"></rect>
    </svg>
  );
};

const MediumPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Medium Priority"
      className={cn("fill-current text-muted-foreground", className)}
      focusable="false"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="6" rx="1" width="3" x="1.5" y="8"></rect>
      <rect height="9" rx="1" width="3" x="6.5" y="5"></rect>
      <rect
        fillOpacity="0.4"
        height="12"
        rx="1"
        width="3"
        x="11.5"
        y="2"
      ></rect>
    </svg>
  );
};

const LowPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Low Priority"
      className={cn("fill-current text-muted-foreground", className)}
      focusable="false"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="6" rx="1" width="3" x="1.5" y="8"></rect>
      <rect fillOpacity="0.4" height="9" rx="1" width="3" x="6.5" y="5"></rect>
      <rect
        fillOpacity="0.4"
        height="12"
        rx="1"
        width="3"
        x="11.5"
        y="2"
      ></rect>
    </svg>
  );
};

const UrgentPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Urgent Priority"
      className={cn("fill-current text-muted-foreground", className)}
      fill="currentColor"
      focusable="false"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"></path>
    </svg>
  );
};

const priorities: ProjectPriority[] = [
  {
    count: 0,
    icon: NoPriorityIcon,
    label: "No Priority",
    value: "no-priority",
  },
  {
    count: 1,
    icon: UrgentPriorityIcon,
    label: "Urgent",
    value: "urgent",
  },
  {
    count: 2,
    icon: HighPriorityIcon,
    label: "High",
    value: "high",
  },
  {
    count: 3,
    icon: MediumPriorityIcon,
    label: "Medium",
    value: "medium",
  },
  {
    count: 4,
    icon: LowPriorityIcon,
    label: "Low",
    value: "low",
  },
];

const projectPriorityTooltip = createTooltipHandle();
function ProjectPriorityPicker() {
  const [open, setOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] =
    React.useState<ProjectPriority | null>(priorities[0]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (/^[0-4]$/.test(e.key)) {
      e.preventDefault();
      const index = parseInt(e.key, 10);
      const priorityToSelect = priorities[index];

      if (priorityToSelect) {
        setSelectedPriority(priorityToSelect);
        setOpen(false);
      }
    }
  };
  return (
    <>
      <Combobox
        autoHighlight
        items={priorities}
        itemToStringLabel={(priority) => priority.label}
        onOpenChange={setOpen}
        onValueChange={setSelectedPriority}
        open={open}
        value={selectedPriority}
      >
        <ComboboxTrigger
          render={
            <TooltipTrigger
              handle={projectPriorityTooltip}
              render={
                <Button
                  className={cn(
                    "text-xs data-popup-open:bg-accent dark:data-popup-open:bg-accent/30",
                  )}
                  size="sm"
                >
                  <ComboboxValue>
                    {(item) => {
                      const Icon = item.icon;
                      return (
                        <>
                          <Icon
                            className={cn(
                              "size-4",
                              item.color,
                              item.value === "urgent" && "text-orange-600",
                            )}
                          />
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
        <ComboboxContent matchAnchorWidth={false}>
          <ComboboxInput
            className="px-3 placeholder:text-xs caret-primary"
            inputSize="sm"
            onKeyDown={handleInputKeyDown}
            placeholder="Change priority..."
            variant="ghost"
          />
          <Separator />
          <ComboboxEmpty>No matching priorities.</ComboboxEmpty>
          <ComboboxList>
            {(priority: ProjectPriority) => (
              <ComboboxItem
                className={cn(
                  "group/item flex items-center justify-between text-sm px-4",
                  "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1.5 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
                )}
                key={priority.value}
                value={priority}
              >
                <div className="flex items-center gap-3">
                  <priority.icon
                    className={cn("size-4 group-hover/item:text-foreground")}
                  />
                  <span className="font-medium">{priority.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {selectedPriority?.value === priority.value && (
                    <Check className="size-3.5 text-muted-foreground" />
                  )}
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {priority.count}
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
        handle={projectPriorityTooltip}
      >
        <TooltipContent
          className="bg-accent text-accent-foreground border border-primary/10 rounded-sm"
          showArrow={false}
          side="bottom"
          sideOffset={6}
        >
          <p>Change project priority</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
