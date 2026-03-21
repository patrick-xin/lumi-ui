import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";

export function SwitchSizeDemo() {
  return (
    <div className="flex flex-col flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Label>Default</Label>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center gap-2">
        <Label>Small</Label>
        <Switch defaultChecked size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <Label>Large</Label>
        <Switch defaultChecked size="lg" />
      </div>
    </div>
  );
}
