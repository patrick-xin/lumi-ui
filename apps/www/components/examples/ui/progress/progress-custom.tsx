"use client";

import { Play, RotateCcw } from "lucide-react";
import * as React from "react";
import { Button } from "@lumi-ui/ui/button";
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from "@lumi-ui/ui/progress";

export function MultiFileUpload() {
  const [files, setFiles] = React.useState([
    { name: "document.pdf", progress: 0, status: "pending" },
    { name: "image.png", progress: 0, status: "pending" },
    { name: "video.mp4", progress: 0, status: "pending" },
  ]);
  const [isUploading, setIsUploading] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startAllUploads = () => {
    setIsUploading(true);

    intervalRef.current = setInterval(() => {
      setFiles((currentFiles) => {
        const updatedFiles = currentFiles.map((file) => {
          if (file.status === "complete") return file;

          const increment = Math.random() * 15 + 5;
          const newProgress = Math.min(100, file.progress + increment);

          return {
            ...file,
            progress: Math.round(newProgress),
            status: newProgress >= 100 ? "complete" : "uploading",
          };
        });

        if (updatedFiles.every((f) => f.status === "complete")) {
          clearInterval(intervalRef.current!);
          setIsUploading(false);
        }

        return updatedFiles;
      });
    }, 500);
  };

  const resetAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setFiles([
      { name: "document.pdf", progress: 0, status: "pending" },
      { name: "image.png", progress: 0, status: "pending" },
      { name: "video.mp4", progress: 0, status: "pending" },
    ]);
    setIsUploading(false);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const allComplete = files.every((f) => f.status === "complete");

  return (
    <div className="w-full max-w-md p-6 space-y-4">
      {files.map((file, index) => (
        <ProgressRoot
          key={index}
          value={file.progress}
          className="grid grid-cols-2 gap-y-1"
        >
          <ProgressLabel className="text-xs truncate">
            {file.name}
          </ProgressLabel>
          <ProgressValue className="text-right text-xs" />
          <ProgressTrack className="col-span-full h-1.5">
            <ProgressIndicator
              className={
                file.status === "complete" ? "bg-green-500" : "bg-primary"
              }
            />
          </ProgressTrack>
        </ProgressRoot>
      ))}

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={startAllUploads}
          disabled={isUploading || allComplete}
        >
          <Play className="mr-2 h-3 w-3" />
          Upload All
        </Button>
        <Button size="sm" variant="outline" onClick={resetAll}>
          <RotateCcw className="mr-2 h-3 w-3" />
          Reset
        </Button>
      </div>
    </div>
  );
}
