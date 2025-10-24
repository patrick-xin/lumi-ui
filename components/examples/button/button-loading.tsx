import { Loader } from "lucide-react";
import { Button } from "@/registry/ui/button";

export function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Loader className="animate-spin size-4" />
      Submit
    </Button>
  );
}
