import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import type * as React from "react";
import { cn, tv } from "tailwind-variants";
import { ArrowSvg } from "@/registry/tv/arrow-svg";
import { Button } from "@/registry/tv/button";
import {
  type InputContainerStylesProps,
  type InputStylesProps,
  inputContainerStyles,
  inputStyles,
  inputVariant,
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
  variant,
  ...props
}: Omit<BaseCombobox.Input.Props, "className"> &
  InputStylesProps & { className?: string }) {
  return (
    <BaseCombobox.Input
      className={inputStyles({ variant, inputSize, className })}
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

function ComboboxChips({ className, ...props }: BaseCombobox.Chips.Props) {
  return (
    <BaseCombobox.Chips
      className={cn("flex w-full flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  ...props
}: BaseCombobox.Chip.Props) {
  return (
    <BaseCombobox.Chip
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-md shadow-xs text-sm bg-input text-input-foreground outline-none cursor-default",
        "focus-within:bg-input/80 focus-within:text-input-foreground/80",
        "[@media(hover:hover)]:data-highlighted:bg-input/80 [@media(hover:hover)]:data-highlighted:text-input-foreground/80",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxChipRemove />
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
        "p-1 inline-flex items-center justify-center bg-transparent hover:bg-accent text-inherit rounded-md transition-colors",
        "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
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
  multiple,
  ...props
}: Omit<BaseCombobox.InputGroup.Props, "className"> &
  InputContainerStylesProps & { className?: string }) {
  return (
    <BaseCombobox.InputGroup
      className={inputContainerStyles({
        variant,
        inputSize,
        multiple,
        className,
      })}
      {...props}
    />
  );
}

const comboboxInputGroupContentStyles = tv({
  extend: inputContainerStyles,
  variants: {
    variant: inputVariant,
    hasAddonIcon: {
      true: "",
      false: "",
    },
  },
  slots: {
    base: ["grid items-center px-2.5"],
    addonIconWrapper: [
      "flex justify-center items-center shrink-0 col-start-1",
      "size-6",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
    ],
    input: ["col-start-2 w-full min-w-0 p-0"],
    actions: ["flex items-center gap-0.5 col-start-3"],
    clear: [
      "[&_svg]:text-muted-foreground hover:[&_svg]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4",
    ],
    trigger: [
      "[&_svg]:text-muted-foreground [&_svg]:pointer-events-none data-popup-open:[&_svg]:text-foreground hover:[&_svg]:text-foreground data-popup-open:bg-accent [&_svg]:size-4",
    ],
  },
  compoundVariants: [
    {
      variant: ["default", "transparent"],
      className: {
        base: [
          "rounded-md outline outline-border shadow-sm focus-within:outline focus-within:outline-ring focus-within:ring-4 focus-within:ring-ring/10",
          "transition-[color,box-shadow,ring,outline] duration-150",
        ],
      },
    },
    {
      hasAddonIcon: true,
      className: {
        base: "px-1 gap-0.5",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    inputSize: "default",
    hasAddonIcon: false,
  },
});

function ComboboxInputGroupContent({
  className,
  showTrigger = false,
  showClear = false,
  variant = "default",
  inputSize = "default",
  inputVariant = "ghost",
  addonIcon,
  inputClassName,
  ...props
}: Omit<BaseCombobox.Input.Props, "className"> & {
  className?: string;
  showTrigger?: boolean;
  showClear?: boolean;
  addonIcon?: React.ReactNode;
  inputClassName?: string;
  inputVariant?: InputStylesProps["variant"];
} & InputStylesProps) {
  const { base, addonIconWrapper, input, actions, clear, trigger } =
    comboboxInputGroupContentStyles({
      variant,
      inputSize,
      hasAddonIcon: !!addonIcon,
    });

  return (
    <BaseCombobox.InputGroup className={base({ className })}>
      {addonIcon && (
        <BaseCombobox.Icon className={addonIconWrapper()}>
          {addonIcon}
        </BaseCombobox.Icon>
      )}
      <BaseCombobox.Input
        className={inputStyles({
          className: input(),
          variant: "ghost",
          inputSize,
        })}
        {...props}
      />
      <div className={actions()}>
        {showClear && (
          <BaseCombobox.Clear
            aria-label="Clear selection"
            render={
              <Button className={clear()} size="icon-xs" variant="ghost" />
            }
          >
            <X />
          </BaseCombobox.Clear>
        )}
        {showTrigger && (
          <BaseCombobox.Trigger
            aria-label="Open popup"
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
  ComboboxLabel,
  ComboboxValue,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxClear,
  ComboboxTrigger,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxList,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxEmpty,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxItemIndicator,
  ComboboxRow,
  ComboboxStatus,
  ComboboxCollection,
  useComboboxFilter,
  // Composite components
  ComboboxInputGroupContent,
  ComboboxContent,
  ComboboxItemContent,
};
