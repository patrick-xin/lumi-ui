import { Meter, MeterIndicator, MeterTrack } from "@/registry/ui/meter";

export default function ExampleMeter() {
  return (
    <Meter value={75}>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
