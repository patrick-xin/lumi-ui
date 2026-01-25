import { Button } from "@lumi-ui/ui/button";
import Link from "next/link";

export function LinkAsButton() {
  return (
    <Button
      nativeButton={false}
      render={<Link href="/docs/components">Browse components</Link>}
    />
  );
}
