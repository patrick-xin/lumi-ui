import { X } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerDescription,
  DrawerDragHandle,
  DrawerHeader,
  DrawerPopup,
  DrawerPortal,
  DrawerSelectable,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/ui/drawer";
import {
  ScrollAreaContent,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";

export function DrawerMobileNavigationDemo() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline">Open Mobile Navigation</Button>}
      />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <ScrollAreaRoot
            className="h-full overscroll-contain transition-[transform,translate] duration-600 ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[starting-style]:translate-y-[100dvh] group-data-[ending-style]:pointer-events-none"
            style={{ position: undefined }}
          >
            <ScrollAreaViewport className="h-full overscroll-contain touch-auto">
              <ScrollAreaContent className="flex min-h-full items-end justify-center pt-8 md:py-16 md:px-16">
                <DrawerPopup className="w-full max-w-[42rem] outline-none transition-transform duration-800 ease-[cubic-bezier(0.45,1.005,0,1.005)] [transform:translateY(var(--drawer-swipe-movement-y))] data-[swiping]:select-none data-[ending-style]:[transform:translateY(calc(max(100dvh,100%)+2px))] data-[ending-style]:duration-350 data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] rounded-t-2xl md:rounded-xl">
                  <nav
                    aria-label="Navigation"
                    className="relative flex flex-col bg-background px-6 pt-4 pb-6 outline outline-border transition-shadow duration-350 ease-[cubic-bezier(0.375,0.015,0.545,0.455)] rounded-t-2xl md:rounded-xl"
                  >
                    <DrawerDragHandle className="mb-4" />
                    <DrawerClose
                      aria-label="Close menu"
                      className="absolute top-2 right-2"
                      render={
                        <Button size="icon-sm" variant="outline">
                          <X />
                        </Button>
                      }
                    />

                    <DrawerSelectable className="w-full">
                      <DrawerHeader>
                        <DrawerTitle>Menu</DrawerTitle>
                        <DrawerDescription>
                          Scroll the long list. Flick down from the top to
                          dismiss.
                        </DrawerDescription>
                      </DrawerHeader>

                      <div className="pb-6 space-y-4">
                        <ul className="grid list-none gap-2">
                          {ITEMS.map((item) => (
                            <li className="flex" key={item.label}>
                              <Button
                                className="w-full h-12"
                                variant="secondary"
                              >
                                {item.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <Separator className="w-5/6! mx-auto" />
                        <ul
                          aria-label="Long list"
                          className="mt-6 grid list-none gap-2"
                        >
                          {LONG_LIST.slice(0, 10).map((item) => (
                            <li className="flex" key={item.label}>
                              <Button
                                className="w-full h-12"
                                variant="secondary"
                              >
                                {item.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <Separator className="w-5/6! mx-auto" />
                        <ul
                          aria-label="Long list"
                          className="mt-6 grid list-none gap-2"
                        >
                          {LONG_LIST.slice(10, 20).map((item) => (
                            <li className="flex" key={item.label}>
                              <Button
                                className="w-full h-12"
                                variant="secondary"
                              >
                                {item.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DrawerSelectable>
                  </nav>
                </DrawerPopup>
              </ScrollAreaContent>
            </ScrollAreaViewport>
          </ScrollAreaRoot>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}

const ITEMS = [
  { href: "#", label: "Overview" },
  { href: "#", label: "Components" },
  { href: "#", label: "Utilities" },
  { href: "#", label: "Releases" },
] as const;

const LONG_LIST = Array.from({ length: 50 }, (_, i) => ({
  href: "#",
  label: `Item ${i + 1}`,
}));
