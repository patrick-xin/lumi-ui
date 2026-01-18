import { Separator } from "@lumi-ui/ui/separator";

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Base UI</h4>
        <p className="text-muted-foreground text-sm">
          An open-source React component library for building accessible user
          interfaces.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Quick start</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
