import type * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex min-h-36 w-56 flex-col justify-center">
      <CollapsibleTrigger
        render={
          <Button className="group justify-start">
            <ChevronIcon className="size-3 transition-all ease-out group-data-panel-open:rotate-90" />
            Recovery keys
          </Button>
        }
      />
      <CollapsiblePanel>
        <div className="flex flex-col gap-2 mt-2 rounded-md bg-accent/30 py-2 pl-4">
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function ChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
    </svg>
  );
}
