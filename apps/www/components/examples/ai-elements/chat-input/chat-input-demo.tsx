"use client";

import {
  CameraIcon,
  FeatherIcon,
  GlobeIcon,
  ImageIcon,
  MousePointer2,
  PlusIcon,
} from "lucide-react";
import * as React from "react";
import {
  ChatInput,
  type ChatInputAttachmentData,
} from "@/registry/ai/chat-input";
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
import { Switch } from "../../../../registry/ui/switch";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../registry/ui/tooltip";

export function ChatInputDemo() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [attachments, setAttachments] = React.useState<
    ChatInputAttachmentData[]
  >([]);

  const attachmentsRef = React.useRef<ChatInputAttachmentData[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    const nextAttachments = await toAttachments(files);
    setAttachments((previous) => [...previous, ...nextAttachments]);
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
    };
  }, []);

  return (
    <div className="w-full max-w-3xl px-4">
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
        value={value}
      />
    </div>
  );
}

const tooltipHandle = createTooltipHandle();
const ChatInputOptions = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(props, state) => (
            <TooltipTrigger
              disabled={state.open}
              handle={tooltipHandle}
              render={
                <Button
                  className="group data-popup-open:bg-accent data-popup-open:hover:bg-accent"
                  size="icon-sm"
                  variant="ghost"
                  {...props}
                >
                  <PlusIcon className="text-muted-foreground group-hover:text-foreground group-data-popup-open:text-foreground" />
                </Button>
              }
            />
          )}
        />
        <DropdownMenuContent
          align="start"
          matchAnchorWidth={false}
          sideOffset={4}
        >
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
          <DropdownMenuItem closeOnClick={false}>
            <GlobeIcon />
            <span className="flex-1">Web search</span>
            <Switch className="ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Tooltip handle={tooltipHandle}>
        <TooltipContent showArrow={false} side="bottom" sideOffset={4}>
          More options
        </TooltipContent>
      </Tooltip>
    </>
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

const TEXT_PREVIEW_EXTENSIONS = new Set([
  "csv",
  "js",
  "json",
  "md",
  "py",
  "sql",
  "text",
  "ts",
  "tsx",
  "txt",
  "yaml",
  "yml",
]);

function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function shouldPreviewAsText(file: File): boolean {
  if (file.type.startsWith("text/")) return true;
  if (file.type === "application/json") return true;

  return TEXT_PREVIEW_EXTENSIONS.has(getFileExtension(file.name));
}

function truncatePreviewText(text: string, maxChars = 120_000): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n... (truncated for preview)`;
}

async function toAttachments(
  files: FileList,
): Promise<ChatInputAttachmentData[]> {
  const fileItems = Array.from(files);

  return Promise.all(
    fileItems.map(async (file) => {
      const previewImageUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;

      let previewText: string | undefined;

      if (shouldPreviewAsText(file)) {
        try {
          const fileText = await file.text();
          previewText = truncatePreviewText(fileText);
        } catch (error) {
          console.error("Failed to read file preview text:", error);
          previewText = "Unable to load preview for this text file.";
        }
      }

      return {
        id: createAttachmentId(),
        kind:
          file.type.split("/").pop() || getFileExtension(file.name) || "file",
        label: file.name,
        meta: formatBytes(file.size),
        previewImageUrl,
        previewText,
      };
    }),
  );
}

function revokeAttachmentPreviews(items: ChatInputAttachmentData[]) {
  items.forEach((item) => {
    if (item.previewImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(item.previewImageUrl);
    }
  });
}
