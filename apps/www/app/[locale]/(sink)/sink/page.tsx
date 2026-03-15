import Link from "next/link";
import { DrawerDemo } from "@/components/examples/ui/drawer/drawer-demo";
import { DrawerDirectionsDemo } from "@/components/examples/ui/drawer/drawer-directions";
import { DrawerSwipeDemo } from "@/components/examples/ui/drawer/drawer-swipe";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb";

export default function Page() {
  return (
    <div>
      <header className="flex h-12 bg-background z-10 items-center gap-2 p-2 sm:p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Financial Performance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeSwitcher />
        <ModeSwitcher />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4">
        <section className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex flex-col gap-4">
            Basic
            <DrawerDemo />
            <DrawerDirectionsDemo />
          </div>

          <DrawerSwipeDemo />
        </section>
      </div>
    </div>
  );
}
