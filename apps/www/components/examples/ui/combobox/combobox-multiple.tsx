"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxValue,
} from "@/registry/ui/combobox";
import { Label } from "@/registry/ui/label";

export function ComboboxMultipleSelectDemo() {
  const id = React.useId();
  return (
    <div className="flex gap-4 items-center justify-center flex-wrap">
      <Combobox items={langs} multiple>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor={id}>Programming languages</Label>
          <ComboboxInputGroup
            className="max-w-xl w-96 px-1.5 py-1"
            inputSize="sm"
          >
            <ComboboxChips>
              <ComboboxValue>
                {(value: ProgrammingLanguage[]) => (
                  <React.Fragment>
                    {value.map((language) => (
                      <ComboboxChip
                        aria-label={language.value}
                        key={language.id}
                      >
                        {language.value}
                      </ComboboxChip>
                    ))}
                    <ComboboxInput
                      className="flex-1"
                      id={id}
                      placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
                      variant="ghost"
                    />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
          </ComboboxInputGroup>
        </div>

        <ComboboxContent sideOffset={4}>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(language: ProgrammingLanguage) => (
              <ComboboxItemContent
                indicatorPlacement="end"
                key={language.id}
                value={language}
              >
                {language.value}
              </ComboboxItemContent>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

interface ProgrammingLanguage {
  id: string;
  value: string;
}

const langs: ProgrammingLanguage[] = [
  { id: "js", value: "JavaScript" },
  { id: "ts", value: "TypeScript" },
  { id: "py", value: "Python" },
  { id: "java", value: "Java" },
  { id: "cpp", value: "C++" },
  { id: "cs", value: "C#" },
  { id: "php", value: "PHP" },
  { id: "ruby", value: "Ruby" },
  { id: "go", value: "Go" },
  { id: "rust", value: "Rust" },
  { id: "swift", value: "Swift" },
];
