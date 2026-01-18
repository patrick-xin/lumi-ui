import { Meter, MeterValue } from "@lumi-ui/ui/meter";

export default function ExampleMeter() {
  return (
    <Meter className="w-56" value={75}>
      <MeterValue className="self-end" />
    </Meter>
  );
}
