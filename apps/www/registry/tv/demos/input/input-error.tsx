import { Input } from "@/registry/tv/input";

export function InputErrorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input aria-invalid placeholder="Default" variant="default" />
      <Input aria-invalid placeholder="Transparent" variant="transparent" />
    </div>
  );
}
