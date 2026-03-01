"use client";

import type { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Trash,
  UserPlus2,
  X,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
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
import { Field, FieldLabel } from "@/registry/ui/field";
import { Input } from "@/registry/ui/input";
import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { Switch } from "@/registry/ui/switch";
import { toast } from "@/registry/ui/toast";

type AccessRole = "admin" | "member" | "viewer";

type Person = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
};

const roleOptions: Array<{ label: string; value: AccessRole }> = [
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Viewer", value: "viewer" },
];

const defaultSelectedIds = [
  "marcus-chen",
  "sarah-mitchell",
  "james-rodriguez",
] as const;

const defaultSelectedIdSet = new Set<string>(defaultSelectedIds);

const initialRolesById: Record<string, AccessRole> = {
  "james-rodriguez": "admin",
  "marcus-chen": "member",
  "sarah-mitchell": "member",
};

const shareableLinkBase = "https://app.example.com/share/workspace/f8k2m9x1-de";
const selectSlotSelector = "[data-slot='select'], [data-slot^='select-']";

type SelectedPeopleUpdater =
  | Person[]
  | ((previousPeople: Person[]) => Person[]);

function syncRolesByPeople(
  people: Person[],
  previousRoles: Record<string, AccessRole>,
): Record<string, AccessRole> {
  const nextRoles: Record<string, AccessRole> = {};

  for (const person of people) {
    nextRoles[person.id] = previousRoles[person.id] ?? "member";
  }

  return nextRoles;
}

function isSelectTarget(target: EventTarget | null): boolean {
  if (target == null || typeof Element === "undefined") {
    return false;
  }

  if (target instanceof Element) {
    return Boolean(target.closest(selectSlotSelector));
  }

  if (typeof Node !== "undefined" && target instanceof Node) {
    return Boolean(target.parentElement?.closest(selectSlotSelector));
  }

  return false;
}

function createShareableLink(invoiceId?: string): string {
  if (!invoiceId) {
    return shareableLinkBase;
  }

  const query = new URLSearchParams({
    invoice: invoiceId,
  });

  return `${shareableLinkBase}?${query.toString()}`;
}

type ShareFormProps = {
  invoiceId?: string;
};

export function ShareForm({ invoiceId }: ShareFormProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedPeople, setSelectedPeople] = React.useState<Person[]>(() =>
    allPeople.filter((person) => defaultSelectedIdSet.has(person.id)),
  );
  const [rolesById, setRolesById] =
    React.useState<Record<string, AccessRole>>(initialRolesById);
  const [shareableLinkEnabled, setShareableLinkEnabled] = React.useState(false);
  const shareableLink = React.useMemo(
    () => createShareableLink(invoiceId),
    [invoiceId],
  );

  const applySelectedPeople = React.useCallback(
    (updater: SelectedPeopleUpdater) => {
      setSelectedPeople((previousPeople) => {
        const nextPeople =
          typeof updater === "function" ? updater(previousPeople) : updater;

        setRolesById((previousRoles) =>
          syncRolesByPeople(nextPeople, previousRoles),
        );

        return nextPeople;
      });
    },
    [],
  );

  const selectedIds = React.useMemo(
    () => new Set(selectedPeople.map((person) => person.id)),
    [selectedPeople],
  );

  const peopleItems = React.useMemo(
    () => [
      ...allPeople.filter((person) => selectedIds.has(person.id)),
      ...allPeople.filter((person) => !selectedIds.has(person.id)),
    ],
    [selectedIds],
  );

  function handleRemovePerson(personId: string) {
    applySelectedPeople((previousPeople) =>
      previousPeople.filter((person) => person.id !== personId),
    );
  }

  function handleRoleChange(personId: string, role: AccessRole | null) {
    if (!role) return;
    setRolesById((previousRoles) => ({ ...previousRoles, [personId]: role }));
  }

  async function handleCopyLink() {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(shareableLink);

      toast.success({
        description: "Copied to clipboard",

        timeout: 1500,
      });
    } catch (error) {
      console.error(error);
      toast.error({
        description: "Could not copy link. Please try again.",
        title: "Copy failed",
      });
    }
  }

  const handleComboboxOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: BaseCombobox.Root.ChangeEventDetails) => {
      if (!nextOpen) {
        const isOutsideLikeClose =
          eventDetails.reason === "outside-press" ||
          eventDetails.reason === "focus-out";

        if (isOutsideLikeClose) {
          const relatedTarget =
            eventDetails.event instanceof FocusEvent
              ? eventDetails.event.relatedTarget
              : null;

          if (
            isSelectTarget(eventDetails.event.target) ||
            isSelectTarget(relatedTarget)
          ) {
            eventDetails.cancel();
            return;
          }
        }
      }

      setOpen(nextOpen);
    },
    [],
  );

  return (
    <div className="w-[400px] outline-none rounded-md bg-popover text-popover-foreground space-y-4">
      <div className="text-lg font-semibold">
        {invoiceId ? `Share Invoice ${invoiceId}` : "Share Invoice"}
      </div>

      <div className="space-y-4">
        <Field name="people-with-access">
          <FieldLabel>People with access</FieldLabel>
          <Combobox<Person, true>
            autoHighlight
            isItemEqualToValue={(item, value) => item.id === value.id}
            items={peopleItems}
            itemToStringLabel={(person) => `${person.name} ${person.email}`}
            multiple
            onOpenChange={handleComboboxOpenChange}
            onValueChange={applySelectedPeople}
            open={open}
            value={selectedPeople}
          >
            <ComboboxTrigger
              render={
                <Button
                  className="h-10 w-full justify-between px-2"
                  variant="outline"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex items-center">
                      {selectedPeople.slice(0, 3).map((person, index) => (
                        <Avatar
                          className={cn(
                            "size-6 border-2 border-background",
                            index > 0 && "-ml-2",
                          )}
                          key={person.id}
                        >
                          <AvatarImage alt={person.name} src={person.avatar} />
                          <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                      {selectedPeople.length === 0 && (
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <UserPlus2 className="size-3.5" />
                        </span>
                      )}
                      {selectedPeople.length > 3 && (
                        <span className="-ml-2 inline-flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[11px] font-medium text-muted-foreground">
                          +{selectedPeople.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="truncate text-sm text-muted-foreground">
                      Add people...
                    </span>
                  </div>

                  {open ? (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  )}
                </Button>
              }
            />

            <ComboboxContent
              className="w-96 flex flex-col overflow-hidden"
              matchAnchorWidth={false}
              side="right"
              sideOffset={8}
            >
              <Button
                className="absolute -top-8 right-0"
                onClick={() => setOpen(false)}
                size="icon-sm"
                variant="ghost"
              >
                <X />
              </Button>
              <div className="flex-none relative">
                <ComboboxInputGroup
                  inputClassName="border-b-border rounded-none caret-primary"
                  inputSize="lg"
                  placeholder="Search by name or email..."
                  variant="ghost"
                />

                {selectedPeople.length === 0 ? (
                  <p className="px-3.5 py-3 text-xs text-muted-foreground">
                    Select at least one person to grant access.
                  </p>
                ) : (
                  <ScrollArea className="h-32" gradientScrollFade noScrollBar>
                    <div className="space-y-2 p-2">
                      {selectedPeople.map((person) => (
                        <div
                          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5"
                          key={person.id}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <Avatar className="size-7">
                              <AvatarImage
                                alt={person.name}
                                src={person.avatar}
                              />
                              <AvatarFallback>{person.initials}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate text-sm text-foreground">
                                {person.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {person.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <Select<AccessRole>
                              items={roleOptions}
                              onValueChange={(value) => {
                                handleRoleChange(person.id, value);
                              }}
                              value={rolesById[person.id] ?? "member"}
                            >
                              <SelectTriggerGroup size="sm" />
                              <SelectContent align="end" alignItemWithTrigger>
                                {roleOptions.map((role) => (
                                  <SelectItemContent
                                    key={role.value}
                                    value={role.value}
                                  >
                                    {role.label}
                                  </SelectItemContent>
                                ))}
                              </SelectContent>
                            </Select>

                            <Button
                              className="hover:bg-destructive/20"
                              onClick={() => handleRemovePerson(person.id)}
                              size="icon-xs"
                              variant="ghost"
                            >
                              <Trash className="size-3.5 text-destructive" />
                              <span className="sr-only">
                                Remove {person.name}
                              </span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}

                <Separator />
              </div>
              <ScrollArea
                className="h-96 flex-1 min-h-0"
                gradientScrollFade
                noScrollBar
              >
                <ComboboxList>
                  {(person: Person) => (
                    <ComboboxItemContent
                      className="py-1.5"
                      indicatorPlacement="end"
                      key={person.id}
                      value={person}
                    >
                      <Avatar className="size-7">
                        <AvatarImage alt={person.name} src={person.avatar} />
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-foreground">
                          {person.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {person.email}
                        </span>
                      </span>
                    </ComboboxItemContent>
                  )}
                </ComboboxList>

                <ComboboxEmpty>No people found.</ComboboxEmpty>
              </ScrollArea>
            </ComboboxContent>
          </Combobox>
        </Field>

        <Separator />

        <div className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">
              Shareable link
            </p>
            <Switch
              checked={shareableLinkEnabled}
              onCheckedChange={setShareableLinkEnabled}
            />
          </div>

          {shareableLinkEnabled && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  className="font-mono text-xs"
                  inputSize="sm"
                  readOnly
                  value={shareableLink}
                />
                <Button
                  onClick={handleCopyLink}
                  size="icon-sm"
                  variant="outline"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const allPeople: Person[] = [
  {
    avatar: "https://i.pravatar.cc/80?img=12",
    email: "marcus@example.com",
    id: "marcus-chen",
    initials: "MC",
    name: "Marcus Chen",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=47",
    email: "sarah@example.com",
    id: "sarah-mitchell",
    initials: "SM",
    name: "Sarah Mitchell",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=13",
    email: "james@example.com",
    id: "james-rodriguez",
    initials: "JR",
    name: "James Rodriguez",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=32",
    email: "olivia@example.com",
    id: "olivia-martin",
    initials: "OM",
    name: "Olivia Martin",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=51",
    email: "isabella@example.com",
    id: "isabella-nguyen",
    initials: "IN",
    name: "Isabella Nguyen",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=25",
    email: "leo@example.com",
    id: "leo-kim",
    initials: "LK",
    name: "Leo Kim",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=34",
    email: "patrick@example.com",
    id: "patrick-smith",
    initials: "PS",
    name: "Patrick Smith",
  },
];
