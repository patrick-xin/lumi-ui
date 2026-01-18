import { Italic } from "lucide-react";

import { Toggle } from "@lumi-ui/ui/toggle";

export function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  );
}
