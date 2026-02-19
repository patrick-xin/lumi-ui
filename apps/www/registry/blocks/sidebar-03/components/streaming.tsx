"use client";

import { Bot, Loader2, Send, User } from "lucide-react";
import { useState } from "react";
import { useAIChat } from "@/registry/blocks/sidebar-03/components/ai-chat";
import { MovingBorderButton } from "@/registry/blocks/sidebar-03/components/moving-border-button";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { ScrollArea } from "@/registry/ui/scroll-area";

const RESPONSE_INTRO = `Lumi UI gives you accessible, customizable React components that you own completely. Built on Base UI for robust behavior and styled with Tailwind CSS for maximum flexibility.

It offers two paths to production:
1. **Composite Components**: Pre-assembled, production-ready components for common patterns. Perfect for prototyping and building standard UIs fast.
2. **Primitive Components**: Raw, unstyled building blocks that give you full access to logic without fighting the library.

This ensures you have both velocity when you need it and control when you want it.`;

const RESPONSE_PHILOSOPHY = `Lumi UI is built on a "Dual Layer Architecture" to refuse the false dichotomy between speed and control.

**Composites = Velocity**
Pre-assembled components that combine structure, styling, and logic. You accept our opinions about structure in exchange for speed. Best for MVPs and 80% of use cases.

**Primitives = Control**
Thin wrappers around Base UI that provide state and accessibility but enforce zero visual layout. You write more code but get complete control over DOM structure.

We also optimize for **AI-Assisted Development** with flat semantic exports and clear patterns that LLMs can easily understand and generate.`;

const RESPONSE_ARCHITECTURE = `Our architecture focuses on **Flat Semantic Exports** and **Immutable Logic Blocks**.

- **Flat Exports**: Every component is accessible at the root level (e.g., \`Comboboxinput\`, \`ComboboxItem\`), making it easier for AI to infer usage and reducing context tokens.
- **Immutable Primitives**: We structure primitives to be stable. You build new features in your application files by composing them, rather than modifying core component logic.

We also use a **Hit-Test Pattern** for forgiving interactive areas, ensuring great UX without compromising on design precision.`;

const DEFAULT_RESPONSE = `I can tell you about Lumi UI's core features, its dual-layer architecture, or the philosophies behind its design.

Try asking:
- "What is Lumi UI?"
- "What are the core philosophies?"
- "How does the architecture work?"`;

export function ChatStreaming() {
  const { input } = useAIChat();
  const [messages, setMessages] = useState([
    {
      content:
        "Hello! I am a simulated AI for Lumi UI. Ask me about the library, our philosophies, or how to get started.",
      role: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState(input ?? "");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");

  const streamResponse = async (textToStream: string) => {
    setIsStreaming(true);
    setStreamedContent("");

    let index = 0;

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (index < textToStream.length) {
          index++;
          setStreamedContent(textToStream.slice(0, index));
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 8);
    });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;
    const userMessage = { content: inputValue, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Determine response based on input
    const lowerInput = inputValue.toLowerCase();
    let responseText = DEFAULT_RESPONSE;

    if (lowerInput.includes("what is") || lowerInput.includes("intro")) {
      responseText = RESPONSE_INTRO;
    } else if (
      lowerInput.includes("philosophy") ||
      lowerInput.includes("philosophies")
    ) {
      responseText = RESPONSE_PHILOSOPHY;
    } else if (
      lowerInput.includes("architecture") ||
      lowerInput.includes("dual layer") ||
      lowerInput.includes("work")
    ) {
      responseText = RESPONSE_ARCHITECTURE;
    }

    await streamResponse(responseText);

    setMessages((prev) => [...prev, { content: responseText, role: "ai" }]);
    setStreamedContent("");
    setIsStreaming(false);
  };

  return (
    <>
      <ScrollArea
        className="p-0 min-h-[50dvh] h-[55dvh] max-h-full"
        gradientScrollFade
      >
        {messages.map((msg, idx) => (
          <div
            className={cn(
              "flex w-full gap-2 items-start p-4",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
            key={idx}
          >
            {/* AI Avatar */}
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={cn(
                "max-w-[80%] rounded-md text-sm",
                msg.role === "user"
                  ? "bg-accent text-accent-foreground p-2"
                  : "",
              )}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {!input && messages.length === 1 && (
          <div className="px-14 space-y-2">
            <MovingBorderButton
              onClick={() => setInputValue("What is Lumi UI?")}
            >
              What is Lumi UI
            </MovingBorderButton>
            <Button
              className="bg-background cursor-pointer hover:bg-background flex flex-col h-auto justify-start items-start gap-2 w-fit border hover:border-primary/50"
              onClick={() => setInputValue("What are the core philosophies?")}
              variant="unstyled"
            >
              <span className="font-medium">
                What are the core philosophies?
              </span>
            </Button>
            <Button
              className="bg-background cursor-pointer hover:bg-background flex flex-col h-auto justify-start items-start gap-2 w-fit border hover:border-primary/50"
              onClick={() =>
                setInputValue("How does the dual layer architecture work?")
              }
              variant="unstyled"
            >
              <span className="font-medium">
                How does the dual layer architecture work?
              </span>
            </Button>
          </div>
        )}

        {isStreaming && (
          <div className="flex w-full gap-4 justify-start p-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-[80%] rounded-md text-sm leading-relaxed">
              <div className="whitespace-pre-wrap">{streamedContent}</div>
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="p-4">
        <form
          className="relative flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            autoFocus
            disabled={isStreaming}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isStreaming ? "AI is typing..." : "Type a message..."}
            value={inputValue}
          />
          <Button
            className="absolute right-2 justify-center items-center"
            disabled={!inputValue.trim() || isStreaming}
            size="icon-xs"
            type="submit"
            variant="ghost"
          >
            {isStreaming ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
