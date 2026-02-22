import { SiFigma } from "@icons-pack/react-simple-icons";
import {
  Activity,
  ArrowUpRight,
  Book,
  Bot,
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
  Figma: SiFigma,
  "Form & Input": Diamond,
  "Get Started": Book,
  Introduction: Book,
  "Layout & Navigation": Diamond,
  Miscellaneous: Diamond,
  "Overlays & Dialogs": Diamond,
  Palette,
  Play,
  Scale,
  Skill: Bot,
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
