"use client";

import { ChevronsUpDownIcon, PlusIcon, UserSearchIcon } from "lucide-react";
import { useRef, useState } from "react";
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
  ComboboxValue,
} from "@/registry/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";
import { Kbd } from "@/registry/ui/kbd";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";
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
} from "@/registry/ui/sheet";
import { SidebarMenuButton, useSidebar } from "@/registry/ui/sidebar";
import { toast } from "@/registry/ui/toast";

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
        <SidebarMenuButton
          className="pr-1 text-foreground bg-transparent hover:bg-transparent"
          ref={containerRef}
          render={<div />}
          size="lg"
          tooltip="Switch team"
        >
          <div
            className={cn(
              "grid flex-1 text-left text-sm leading-tight transition-all",
              isCollapsed && "hidden",
            )}
          >
            <span className="truncate font-semibold">
              <a className="inline-block w-full truncate align-middle" href="#">
                <ComboboxValue />
              </a>
            </span>
          </div>
          <ComboboxTrigger
            render={
              <Button
                className={cn(
                  "group/trigger shrink-0 hover:bg-sidebar-accent data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground",
                  isCollapsed ? "mx-auto" : "ml-auto",
                )}
                size="icon"
                variant="unstyled"
              >
                {isCollapsed ? (
                  <UserSearchIcon className="size-4.5 text-sidebar-foreground" />
                ) : (
                  <ChevronsUpDownIcon className="size-4 text-sidebar-foreground" />
                )}
              </Button>
            }
          />
        </SidebarMenuButton>
        <ComboboxContent
          className="flex flex-col h-72 overflow-hidden"
          matchAnchorWidth={!isCollapsed}
          positionerAnchor={containerRef}
          side={isCollapsed ? "right" : "bottom"}
        >
          <div className="flex justify-between items-center relative flex-none">
            <ComboboxInputGroup
              className="caret-primary"
              placeholder="Find member..."
              variant="ghost"
            />
            <Button
              className="absolute hidden lg:block right-2 text-[10px] rounded-sm text-muted-foreground cursor-pointer"
              onClick={() => setComboboxOpen(false)}
              size="icon-xs"
              variant="unstyled"
            >
              <Kbd className="bg-accent">Esc</Kbd>
            </Button>
          </div>
          <Separator />
          <ComboboxEmpty className="flex-1 mt-12 h-full">
            No member found.
          </ComboboxEmpty>
          <ScrollArea className="pr-1 min-h-0" gradientScrollFade noScrollBar>
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
          </ScrollArea>
          <Separator />
          <div className="p-2 flex-none">
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
          <Form
            className="h-full justify-between"
            onFormSubmit={(values) => {
              toast.success({
                title: `${values.team} created!`,
              });
              sheetHandle.close();
            }}
          >
            <div className="flex gap-4 flex-col">
              <Field name="team">
                <FieldLabel>Team Name</FieldLabel>
                <Input placeholder="acme" required type="text" />
                <FieldError />
              </Field>
              <Field name="description">
                <FieldLabel>Description</FieldLabel>
                <Input placeholder="team description" />
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
  { id: "7", label: "John Doe", role: "Office", value: "john.d" },
  { id: "8", label: "Jane Doe", role: "Marketing", value: "jane.d" },
];
