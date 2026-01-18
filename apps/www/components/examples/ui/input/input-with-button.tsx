import { Button } from "@lumi-ui/ui/button";
import { Input } from "@lumi-ui/ui/input";

export function InputWithButton() {
  return (
    <div className="flex flex-col w-full max-w-md gap-4">
      <div className="flex items-center gap-2">
        <Input placeholder="default" />
        <Button variant="outline">Default</Button>
      </div>
      <div className="flex items-center gap-2">
        <Input inputSize="sm" placeholder="small" />
        <Button size="sm" variant="outline">
          Small
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input inputSize="lg" placeholder="large" />
        <Button size="lg" variant="outline">
          Large
        </Button>
      </div>
    </div>
  );
}
