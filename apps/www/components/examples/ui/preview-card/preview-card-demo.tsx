"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@lumi-ui/ui/button";
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@lumi-ui/ui/preview-card";

export function PreviewCardDemo() {
  return (
    <PreviewCard>
      <p className="max-w-64 text-base text-balance">
        The principles of good{" "}
        <PreviewCardTrigger
          className={cn(buttonVariants({ variant: "link" }), "px-0 text-base")}
          href="https://en.wikipedia.org/wiki/Typography"
        >
          typography
        </PreviewCardTrigger>{" "}
        remain into the digital age.
      </p>
      <PreviewCardContent>
        <img
          alt="Station Hofplein signage in Rotterdam, Netherlands"
          className="block w-full rounded-sm"
          height="300"
          src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
          width="448"
        />
        <p className="text-sm text-pretty">
          <strong>Typography</strong> is the art and science of arranging type
          to make written language clear, visually appealing, and effective in
          communication.
        </p>
      </PreviewCardContent>
    </PreviewCard>
  );
}
