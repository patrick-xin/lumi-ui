"use client";

import type * as React from "react";
import { CopyButton } from "@/components/docs/copy-button";
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/components/docs/doc-code-tabs";
import { useInstallationConfigStore } from "@/hooks/use-config";

interface InstallationCommandClientProps {
  npm: React.ReactNode;
  yarn: React.ReactNode;
  pnpm: React.ReactNode;
  bun: React.ReactNode;
  npmCode?: string;
  pnpmCode?: string;
  yarnCode?: string;
  bunCode?: string;
}

export function InstallationCommandClient({
  npm,
  yarn,
  pnpm,
  bun,
  npmCode,
  pnpmCode,
  yarnCode,
  bunCode,
}: InstallationCommandClientProps) {
  const { config, setInstallationConfig } = useInstallationConfigStore();
  const packageManager = config.packageManager || "pnpm";

  const tabs = {
    bun: { code: bunCode, highlighted: bun },
    npm: { code: npmCode, highlighted: npm },
    pnpm: { code: pnpmCode, highlighted: pnpm },
    yarn: { code: yarnCode, highlighted: yarn },
  };

  return (
    <Tabs
      className="gap-0"
      onValueChange={(value) =>
        setInstallationConfig({
          ...config,
          packageManager: value,
        })
      }
      value={packageManager}
      variant="underline"
    >
      <TabsList className="w-full justify-start pl-2 h-12">
        <div className="w-fit">
          {Object.entries(tabs).map(([key, data]) => {
            if (!data.highlighted) return null;
            return (
              <TabsTab key={key} value={key}>
                {key}
              </TabsTab>
            );
          })}
        </div>
      </TabsList>

      {Object.entries(tabs).map(([manager, data]) => {
        if (!data.highlighted) return null;

        return (
          <TabsPanel key={manager} value={manager}>
            {data.highlighted}
            {data.code && (
              <CopyButton className="absolute top-2 right-2" code={data.code} />
            )}
          </TabsPanel>
        );
      })}
    </Tabs>
  );
}
