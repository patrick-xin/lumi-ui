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
        primary={primary}
        secondary={secondary}
        accent={accent}
        borderRadius={borderRadius}
      />
      <Button
        disabled={resolvedTheme === `${themeSet}-${mode}`}
        style={{ backgroundColor: primary, color: "var(--foreground)" }}
        size="sm"
        onClick={() => setTheme(`${themeSet}-${mode}`)}
      >
        <PaletteIcon />
        Try it out
      </Button>
    </div>
  );
};
