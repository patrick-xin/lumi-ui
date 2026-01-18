import {
  Activity,
  ArrowUpRight,
  Book,
  Component,
  Diamond,
  type LucideProps,
  Palette,
  Play,
  Scale,
  SquareMousePointer,
} from "lucide-react";
import type { FileIconType } from "@/types";

export const IconMap: Record<string, React.ComponentType<LucideProps>> = {
  Activity,
  Book,
  Component,
  Components: Diamond,
  Diamond,
  "Display & Media": Diamond,
  default: ArrowUpRight,
  "Feedback & Status": Diamond,
  "Form & Input": Diamond,
  "Get Started": Book,
  Introduction: Book,
  "Layout & Navigation": Diamond,
  Misc: Diamond,
  "Overlays & Dialogs": Diamond,
  Palette,
  Play,
  Scale,
  SquareMousePointer,
  Themes: Palette,
};

export function getFileIconType(filename: string): FileIconType {
  if (filename.endsWith(".tsx") || filename.endsWith(".ts"))
    return "typescript";
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".json")) return "json";
  if (
    filename.endsWith(".png") ||
    filename.endsWith(".jpg") ||
    filename.endsWith(".svg")
  )
    return "image";
  if (filename.endsWith(".md")) return "markdown";
  return "default";
}
