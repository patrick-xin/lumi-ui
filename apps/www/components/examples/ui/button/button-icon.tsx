import { CircleFadingArrowUpIcon } from "lucide-react";

import { Button } from "@/registry/ui/button";

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  );
}
