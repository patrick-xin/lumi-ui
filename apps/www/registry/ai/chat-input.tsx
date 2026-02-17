"use client";

import { CornerRightUp, Loader2, Paperclip, XIcon } from "lucide-react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react";
import * as React from "react";
import { cn } from "@/registry/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
function getAttachmentKind(attachment: ChatInputAttachmentData): string {
  if (attachment.kind?.trim()) return attachment.kind;

  const extension = attachment.label.split(".").pop()?.toLowerCase();
  return extension || "file";
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

function useMeasuredHeight(active: boolean) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!active) {
      setHeight(0);
      return;
    }

    const node = contentRef.current;
    if (!node) return;

    const updateHeight = () => {
      setHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [active]);

  return {
    contentRef,
    height,
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
  onSubmitShortcut?: () => void;
  onValueChange: (value: string) => void;
  submitOnEnter?: boolean;
  value: string;
}

function ChatInputTextarea({
  className,
  maxHeight = 220,
  minHeight = 84,
  onChange,
  onKeyDown,
  onSubmitShortcut,
  onValueChange,
  submitOnEnter = true,
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
    onChange?.(event);
    requestAnimationFrame(recalculateHeight);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      submitOnEnter &&
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      onSubmitShortcut?.();
    }

    onKeyDown?.(event);
  };

  return (
    <motion.textarea
      animate={{ height }}
      className={cn(
        "w-full resize-none overflow-y-auto overscroll-contain rounded-none border-none outline-none bg-transparent px-3 py-4 text-sm shadow-none",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none will-change-height",
        className,
      )}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
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
  isSubmitting = false,
  size = "icon-sm",
  type = "button",
  variant = "secondary",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  ariaLabel?: string;
  isSubmitting?: boolean;
}) {
  return (
    <Button
      aria-label={ariaLabel}
      className={cn("rounded-lg", className)}
      isLoading={isSubmitting}
      size={size}
      type={type}
      variant={variant}
      {...props}
    >
      {isSubmitting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <CornerRightUp className="size-4" />
      )}
    </Button>
  );
}

function ChatInputAttachments({
  children,
  className,
  position = "top",
  ...props
}: React.ComponentProps<"div"> & {
  position?: "bottom" | "top";
}) {
  const hasChildren = React.Children.count(children) > 0;
  const { contentRef, height } = useMeasuredHeight(hasChildren);

  return (
    <AnimatePresence initial={false} mode="sync">
      {hasChildren ? (
        <motion.div
          animate={{ height: height || 0 }}
          className="overflow-hidden"
          exit={{ height: 0 }}
          initial={{ height: 0 }}
          key="chat-input-attachments"
          transition={chatInputTransition}
        >
          <div
            className={cn(
              "bg-background px-3 py-4",
              position === "top" ? "border-b" : "border-t",
              className,
            )}
            ref={contentRef}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ChatInputAttachmentItem({
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(
        "group relative size-28 z-10 bg-muted rounded-md",
        className,
      )}
      layout
      transition={chatInputTransition}
      {...props}
    />
  );
}

function ChatInputAttachmentLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "line-clamp-2 text-xs font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ChatInputAttachmentMeta({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-[10px] text-muted-foreground", className)}
      {...props}
    />
  );
}

function ChatInputAttachmentRemove({
  className,
  size = "icon-xs",
  type = "button",
  variant = "secondary",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "absolute -left-2 -top-2 z-20 rounded-full hover:bg-secondary opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
      size={size}
      type={type}
      variant={variant}
      {...props}
    >
      <XIcon className="size-3" />
      <span className="sr-only">Remove attachment</span>
    </Button>
  );
}

interface ChatInputAttachmentData {
  id: string;
  kind?: string;
  label: string;
  meta?: string;
  previewAlt?: string;
  previewImageUrl?: string;
  previewText?: string;
}

interface ChatInputAttachmentPreviewDialogProps {
  attachment: ChatInputAttachmentData | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  renderPreview?: (
    attachment: ChatInputAttachmentData,
  ) => React.ReactNode | undefined;
}

interface ChatInputAttachmentPreviewContentProps {
  attachment: ChatInputAttachmentData;
  renderPreview?: (
    attachment: ChatInputAttachmentData,
  ) => React.ReactNode | undefined;
}

function ChatInputAttachmentPreviewContent({
  attachment,
  renderPreview,
}: ChatInputAttachmentPreviewContentProps) {
  const customPreview = renderPreview?.(attachment);
  const hasImagePreview = Boolean(attachment.previewImageUrl);
  const hasTextPreview = Boolean(attachment.previewText?.trim());

  return (
    <DialogContent className="sm:max-w-2xl" layout="scrollable" showCloseButton>
      <DialogHeader>
        <DialogTitle className="line-clamp-1">{attachment.label}</DialogTitle>
        <DialogDescription className="line-clamp-1">
          {attachment.meta ? (
            <>
              {attachment.meta} {"\u2022"} {getAttachmentKind(attachment)}
            </>
          ) : (
            getAttachmentKind(attachment)
          )}
        </DialogDescription>
      </DialogHeader>

      {customPreview ? (
        customPreview
      ) : (
        <>
          {hasImagePreview ? (
            <div className="overflow-hidden rounded-md border bg-muted/20">
              <img
                alt={attachment.previewAlt || attachment.label}
                className="h-auto max-h-[60dvh] w-full object-contain"
                src={attachment.previewImageUrl}
              />
            </div>
          ) : null}

          {hasTextPreview ? (
            <ScrollArea
              className="max-h-[50dvh] rounded-md bg-muted/20"
              gradientScrollFade
            >
              <pre className="text-xs leading-5 whitespace-pre-wrap wrap-break-word px-3 py-2">
                {attachment.previewText}
              </pre>
            </ScrollArea>
          ) : null}

          {!hasImagePreview && !hasTextPreview ? (
            <div className="rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
              No preview available for this attachment.
            </div>
          ) : null}
        </>
      )}
    </DialogContent>
  );
}

function ChatInputAttachmentPreviewDialog({
  attachment,
  onOpenChange,
  open,
  renderPreview,
}: ChatInputAttachmentPreviewDialogProps) {
  if (!attachment) return null;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <ChatInputAttachmentPreviewContent
        attachment={attachment}
        renderPreview={renderPreview}
      />
    </Dialog>
  );
}

interface ChatInputProps extends Omit<HTMLMotionProps<"div">, "onSubmit"> {
  attachmentPosition?: "bottom" | "top";
  attachments?: ChatInputAttachmentData[];
  disabled?: boolean;
  isSubmitting?: boolean;
  onAttachClick?: () => void;
  onRemoveAttachment?: (id: string) => void;
  onSubmit?: () => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  renderAttachmentPreview?: (
    attachment: ChatInputAttachmentData,
  ) => React.ReactNode | undefined;
  renderAttachment?: (attachment: ChatInputAttachmentData) => React.ReactNode;
  rightActions?: React.ReactNode;
  leftActions?: React.ReactNode;
  value: string;
  enableAttachmentPreview?: boolean;
}

function ChatInput({
  attachmentPosition = "top",
  attachments = [],
  className,
  disabled = false,
  enableAttachmentPreview = true,
  isSubmitting = false,
  onAttachClick,
  onRemoveAttachment,
  onSubmit,
  onValueChange,
  placeholder = "Type a message...",
  renderAttachmentPreview,
  renderAttachment,
  rightActions,
  leftActions,
  value,
  ...props
}: ChatInputProps) {
  const attachmentPreviewDialogHandle = React.useMemo(
    () => createDialogHandle<ChatInputAttachmentData>(),
    [],
  );
  const hasAttachments = attachments.length > 0;
  const hasSubmittableContent = value.trim().length > 0 || hasAttachments;
  const submitDisabled =
    disabled || isSubmitting || !hasSubmittableContent || !onSubmit;

  const handleSubmit = () => {
    if (submitDisabled) return;
    onSubmit?.();
  };

  const attachmentsContent = (
    <ScrollArea className="whitespace-nowrap" gradientScrollFade noScrollBar>
      <div className="flex w-max items-center space-x-4 p-2">
        {attachments.map((attachment) => (
          <React.Fragment key={attachment.id}>
            {renderAttachment ? (
              renderAttachment(attachment)
            ) : (
              <ChatInputAttachmentItem>
                <ChatInputAttachmentRemove
                  onClick={() => {
                    onRemoveAttachment?.(attachment.id);
                  }}
                />

                {enableAttachmentPreview ? (
                  <DialogTrigger
                    handle={attachmentPreviewDialogHandle}
                    payload={attachment}
                    render={
                      <Button
                        className="relative size-full justify-start p-2 text-left cursor-pointer"
                        type="button"
                        variant="outline"
                      >
                        <div className="flex size-full flex-col gap-1">
                          <ChatInputAttachmentLabel>
                            {attachment.label}
                          </ChatInputAttachmentLabel>
                          {attachment.meta ? (
                            <ChatInputAttachmentMeta>
                              {attachment.meta}
                            </ChatInputAttachmentMeta>
                          ) : null}

                          <div className="absolute bottom-2 left-2 rounded border px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
                            {getAttachmentKind(attachment)}
                          </div>
                        </div>
                      </Button>
                    }
                  />
                ) : (
                  <Button
                    className="relative size-full justify-start p-2 text-left"
                    type="button"
                    variant="outline"
                  >
                    <div className="flex size-full flex-col gap-1">
                      <ChatInputAttachmentLabel>
                        {attachment.label}
                      </ChatInputAttachmentLabel>
                      {attachment.meta ? (
                        <ChatInputAttachmentMeta>
                          {attachment.meta}
                        </ChatInputAttachmentMeta>
                      ) : null}

                      <div className="absolute bottom-2 left-2 rounded border px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
                        {getAttachmentKind(attachment)}
                      </div>
                    </div>
                  </Button>
                )}
              </ChatInputAttachmentItem>
            )}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <MotionConfig transition={chatInputTransition}>
      <ChatInputRoot className={className} {...props}>
        {hasAttachments && attachmentPosition === "top" ? (
          <ChatInputAttachments position="top">
            {attachmentsContent}
          </ChatInputAttachments>
        ) : null}

        <ChatInputTextarea
          disabled={disabled}
          onSubmitShortcut={handleSubmit}
          onValueChange={onValueChange}
          placeholder={placeholder}
          value={value}
        />

        <ChatInputToolbar>
          <ChatInputActions>
            <TooltipProvider delay={100}>
              {leftActions}
              <ChatInputAttachButton
                disabled={disabled}
                onClick={onAttachClick}
              />
            </TooltipProvider>
          </ChatInputActions>
          <ChatInputActions>
            {rightActions}
            <ChatInputSubmitButton
              disabled={submitDisabled}
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            />
          </ChatInputActions>
        </ChatInputToolbar>

        {hasAttachments && attachmentPosition === "bottom" ? (
          <ChatInputAttachments position="bottom">
            {attachmentsContent}
          </ChatInputAttachments>
        ) : null}
      </ChatInputRoot>

      <Dialog handle={attachmentPreviewDialogHandle}>
        {({ payload }) => {
          if (!payload) return null;

          return (
            <ChatInputAttachmentPreviewContent
              attachment={payload}
              renderPreview={renderAttachmentPreview}
            />
          );
        }}
      </Dialog>
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
  ChatInputAttachments,
  ChatInputAttachmentItem,
  ChatInputAttachmentLabel,
  ChatInputAttachmentMeta,
  ChatInputAttachmentRemove,
  ChatInputAttachmentPreviewDialog,
  type ChatInputAttachmentData,
  // Composite component
  ChatInput,
};
