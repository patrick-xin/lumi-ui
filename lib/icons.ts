import {
  ArrowUpRight,
  Book,
  Component,
  Diamond,
  type LucideProps,
  Play,
} from "lucide-react";

export const IconMap: Record<string, React.ComponentType<LucideProps>> = {
  Book,
  Play,
  Component,
  Diamond,
  "Get Started": ArrowUpRight,
  Components: Diamond,
  default: ArrowUpRight,
};
