import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";

import { cn } from "@/lib/utils";

function Collapsible({ ...props }: BaseCollapsible.Root.Props) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: BaseCollapsible.Trigger.Props) {
  return (
    <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent({
  className,
  ...props
}: BaseCollapsible.Panel.Props) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      className={cn(
        "transition-all duration-200 ease-in-out",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        "h-[var(--collapsible-panel-height)] overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
