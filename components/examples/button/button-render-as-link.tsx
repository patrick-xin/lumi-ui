import Link from "next/link";

import { Button } from "@/registry/ui/button";

export function LinkAsButton() {
  return (
    <Button
      nativeButton={false}
      render={<Link href="/docs/components">Browse components</Link>}
    />
  );
}
