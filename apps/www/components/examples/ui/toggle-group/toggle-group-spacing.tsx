import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export function ToggleGroupSpacingDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup multiple spacing="lg">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Toggle strikethrough"
          value="strikethrough"
        >
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup multiple spacing="sm">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Toggle strikethrough"
          value="strikethrough"
        >
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
