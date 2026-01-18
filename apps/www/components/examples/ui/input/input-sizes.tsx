import { Input } from "@lumi-ui/ui/input";

export function InputSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Default" />
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  );
}
