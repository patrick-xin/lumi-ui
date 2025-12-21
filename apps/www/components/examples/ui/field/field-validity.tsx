"use client";

import {
  Field,
  FieldControl,
  FieldLabel,
  FieldValidity,
} from "@/registry/ui/field";

export default function FieldValidityDemo() {
  return (
    <Field className="w-64">
      <FieldLabel>Email</FieldLabel>
      <FieldControl placeholder="Enter your email" required type="email" />
      <FieldValidity>
        {(validity) => (
          <div className="w-full rounded bg-accent/30 p-2">
            <pre className="max-h-64 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
              {JSON.stringify(validity, null, 2)}
            </pre>
          </div>
        )}
      </FieldValidity>
    </Field>
  );
}
