import { ArrowUpIcon } from "lucide-react";

import { Button } from "@lumi-ui/ui/button";

export function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
