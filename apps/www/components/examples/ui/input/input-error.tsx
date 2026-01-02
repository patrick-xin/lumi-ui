import { Input } from "@/registry/ui/input";

export function InputErrorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input aria-invalid variant="default" placeholder="Default" />
      <Input aria-invalid variant="transparent" placeholder="Transparent" />
      <Input aria-invalid variant="ghost" placeholder="Ghost" />
    </div>
  );
}
