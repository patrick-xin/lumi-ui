"use client";

import { PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

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
          <Button variant="outline" size="icon-sm" title="Switch theme">
            <PaletteIcon className="size-4 transition-transform" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <div className="grid grid-cols-3 gap-1">
          <DropdownMenuItem
            onClick={() => handleThemeSetChange("shadcn")}
            disabled={themeSet === "shadcn"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.145_0_0)] dark:bg-[oklch(0.922_0_0)] rounded-full" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeSetChange("celeste")}
            disabled={themeSet === "celeste"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.72_0.14_265)] rounded-full" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeSetChange("orchid")}
            disabled={themeSet === "orchid"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.71_0.08_302)] rounded-full" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
