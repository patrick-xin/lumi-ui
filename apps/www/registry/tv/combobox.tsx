import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";
import { ArrowSvg } from "@/registry/tv/arrow-svg";
import { Button } from "@/registry/tv/button";
import {
  type InputContainerStylesProps,
  type InputStylesProps,
  inputContainerStyles,
  inputStyles,
} from "@/registry/tv/input";

function Combobox<Value, Multiple extends boolean | undefined = false>({
  children,
  ...props
}: BaseCombobox.Root.Props<Value, Multiple>) {
  return <BaseCombobox.Root {...props}>{children}</BaseCombobox.Root>;
}

function ComboboxLabel({
  children,
  className,
  ...props
}: BaseCombobox.Label.Props & { className?: string }) {
  return (
    <BaseCombobox.Label
      className={cn("cursor-default text-sm leading-5 font-medium", className)}
      {...props}
    >
      {children}
    </BaseCombobox.Label>
  );
}

function ComboboxValue({ children, ...props }: BaseCombobox.Value.Props) {
  return <BaseCombobox.Value {...props}>{children}</BaseCombobox.Value>;
}

function ComboboxIcon({ className, ...props }: BaseCombobox.Icon.Props) {
  return (
    <BaseCombobox.Icon
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxInput({
  className,
  inputSize,
  multiple = false,
  variant,
  ...props
}: Omit<BaseCombobox.Input.Props, "className"> &
  InputStylesProps & { className?: string; multiple?: boolean }) {
  return (
    <BaseCombobox.Input
      className={cn(
        inputStyles({ variant: multiple ? "ghost" : variant, inputSize }),
        multiple && "flex-1 p-0 h-auto",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxClear({ className, ...props }: BaseCombobox.Clear.Props) {
  return (
    <BaseCombobox.Clear
      aria-label="Clear selection"
      className={cn(
        "outline-none pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxTrigger({ className, ...props }: BaseCombobox.Trigger.Props) {
  return (
    <BaseCombobox.Trigger
      className={cn(
        "select-none pointer-coarse:after:absolute pointer-coarse:after:min-h-10 pointer-coarse:after:min-w-10",
        className,
      )}
      {...props}
    />
  );
}

const comboboxChipsStyles = tv({
  base: "flex w-full self-stretch items-center flex-wrap gap-1",
  variants: {
    size: {
      sm: "py-1.5",
      default: "py-1",
      lg: "py-1.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function ComboboxChips({
  className,
  size,
  ...props
}: Omit<BaseCombobox.Chips.Props, "className"> &
  VariantProps<typeof comboboxChipsStyles> & {
    className?: string;
  }) {
  return (
    <BaseCombobox.Chips
      className={comboboxChipsStyles({ size, className })}
      {...props}
    />
  );
}

const comboboxChipStyles = tv({
  slots: {
    chip: [
      "flex items-center w-fit rounded-md shadow-xs bg-input text-input-foreground outline-none cursor-default whitespace-nowrap",
      "aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50",
      "focus-within:bg-input/80 focus-within:text-input-foreground/80",
      "[@media(hover:hover)]:data-highlighted:bg-input/80 [@media(hover:hover)]:data-highlighted:text-input-foreground/80",
    ],
    remove: [
      "inline-flex items-center justify-between opacity-50 hover:opacity-100 text-inherit rounded-md",
      "aria-disabled:opacity-50 aria-disabled:hover:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
    ],
  },
  variants: {
    size: {
      sm: {
        chip: "gap-0.5 px-1.5 py-0.5 text-xs",
        remove: "p-px [&_svg:not([class*='size-'])]:size-3.5",
      },
      default: {
        chip: "gap-1 px-2 py-1 text-sm",
        remove: "[&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        chip: "gap-1 px-2.5 py-1 text-[15px]",
        remove: "[&_svg:not([class*='size-'])]:size-4",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function ComboboxChip({
  className,
  children,
  size,
  disabled,
  ...props
}: Omit<BaseCombobox.Chip.Props, "className"> &
  VariantProps<typeof comboboxChipStyles> & {
    className?: string;
    disabled?: boolean;
  }) {
  const { chip, remove } = comboboxChipStyles({ size });
  return (
    <BaseCombobox.Chip
      aria-disabled={disabled}
      className={chip({ className })}
      {...props}
    >
      {children}
      <BaseCombobox.ChipRemove
        aria-label="Remove"
        className={remove()}
        disabled={disabled}
      >
        <X />
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  );
}

function ComboboxChipRemove({
  className,
  icon = <X />,
  ...props
}: BaseCombobox.ChipRemove.Props & {
  icon?: React.ReactNode;
}) {
  return (
    <BaseCombobox.ChipRemove
      aria-label="Remove"
      className={cn(
        "p-1 inline-flex items-center justify-center text-inherit rounded-md transition-colors",
        className,
      )}
      {...props}
    >
      {icon}
    </BaseCombobox.ChipRemove>
  );
}

function ComboboxList({ className, ...props }: BaseCombobox.List.Props) {
  return (
    <BaseCombobox.List
      className={cn(
        "outline-none py-1 data-empty:p-0",
        "min-h-0 overflow-y-auto scroll-py-2",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxPortal({ ...props }: BaseCombobox.Portal.Props) {
  return <BaseCombobox.Portal {...props} />;
}

function ComboboxBackdrop({ ...props }: BaseCombobox.Backdrop.Props) {
  return <BaseCombobox.Backdrop {...props} />;
}

function ComboboxPositioner({
  className,
  ...props
}: BaseCombobox.Positioner.Props) {
  return (
    <BaseCombobox.Positioner
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function ComboboxPopup({ ...props }: BaseCombobox.Popup.Props) {
  return <BaseCombobox.Popup {...props} />;
}

function ComboboxArrow({ className, ...props }: BaseCombobox.Arrow.Props) {
  return (
    <BaseCombobox.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      data-slot="combobox-arrow"
      {...props}
    >
      <ArrowSvg />
    </BaseCombobox.Arrow>
  );
}

function ComboboxStatus({ className, ...props }: BaseCombobox.Status.Props) {
  return (
    <BaseCombobox.Status
      className={cn(
        "p-3 text-sm text-center text-muted-foreground flex gap-2 items-center empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: BaseCombobox.Empty.Props) {
  return (
    <BaseCombobox.Empty
      className={cn(
        "p-3 text-sm text-center text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: BaseCombobox.Collection.Props) {
  return <BaseCombobox.Collection {...props} />;
}

function ComboboxRow({ ...props }: BaseCombobox.Row.Props) {
  return <BaseCombobox.Row {...props} />;
}

function ComboboxItem({ className, ...props }: BaseCombobox.Item.Props) {
  return (
    <BaseCombobox.Item
      className={cn(
        "flex items-center gap-2 py-1.5 pl-3.5 pr-8 text-sm",
        "select-none cursor-default outline-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItemIndicator({ ...props }: BaseCombobox.ItemIndicator.Props) {
  return <BaseCombobox.ItemIndicator {...props} />;
}

function ComboboxGroup({ className, ...props }: BaseCombobox.Group.Props) {
  return <BaseCombobox.Group className={className} {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: BaseCombobox.GroupLabel.Props) {
  return (
    <BaseCombobox.GroupLabel
      className={cn(
        "px-3.5 py-1.5 text-xs text-muted-foreground font-medium select-none",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: BaseCombobox.Separator.Props) {
  return (
    <BaseCombobox.Separator
      className={cn("bg-border pointer-events-none my-1 h-px", className)}
      {...props}
    />
  );
}

function ComboboxInputGroup({
  className,
  variant,
  inputSize,
  ...props
}: Omit<BaseCombobox.InputGroup.Props, "className"> &
  InputContainerStylesProps & { className?: string }) {
  return (
    <BaseCombobox.InputGroup
      className={inputContainerStyles({
        variant,
        inputSize,
        className,
      })}
      {...props}
    />
  );
}

const comboboxInputGroupContentStyles = tv({
  slots: {
    base: ["grid items-center"],
    addonIconWrapper: [
      "flex justify-center items-center shrink-0 col-start-1 size-6",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
    ],
    input: ["col-start-2 w-full min-w-0 p-0 h-auto"],
    actions: ["flex items-center gap-px justify-end col-start-3 min-w-12"],
    clear: [
      "[&_svg]:text-muted-foreground hover:[&_svg]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4",
    ],
    trigger: [
      "[&_svg]:text-muted-foreground [&_svg]:pointer-events-none data-popup-open:[&_svg]:text-foreground hover:[&_svg]:text-foreground data-popup-open:bg-accent [&_svg]:size-4",
    ],
  },
  variants: {
    hasAddonIcon: {
      true: { base: "gap-0.5 px-1" },
    },
    overlay: {
      true: {
        actions: [
          "grid gap-0 [&>*]:col-start-1 [&>*]:row-start-1 min-w-6",
          "[&:has([data-slot=clear]:not([hidden]))>[data-slot=trigger]]:hidden",
        ],
      },
    },
  },
  defaultVariants: {
    hasAddonIcon: false,
    overlay: false,
  },
});

function ComboboxInputGroupContent({
  className,
  showTrigger = false,
  showClear = false,
  clearReplacesTrigger = false,
  variant = "default",
  inputSize = "default",
  embedded = false,
  addonIcon,
  ...props
}: Omit<BaseCombobox.Input.Props, "className"> & {
  className?: string;
  showTrigger?: boolean;
  showClear?: boolean;
  clearReplacesTrigger?: boolean;
  addonIcon?: React.ReactNode;
  embedded?: boolean;
} & InputContainerStylesProps) {
  const renderClear = showClear || clearReplacesTrigger;
  const renderTrigger = showTrigger || clearReplacesTrigger;
  const { base, addonIconWrapper, input, actions, clear, trigger } =
    comboboxInputGroupContentStyles({
      hasAddonIcon: !!addonIcon,
      overlay: clearReplacesTrigger,
    });

  return (
    <BaseCombobox.InputGroup
      className={cn(
        inputContainerStyles({
          variant: embedded ? "ghost" : variant,
          inputSize,
          className: base(),
        }),
        className,
        embedded && "border-b",
      )}
    >
      {addonIcon && (
        <BaseCombobox.Icon className={addonIconWrapper()}>
          {addonIcon}
        </BaseCombobox.Icon>
      )}
      <BaseCombobox.Input
        className={cn(
          inputStyles({
            variant: "ghost",
            inputSize,
            className: input(),
          }),
        )}
        {...props}
      />
      <div className={actions()}>
        {renderClear && (
          <BaseCombobox.Clear
            aria-label="Clear selection"
            data-slot="clear"
            render={
              <Button className={clear()} size="icon-xs" variant="ghost" />
            }
          >
            <X />
          </BaseCombobox.Clear>
        )}
        {renderTrigger && (
          <BaseCombobox.Trigger
            aria-label="Open popup"
            data-slot="trigger"
            render={
              <Button className={trigger()} size="icon-xs" variant="ghost" />
            }
          >
            <BaseCombobox.Icon>
              <ChevronDown />
            </BaseCombobox.Icon>
          </BaseCombobox.Trigger>
        )}
      </div>
    </BaseCombobox.InputGroup>
  );
}

function ComboboxContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  matchAnchorWidth = true,
  alignOffset = 0,
  positionerAnchor,
  ...props
}: BaseCombobox.Popup.Props &
  Pick<
    BaseCombobox.Positioner.Props,
    "side" | "sideOffset" | "align" | "alignOffset"
  > & {
    matchAnchorWidth?: boolean;
    positionerAnchor?: React.RefObject<HTMLDivElement | null>;
  }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={positionerAnchor}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseCombobox.Popup
          className={cn(
            "bg-popover text-popover-foreground rounded-md shadow-md",
            "flex flex-col overflow-hidden",
            "max-w-(--available-width) max-h-[min(23rem,var(--available-height))]",
            "animate-popup overlay-outline",
            matchAnchorWidth && "w-(--anchor-width)",
            className,
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

const comboboxItemContentStyles = tv({
  slots: {
    base: [
      "grid items-center gap-2 py-1.5 pl-3.5 text-sm text-foreground",
      "outline-none select-none cursor-default highlight-on-active",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
    ],
    indicator: [
      "flex items-center justify-center row-start-1",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
    ],
    content: ["flex items-center gap-2 row-start-1"],
  },
  variants: {
    indicatorPlacement: {
      start: {
        base: ["grid-cols-[1rem_1fr] pr-8"],
        indicator: ["col-start-1"],
        content: ["col-start-2"],
      },
      end: {
        base: ["grid-cols-[1fr_1rem] pr-3"],
        indicator: ["col-start-2"],
        content: ["col-start-1"],
      },
      none: {
        base: ["grid-cols-1"],
      },
    },
  },
  defaultVariants: {
    indicatorPlacement: "start",
  },
});

function ComboboxItemContent({
  className,
  children,
  indicatorPlacement = "start",
  indicatorIcon = <Check />,
  ...props
}: Omit<BaseCombobox.Item.Props, "className"> & {
  indicatorPlacement?: "start" | "end" | "none";
  indicatorIcon?: React.ReactNode;
  className?: string;
}) {
  const { base, indicator, content } = comboboxItemContentStyles({
    indicatorPlacement,
  });

  return (
    <BaseCombobox.Item className={base({ className })} {...props}>
      {indicatorPlacement !== "none" && (
        <BaseCombobox.ItemIndicator className={indicator()}>
          {indicatorIcon}
        </BaseCombobox.ItemIndicator>
      )}
      <div className={content()}>{children}</div>
    </BaseCombobox.Item>
  );
}

const useComboboxFilter = BaseCombobox.useFilter;

export {
  Combobox,
  ComboboxArrow,
  ComboboxBackdrop,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxFilter,
  // Composite components
  ComboboxInputGroupContent,
  ComboboxItemContent,
  ComboboxContent,
};
