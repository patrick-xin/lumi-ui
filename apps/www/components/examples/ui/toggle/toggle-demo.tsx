import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/registry/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      className="data-pressed:*:[svg]:fill-primary data-pressed:*:[svg]:stroke-primary"
      size="sm"
      variant="default"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  );
}
