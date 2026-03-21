import { Switch } from "@/registry/ui/switch";

export function SwitchDisabledDemo() {
  return (
    <Switch
      aria-label="Airplane Mode"
      defaultChecked
      disabled
      id="airplane-mode"
    />
  );
}
