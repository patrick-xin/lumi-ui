"use client";

import type * as React from "react";
import { useInstallationConfigStore } from "@/hooks/use-config";
import { Tabs } from "@/registry/ui/tabs";

export function CodeTabs({
  children,
  defaultValue = "cli",
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const { config, setInstallationConfig } = useInstallationConfigStore();

  const installationType = config.installationType || "cli";

  return (
    <Tabs
      variant="ghost"
      {...props}
      defaultValue={defaultValue}
      onValueChange={(value) =>
        setInstallationConfig({
          ...config,
          installationType: value as "cli" | "manual",
        })
      }
      value={installationType}
    >
      {children}
    </Tabs>
  );
}
