"use client";

import { Button, buttonVariants } from "@lumi-ui/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@lumi-ui/ui/combobox";
import { Field, FieldError, FieldLabel } from "@lumi-ui/ui/field";
import { Form } from "@lumi-ui/ui/form";
import { Input } from "@lumi-ui/ui/input";
import { Separator } from "@lumi-ui/ui/separator";
import {
  createSheetHandle,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@lumi-ui/ui/sheet";
import { Textarea } from "@lumi-ui/ui/textarea";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSidebar } from "./sidebar";

const sheetHandle = createSheetHandle();

export function TeamSwitcher() {
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isCollapsed } = useSidebar();
  return (
    <>
      <Combobox
        defaultValue={teamMembers[0]}
        items={teamMembers}
        onOpenChange={setComboboxOpen}
        open={comboboxOpen}
      >
        <div
          className="flex h-9 pl-1 group-data-[state=collapsed]:hidden items-center rounded-md justify-between"
          ref={containerRef}
        >
          <Button
            className="text-sm px-0 flex-1 justify-start"
            nativeButton={false}
            render={
              <a href="#">
                <ComboboxValue />
              </a>
            }
            variant="unstyled"
          />

          <ComboboxTrigger
            className={buttonVariants({
              className:
                "group data-[popup-open]:bg-accent data-[popup-open]:hover:bg-accent",
              size: "icon-sm",
              variant: "ghost",
            })}
          >
            <ComboboxIcon>
              <ChevronsUpDownIcon className="group-data-[popup-open]:text-foreground size-3.5" />
            </ComboboxIcon>
          </ComboboxTrigger>
        </div>

        <ComboboxContent
          matchAnchorWidth={!isCollapsed}
          positionerAnchor={containerRef}
          side={isCollapsed ? "right" : "bottom"}
        >
          <div className="flex justify-between items-center relative">
            <ComboboxInputGroup placeholder="Find member..." variant="ghost" />
            <Button
              className="absolute right-2 text-[10px] rounded-sm text-muted-foreground cursor-pointer"
              onClick={() => setComboboxOpen(false)}
              size="icon-xs"
              variant="secondary"
            >
              <kbd>Esc</kbd>
            </Button>
          </div>

          <Separator />
          <ComboboxEmpty>No member found.</ComboboxEmpty>
          <ComboboxList>
            {(member: TeamMember) => (
              <ComboboxItemContent
                indicatorPlacement="end"
                key={member.id}
                value={member}
              >
                {member.label}
              </ComboboxItemContent>
            )}
          </ComboboxList>
          <Separator />
          <div className="p-2">
            <SheetTrigger
              handle={sheetHandle}
              onClick={() => setComboboxOpen(false)}
              render={
                <Button className="my-1 w-full" size="sm">
                  <PlusIcon /> Create team
                </Button>
              }
            />
          </div>
        </ComboboxContent>
      </Combobox>
      <Sheet handle={sheetHandle}>
        <SheetContent inset side="right">
          <SheetHeader>
            <SheetTitle>New Team</SheetTitle>
            <SheetDescription>
              Unlock collaboration and improved performance.
            </SheetDescription>
          </SheetHeader>
          <Form className="h-full justify-between">
            <div className="flex gap-4 flex-col">
              <Field>
                <FieldLabel>Team Name</FieldLabel>
                <Input placeholder="acme" required type="text" />
                <FieldError />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea className="min-h-48" placeholder="team description" />
              </Field>
            </div>
            <SheetFooter>
              <Button type="submit">Save</Button>
              <SheetClose render={<Button variant="ghost" />}>
                Cancel
              </SheetClose>
            </SheetFooter>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface TeamMember {
  id: string;
  value: string;
  role: string;
  label: string;
}

const teamMembers: TeamMember[] = [
  { id: "1", label: "Alex Davis", role: "Product", value: "alex.d" },
  { id: "2", label: "Sarah King", role: "Engineering", value: "sarah.k" },
  { id: "3", label: "James Wilson", role: "Design", value: "james.w" },
  { id: "4", label: "Maria Garcia", role: "Marketing", value: "maria.g" },
  { id: "5", label: "David Chen", role: "Engineering", value: "david.c" },
  { id: "6", label: "Emma Roberts", role: "Product", value: "emma.r" },
];
