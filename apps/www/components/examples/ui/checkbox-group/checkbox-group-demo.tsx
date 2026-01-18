"use client";

import * as React from "react";
import { Checkbox } from "@lumi-ui/ui/checkbox";
import { CheckboxGroup } from "@lumi-ui/ui/checkbox-group";
import { Label } from "@lumi-ui/ui/label";

export default function ExampleCheckboxGroup() {
  const id = React.useId();
  return (
    <CheckboxGroup aria-labelledby={id} defaultValue={["fuji-apple"]}>
      <div className="font-medium" id={id}>
        Apples
      </div>

      <Label className="flex items-center gap-2">
        <Checkbox name="apple" value="fuji-apple"></Checkbox>
        Fuji
      </Label>

      <Label className="flex items-center gap-2">
        <Checkbox name="apple" value="gala-apple"></Checkbox>
        Gala
      </Label>

      <Label className="flex items-center gap-2">
        <Checkbox name="apple" value="granny-smith-apple"></Checkbox>
        Granny Smith
      </Label>
    </CheckboxGroup>
  );
}
