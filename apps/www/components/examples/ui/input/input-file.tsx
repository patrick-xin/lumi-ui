import { Input } from "@/registry/ui/input";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <label htmlFor="picture">Picture</label>
      <Input id="picture" type="file" />
    </div>
  );
}
