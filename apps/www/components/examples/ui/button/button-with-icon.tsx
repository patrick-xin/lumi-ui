import { GitBranch } from "lucide-react";
import { Button } from "@lumi-ui/ui/button";

export function ButtonWithIcon() {
  return (
    <Button size="sm" variant="outline">
      <GitBranch /> New Branch
    </Button>
  );
}
