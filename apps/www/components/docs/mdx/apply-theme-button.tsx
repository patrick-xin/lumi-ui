"use client";

import { PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/registry/ui/button";
import { ColorPallete } from "./color-pallete";

export const ApplyThemeButton = ({
  themeSet,
  primary,
  secondary,
  accent,
  borderRadius,
}: {
  themeSet: string;
  primary: string;
  secondary: string;
  accent: string;
  borderRadius?: string;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    if (resolvedTheme) {
      const [currentSet, currentMode] = resolvedTheme.split("-");
      if (currentSet && currentMode) {
        setMode(currentMode);
      }
    }
  }, [resolvedTheme]);
  return (
    <div className="flex items-center justify-between">
      <ColorPallete
        accent={accent}
        borderRadius={borderRadius}
        primary={primary}
        secondary={secondary}
      />
      <Button
        disabled={resolvedTheme === `${themeSet}-${mode}`}
        onClick={() => setTheme(`${themeSet}-${mode}`)}
        size="sm"
        style={{ backgroundColor: primary, color: "var(--foreground)" }}
      >
        <PaletteIcon />
        Try it out
      </Button>
    </div>
  );
};
