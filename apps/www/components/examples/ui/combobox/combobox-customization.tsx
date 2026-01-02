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
            inputSize="sm"
            className="px-3 placeholder:text-xs caret-primary"
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
                  "flex items-center justify-between text-sm px-4",
                  "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1.5 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
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
      <Tooltip
        handle={projectStatusTooltipHandle}
        disableHoverablePopup
        disabled={open}
      >
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Added fill="currentColor" to the rects so they react to color changes */}
      <rect
        x="1.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
        fill="currentColor"
      ></rect>
      <rect
        x="6.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
        fill="currentColor"
      ></rect>
      <rect
        x="11.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
        fill="currentColor"
      ></rect>
    </svg>
  );
};

const HighPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="High Priority"
      className={cn("fill-current text-muted-foreground", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1"></rect>
    </svg>
  );
};

const MediumPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Medium Priority"
      className={cn("fill-current text-muted-foreground", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect
        x="11.5"
        y="2"
        width="3"
        height="12"
        rx="1"
        fillOpacity="0.4"
      ></rect>
    </svg>
  );
};

const LowPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Low Priority"
      className={cn("fill-current text-muted-foreground", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4"></rect>
      <rect
        x="11.5"
        y="2"
        width="3"
        height="12"
        rx="1"
        fillOpacity="0.4"
      ></rect>
    </svg>
  );
};

const UrgentPriorityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-label="Urgent Priority"
      className={cn("fill-current text-muted-foreground", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"></path>
    </svg>
  );
};

const priorities: ProjectPriority[] = [
  {
    value: "no-priority",
    label: "No Priority",
    icon: NoPriorityIcon,
    count: 0,
  },
  {
    value: "urgent",
    label: "Urgent",
    icon: UrgentPriorityIcon,
    count: 1,
  },
  {
    value: "high",
    label: "High",
    icon: HighPriorityIcon,
    count: 2,
  },
  {
    value: "medium",
    label: "Medium",
    icon: MediumPriorityIcon,
    count: 3,
  },
  {
    value: "low",
    label: "Low",
    icon: LowPriorityIcon,
    count: 4,
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
        value={selectedPriority}
        onValueChange={setSelectedPriority}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxTrigger
          render={
            <TooltipTrigger
              handle={projectPriorityTooltip}
              render={
                <Button
                  size="sm"
                  variant="glow"
                  className={cn(
                    "text-xs data-popup-open:bg-accent dark:data-popup-open:bg-accent/30",
                  )}
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
            placeholder="Change priority..."
            variant="ghost"
            inputSize="sm"
            className="px-3 placeholder:text-xs caret-primary"
            onKeyDown={handleInputKeyDown}
          />
          <Separator />
          <ComboboxEmpty>No matching priorities.</ComboboxEmpty>
          <ComboboxList>
            {(priority: ProjectPriority) => (
              <ComboboxItem
                key={priority.value}
                value={priority}
                className={cn(
                  "group/item flex items-center justify-between text-sm px-4",
                  "data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1.5 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm",
                )}
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
        handle={projectPriorityTooltip}
        disableHoverablePopup
        disabled={open}
      >
        <TooltipContent
          sideOffset={6}
          side="bottom"
          showArrow={false}
          className="bg-accent text-accent-foreground border border-primary/10 rounded-sm"
        >
          <p>Change project priority</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
