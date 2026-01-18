import Link from "next/link";

import { Button } from "@lumi-ui/ui/button";

export function LinkAsButton() {
  return (
    <Button
      render={<Link href="/docs/components">Browse components</Link>}
      nativeButton={false}
    />
  );
}
