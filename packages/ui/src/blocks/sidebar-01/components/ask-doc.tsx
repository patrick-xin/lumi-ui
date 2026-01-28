"use client";

import { useAIChat } from "@lumi-ui/ui/blocks/sidebar-01/components/ai-chat";
import { Button } from "@lumi-ui/ui/button";
import { cn } from "@lumi-ui/ui/lib/utils";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { BookAIcon } from "lucide-react";

export const AskDoc = () => {
  const { input, switchToChat } = useAIChat();
  return (
    <>
      <div className="p-4">
        <Button
          className="w-full justify-start text-muted-foreground"
          disabled={!input}
          onClick={switchToChat}
          variant="glow"
        >
          <BookAIcon /> Ask about{" "}
          <span className="font-semibold text-foreground">{input}</span>
        </Button>
      </div>
      {input && (
        <ScrollArea
          className={cn("p-0", input && "min-h-[50dvh] h-[60dvh] max-h-full")}
          gradientScrollFade
        >
          <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm text-muted-foreground">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                className="flex h-24 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                key={String(i)}
              >
                <span className="font-medium text-sm">{i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};
