"use client";

import {
  CpuIcon,
  EyeIcon,
  SearchIcon,
  Settings2Icon,
  SparklesIcon,
  TvMinimalIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxTrigger,
} from "@/registry/ui/combobox";
import { Kbd } from "@/registry/ui/kbd";
import { Separator } from "@/registry/ui/separator";
import { SidebarMenuButton, useSidebar } from "@/registry/ui/sidebar";

export function SearchCombobox() {
  const [open, setOpen] = useState(false);
  const { isCollapsed } = useSidebar();

  return (
    <Combobox
      defaultValue={teamMembers[0]}
      items={teamMembers}
      onOpenChange={setOpen}
      open={open}
    >
      <ComboboxTrigger
        render={
          <SidebarMenuButton
            className={cn("cursor-text", !isCollapsed && "border")}
            tooltip={{
              children: "Search",
            }}
          >
            <SearchIcon className="size-4" />
            <span className="hidden flex-1 text-left md:flex text-sm">
              Find..
            </span>
          </SidebarMenuButton>
        }
      />
      <ComboboxContent
        align="start"
        className={cn(isCollapsed && "w-64")}
        matchAnchorWidth={!isCollapsed}
        side={isCollapsed ? "right" : "bottom"}
        sideOffset={isCollapsed ? 2 : -32}
      >
        <div className="flex justify-between items-center relative">
          <ComboboxInputGroup
            addonIcon={<SearchIcon />}
            inputSize="lg"
            placeholder="Find..."
            variant="ghost"
          />
          <Button
            className="absolute hidden lg:block right-2 rounded-sm text-muted-foreground cursor-pointer"
            onClick={() => setOpen(false)}
            size="icon"
            variant="unstyled"
          >
            <Kbd className="bg-accent">Esc</Kbd>
          </Button>
        </div>
        <Separator />
        <ComboboxEmpty>No member found.</ComboboxEmpty>
        <ComboboxList>
          {(member: TeamMember) => (
            <ComboboxItemContent
              className="py-2 cursor-pointer"
              indicatorIcon={null}
              indicatorPlacement="none"
              key={member.id}
              render={
                <a className="inline-flex w-full" href="#">
                  <span>{IconMap[member.iconName]}</span>
                  <span className="flex flex-col ml-2 flex-1">
                    {member.label}
                    <span className="text-xs text-muted-foreground truncate">
                      {member.description}
                    </span>
                  </span>
                </a>
              }
              value={member}
            />
          )}
        </ComboboxList>
        <Separator />
      </ComboboxContent>
    </Combobox>
  );
}

interface TeamMember {
  id: string;
  value: string;
  description: string;
  label: string;
  iconName: IconName;
}
type IconName = keyof typeof IconMap;

const IconMap = {
  cpu: <CpuIcon className="size-4" />,
  eye: <EyeIcon className="size-4" />,
  settings: <Settings2Icon className="size-4" />,
  sparkles: <SparklesIcon className="size-4" />,
  tv: <TvMinimalIcon className="size-4" />,
  user: <UserIcon className="size-4" />,
} as const;

const teamMembers: TeamMember[] = [
  {
    description: "Run apps safely",
    iconName: "cpu",
    id: "1",
    label: "Sandboxes",
    value: "sandboxes",
  },
  {
    description: "View usage",
    iconName: "eye",
    id: "2",
    label: "Observability",
    value: "observability",
  },
  {
    description: "Explore AI models",
    iconName: "tv",
    id: "3",
    label: "AI Gateway",
    value: "ai-gateway",
  },
  {
    description: "Build and Deployment",
    iconName: "settings",
    id: "4",
    label: "Build Machines",
    value: "build-machines",
  },
  {
    description: "what did we deploy today?",
    iconName: "sparkles",
    id: "5",
    label: "Navigation Assistant",
    value: "navigation-assistant",
  },
];
