"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
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
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
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
import { Textarea } from "@/registry/ui/textarea";
import { toast } from "@/registry/ui/toast";

const sheetHandle = createSheetHandle();

export function TeamSwitcher() {
  const [comboboxOpen, setComboboxOpen] = useState(false);

  return (
    <>
      <Combobox
        defaultValue={teamMembers[0]}
        items={teamMembers}
        onOpenChange={setComboboxOpen}
        open={comboboxOpen}
      >
        <ComboboxTrigger
          render={
            <Button
              className="data-popup-open:bg-accent data-popup-open:hover:bg-accent data-popup-open:text-accent-foreground w-56 justify-start pl-3"
              variant="outline"
            >
              <ComboboxValue />
            </Button>
          }
        />
        <ComboboxContent className="h-72">
          <div className="flex justify-between items-center relative">
            <ComboboxInputGroup
              inputClassName="border-b-border"
              placeholder="Find member..."
              variant="ghost"
            />
            <Button
              className="absolute hidden lg:block right-0.5 rounded-sm text-muted-foreground cursor-pointer"
              onClick={() => setComboboxOpen(false)}
              size="icon"
              variant="unstyled"
            >
              <Kbd className="bg-accent text-[10px]">Esc</Kbd>
            </Button>
          </div>
          <ScrollArea className="min-h-0" gradientScrollFade noScrollBar>
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
          </ScrollArea>
          <Separator />
          <div className="p-2">
            <SheetTrigger
              handle={sheetHandle}
              onClick={() => setComboboxOpen(false)}
              render={
                <Button className="w-full" size="sm">
                  <PlusIcon /> Create team
                </Button>
              }
            />
          </div>
        </ComboboxContent>
      </Combobox>
      <Sheet handle={sheetHandle}>
        <SheetContent inset showCloseButton side="right">
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
                <FieldControl
                  placeholder="team description"
                  render={<Textarea className="min-h-32" />}
                />
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
  { id: "7", label: "John Doe", role: "Engineering", value: "john.d" },
  { id: "8", label: "Jane Smith", role: "Design", value: "jane.s" },
  { id: "9", label: "Michael Johnson", role: "Marketing", value: "michael.j" },
  { id: "10", label: "Emily Davis", role: "Product", value: "emily.d" },
];
