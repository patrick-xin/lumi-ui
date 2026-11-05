import { cookies } from "next/headers";
import type { Layout } from "react-resizable-panels";
import { GROUP_ID, PlaygroundContent } from "./playground-content";

export default async function Page() {
  const cookieStore = await cookies();
  const layoutCookie = cookieStore.get(GROUP_ID);
  const defaultLayout: Layout = layoutCookie
    ? JSON.parse(layoutCookie.value)
    : undefined;

  return <PlaygroundContent defaultLayout={defaultLayout} />;
}
