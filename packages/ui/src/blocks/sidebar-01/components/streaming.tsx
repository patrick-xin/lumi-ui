"use client";

import { useAIChat } from "@lumi-ui/ui/blocks/sidebar-01/components/ai-chat";
import { MovingBorderButton } from "@lumi-ui/ui/blocks/sidebar-01/components/moving-border-button";
import { Button } from "@lumi-ui/ui/button";
import { Input } from "@lumi-ui/ui/input";
import { cn } from "@lumi-ui/ui/lib/utils";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useState } from "react";

const LONG_FAKE_RESPONSE = `Here is a detailed explanation of how Large Language Models (LLMs) simulate human-like text generation.

1. **Tokenization**: 
The process begins by breaking down text into smaller units called tokens. These can be words, parts of words, or even individual characters. For example, the word "streaming" might be tokenized as "stream" and "ing".

2. **Neural Network Processing**:
The model processes these tokens through layers of a transformer architecture. It uses "attention mechanisms" to understand the context of each token in relation to others, allowing it to grasp nuances like sarcasm, code syntax, or long-form narrative structures.

3. **Probability Distribution**:
Instead of "thinking," the AI calculates the probability of the next likely token. It's effectively a highly advanced autocomplete system.
   - Option A: 90% probability
   - Option B: 5% probability
   - Option C: 5% probability

4. **Streaming (The Visual Effect)**:
What you are seeing right now is the "streaming" effect. In a real backend, the server sends chunks of data as they are computed. In this UI demo, we are simulating that latency using a timer to reveal the text character by character.

This ensures the user doesn't have to wait for the entire paragraph to generate before they can start reading. It improves perceived performance significantly.

I can continue explaining technical concepts, provide code examples, or summarize long documents. The context window allows me to remember previous parts of our conversation to maintain continuity.`;

export function ChatStreaming() {
  const { input } = useAIChat();
  const [messages, setMessages] = useState([
    {
      content:
        "Hello! I am a simulated AI. Ask me anything, and I will generate a long response to demonstrate the streaming capability.",
      role: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState(input ?? "");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");

  const streamResponse = async () => {
    setIsStreaming(true);
    setStreamedContent("");

    const textToStream = LONG_FAKE_RESPONSE;
    let index = 0;

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (index < textToStream.length) {
          setStreamedContent((prev) => prev + textToStream[index]);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 2);
    });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;
    const userMessage = { content: inputValue, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    await streamResponse();
    setMessages((prev) => [
      ...prev,
      { content: LONG_FAKE_RESPONSE, role: "ai" },
    ]);
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
        {!input && (
          <div className="px-14 space-y-2">
            <MovingBorderButton
              onClick={() => setInputValue("What is Lumi UI?")}
            />
            <Button
              className="bg-background cursor-pointer hover:bg-background flex flex-col h-auto justify-start items-start gap-2 w-fit border hover:border-primary/50"
              onClick={() => setInputValue("What can I build with Lumi UI?")}
              variant="unstyled"
            >
              <span className="font-medium">
                What can I build with Lumi UI?
              </span>
            </Button>
            <Button
              className="bg-background cursor-pointer hover:bg-background flex flex-col h-auto justify-start items-start gap-2 w-fit border hover:border-primary/50"
              onClick={() => setInputValue("Is it free to use?")}
              variant="unstyled"
            >
              <span className="font-medium">Is it free to use?</span>
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
