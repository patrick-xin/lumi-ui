"use client";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { OTPField } from "@/registry/ui/otp-field";
import { toast } from "@/registry/ui/toast";

export function OTPFieldFormDemo() {
  return (
    <Form
      aria-label="OTP form"
      className="w-72"
      onFormSubmit={(value) =>
        toast.success({
          description: JSON.stringify(value),
          title: "Form submitted",
        })
      }
    >
      <Field name="verificationCode">
        <FieldLabel>Verification code</FieldLabel>
        <OTPField autoSubmit length={6} required />
        <FieldDescription>
          Enter the 6-digit code we sent to your device.
        </FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
