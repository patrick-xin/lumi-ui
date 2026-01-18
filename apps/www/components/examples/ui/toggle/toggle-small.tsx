import { Italic } from "lucide-react";

import { Toggle } from "@lumi-ui/ui/toggle";

export function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  );
}
