import {
  MeterIndicator,
  MeterLabel,
  MeterRoot,
  MeterTrack,
  MeterValue,
} from "@/registry/ui/meter";

export default function ExampleMeter() {
  return (
    <MeterRoot value={24} className="grid grid-cols-2 gap-y-2">
      <MeterLabel>Storage Used</MeterLabel>
      <MeterValue className="text-right" />

      <MeterTrack className="col-span-2">
        <MeterIndicator />
      </MeterTrack>
    </MeterRoot>
  );
}
