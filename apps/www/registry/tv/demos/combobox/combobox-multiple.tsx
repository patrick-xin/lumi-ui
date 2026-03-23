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
} from "@/registry/tv/combobox";
import { Label } from "@/registry/ui/label";

export function ComboboxMultipleSelectDemo() {
  const id = React.useId();
  return (
    <div className="flex gap-4 items-center">
      <Combobox items={langs} multiple>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor={id}>Programming languages</Label>
          <ComboboxInputGroup
            className="max-w-xl w-96"
            inputSize="sm"
            variant="default"
          >
            <ComboboxChips>
              <ComboboxValue>
                {(value: ProgrammingLanguage[]) => (
                  <React.Fragment>
                    {value.map((language) => (
                      <ComboboxChip
                        aria-label={language.value}
                        key={language.id}
                        size="sm"
                      >
                        {language.value}
                      </ComboboxChip>
                    ))}
                    <ComboboxInput
                      id={id}
                      inputSize="sm"
                      multiple
                      placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
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
      <Combobox items={langs} multiple>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor={id}>Programming languages</Label>
          <ComboboxInputGroup
            className="max-w-xl w-96"
            inputSize="default"
            variant="default"
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
                      id={id}
                      multiple
                      placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
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
      <Combobox items={langs} multiple>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor={id}>Programming languages</Label>
          <ComboboxInputGroup
            className="max-w-xl w-96"
            inputSize="lg"
            variant="default"
          >
            <ComboboxChips>
              <ComboboxValue>
                {(value: ProgrammingLanguage[]) => (
                  <React.Fragment>
                    {value.map((language) => (
                      <ComboboxChip
                        aria-label={language.value}
                        key={language.id}
                        size="lg"
                      >
                        {language.value}
                      </ComboboxChip>
                    ))}
                    <ComboboxInput
                      id={id}
                      inputSize="lg"
                      multiple
                      placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
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
