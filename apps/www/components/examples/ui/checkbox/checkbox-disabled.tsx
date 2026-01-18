import { Checkbox } from "@lumi-ui/ui/checkbox";
import { Label } from "@lumi-ui/ui/label";

export function CheckboxDisabled() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox disabled id="terms-disabled" />
      <Label htmlFor="terms-disabled">Accept terms and conditions</Label>
    </div>
  );
}
