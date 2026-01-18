import { ToggleGroup, ToggleGroupItem } from "@lumi-ui/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export function ToggleGroupOutlineDemo() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
