"use client";

import React from "react";
import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldLabel } from "@/registry/ui/field";

export function CheckboxControlledDemo() {
  const [accepted, setAccepted] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="text-xs font-mono">Accepted: {accepted.toString()}</div>
      <Field className="flex items-center gap-2" name="terms">
        <FieldLabel>
          <Checkbox
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked)}
          />
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </div>
  );
}
