import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type installationConfig = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
};

interface installationConfigStore {
  config: installationConfig;
  setInstallationConfig: (
    installationConfig: Partial<installationConfig>,
  ) => void;
  setPackageManager: (
    packageManager: installationConfig["packageManager"],
  ) => void;
  setInstallationType: (
    installationType: installationConfig["installationType"],
  ) => void;
}

export const useInstallationConfigStore = create<installationConfigStore>()(
  persist(
    (set) => ({
      config: {
        installationType: "cli",
        packageManager: "pnpm",
      },
      setInstallationConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
      setInstallationType: (installationType) =>
        set((state) => ({
          config: { ...state.config, installationType },
        })),
      setPackageManager: (packageManager) =>
        set((state) => ({
          config: { ...state.config, packageManager },
        })),
    }),
    {
      name: "config",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
