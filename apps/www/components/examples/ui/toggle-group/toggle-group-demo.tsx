import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem
        aria-label="Toggle star"
        className="data-[pressed]:*:[svg]:fill-yellow-500 data-[pressed]:*:[svg]:stroke-yellow-500"
        value="star"
      >
        <StarIcon />
        Star
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label="Toggle heart"
        className="data-[pressed]:*:[svg]:fill-red-500 data-[pressed]:*:[svg]:stroke-red-500"
        value="heart"
      >
        <HeartIcon />
        Heart
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label="Toggle bookmark"
        className="data-[pressed]:*:[svg]:fill-blue-500 data-[pressed]:*:[svg]:stroke-blue-500"
        value="bookmark"
      >
        <BookmarkIcon />
        Bookmark
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
