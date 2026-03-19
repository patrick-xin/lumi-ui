"use client";

import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/registry/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/ui/chart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { toast } from "@/registry/ui/toast";

const data = [
  { calories: 150, time: "8am" },
  { calories: 240, time: "10am" },
  { calories: 300, time: "12pm" },
  { calories: 290, time: "2pm" },
  { calories: 380, time: "4pm" },
  { calories: 420, time: "6pm" },
  { calories: 250, time: "8pm" },
];

const chartConfig = {
  calories: { color: "var(--chart-1)", label: "Calories" },
} satisfies ChartConfig;

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open Drawer</Button>} />
      <DrawerContent>
        <DrawerDragHandle />
        <DrawerSelectable className="max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Daily Calorie Goal</DrawerTitle>
            <DrawerDescription>
              Adjust your target and track today's intake.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center justify-center space-x-2">
            <Button
              className="h-8 w-8 shrink-0 rounded-full"
              disabled={goal <= 200}
              onClick={() => onClick(-10)}
              size="icon"
              variant="outline"
            >
              <Minus />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">{goal}</div>
              <div className="text-xs mt-2 text-muted-foreground uppercase">
                Calories/day
              </div>
            </div>
            <Button
              className="h-8 w-8 shrink-0 rounded-full"
              disabled={goal >= 400}
              onClick={() => onClick(10)}
              size="icon"
              variant="outline"
            >
              <Plus />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <ChartContainer className="h-[160px] w-full" config={chartConfig}>
            <AreaChart
              data={data}
              margin={{ bottom: 0, left: 6, right: 6, top: 6 }}
            >
              <defs>
                <linearGradient id="colorCalories" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-calories)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-calories)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.2}
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey="time"
                padding={{ left: 10, right: 10 }}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={false}
              />
              <Area
                dataKey="calories"
                fill="url(#colorCalories)"
                fillOpacity={1}
                stroke="var(--color-calories)"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ChartContainer>
          <DrawerFooter>
            <DrawerClose
              render={
                <Button
                  onClick={() =>
                    toast.success({
                      description: "Your daily calorie goal has been updated.",
                      title: "Goal updated successfully",
                    })
                  }
                >
                  Submit
                </Button>
              }
            />
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
          </DrawerFooter>
        </DrawerSelectable>
      </DrawerContent>
    </Drawer>
  );
}
