"use client";
import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/registry/ui/combobox";

export function ComboboxMultipleSelectDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();
  return (
    <Combobox items={langs} multiple>
      <div className="flex flex-col gap-2 w-72">
        <label htmlFor={id}>Select a language</label>
        <ComboboxChips ref={containerRef}>
          <ComboboxValue>
            {(value: ProgrammingLanguage[]) => (
              <React.Fragment>
                {value.length > 0 && (
                  <div className="flex flex-wrap gap-1 p-1">
                    {value.map((language) => (
                      <ComboboxChip
                        key={language.id}
                        aria-label={language.value}
                      >
                        {language.value}
                      </ComboboxChip>
                    ))}
                  </div>
                )}
                <ComboboxInput id={id} placeholder="e.g. TypeScript" multiple />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </div>
      <ComboboxContent sideOffset={8}>
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(language: ProgrammingLanguage) => (
            <ComboboxItem key={language.id} value={language}>
              {language.value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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
