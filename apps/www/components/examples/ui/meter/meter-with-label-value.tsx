import {
  MeterIndicator,
  MeterLabel,
  MeterRoot,
  MeterTrack,
  MeterValue,
} from "@/registry/ui/meter";

export function MeterWithLabelAndValueDemo() {
  return (
    <MeterRoot
      aria-label="Storage Used"
      className="grid grid-cols-2 gap-y-2 w-72"
      value={24}
    >
      <MeterLabel>Storage Used</MeterLabel>
      <MeterValue className="text-right" />
      <MeterTrack className="col-span-2 relative h-2 w-full overflow-hidden rounded-full bg-indigo-500/50">
        <MeterIndicator className="h-full flex-1 bg-indigo-500 transition-all duration-500" />
      </MeterTrack>
    </MeterRoot>
  );
}
