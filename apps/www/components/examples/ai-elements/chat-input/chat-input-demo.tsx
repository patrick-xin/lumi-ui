"use client";

import {
  CameraIcon,
  FeatherIcon,
  ImageIcon,
  MousePointer2,
  PlusIcon,
} from "lucide-react";
import * as React from "react";
import {
  ChatInput,
  type ChatInputAttachmentData,
} from "@/registry/components/chat-input";
import { T3ModelSelector } from "@/registry/components/t3-model-selector";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function ChatInputDemo() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [attachments, setAttachments] = React.useState<
    ChatInputAttachmentData[]
  >([]);

  const attachmentsRef = React.useRef<ChatInputAttachmentData[]>([]);
  const customAttachmentsRef = React.useRef<ChatInputAttachmentData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setAttachments((previous) => [...previous, ...toAttachments(files)]);
    event.target.value = "";
  };

  const handleCompositeSubmit = async () => {
    if (!value.trim() && attachments.length === 0) return;

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    setValue("");
    revokeAttachmentPreviews(attachments);
    setAttachments([]);
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  React.useEffect(() => {
    return () => {
      revokeAttachmentPreviews(attachmentsRef.current);
      revokeAttachmentPreviews(customAttachmentsRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-10 mx-auto w-full max-w-3xl px-4">
      <input
        className="sr-only"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />

      <ChatInput
        attachments={attachments}
        isSubmitting={isSubmitting}
        leftActions={<ChatInputOptions />}
        onAttachClick={() => {
          fileInputRef.current?.click();
        }}
        onRemoveAttachment={(id) => {
          setAttachments((previous) =>
            previous.filter((file) => {
              if (file.id === id) {
                revokeAttachmentPreviews([file]);
                return false;
              }

              return true;
            }),
          );
        }}
        onSubmit={handleCompositeSubmit}
        onValueChange={setValue}
        placeholder="Type a message and press Enter..."
        rightActions={<T3ModelSelector />}
        value={value}
      />
    </div>
  );
}

const ChatInputOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="data-popup-open:bg-accent"
            size="icon-sm"
            variant="ghost"
          >
            <PlusIcon />
          </Button>
        }
      />
      <DropdownMenuContent matchAnchorWidth={false}>
        <DropdownMenuItem>
          <ImageIcon />
          Create image
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MousePointer2 />
          Agent mode
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CameraIcon />
          Take a screen shot
        </DropdownMenuItem>
        <DropdownMenuSubMenu>
          <DropdownMenuSubMenuTriggerGroup>
            <FeatherIcon />
            Change tone
          </DropdownMenuSubMenuTriggerGroup>
          <DropdownMenuSubMenuContent className="w-48">
            <DropdownMenuItem>
              <FeatherIcon />
              Casual
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FeatherIcon />
              Professional
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FeatherIcon />
              Humorous
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon />
              Custom & edit tone
            </DropdownMenuItem>
          </DropdownMenuSubMenuContent>
        </DropdownMenuSubMenu>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
