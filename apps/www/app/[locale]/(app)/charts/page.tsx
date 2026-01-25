import { ChartClusterCpu } from "@/components/examples/ui/chart/chart-cluster-cpu";
import { ChartMixedAxes } from "@/components/examples/ui/chart/chart-demo";
import { ChartEVMarket } from "@/components/examples/ui/chart/chart-ev-market";
import { ChartRadarAI } from "@/components/examples/ui/chart/chart-radar-ai";
import { ChartRadialEnergy } from "@/components/examples/ui/chart/chart-radial-energy";
import { ChartScatterQuadrant } from "@/components/examples/ui/chart/chart-scatter-quadrant";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6 md:flex-nowrap justify-between">
        <ChartMixedAxes />
        <ChartScatterQuadrant />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        <ChartEVMarket />
        <ChartRadarAI />
        <ChartRadialEnergy />
      </div>
      <ChartClusterCpu />
    </div>
  );
}
