import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import { Button } from "../../../../registry/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../registry/ui/tooltip";

export function KbdTooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger
            render={<Button className="rounded-r-none" variant="outline" />}
          >
            Save
          </TooltipTrigger>
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button className="rounded-l-none border-l-0" variant="outline" />
            }
          >
            Print
          </TooltipTrigger>
          <TooltipContent>
            Print Document{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
