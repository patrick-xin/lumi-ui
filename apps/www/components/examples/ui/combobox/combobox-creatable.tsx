"use client";

import { Plus } from "lucide-react";
import * as React from "react";
import { Button } from "@lumi-ui/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItemContent,
  ComboboxList,
  ComboboxValue,
} from "@lumi-ui/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@lumi-ui/ui/dialog";
import { Input } from "@lumi-ui/ui/input";

export default function ExampleCreatableCombobox() {
  const id = React.useId();

  const [labels, setLabels] = React.useState<LabelItem[]>(initialLabels);
  const [selected, setSelected] = React.useState<LabelItem[]>([]);
  const [query, setQuery] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const createInputRef = React.useRef<HTMLInputElement | null>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement | null>(null);
  const pendingQueryRef = React.useRef("");
  const highlightedItemRef = React.useRef<LabelItem | undefined>(undefined);

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || highlightedItemRef.current) {
      return;
    }

    const currentTrimmed = query.trim();
    if (currentTrimmed === "") {
      return;
    }

    const normalized = currentTrimmed.toLocaleLowerCase();
    const existing = labels.find(
      (label) => label.value.trim().toLocaleLowerCase() === normalized,
    );

    if (existing) {
      setSelected((prev) =>
        prev.some((item) => item.id === existing.id)
          ? prev
          : [...prev, existing],
      );
      setQuery("");
      return;
    }

    pendingQueryRef.current = currentTrimmed;
    setOpenDialog(true);
  }

  function handleCreate() {
    const input = createInputRef.current || comboboxInputRef.current;
    const value = input ? input.value.trim() : "";
    if (!value) {
      return;
    }

    const normalized = value.toLocaleLowerCase();
    const baseId = normalized.replace(/\s+/g, "-");
    const existing = labels.find(
      (l) => l.value.trim().toLocaleLowerCase() === normalized,
    );

    if (existing) {
      setSelected((prev) =>
        prev.some((i) => i.id === existing.id) ? prev : [...prev, existing],
      );
      setOpenDialog(false);
      setQuery("");
      return;
    }

    // Ensure we don't collide with an existing id (e.g., value "docs" vs. existing id "docs")
    const existingIds = new Set(labels.map((l) => l.id));
    let uniqueId = baseId;
    if (existingIds.has(uniqueId)) {
      let i = 2;
      while (existingIds.has(`${baseId}-${i}`)) {
        i += 1;
      }
      uniqueId = `${baseId}-${i}`;
    }

    const newItem: LabelItem = { id: uniqueId, value };

    if (!selected.find((item) => item.id === newItem.id)) {
      setLabels((prev) => [...prev, newItem]);
      setSelected((prev) => [...prev, newItem]);
    }

    setOpenDialog(false);
    setQuery("");
  }

  function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCreate();
  }

  const trimmed = query.trim();
  const lowered = trimmed.toLocaleLowerCase();
  const exactExists = labels.some(
    (l) => l.value.trim().toLocaleLowerCase() === lowered,
  );
  // Show the creatable item alongside matches if there's no exact match
  const itemsForView: Array<LabelItem> =
    trimmed !== "" && !exactExists
      ? [
          ...labels,
          {
            creatable: trimmed,
            id: `create:${lowered}`,
            value: `Create "${trimmed}"`,
          },
        ]
      : labels;

  return (
    <React.Fragment>
      <Combobox
        items={itemsForView}
        multiple
        onValueChange={(next) => {
          const creatableSelection = next.find(
            (item) =>
              item.creatable &&
              !selected.some((current) => current.id === item.id),
          );

          if (creatableSelection && creatableSelection.creatable) {
            pendingQueryRef.current = creatableSelection.creatable;
            setOpenDialog(true);
            return;
          }
          const clean = next.filter((i) => !i.creatable);
          setSelected(clean);
          setQuery("");
        }}
        value={selected}
        inputValue={query}
        onInputValueChange={setQuery}
        onItemHighlighted={(item) => {
          highlightedItemRef.current = item;
        }}
      >
        <div className="max-w-112 flex flex-col gap-1">
          <label className="text-sm leading-5 font-medium" htmlFor={id}>
            Labels
          </label>
          <ComboboxChips
            className="w-64 min-[500px]:w-[22rem]"
            ref={containerRef}
          >
            <ComboboxValue>
              {(value: LabelItem[]) => (
                <React.Fragment>
                  {value.map((label) => (
                    <ComboboxChip key={label.id} aria-label={label.value}>
                      {label.value}
                    </ComboboxChip>
                  ))}
                  <ComboboxInput
                    ref={comboboxInputRef}
                    id={id}
                    placeholder={value.length > 0 ? "" : "e.g. bug"}
                    className="flex-1 min-w-12"
                    onKeyDown={handleInputKeyDown}
                    variant="ghost"
                  />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
        </div>

        <ComboboxContent positionerAnchor={containerRef}>
          <ComboboxEmpty>No labels found.</ComboboxEmpty>
          <ComboboxList>
            {(item: LabelItem) =>
              item.creatable ? (
                <ComboboxItemContent
                  key={item.id}
                  value={item}
                  indicatorPlacement="none"
                >
                  <Plus className="size-4" />
                  <span>Create &quot;{item.creatable}&quot;</span>
                </ComboboxItemContent>
              ) : (
                <ComboboxItemContent
                  key={item.id}
                  value={item}
                  indicatorPlacement="end"
                >
                  {item.value}
                </ComboboxItemContent>
              )
            }
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent initialFocus={createInputRef}>
          <DialogTitle>Create new label</DialogTitle>
          <DialogDescription>Add a new label to select.</DialogDescription>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <Input
              ref={createInputRef}
              placeholder="Label name"
              defaultValue={pendingQueryRef.current}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

interface LabelItem {
  creatable?: string;
  id: string;
  value: string;
}

const initialLabels: LabelItem[] = [
  { id: "bug", value: "bug" },
  { id: "docs", value: "documentation" },
  { id: "enhancement", value: "enhancement" },
  { id: "help-wanted", value: "help wanted" },
  { id: "good-first-issue", value: "good first issue" },
];
