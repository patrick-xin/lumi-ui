"use client";

import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Label } from "@/registry/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

export function ProjectPopover() {
  const [view, setView] = React.useState<ViewType>("default");
  const [selectedStatus, setSelectedStatus] = React.useState<StatusType | null>(
    null,
  );

  const handleStatusSelect = (status: StatusType) => {
    setSelectedStatus(status);
    setView("default");
  };

  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Project Settings</PopoverTrigger>

      <PopoverContent align="center" className="w-80">
        {view === "default" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <PopoverTitle>Project Overview</PopoverTitle>
              <PopoverDescription>
                Manage status and members.
              </PopoverDescription>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              {selectedStatus ? (
                <div className="flex items-center justify-between rounded-md border bg-secondary/50 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        selectedStatus === "finished" && "bg-green-500",
                        selectedStatus === "in progress" && "bg-yellow-500",
                        selectedStatus === "not started" && "bg-gray-400",
                      )}
                    />
                    <span className="capitalize">{selectedStatus}</span>
                  </div>
                  <Button
                    className="size-5"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setSelectedStatus(null);
                    }}
                    variant="destructive"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full justify-between"
                  onClick={() => setView("status-selection")}
                  variant="outline"
                >
                  <span>Set status</span>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground bg-secondary/20">
                <CalendarIcon className="h-4 w-4 opacity-70" />
                <span>{FAKE_DATE}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Members</Label>
              <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm bg-secondary/20">
                <div className="flex -space-x-2 overflow-hidden">
                  {FAKE_MEMBERS.map((member, i) => (
                    <div
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground ring-2 ring-background"
                      key={i}
                    >
                      {member}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {FAKE_MEMBERS.length} assigned
                </span>
              </div>
            </div>
          </div>
        )}

        {view === "status-selection" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                className="size-6"
                onClick={() => setView("default")}
                size="icon-sm"
                variant="ghost"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-sm">Select Status</span>
            </div>

            <div className="flex flex-col gap-2">
              {(["not started", "in progress", "finished"] as StatusType[]).map(
                (status) => (
                  <Button
                    className="w-full justify-between"
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    variant={selectedStatus === status ? "default" : "outline"}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          status === "finished" && "bg-green-500",
                          status === "in progress" && "bg-yellow-500",
                          status === "not started" && "bg-gray-400",
                        )}
                      />
                      <span className="capitalize">{status}</span>
                    </span>

                    {selectedStatus === status && (
                      <CheckIcon className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                ),
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
type ViewType = "default" | "status-selection";
type StatusType = "not started" | "in progress" | "finished";

const FAKE_DATE = "Oct 24, 2026";
const FAKE_MEMBERS = ["JD", "AL", "MK"];
