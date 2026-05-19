import { Label } from "@/registry/ui/label";
import {
  OTPFieldInput,
  OTPFieldRoot,
} from "@/registry/ui/otp-field";

const LENGTH = 6;

export function OTPFieldPlaceholderDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-placeholder">Verification code</Label>
      <OTPFieldRoot id="otp-placeholder" length={LENGTH}>
        {Array.from({ length: LENGTH }, (_, index) => (
          <OTPFieldInput
            aria-label={`Character ${index + 1} of ${LENGTH}`}
            className="focus:placeholder:text-transparent"
            key={index}
            placeholder="•"
          />
        ))}
      </OTPFieldRoot>
    </div>
  );
}
