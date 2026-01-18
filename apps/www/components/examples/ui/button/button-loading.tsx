"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@lumi-ui/ui/button";

export function ButtonLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Button
      className="w-28"
      isLoading={isLoading}
      onClick={handleLoading}
      variant="outline"
    >
      {isLoading && <Loader2 className="animate-spin size-4" />}
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
}
