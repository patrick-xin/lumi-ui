import { GitBranch } from "lucide-react";
import { Button } from "@/registry/ui/button";

export function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <GitBranch /> New Branch
    </Button>
  );
}
