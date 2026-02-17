"use client";

import * as React from "react";
import {
  ChatInputActions,
  ChatInputRoot,
  ChatInputSubmitButton,
  ChatInputTextarea,
  ChatInputToolbar,
} from "@/registry/ai/chat-input";

export function ChatInputBasicDemo() {
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submitDisabled = isSubmitting || value.trim().length === 0;

  const handleSubmit = async () => {
    if (submitDisabled) return;

    setIsSubmitting(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setValue("");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-3xl px-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <ChatInputRoot>
          <ChatInputTextarea
            onSubmitShortcut={() => {
              void handleSubmit();
            }}
            onValueChange={setValue}
            placeholder="Type a message and press Enter..."
            value={value}
          />
          <ChatInputToolbar>
            <ChatInputActions />
            <ChatInputActions>
              <ChatInputSubmitButton
                disabled={submitDisabled}
                isSubmitting={isSubmitting}
                type="submit"
              />
            </ChatInputActions>
          </ChatInputToolbar>
        </ChatInputRoot>
      </form>
    </div>
  );
}
