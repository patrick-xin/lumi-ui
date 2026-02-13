"use client";

import NextLink from "next/link";
import { Button } from "../../../../registry/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "../../../../registry/ui/drawer";
import { ScrollArea } from "../../../../registry/ui/scroll-area";

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

export function DrawerMobileNavigationDemo() {
  return (
    <Drawer>
      <DrawerTrigger>Open mobile menu</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport className="group fixed inset-0">
          <ScrollArea style={{ position: undefined }}>
            <DrawerPopup className="group box-border w-full max-w-[42rem] outline-none transition-transform duration-[800ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] [transform:translateY(var(--drawer-swipe-movement-y))] data-[swiping]:select-none data-[ending-style]:[transform:translateY(max(100dvh,100%))] data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]">
              <nav aria-label="Navigation">
                <DrawerContent className="w-full">
                  <DrawerTitle className="m-0 mb-1 text-lg font-medium leading-7 tracking-[-0.0025em]">
                    Menu
                  </DrawerTitle>
                  <DrawerDescription className="m-0 mb-5 text-base leading-6 text-gray-600">
                    Scroll the long list. Flick down from the top to dismiss.
                  </DrawerDescription>

                  <div className="pb-8">
                    <ul className="grid list-none gap-1 p-0 m-0">
                      {ITEMS.map((item) => (
                        <li className="flex" key={item.label}>
                          <Button
                            className="w-full justify-start"
                            nativeButton={false}
                            render={
                              <NextLink href={item.href}>{item.label}</NextLink>
                            }
                            variant="ghost"
                          />
                        </li>
                      ))}
                    </ul>

                    <ul
                      aria-label="Long list"
                      className="mt-6 grid list-none gap-1 p-0 m-0"
                    >
                      {LONG_LIST.map((item) => (
                        <li className="flex" key={item.label}>
                          <Button
                            className="w-full justify-start"
                            nativeButton={false}
                            render={
                              <NextLink href={item.href}>{item.label}</NextLink>
                            }
                            variant="ghost"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </DrawerContent>
              </nav>
            </DrawerPopup>
          </ScrollArea>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
