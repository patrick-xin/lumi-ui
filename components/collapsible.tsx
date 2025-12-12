import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { cn } from "@/lib/utils";

function Collapsible({ ...props }: BaseCollapsible.Root.Props) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: BaseCollapsible.Trigger.Props) {
  return <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsiblePanel({
  className,
  ...props
}: BaseCollapsible.Panel.Props) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={cn(
        "flex flex-col h-[var(--collapsible-panel-height)] overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 duration-150",
        className,
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsiblePanel, CollapsibleTrigger };
