import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export function CheckboxDisabled() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox disabled id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
