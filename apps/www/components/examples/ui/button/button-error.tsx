import { Button } from "@/registry/ui/button";

export function ButtonError() {
  return (
    <div className="flex flex-wrap gap-6 max-w-sm">
      <Button aria-invalid variant="default">
        default
      </Button>
      <Button aria-invalid variant="secondary">
        secondary
      </Button>
      <Button aria-invalid variant="outline">
        outline
      </Button>
      <Button aria-invalid variant="ghost">
        ghost
      </Button>
      <Button aria-invalid variant="link">
        link
      </Button>
      <Button aria-invalid variant="glow">
        glow
      </Button>
      <Button aria-invalid variant="destructive">
        destructive
      </Button>
      <Button aria-invalid variant="unstyled">
        unstyled
      </Button>
    </div>
  );
}
