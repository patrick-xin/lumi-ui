"use client";

import { Pause, Play, RotateCcw, Upload } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from "@/registry/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startUpload = React.useCallback(() => {
    if (isComplete) return;

    setIsUploading(true);
    intervalRef.current = setInterval(() => {
      setValue((current) => {
        const increment = Math.random() * 10 + 2;
        const newValue = Math.min(100, current + increment);

        if (newValue >= 100) {
          clearInterval(intervalRef.current!);
          setIsUploading(false);
          setIsComplete(true);
          return 100;
        }

        return Math.round(newValue);
      });
    }, 500);
  }, [isComplete]);

  const pauseUpload = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsUploading(false);
  }, []);

  const resetUpload = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setValue(0);
    setIsUploading(false);
    setIsComplete(false);
  }, []);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getStatusText = () => {
    if (isComplete) return "Upload complete!";
    if (isUploading) return "Uploading...";
    if (value > 0) return "Paused";
    return "Ready to upload";
  };

  return (
    <div className="w-full max-w-md p-6">
      <div className="space-y-4">
        <ProgressRoot value={value} className="grid grid-cols-2 gap-y-2">
          <ProgressLabel className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {getStatusText()}
          </ProgressLabel>
          <ProgressValue className="text-right" />
          <ProgressTrack className="col-span-full">
            <ProgressIndicator />
          </ProgressTrack>
        </ProgressRoot>
        <div className="flex gap-2">
          {!isUploading ? (
            <Button onClick={startUpload} disabled={isComplete}>
              <Play />
              {value > 0 && !isComplete ? "Resume" : "Start Upload"}
            </Button>
          ) : (
            <Button onClick={pauseUpload} variant="secondary">
              <Pause />
              Pause
            </Button>
          )}

          <Button
            onClick={resetUpload}
            variant="outline"
            disabled={value === 0 && !isUploading}
          >
            <RotateCcw />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
