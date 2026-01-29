"use client";

import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";

const languages = {
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  python: "Python",
  rust: "Rust",
  swift: "Swift",
  typescript: "TypeScript",
};

type Language = keyof typeof languages;

const values = Object.keys(languages) as Language[];

function renderValue(value: Language[]) {
  if (value.length === 0) {
    return "Select languages...";
  }

  const firstLanguage = languages[value[0]];
  const additionalLanguages =
    value.length > 1 ? ` (+${value.length - 1} more)` : "";
  return firstLanguage + additionalLanguages;
}

export default function MultiSelectDemo() {
  return (
    <Select defaultValue={["javascript", "typescript"]} multiple>
      <SelectTriggerGroup className="w-56" placeholder="Select a language">
        {renderValue}
      </SelectTriggerGroup>
      <SelectContent>
        {values.map((value) => (
          <SelectItemContent
            indicatorPlacement="start"
            key={value}
            value={value}
          >
            {languages[value]}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
