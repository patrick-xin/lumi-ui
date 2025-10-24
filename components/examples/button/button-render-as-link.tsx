import Link from "next/link";

import { Button } from "@/registry/ui/button";

export function LinkAsButton() {
  return <Button render={<Link href="/login">Login</Link>} />;
}
