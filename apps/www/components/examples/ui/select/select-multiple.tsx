"use client";

import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";

const languages = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  cpp: "C++",
  rust: "Rust",
  go: "Go",
  swift: "Swift",
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
    <Select multiple defaultValue={["javascript", "typescript"]}>
      <SelectTriggerGroup className="w-[200px]" placeholder="Select a language">
        {renderValue}
      </SelectTriggerGroup>
      <SelectContent>
        {values.map((value) => (
          <SelectItemContent key={value} value={value}>
            {languages[value]}
          </SelectItemContent>
        ))}
      </SelectContent>
    </Select>
  );
}
