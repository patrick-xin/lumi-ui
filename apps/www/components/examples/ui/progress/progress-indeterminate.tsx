"use client";

import * as React from "react";
import { Button } from "@lumi-ui/ui/button";
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from "@lumi-ui/ui/progress";

export function IndeterminateDemo() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="w-full max-w-md p-6">
      <div className="space-y-4">
        <ProgressRoot
          value={isLoading ? null : 0}
          className="grid grid-cols-2 gap-y-2"
        >
          <ProgressLabel>{isLoading ? "Processing..." : "Ready"}</ProgressLabel>
          <ProgressValue className="text-right">
            {(formattedValue, value) =>
              value === null ? "Please wait..." : formattedValue
            }
          </ProgressValue>
          <ProgressTrack className="col-span-full overflow-hidden">
            <ProgressIndicator
              className={isLoading ? "animate-pulse bg-primary" : "bg-primary"}
            />
          </ProgressTrack>
        </ProgressRoot>
        <Button
          size="sm"
          variant={isLoading ? "secondary" : "default"}
          onClick={() => setIsLoading(!isLoading)}
        >
          {isLoading ? "Stop" : "Start Indeterminate"}
        </Button>
      </div>
    </div>
  );
}
