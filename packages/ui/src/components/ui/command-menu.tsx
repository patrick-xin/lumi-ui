import type {
  AutocompleteCollectionProps,
  AutocompleteEmptyProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteItemProps,
  AutocompleteListProps,
  DialogPopupProps,
  DialogRootProps,
  DialogTriggerProps,
  SeparatorProps,
} from "@base-ui/react";
import type { VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from "./autocomplete";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  DialogViewport,
} from "./dialog";
import type { inputVariants } from "./input";
import { ScrollArea } from "./scroll-area";

function CommandMenu(props: DialogRootProps) {
  return <Dialog {...props} data-slot="command-menu" />;
}

function CommandMenuTrigger(props: DialogTriggerProps) {
  return <DialogTrigger data-slot="command-menu-trigger" {...props} />;
}

function CommandMenuContent({
  children,
  className,
  ...props
}: DialogPopupProps) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport
        className={cn(
          "flex flex-col items-center",
          // add top padding to move the popup down
          "pt-[10dvh]",
        )}
      >
        <DialogPopup
          className={cn(
            "relative flex flex-col overflow-hidden bg-background rounded-md shadow-md dark:shadow-xs",
            "w-[min(40rem,calc(100vw-2rem))] animate-fade-zoom",
            "outline-1 outline-border dark:-outline-offset-1",
            className,
          )}
          data-slot="command-menu-content"
          {...props}
        >
          <DialogClose className="sr-only">Close command palette</DialogClose>
          {children}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}

function CommandMenuFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-2 text-xs text-muted-foreground h-10 px-4 border-t",
        className,
      )}
      data-slot="command-menu-footer"
      {...props}
    />
  );
}

function Command({
  autoHighlight = "always",
  inline = true,
  keepHighlight = true,
  open = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>) {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      data-slot="command"
      inline={inline}
      keepHighlight={keepHighlight}
      open={open}
      {...props}
    />
  );
}

function CommandInput({
  className,
  inputSize = "lg",
  addonIcon = <Search />,
  ...props
}: React.ComponentProps<typeof AutocompleteInputGroup> & {
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}) {
  return (
    <AutocompleteInputGroup
      addonIcon={addonIcon}
      className={cn("shrink-0 border-b rounded-none", className)}
      data-slot="command-input"
      inputSize={inputSize}
      {...props}
    />
  );
}

function CommandEmpty({ className, ...props }: AutocompleteEmptyProps) {
  return (
    <AutocompleteEmpty
      className={cn("p-6", className)}
      data-slot="command-empty"
      {...props}
    />
  );
}

function CommandScrollArea({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      className={cn("h-auto max-h-64 sm:max-h-96", className)}
      data-slot="command-scroll-area"
      {...props}
    />
  );
}

function CommandList({ className, ...props }: AutocompleteListProps) {
  return (
    <AutocompleteList
      className={className}
      data-slot="command-list"
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: AutocompleteItemProps & {
  className?: string;
}) {
  return (
    <AutocompleteItem
      className={cn(
        "group/command-item font-medium flex items-center py-2 px-4 data-[highlighted]:before:inset-x-1.5",
        className,
      )}
      data-slot="command-item"
      {...props}
    />
  );
}

function CommandCollection({ ...props }: AutocompleteCollectionProps) {
  return <AutocompleteCollection data-slot="command-collection" {...props} />;
}

function CommandGroup({ ...props }: AutocompleteGroupProps) {
  return <AutocompleteGroup data-slot="command-group" {...props} />;
}

function CommandGroupLabel({
  className,
  ...props
}: AutocompleteGroupLabelProps) {
  return (
    <AutocompleteGroupLabel
      className={cn("font-medium pl-4", className)}
      data-slot="command-group-label"
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground group-data-highlighted/command-item:text-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: SeparatorProps) {
  return (
    <AutocompleteSeparator
      className={cn("last:hidden", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

export {
  CommandMenu,
  CommandMenuContent,
  CommandMenuTrigger,
  Command,
  CommandScrollArea,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandCollection,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandMenuFooter,
};
