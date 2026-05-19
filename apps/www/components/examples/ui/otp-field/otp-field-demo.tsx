import { Label } from "@/registry/ui/label";
import { OTPField } from "@/registry/ui/otp-field";

export function OTPFieldDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-demo">Verification code</Label>
      <OTPField id="otp-demo" length={6} />
    </div>
  );
}
