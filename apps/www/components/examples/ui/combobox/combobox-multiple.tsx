"use client";
import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/registry/ui/combobox";

export function ComboboxMultipleSelectDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();
  return (
    <Combobox items={langs} multiple>
      <ComboboxChips ref={containerRef} className="w-64">
        <ComboboxValue>
          {(value: ProgrammingLanguage[]) => (
            <React.Fragment>
              {value.length > 0 && (
                <div className="flex flex-wrap gap-1 p-1.5">
                  {value.map((language) => (
                    <ComboboxChip key={language.id} aria-label={language.value}>
                      {language.value}
                    </ComboboxChip>
                  ))}
                </div>
              )}
              <ComboboxInputGroup
                id={id}
                placeholder={value.length > 0 ? "" : "e.g. TypeScript"}
                variant="ghost"
                showTrigger={false}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
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
