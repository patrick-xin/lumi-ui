"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/ui/button";

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
      onClick={handleLoading}
      variant="outline"
      isLoading={isLoading}
      className="w-28"
    >
      {isLoading && <Loader2 className="animate-spin size-4" />}
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
}
