import { File, FileJson, FileText, ImageIcon } from "lucide-react";
import { getFileIconType } from "@/lib/icons";

export function FileIcon({ filename }: { filename: string }) {
  const type = getFileIconType(filename);
  switch (type) {
    case "typescript":
      return <FileText className="size-4 text-blue-400" />;
    case "css":
      return <FileText className="size-4 text-sky-300" />;
    case "json":
      return <FileJson className="size-4 text-yellow-400" />;
    case "image":
      return <ImageIcon className="size-4 text-purple-400" />;
    case "markdown":
      return <FileText className="size-4 text-gray-400" />;
    default:
      return <File className="size-4 text-muted-foreground" />;
  }
}
