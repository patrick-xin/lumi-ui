"use client";

import * as React from "react";
import { useInstallationConfigStore } from "@/hooks/use-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";
import { CopyButton } from "./copy-button";

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

  const tabs = React.useMemo(() => {
    return {
      pnpm: { highlighted: pnpm, code: pnpmCode },
      npm: { highlighted: npm, code: npmCode },
      yarn: { highlighted: yarn, code: yarnCode },
      bun: { highlighted: bun, code: bunCode },
    };
  }, [npm, pnpm, yarn, bun, npmCode, pnpmCode, yarnCode, bunCode]);

  return (
    <Tabs
      variant={"underline"}
      value={packageManager}
      onValueChange={(value) =>
        setInstallationConfig({
          ...config,
          packageManager: value,
        })
      }
      className="gap-0"
    >
      <TabsList className="w-full justify-start pl-2 h-12">
        <div className="w-fit">
          {Object.entries(tabs).map(([key, data]) => {
            if (!data.highlighted) return null;
            return (
              <TabsTrigger key={key} value={key}>
                {key}
              </TabsTrigger>
            );
          })}
        </div>
      </TabsList>

      {Object.entries(tabs).map(([manager, data]) => {
        if (!data.highlighted) return null;

        return (
          <TabsContent key={manager} value={manager}>
            {data.highlighted}
            {data.code && (
              <CopyButton className="absolute right-2 top-2" code={data.code} />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
