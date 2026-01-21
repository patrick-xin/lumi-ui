import { Button } from "@lumi-ui/ui/button";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-6 max-w-sm">
      <Button variant="default">default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
      <Button variant="glow">glow</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="unstyled">unstyled</Button>
    </div>
  );
}
