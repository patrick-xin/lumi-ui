"use client";

import { VideoIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/registry/ui/card";
import { Fieldset } from "@/registry/ui/fieldset";
import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@/registry/ui/slider";
import { toast } from "@/registry/ui/toast";

const TIMELINE_DURATION_SECONDS = 300;
const CLIP_LENGTH_LIMIT_SECONDS = 45;
const CUT_MARKERS = [22, 51, 88, 131, 176, 214, 263] as const;

function formatTimestamp(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function VideoClipTrimmer() {
  const [selection, setSelection] = React.useState<[number, number]>([48, 92]);

  const clipDuration = selection[1] - selection[0];
  const clipIsTooLong = clipDuration > CLIP_LENGTH_LIMIT_SECONDS;

  return (
    <Card className="w-full max-w-xl min-w-xl">
      <CardHeader className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Clip Selection
          </p>
          <p className="text-xl font-semibold tracking-tight">Interview Reel</p>
        </div>
        <Badge variant={clipIsTooLong ? "secondary" : "default"}>
          {clipDuration}s selected
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1 rounded-md bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Start</p>
            <p className="font-mono text-lg font-semibold">
              {formatTimestamp(selection[0])}
            </p>
          </div>
          <div className="space-y-1 rounded-md bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">End</p>
            <p className="font-mono text-lg font-semibold">
              {formatTimestamp(selection[1])}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Fieldset
            render={
              <SliderRoot
                aria-label="video-clip-trimmer"
                max={TIMELINE_DURATION_SECONDS}
                min={0}
                onValueChange={(nextSelection) => {
                  if (
                    !Array.isArray(nextSelection) ||
                    nextSelection.length < 2
                  ) {
                    return;
                  }
                  setSelection([nextSelection[0], nextSelection[1]]);
                }}
                step={1}
                thumbAlignment="edge"
                value={selection}
              />
            }
          >
            <SliderControl className="data-dragging:cursor-grab">
              <SliderTrack className="relative h-3 rounded-full bg-muted">
                <SliderIndicator className="h-full rounded-full bg-primary/80" />
                {CUT_MARKERS.map((marker) => {
                  const position = (marker / TIMELINE_DURATION_SECONDS) * 100;
                  const insideSelection =
                    marker >= selection[0] && marker <= selection[1];

                  return (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1/2 h-4 w-px -translate-y-1/2 rounded transition-colors",
                        insideSelection
                          ? "bg-primary"
                          : "bg-muted-foreground/40",
                      )}
                      key={marker}
                      style={{ left: `${position}%` }}
                    />
                  );
                })}
                <SliderThumb
                  className="ring-border relative size-4 rounded-full bg-primary dark:bg-white transition-[color,box-shadow] hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden data-dragging:focus-within:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 cursor-grab data-dragging:focus-within:bg-primary"
                  index={0}
                />
                <SliderThumb
                  className="ring-border relative size-4 rounded-full bg-primary dark:bg-white transition-[color,box-shadow] hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden data-dragging:focus-within:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 cursor-grab data-dragging:focus-within:bg-primary"
                  index={1}
                />
              </SliderTrack>
            </SliderControl>
          </Fieldset>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>0:00</span>
            <span>{formatTimestamp(TIMELINE_DURATION_SECONDS)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className={cn("text-sm text-muted-foreground")}>
          {clipIsTooLong
            ? `Keep clips under ${CLIP_LENGTH_LIMIT_SECONDS}s for Shorts and Reels export.`
            : "Ready to export for Shorts and Reels."}
        </p>
        <Button
          disabled={clipIsTooLong}
          onClick={() => {
            toast.promise(
              new Promise<string>((resolve, reject) => {
                const shouldSucceed = Math.random() > 0.5;
                setTimeout(() => {
                  if (shouldSucceed) {
                    resolve("Video clip has been exported.");
                  } else {
                    reject(new Error("Failed to export video clip."));
                  }
                }, 2000);
              }),

              {
                error: (err: Error) => {
                  return {
                    actionProps: {
                      children: "Retry",
                      onClick: () => {
                        toast.promise(
                          new Promise<string>((resolve) => {
                            setTimeout(() => {
                              resolve("Video clip has been exported.");
                            }, 2000);
                          }),
                          {
                            error: (err: Error) => {
                              return {
                                title: `Error: ${err.message}`,
                              };
                            },
                            loading: { title: `Exporting video clip...` },
                            success: (data: string) => {
                              return {
                                closable: true,
                                description: data,
                                title: "Success",
                              };
                            },
                          },
                        );
                      },
                    },
                    title: `Error: ${err.message}`,
                  };
                },
                loading: { title: `Exporting video clip...` },
                success: (data: string) => {
                  return {
                    closable: true,
                    description: data,
                    title: "Success",
                  };
                },
              },
            );
          }}
          size="sm"
        >
          <VideoIcon /> Export
        </Button>
      </CardFooter>
    </Card>
  );
}
