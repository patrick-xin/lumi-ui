"use client";

import { CornerRightUp, Loader2, Paperclip } from "lucide-react";
import {
  type HTMLMotionProps,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react";
import * as React from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

const chatInputTransition: Transition = {
  bounce: 0.1,
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
  type: "spring",
};

const textareaTransition: Transition = {
  duration: 0.18,
  ease: "easeOut",
};

function composeRefs<T>(
  ...refs: Array<React.ForwardedRef<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
        continue;
      }
      ref.current = node;
    }
  };
}

function useChatInputAutoResize({
  maxHeight = 220,
  minHeight = 84,
}: {
  maxHeight?: number;
  minHeight?: number;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = React.useState(minHeight);

  const recalculateHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const isCaretAtEnd =
      textarea.selectionStart === textarea.value.length &&
      textarea.selectionEnd === textarea.value.length;

    textarea.style.height = `${minHeight}px`;

    const nextHeight = Math.max(
      minHeight,
      Math.min(textarea.scrollHeight, maxHeight),
    );

    textarea.style.height = `${nextHeight}px`;
    if (isCaretAtEnd) {
      textarea.scrollTop = textarea.scrollHeight;
    }
    setHeight((prev) => (prev === nextHeight ? prev : nextHeight));
  }, [maxHeight, minHeight]);

  return {
    height,
    recalculateHeight,
    textareaRef,
  };
}

function ChatInputRoot({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(
        "w-full overflow-hidden rounded-md border bg-background",
        className,
      )}
      layout
      transition={chatInputTransition}
      {...props}
    />
  );
}

interface ChatInputTextareaProps
  extends Omit<HTMLMotionProps<"textarea">, "value"> {
  maxHeight?: number;
  minHeight?: number;
  onValueChange: (value: string) => void;
  value: string;
}

function ChatInputTextarea({
  className,
  maxHeight = 220,
  minHeight = 84,
  onValueChange,
  value,
  ref,
  ...props
}: ChatInputTextareaProps) {
  const { height, recalculateHeight, textareaRef } = useChatInputAutoResize({
    maxHeight,
    minHeight,
  });

  const mergedRef = composeRefs(textareaRef, ref);

  React.useLayoutEffect(() => {
    const isEmpty = value.trim().length === 0;

    if (isEmpty) {
      setTimeout(() => {
        recalculateHeight();
      }, 0);
      return;
    }

    recalculateHeight();
  }, [value, recalculateHeight]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
    requestAnimationFrame(recalculateHeight);
  };

  return (
    <motion.textarea
      animate={{ height }}
      className={cn(
        "w-full resize-none overflow-y-auto overscroll-contain rounded-none border-none outline-none bg-transparent px-3 py-4 text-sm shadow-none focus-visible:outline-none will-change-height placeholder:text-muted-foreground",
        className,
      )}
      onChange={handleChange}
      ref={mergedRef}
      style={{ height }}
      transition={textareaTransition}
      value={value}
      {...props}
    />
  );
}

function ChatInputToolbar({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-between gap-2 bg-background px-2 py-2",
        className,
      )}
      layout
      transition={chatInputTransition}
      {...props}
    />
  );
}

function ChatInputActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="chat-input-actions"
      {...props}
    />
  );
}

function ChatInputAttachButton({
  children,
  className,
  size = "icon-sm",
  type = "button",
  variant = "ghost",
  tooltipContent = "Attach files",
  ...props
}: React.ComponentProps<typeof Button> & {
  tooltipContent?: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn("group", className)}
            size={size}
            type={type}
            variant={variant}
            {...props}
          >
            {children ?? (
              <Paperclip className="size-4 text-muted-foreground group-hover:text-foreground" />
            )}
            <span className="sr-only">Attach files</span>
          </Button>
        }
      />
      <TooltipContent showArrow={false} side="bottom" sideOffset={4}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}

function ChatInputSubmitButton({
  ariaLabel = "Send message",
  className,
  disabled = true,
  isLoading = false,
  size = "icon-sm",
  variant = "secondary",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  ariaLabel?: string;
  isLoading?: boolean;
}) {
  return (
    <Button
      aria-label={ariaLabel}
      className={cn("rounded-lg", className)}
      disabled={disabled}
      size={size}
      variant={variant}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <CornerRightUp className="size-4" />
      )}
    </Button>
  );
}

interface ChatInputProps extends Omit<HTMLMotionProps<"div">, "onSubmit"> {
  leftActions?: React.ReactNode;
  children?: React.ReactNode;
}

function ChatInput({
  className,
  leftActions,
  children,
  ...props
}: ChatInputProps) {
  return (
    <MotionConfig transition={chatInputTransition}>
      <ChatInputRoot className={className} {...props}>
        {children}
      </ChatInputRoot>
    </MotionConfig>
  );
}

export {
  ChatInputRoot,
  ChatInputTextarea,
  ChatInputToolbar,
  ChatInputActions,
  ChatInputSubmitButton,
  ChatInputAttachButton,
  // Composite component
  ChatInput,
};
