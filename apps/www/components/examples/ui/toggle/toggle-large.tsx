import { Italic } from "lucide-react";

import { Toggle } from "@lumi-ui/ui/toggle";

export function ToggleLarge() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  );
}
