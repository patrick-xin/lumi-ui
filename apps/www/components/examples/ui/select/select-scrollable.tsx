import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

export function SelectScrollableDemo() {
  const flatItems = timezoneGroups.flatMap((group) => group.items);

  return (
    <Select items={flatItems}>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {timezoneGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

const timezoneGroups = [
  {
    label: "North America",
    items: [
      { value: "est", label: "Eastern Standard Time (EST)" },
      { value: "cst", label: "Central Standard Time (CST)" },
      { value: "mst", label: "Mountain Standard Time (MST)" },
      { value: "pst", label: "Pacific Standard Time (PST)" },
      { value: "akst", label: "Alaska Standard Time (AKST)" },
      { value: "hst", label: "Hawaii Standard Time (HST)" },
    ],
  },
  {
    label: "Europe & Africa",
    items: [
      { value: "gmt", label: "Greenwich Mean Time (GMT)" },
      { value: "cet", label: "Central European Time (CET)" },
      { value: "eet", label: "Eastern European Time (EET)" },
      { value: "west", label: "Western European Summer Time (WEST)" },
      { value: "cat", label: "Central Africa Time (CAT)" },
      { value: "eat", label: "East Africa Time (EAT)" },
    ],
  },
  {
    label: "Asia",
    items: [
      { value: "msk", label: "Moscow Time (MSK)" },
      { value: "ist", label: "India Standard Time (IST)" },
      { value: "cst_china", label: "China Standard Time (CST)" },
      { value: "jst", label: "Japan Standard Time (JST)" },
      { value: "kst", label: "Korea Standard Time (KST)" },
      {
        value: "ist_indonesia",
        label: "Indonesia Central Standard Time (WITA)",
      },
    ],
  },
  {
    label: "Australia & Pacific",
    items: [
      { value: "awst", label: "Australian Western Standard Time (AWST)" },
      { value: "acst", label: "Australian Central Standard Time (ACST)" },
      { value: "aest", label: "Australian Eastern Standard Time (AEST)" },
      { value: "nzst", label: "New Zealand Standard Time (NZST)" },
      { value: "fjt", label: "Fiji Time (FJT)" },
    ],
  },
  {
    label: "South America",
    items: [
      { value: "art", label: "Argentina Time (ART)" },
      { value: "bot", label: "Bolivia Time (BOT)" },
      { value: "brt", label: "Brasilia Time (BRT)" },
      { value: "clt", label: "Chile Standard Time (CLT)" },
    ],
  },
];
