import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export function ToggleGroupSpacing() {
  return (
    <ToggleGroup multiple variant="outline" size="sm">
      <ToggleGroupItem
        value="star"
        aria-label="Toggle star"
        className="data-[pressed]:bg-transparent data-[pressed]:*:[svg]:fill-yellow-500 data-[pressed]:*:[svg]:stroke-yellow-500"
      >
        <StarIcon />
        Star
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className="data-[pressed]:bg-transparent data-[pressed]:*:[svg]:fill-red-500 data-[pressed]:*:[svg]:stroke-red-500"
      >
        <HeartIcon />
        Heart
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Toggle bookmark"
        className="data-[pressed]:bg-transparent data-[pressed]:*:[svg]:fill-blue-500 data-[pressed]:*:[svg]:stroke-blue-500"
      >
        <BookmarkIcon />
        Bookmark
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
