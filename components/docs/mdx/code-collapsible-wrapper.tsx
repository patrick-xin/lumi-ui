"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Separator } from "@/registry/ui/separator";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [isOpened, setIsOpened] = React.useState(props.defaultOpen ?? false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("relative", className)}
    >
      <CollapsibleTrigger
        nativeButton={false}
        render={
          <div className="absolute top-1.5 right-9 z-10 flex items-center" />
        }
      >
        <Button
          variant="ghost"
          size={"icon-lg"}
          className="text-muted-foreground h-7 rounded-md px-2 text-xs"
        >
          {isOpened ? "Collapse" : "Expand"}
        </Button>
        <Separator orientation="vertical" className="mx-2 h-4" />
      </CollapsibleTrigger>

      <CollapsiblePanel keepMounted hidden={false} className="relative">
        <div
          data-closed={isOpened ? undefined : ""}
          className="overflow-hidden data-[open]:h-auto data-[closed]:h-64"
        >
          {children}
        </div>
      </CollapsiblePanel>
      <div
        className={cn(
          "from-code/70 to-code text-muted-foreground absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b",
          isOpened && "hidden",
        )}
      >
        <CollapsibleTrigger
          render={
            <Button size="icon-sm" variant="secondary">
              <ChevronDown />
            </Button>
          }
        />
      </div>

      {isOpened && (
        <CollapsibleTrigger
          className={cn("absolute inset-x-0 bottom-4 w-fit mx-auto")}
          render={
            <Button size="icon-sm" variant="secondary">
              <ChevronUp />
            </Button>
          }
        />
      )}
    </Collapsible>
  );
}
