"use client";

import { useAIChat } from "@/registry/blocks/sidebar-03/components/ai-chat";
import { AskDoc } from "@/registry/blocks/sidebar-03/components/ask-doc";
import { ChatDialogHeader } from "@/registry/blocks/sidebar-03/components/chat-header";
import { HoverBorderButton } from "@/registry/blocks/sidebar-03/components/hover-border-button";
import { ChatStreaming } from "@/registry/blocks/sidebar-03/components/streaming";
import { Dialog, DialogContent, DialogTrigger } from "@/registry/ui/dialog";
import { cn } from "@/registry/lib/utils";
import { SparklesIcon } from "lucide-react";

export const AIChatDialog = () => {
  const { activeTab, input, setIsDialogOpen, isDialogOpen } = useAIChat();
  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10">
        <DialogTrigger
          aria-label="Chat with AI"
          render={
            <HoverBorderButton
              animate={!isDialogOpen}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold"
            >
              <SparklesIcon className="size-4" /> <span>Chat With AI</span>
            </HoverBorderButton>
          }
        />
      </div>
      <DialogContent
        className={cn(
          "p-0! gap-0 mt-20 rounded-md max-w-[60ch] will-change-transform duration-300 data-ending-style:translate-0 data-starting-style:translate-0",
          activeTab === "doc" && !input && "h-min",
        )}
        layout="top"
      >
        <ChatDialogHeader />
        {activeTab === "chat" && <ChatStreaming />}
        {activeTab === "doc" && <AskDoc />}
      </DialogContent>
    </Dialog>
  );
};
