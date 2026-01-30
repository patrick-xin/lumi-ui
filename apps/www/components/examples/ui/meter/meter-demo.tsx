import { Meter, MeterValue } from "@/registry/ui/meter";

export default function ExampleMeter() {
  return (
    <Meter className="w-56" value={75}>
      <MeterValue className="self-end" />
    </Meter>
  );
}
