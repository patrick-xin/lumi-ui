"use client";

import * as React from "react";
import {
  ChatInputActions,
  ChatInputAttachButton,
  type ChatInputAttachmentData,
  ChatInputAttachmentItem,
  ChatInputAttachmentLabel,
  ChatInputAttachmentMeta,
  ChatInputAttachmentRemove,
  ChatInputAttachments,
  ChatInputRoot,
  ChatInputSubmitButton,
  ChatInputTextarea,
} from "@/registry/ai/chat-input";
import { Button } from "@/registry/ui/button";
import { T3ModelSelector } from "../../../../registry/components/t3-model-selector";
import { toast } from "../../../../registry/ui/toast";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function createAttachmentId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `attachment_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function toAttachments(files: FileList): ChatInputAttachmentData[] {
  return Array.from(files).map((file) => ({
    id: createAttachmentId(),
    kind: file.type.split("/").pop() || "file",
    label: file.name,
    meta: formatBytes(file.size),
    previewImageUrl: file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined,
  }));
}

function revokeAttachmentPreviews(items: ChatInputAttachmentData[]) {
  items.forEach((item) => {
    if (item.previewImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(item.previewImageUrl);
    }
  });
}

export default function ChatInputCustom() {
  const customFileInputRef = React.useRef<HTMLInputElement>(null);

  const [customValue, setCustomValue] = React.useState("");
  const [customSubmitting, setCustomSubmitting] = React.useState(false);
  const [customAttachments, setCustomAttachments] = React.useState<
    ChatInputAttachmentData[]
  >([]);
  const customAttachmentsRef = React.useRef<ChatInputAttachmentData[]>([]);

  const handleCustomFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    setCustomAttachments((previous) => [...previous, ...toAttachments(files)]);
    event.target.value = "";
  };

  const handleCustomSubmit = async () => {
    if (!customValue.trim() && customAttachments.length === 0) return;

    setCustomSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
    toast.success({
      description: `${customValue} ${customAttachments.length > 0 ? `with ${customAttachments.length} attachments` : ""}`,
      title: "Message sent",
    });
    setCustomValue("");
    revokeAttachmentPreviews(customAttachments);
    setCustomAttachments([]);
    setCustomSubmitting(false);
  };

  const customHasSubmittableContent =
    customValue.trim().length > 0 || customAttachments.length > 0;
  const customSubmitDisabled = customSubmitting || !customHasSubmittableContent;

  React.useEffect(() => {
    customAttachmentsRef.current = customAttachments;
  }, [customAttachments]);

  React.useEffect(() => {
    return () => {
      revokeAttachmentPreviews(customAttachmentsRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl px-4">
      <input
        className="sr-only"
        multiple
        onChange={handleCustomFileChange}
        ref={customFileInputRef}
        type="file"
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (customSubmitDisabled) return;
          void handleCustomSubmit();
        }}
      >
        <ChatInputRoot className="rounded-2xl border-primary/20 bg-background/80 shadow-lg shadow-primary/5">
          <ChatInputTextarea
            className="px-4 py-4"
            onSubmitShortcut={() => {
              if (customSubmitDisabled) return;
              void handleCustomSubmit();
            }}
            onValueChange={setCustomValue}
            placeholder="Draft a launch brief with 3 key risks..."
            required
            value={customValue}
          />

          <div className="flex items-center justify-between border-t border-primary/10 px-3 py-3">
            <ChatInputActions>
              <T3ModelSelector />
              <ChatInputAttachButton
                onClick={() => {
                  customFileInputRef.current?.click();
                }}
                size="sm"
              />
            </ChatInputActions>

            <ChatInputActions>
              <Button
                disabled={customSubmitting || !customHasSubmittableContent}
                onClick={() => {
                  setCustomValue("");
                  revokeAttachmentPreviews(customAttachments);
                  setCustomAttachments([]);
                }}
                size="sm"
                variant="ghost"
              >
                Clear
              </Button>
              <ChatInputSubmitButton
                disabled={customSubmitDisabled}
                isSubmitting={customSubmitting}
                type="submit"
                variant="default"
              />
            </ChatInputActions>
          </div>

          {customAttachments.length > 0 ? (
            <ChatInputAttachments
              className="bg-transparent px-3 pb-3 pt-3"
              position="bottom"
            >
              <div className="flex flex-wrap gap-2">
                {customAttachments.map((attachment) => (
                  <ChatInputAttachmentItem
                    className="h-auto w-auto rounded-lg border border-primary/20 py-2 pl-3 pr-1"
                    key={attachment.id}
                  >
                    <div className="flex items-center gap-2">
                      <ChatInputAttachmentLabel className="line-clamp-1">
                        {attachment.label}
                      </ChatInputAttachmentLabel>
                      {attachment.meta ? (
                        <ChatInputAttachmentMeta>
                          {attachment.meta}
                        </ChatInputAttachmentMeta>
                      ) : null}
                      <ChatInputAttachmentRemove
                        className="static opacity-100"
                        onClick={() => {
                          setCustomAttachments((previous) =>
                            previous.filter((file) => {
                              if (file.id === attachment.id) {
                                revokeAttachmentPreviews([file]);
                                return false;
                              }

                              return true;
                            }),
                          );
                        }}
                        size="icon-xs"
                        variant="destructive"
                      />
                    </div>
                  </ChatInputAttachmentItem>
                ))}
              </div>
            </ChatInputAttachments>
          ) : null}
        </ChatInputRoot>
      </form>
    </div>
  );
}
