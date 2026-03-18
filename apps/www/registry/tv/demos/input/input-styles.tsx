"use client";

import { Input } from "@/registry/tv/input";

export function InputVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* No amber color */}
      <Input placeholder="Default" />
      {/* Amber color here */}
      <Input placeholder="Transparent" variant="transparent" />
      <Input placeholder="Ghost" variant="ghost" />
    </div>
  );
}
