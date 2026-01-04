"use client";

import type * as React from "react";
import { Tabs } from "@/components/docs/doc-code-tabs";
import { useInstallationConfigStore } from "@/hooks/use-config";

export function CodeTabs({
  children,
  defaultValue = "cli",
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const { config, setInstallationConfig } = useInstallationConfigStore();

  const installationType = config.installationType || "cli";

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={(value) =>
        setInstallationConfig({
          ...config,
          installationType: value as "cli" | "manual",
        })
      }
      value={installationType}
      variant="ghost"
      {...props}
    >
      {children}
    </Tabs>
  );
}
