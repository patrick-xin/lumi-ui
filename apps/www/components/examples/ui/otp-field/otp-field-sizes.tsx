import { OTPField } from "@/registry/ui/otp-field";

export function OTPFieldSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <OTPField inputSize="sm" length={6} />
      <OTPField length={6} />
      <OTPField inputSize="lg" length={6} />
    </div>
  );
}
