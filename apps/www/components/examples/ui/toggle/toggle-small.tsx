import { Italic } from "lucide-react";

import { Toggle } from "@/registry/ui/toggle";

export function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  );
}
