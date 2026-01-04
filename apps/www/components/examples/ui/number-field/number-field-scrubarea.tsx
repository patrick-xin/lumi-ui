import React from "react";
import { NumberField, NumberFieldScrubArea } from "@/registry/ui/number-field";

export function NumberFieldScrubAreaDemo() {
  const id = React.useId();
  return (
    <NumberField defaultValue={100} id={id}>
      <NumberFieldScrubArea>
        <label className="cursor-ew-resize text-sm font-medium" htmlFor={id}>
          Amount
        </label>
      </NumberFieldScrubArea>
    </NumberField>
  );
}
