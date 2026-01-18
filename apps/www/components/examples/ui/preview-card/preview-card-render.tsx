"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@lumi-ui/ui/avatar";
import { Button } from "@lumi-ui/ui/button";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@lumi-ui/ui/preview-card";

export function PreviewCardRenderDemo() {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        delay={100}
        render={<Button variant="link">@nextjs</Button>}
      />
      <PreviewCardContent className="w-80" showArrow>
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="text-muted-foreground text-xs">
              Joined December 2021
            </div>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  );
}
