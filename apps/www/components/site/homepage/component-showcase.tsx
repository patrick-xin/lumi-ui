"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";

export default function ComponentShowcase() {
  return (
    <section className="container mx-auto hidden md:block">
      <div className="relative flex flex-col items-center justify-center">
        <div className="group relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-md perspective-[2000px]">
          <div
            className={cn(
              "absolute inset-0 mx-auto",
              "w-[95%] h-[80%] md:h-[120%]",
              "[transform:translate(10%,-5%)_scale(1.1)_rotateX(47deg)_rotateY(32deg)_rotate(324deg)]",
              "bg-background border border-border rounded-xl shadow-2xl shadow-primary/10",
              "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-background after:z-20",
            )}
          >
            <div className="absolute inset-0 rounded-xl bg-background/50 ring-1 ring-inset ring-border/50" />

            <iframe
              className="h-full w-full rounded-xl bg-muted/20 opacity-90 grayscale-[0.2] invert-[0.02]"
              src="/view/dashboard-01"
              tabIndex={-1}
              title="Lumi Dashboard"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-40 -mt-12 flex justify-center">
          <Button
            className="shadow-lg shadow-primary/20"
            nativeButton={false}
            render={
              <Link href="/view/dashboard-01" target="_blank">
                See in action
              </Link>
            }
            size="lg"
            variant="default"
          />
        </div>
      </div>
    </section>
  );
}
