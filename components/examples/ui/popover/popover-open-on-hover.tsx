import { BellIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";

export default function PopoverOpenOnHoverDemo() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon-sm">
            <BellIcon aria-label="Notifications" />
          </Button>
        }
        openOnHover
      />
      <PopoverContent showArrow>
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
