"use client";

import { Input } from "@base-ui/react/input";

export function InputDemo() {
  return (
    <div className="flex flex-col gap-2">
      {/* Works */}
      <Input
        className={() => {
          return "bg-amber-700!";
        }}
        placeholder="Email"
        type="email"
      />
    </div>
  );
}
