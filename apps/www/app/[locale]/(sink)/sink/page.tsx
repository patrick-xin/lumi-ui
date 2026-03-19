import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ComboboxGroupedDemo } from "@/registry/tv/demos/combobox/combobox-grouped";
import { ComboboxIndicatorDemo } from "@/registry/tv/demos/combobox/combobox-indicator";
import { ComboboxInputInsidePopupDemo } from "@/registry/tv/demos/combobox/combobox-input-inside-popup";
import { ComboboxMultipleSelectDemo } from "@/registry/tv/demos/combobox/combobox-multiple";
import { InputVariantsDemo } from "@/registry/tv/demos/input/input-styles";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb";
import { EmojiPickerAutocompleteDemo } from "../../../../registry/tv/demos/autocomplete/autocomplete-grid-layout";

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
        <section className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <InputVariantsDemo />

          <div className="flex flex-col gap-4 w-full">
            <ComboboxIndicatorDemo />
            <ComboboxGroupedDemo />
            <ComboboxMultipleSelectDemo />
            <ComboboxInputInsidePopupDemo />
          </div>

          <EmojiPickerAutocompleteDemo />
        </section>
      </div>
    </div>
  );
}
