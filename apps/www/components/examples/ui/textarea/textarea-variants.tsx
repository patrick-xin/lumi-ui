import { Textarea } from "@/registry/ui/textarea";

export function TextareaVariantDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Textarea
        className="w-72 min-h-24"
        placeholder="Default"
        variant="default"
      />
      <Textarea
        className="w-72 min-h-32"
        placeholder="Transparent"
        variant="transparent"
      />
    </div>
  );
}
