"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/ui/combobox";

export function ComboboxInputInsidePopupDemo() {
  return (
    <Combobox items={countries} defaultValue={countries[0]}>
      <div className="relative flex flex-col gap-2 w-64">
        <label htmlFor="select-country">Select country</label>
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="justify-between bg-input dark:bg-input/30 font-normal"
            />
          }
        >
          <ComboboxValue />
          <ComboboxIcon className="flex">
            <ChevronsUpDownIcon />
          </ComboboxIcon>
        </ComboboxTrigger>
      </div>
      <ComboboxContent>
        <ComboboxInput
          placeholder="e.g. United Kingdom"
          className="p-2 m-2 w-[calc(100%-1rem)]"
        />

        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              {country.label ?? country.value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

interface Country {
  code: string;
  value: string | null;
  continent: string;
  label: string;
}

const countries: Country[] = [
  { code: "", value: null, continent: "", label: "Select country" },
  { code: "af", value: "afghanistan", label: "Afghanistan", continent: "Asia" },
  { code: "al", value: "albania", label: "Albania", continent: "Europe" },
  { code: "dz", value: "algeria", label: "Algeria", continent: "Africa" },
  { code: "ad", value: "andorra", label: "Andorra", continent: "Europe" },
  { code: "ao", value: "angola", label: "Angola", continent: "Africa" },
];
