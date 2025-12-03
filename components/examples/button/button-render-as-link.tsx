import Link from "next/link";

import { Button } from "@/registry/ui/button";

export function LinkAsButton() {
  return (
    <Button
      render={<Link href="/docs/components">Browse components</Link>}
      nativeButton={false}
    />
  );
}
