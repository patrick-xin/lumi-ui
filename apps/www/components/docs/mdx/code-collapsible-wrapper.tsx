"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@lumi-ui/ui/collapsible";
import { Separator } from "@lumi-ui/ui/separator";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible
      className={cn("group/collapsible relative", className)}
      onOpenChange={setIsOpened}
      open={isOpened}
      {...props}
    >
      <div className="absolute top-1 right-8 z-10 flex items-center">
        <CollapsibleTrigger
          render={
            <Button
              className="text-muted-foreground text-xs"
              size="sm"
              variant="ghost"
            >
              {isOpened ? "Collapse" : "Expand"}
            </Button>
          }
        />
        <Separator className="mx-1.5 h-5" orientation="vertical" />
      </div>
      <CollapsiblePanel
        className="[&>figure]:md:mx-0 relative mt-6 h-full overflow-hidden data-closed:max-h-64 [&>figure]:mt-0"
        hidden={false}
        keepMounted
      >
        {children}
      </CollapsiblePanel>
      <div
        className={cn(
          "text-muted-foreground absolute inset-x-0 -bottom-2 flex h-24 items-center justify-center bg-gradient-to-b from-code/70 to-code",
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
    </Collapsible>
  );
}
