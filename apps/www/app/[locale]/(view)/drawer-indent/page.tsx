import { DrawerDemo } from "@/components/examples/ui/drawer/drawer-demo";
import { DrawerSwipeDemo } from "@/components/examples/ui/drawer/drawer-swipe";
import {
  DrawerIndent,
  DrawerIndentBackground,
  DrawerProvider,
} from "@/registry/ui/drawer";

export default function DrawerIndentPage() {
  return (
    <DrawerProvider>
      <DrawerIndentBackground />
      <DrawerIndent className="flex justify-center items-center">
        <DrawerDemo />
        <DrawerSwipeDemo />
      </DrawerIndent>
    </DrawerProvider>
  );
}
