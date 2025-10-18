"use client";

import { ChevronDownIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

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
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 text-xs data-[popup-open]:[&_svg]:rotate-180 extend-touch-target w-24",
            )}
          >
            Theme
            <ChevronDownIcon className="size-3.5 transition-transform" />
          </Button>
        }
      />

      <MenuPopup matchAnchorWidth>
        <div className="grid grid-cols-1 gap-1">
          <MenuItem
            onClick={() => handleThemeSetChange("shadcn")}
            disabled={themeSet === "shadcn"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.145_0_0)] dark:bg-[oklch(0.922_0_0)] rounded-full" />
            Shadcn
          </MenuItem>
          <MenuItem
            onClick={() => handleThemeSetChange("celeste")}
            disabled={themeSet === "celeste"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.47_0.13_265)] rounded-full" />
            Celeste
          </MenuItem>
          <MenuItem
            onClick={() => handleThemeSetChange("amethyst")}
            disabled={themeSet === "amethyst"}
            className="w-full justify-start text-xs h-6 extend-touch-target"
          >
            <div className="size-2 bg-[oklch(0.6104_0.0767_299.7335)] rounded-full" />
            Amethyst
          </MenuItem>
        </div>
      </MenuPopup>
    </Menu>
  );
}
