"use client";

import { Field, FieldLabel } from "@lumi-ui/ui/field";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableSeparator,
} from "@lumi-ui/ui/resizable";
import { Switch } from "@lumi-ui/ui/switch";
import { useState } from "react";

export const ResizableOrientation = () => {
  const [isVertical, setIsVertical] = useState(true);
  return (
    <div className="max-w-md flex flex-col rounded-md gap-4">
      <Field className="ml-auto">
        <FieldLabel>
          <span className="font-medium">
            {isVertical ? "Vertical" : "Horizontal"}
          </span>
          <Switch checked={isVertical} onCheckedChange={setIsVertical} />
        </FieldLabel>
      </Field>

      <ResizableGroup
        className="md:min-w-96 md:min-h-80 rounded-md border"
        orientation={isVertical ? "vertical" : "horizontal"}
      >
        <ResizablePanel defaultSize={50}>
          <div className="p-2 size-full rounded-xs" />
        </ResizablePanel>
        <ResizableSeparator withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="p-2 size-full rounded-xs" />
        </ResizablePanel>
      </ResizableGroup>
    </div>
  );
};
