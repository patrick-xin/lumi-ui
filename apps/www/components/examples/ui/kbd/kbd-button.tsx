import { Button } from "@/registry/ui/button";
import { Kbd } from "@/registry/ui/kbd";

export function KbdButtonDemo() {
  return (
    <Button variant="outline">
      Accept <Kbd>R</Kbd>
    </Button>
  );
}
