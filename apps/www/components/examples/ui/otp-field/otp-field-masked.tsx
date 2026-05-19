import { Label } from "@/registry/ui/label";
import { OTPField } from "@/registry/ui/otp-field";

export function OTPFieldMaskedDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-masked">Access code</Label>
      <OTPField id="otp-masked" length={6} mask />
    </div>
  );
}
