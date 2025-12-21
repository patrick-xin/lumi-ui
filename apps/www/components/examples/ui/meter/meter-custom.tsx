import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/ui/meter";

export default function ExampleMeterCustom() {
  return (
    <Meter value={24} className="grid grid-cols-2 gap-y-2">
      <MeterLabel>Storage Used</MeterLabel>
      <MeterValue className="text-right" />
      <MeterTrack className="col-span-2">
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
