import { Label } from "@/registry/ui/label";
import {
  OTPFieldInput,
  OTPFieldRoot,
  OTPFieldSeparator,
} from "@/registry/ui/otp-field";

export function OTPFieldGroupedDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-grouped">Verification code</Label>
      <OTPFieldRoot id="otp-grouped" length={6}>
        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <OTPFieldInput
              aria-label={`Character ${index + 1} of 6`}
              key={index}
            />
          ))}
        </div>
        <OTPFieldSeparator />
        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <OTPFieldInput
              aria-label={`Character ${index + 4} of 6`}
              key={index + 3}
            />
          ))}
        </div>
      </OTPFieldRoot>
    </div>
  );
}
