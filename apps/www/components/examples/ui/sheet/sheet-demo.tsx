"use client";

import { Button } from "@/registry/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Right</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Hello from sheet</SheetTitle>
          <SheetDescription>slide in from left by default.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30" />
          <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
