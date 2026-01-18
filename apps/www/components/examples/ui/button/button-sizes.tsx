import { SearchIcon } from "lucide-react";
import { Button } from "@lumi-ui/ui/button";

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          small
        </Button>
        <Button size="default" variant="outline">
          default
        </Button>
        <Button size="lg" variant="outline">
          large
        </Button>
      </div>
      <div className="flex gap-2">
        <Button size="icon-xs" variant="outline">
          <SearchIcon />
        </Button>
        <Button size="icon-sm" variant="outline">
          <SearchIcon />
        </Button>
        <Button size="icon" variant="outline">
          <SearchIcon />
        </Button>
        <Button size="icon-lg" variant="outline">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
