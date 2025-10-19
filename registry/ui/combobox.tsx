import { Combobox as ComboboxPrimitive } from "@base-ui-components/react/combobox";
import type * as React from "react";

function Combobox({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Root>) {
  return <ComboboxPrimitive.Root data-slot="combobox-root" {...props} />;
}

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Value>) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxIcon({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Icon>) {
  return <ComboboxPrimitive.Icon data-slot="combobox-icon" {...props} />;
}

function ComboboxInput({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input>) {
  return <ComboboxPrimitive.Input data-slot="combobox-input" {...props} />;
}

function ComboboxClear({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Clear>) {
  return <ComboboxPrimitive.Clear data-slot="combobox-clear" {...props} />;
}

function ComboboxTrigger({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  return <ComboboxPrimitive.Trigger data-slot="combobox-trigger" {...props} />;
}

function ComboboxChips({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Chips>) {
  return <ComboboxPrimitive.Chips data-slot="combobox-chips" {...props} />;
}

function ComboboxChip({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Chip>) {
  return <ComboboxPrimitive.Chip data-slot="combobox-chip" {...props} />;
}

function ComboboxChipRemove({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ChipRemove>) {
  return (
    <ComboboxPrimitive.ChipRemove data-slot="combobox-chip-remove" {...props} />
  );
}

function ComboboxPortal({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Portal>) {
  return <ComboboxPrimitive.Portal {...props} />;
}

function ComboboxBackdrop({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Backdrop>) {
  return (
    <ComboboxPrimitive.Backdrop data-slot="combobox-backdrop" {...props} />
  );
}

function ComboboxPositioner({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  return (
    <ComboboxPrimitive.Positioner data-slot="combobox-positioner" {...props} />
  );
}

function ComboboxPopup({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return <ComboboxPrimitive.Popup data-slot="combobox-popup" {...props} />;
}

function ComboboxArrow({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Arrow>) {
  return <ComboboxPrimitive.Arrow data-slot="combobox-arrow" {...props} />;
}

function ComboboxStatus({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Status>) {
  return <ComboboxPrimitive.Status data-slot="combobox-status" {...props} />;
}

function ComboboxEmpty({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return <ComboboxPrimitive.Empty data-slot="combobox-empty" {...props} />;
}

function ComboboxList({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return <ComboboxPrimitive.List data-slot="combobox-list" {...props} />;
}

function ComboboxRow({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Row>) {
  return <ComboboxPrimitive.Row data-slot="combobox-row" {...props} />;
}

function ComboboxItem({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item>) {
  return <ComboboxPrimitive.Item data-slot="combobox-item" {...props} />;
}

function ComboboxItemIndicator({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...props}
    />
  );
}

function ComboboxSeparator({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return (
    <ComboboxPrimitive.Separator data-slot="combobox-separator" {...props} />
  );
}

function ComboboxGroup({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Group>) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

function ComboboxGroupLabel({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>) {
  return (
    <ComboboxPrimitive.GroupLabel data-slot="combobox-group-label" {...props} />
  );
}

function ComboboxCollection({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Collection>) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

export {
  Combobox,
  ComboboxValue,
  ComboboxIcon,
  ComboboxInput,
  ComboboxClear,
  ComboboxTrigger,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection,
};
