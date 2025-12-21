import { Input } from "@/registry/ui/input";

export function InputVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input variant="default" placeholder="Default" />
      <Input variant="transparent" placeholder="Transparent" />
      <Input variant="ghost" placeholder="Ghost" />
    </div>
  );
}
