"use client";

import { HeartIcon } from "lucide-react";
import { Toggle } from "@lumi-ui/ui/toggle";

export default function ExampleToggle() {
  return (
    <Toggle
      aria-label="Favorite"
      render={(props, state) => {
        if (state.pressed) {
          return (
            <button type="button" {...props}>
              <HeartIcon className="size-4 text-red-600 fill-red-600" />
            </button>
          );
        }

        return (
          <button type="button" {...props}>
            <HeartIcon className="size-4" />
          </button>
        );
      }}
    />
  );
}
