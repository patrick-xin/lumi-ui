import { Label } from "@/registry/ui/label";
import { OTPField } from "@/registry/ui/otp-field";

export function OTPFieldAlphanumericDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-alphanumeric">Recovery code</Label>
      <OTPField id="otp-alphanumeric" length={6} validationType="alphanumeric" />
    </div>
  );
}
