import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@lumi-ui/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[pressed]:bg-transparent data-[pressed]:*:[svg]:fill-blue-500 data-[pressed]:*:[svg]:stroke-blue-500"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  );
}
