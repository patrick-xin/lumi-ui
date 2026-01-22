import { ChartClusterCpu } from "@lumi-ui/ui/charts/chart-cluster-cpu";
import { ChartEVMarket } from "@lumi-ui/ui/charts/chart-ev-market";
import { ChartMixedAxes } from "@lumi-ui/ui/charts/chart-mixed-axes";
import { ChartRadarAI } from "@lumi-ui/ui/charts/chart-radar-ai";
import { ChartRadialEnergy } from "@lumi-ui/ui/charts/chart-radial-energy";
import { ChartScatterQuadrant } from "@lumi-ui/ui/charts/chart-scatter-quadrant";

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
