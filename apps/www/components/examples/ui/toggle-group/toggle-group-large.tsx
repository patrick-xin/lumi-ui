import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem aria-label="Toggle bold" size="lg" value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" size="lg" value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label="Toggle strikethrough"
        size="lg"
        value="strikethrough"
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
