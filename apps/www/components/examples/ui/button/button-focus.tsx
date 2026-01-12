import { Button } from "@/registry/ui/button";

export function ButtonFocus() {
  return (
    <div className="flex flex-wrap gap-6 max-w-sm">
      <Button autoFocus variant={"default"}>
        default
      </Button>
      <Button autoFocus variant={"secondary"}>
        secondary
      </Button>
      <Button autoFocus variant={"outline"}>
        outline
      </Button>
      <Button autoFocus variant={"ghost"}>
        ghost
      </Button>
      <Button autoFocus variant={"link"}>
        link
      </Button>
      <Button autoFocus variant={"glow"}>
        glow
      </Button>
      <Button autoFocus variant={"destructive"}>
        destructive
      </Button>
      <Button autoFocus variant={"unstyled"}>
        unstyled
      </Button>
    </div>
  );
}
