import Link from "next/link";
import { DrawerDemo } from "@/components/examples/ui/drawer/drawer-demo";
import { DrawerDialogDemo } from "@/components/examples/ui/drawer/drawer-responsive";
import { OTPFieldAlphanumericDemo } from "@/components/examples/ui/otp-field/otp-field-alphanumeric";
import { OTPFieldDemo } from "@/components/examples/ui/otp-field/otp-field-demo";
import { OTPFieldFormDemo } from "@/components/examples/ui/otp-field/otp-field-form";
import { OTPFieldGroupedDemo } from "@/components/examples/ui/otp-field/otp-field-grouped";
import { OTPFieldMaskedDemo } from "@/components/examples/ui/otp-field/otp-field-masked";
import { OTPFieldPlaceholderDemo } from "@/components/examples/ui/otp-field/otp-field-placeholder";
import { OTPFieldSanitizeDemo } from "@/components/examples/ui/otp-field/otp-field-sanitize";
import { OTPFieldSizesDemo } from "@/components/examples/ui/otp-field/otp-field-sizes";
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
import { SliderSizeDemo } from "../../../../components/examples/ui/slider/slider-size";
import { SwitchDisabledDemo } from "../../../../components/examples/ui/switch/switch-disabled";
import { SwitchSizeDemo } from "../../../../components/examples/ui/switch/switch-size";

function DemoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

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
            <DrawerDialogDemo />
            <SwitchSizeDemo />
            <SliderSizeDemo />
            <SwitchDisabledDemo />
          </div>
        </section>
        <section className="max-w-4xl mx-auto flex w-full flex-col gap-8 border-t pt-6">
          <h2 className="text-lg font-semibold">OTP Field</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <DemoBlock title="Basic">
              <OTPFieldDemo />
            </DemoBlock>
            <DemoBlock title="Sizes">
              <OTPFieldSizesDemo />
            </DemoBlock>
            <DemoBlock title="Alphanumeric">
              <OTPFieldAlphanumericDemo />
            </DemoBlock>
            <DemoBlock title="Grouped">
              <OTPFieldGroupedDemo />
            </DemoBlock>
            <DemoBlock title="Masked">
              <OTPFieldMaskedDemo />
            </DemoBlock>
            <DemoBlock title="Placeholder hints">
              <OTPFieldPlaceholderDemo />
            </DemoBlock>
            <DemoBlock title="Custom sanitization">
              <OTPFieldSanitizeDemo />
            </DemoBlock>
            <DemoBlock title="With Form">
              <OTPFieldFormDemo />
            </DemoBlock>
          </div>
        </section>
      </div>
    </div>
  );
}
