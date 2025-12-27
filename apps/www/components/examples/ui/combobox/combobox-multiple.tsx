"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxValue,
} from "@/registry/ui/combobox";

export function ComboboxMultipleSelectDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <Combobox items={langs} multiple>
      <ComboboxChips ref={containerRef} className="max-w-xl w-96">
        <ComboboxValue>
          {(value: ProgrammingLanguage[]) => (
            <React.Fragment>
              {value.map((language) => (
                <ComboboxChip key={language.id} aria-label={language.value}>
                  {language.value}
                </ComboboxChip>
              ))}

              <ComboboxInputGroup
                placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
                variant="ghost"
                // remove flex-1 will make input always appear in new line, see Async Items (Multiple) example below
                className="flex-1"
                showClear
                showTrigger
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent sideOffset={4} positionerAnchor={containerRef}>
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(language: ProgrammingLanguage) => (
            <ComboboxItemContent
              key={language.id}
              value={language}
              iconPosition="end"
            >
              {language.value}
            </ComboboxItemContent>
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
