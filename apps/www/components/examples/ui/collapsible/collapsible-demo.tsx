import { ChevronRightIcon } from "lucide-react";
import { Button } from "@lumi-ui/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex min-h-36 w-56 flex-col justify-center">
      <CollapsibleTrigger
        render={
          <Button className="group justify-start">
            <ChevronRightIcon className="size-4 transition-all ease-out group-data-panel-open:rotate-90" />
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
