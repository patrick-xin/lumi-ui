"use client";

import { useMounted } from "@lumi-ui/ui/hooks/use-mounted";
import { PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

const THEME_OPTIONS = [
  {
    colorClass: "bg-[oklch(0.145_0_0)] dark:bg-[oklch(0.922_0_0)]",
    id: "shadcn",
  },
  { colorClass: "bg-[oklch(0.72_0.14_265)]", id: "celeste" },
  { colorClass: "bg-[oklch(0.71_0.08_302)]", id: "orchid" },
  { colorClass: "bg-[oklch(0.55_0.15_180)]", id: "lagoon" },
  { colorClass: "bg-[oklch(0.66_0.197_36)]", id: "dune" },
  { colorClass: "bg-[oklch(0.72_0.18_128)]", id: "canopy" },
];

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [themeSet, setThemeSet] = useState("celeste");
  const [mode, setMode] = useState("dark");
  const mounted = useMounted();

  useEffect(() => {
    if (resolvedTheme) {
      const [currentSet, currentMode] = resolvedTheme.split("-");
      if (currentSet && currentMode) {
        setThemeSet(currentSet);
        setMode(currentMode);
      }
    }
  }, [resolvedTheme]);

  const handleThemeSetChange = (newSet: string) => {
    setTheme(`${newSet}-${mode}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon-sm" title="Switch theme" variant="glow">
            <PaletteIcon className="size-4 transition-transform" />
          </Button>
        }
      />
      <DropdownMenuContent
        className="shadow-md shadow-primary/10 outline dark:-outline-offset-1 outline-primary/10"
        matchAnchorWidth={false}
      >
        <div className="grid grid-cols-3 gap-y-1">
          {THEME_OPTIONS.map(({ id, colorClass }) => (
            <DropdownMenuItem
              className="extend-touch-target relative py-2"
              disabled={themeSet === id}
              key={id}
              onClick={() => handleThemeSetChange(id)}
            >
              <div
                className={cn(
                  "size-2 rounded-full",
                  colorClass,
                  themeSet === id &&
                    "before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm before:bg-accent",
                )}
              />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
