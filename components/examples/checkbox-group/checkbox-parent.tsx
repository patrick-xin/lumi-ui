"use client";

import * as React from "react";
import { CheckboxGroup, CheckboxGroupItem } from "@/registry/ui/checkbox-group";
import { Label } from "@/registry/ui/label";

const fruits = ["fuji-apple", "gala-apple", "granny-smith-apple"];

export default function ExampleCheckboxGroup() {
  const id = React.useId();
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={value}
      onValueChange={setValue}
      allValues={fruits}
      style={{ marginLeft: "1rem" }}
    >
      <Label
        id={id}
        className="flex items-center gap-2"
        style={{ marginLeft: "-1rem" }}
      >
        <CheckboxGroupItem name="apples" parent />
        Apples
      </Label>

      <Label className="flex items-center gap-2">
        <CheckboxGroupItem value="fuji-apple" />
        Fuji
      </Label>

      <Label className="flex items-center gap-2">
        <CheckboxGroupItem value="gala-apple" />
        Gala
      </Label>

      <Label className="flex items-center gap-2">
        <CheckboxGroupItem value="granny-smith-apple" />
        Granny Smith
      </Label>
    </CheckboxGroup>
  );
}
