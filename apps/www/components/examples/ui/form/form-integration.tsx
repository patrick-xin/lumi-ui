"use client";

import { BookHeart, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@/registry/ui/autocomplete";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
} from "@/registry/ui/combobox";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";
import { Form } from "@/registry/ui/form";
import { NumberField } from "@/registry/ui/number-field";
import { Radio, RadioGroup } from "@/registry/ui/radio";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { Slider, SliderValue } from "@/registry/ui/slider";
import { Switch } from "@/registry/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function ProjectQuoteForm() {
  const [value, setValue] = useState("form");
  const [formValues, setFormValues] = useState({});
  return (
    <div className="mx-auto w-[500px]">
      <Tabs onValueChange={setValue} value={value}>
        <TabsList>
          <TabsTab value="form">Form</TabsTab>
          <TabsTab disabled={value === "form"} value="values">
            Values
          </TabsTab>
        </TabsList>
        <TabsPanel value="form">
          <Form
            aria-label="Request project quote"
            className="flex w-full max-w-lg flex-col gap-6 rounded-md border p-8 shadow-md"
            onFormSubmit={(formValues) => {
              setFormValues(formValues);
              setValue("values");
            }}
          >
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Project Inquiry
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us about your idea to get an estimated quote.
              </p>
            </div>
            <Field name="projectName">
              <FieldLabel>Project Title</FieldLabel>
              <div className="relative">
                <BookHeart className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <FieldControl
                  className="pl-9"
                  defaultValue=""
                  minLength={5}
                  placeholder="e.g. SaaS Dashboard Redesign"
                  required
                />
              </div>
              <FieldDescription>A short name for this project</FieldDescription>
              <FieldError />
            </Field>
            <Field name="clientLocation">
              <Combobox items={LOCATIONS} required>
                <FieldLabel>Headquarters Location</FieldLabel>
                <ComboboxInputGroup
                  className="w-80"
                  placeholder="Select major city..."
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No location found</ComboboxEmpty>
                  <ComboboxList>
                    {(location: string) => (
                      <ComboboxItemContent key={location} value={location}>
                        {location}
                      </ComboboxItemContent>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldError />
            </Field>
            <Field name="primaryTechStack">
              <Autocomplete
                items={FRAMEWORKS}
                itemToStringValue={(item: Framework) => item.name}
                mode="both"
                required
              >
                <FieldLabel>Preferred Framework</FieldLabel>
                <AutocompleteInputGroup
                  className="w-80"
                  placeholder="e.g. Next.js"
                  showClear
                />
                <FieldDescription>
                  The core technology you want us to use.
                </FieldDescription>
                <AutocompleteContent>
                  <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
                  <AutocompleteList>
                    {(fw: Framework) => (
                      <AutocompleteItem
                        className="flex-col justify-start items-start py-2"
                        key={fw.id}
                        value={fw}
                      >
                        <span className="font-medium text-sm">{fw.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {fw.description}
                        </span>
                      </AutocompleteItem>
                    )}
                  </AutocompleteList>
                </AutocompleteContent>
              </Autocomplete>
              <FieldError />
            </Field>
            <Separator />
            <div className="grid grid-cols-3 gap-8">
              <Field className="col-span-2" name="projectType">
                <FieldLabel>Type</FieldLabel>
                <Select items={PROJECT_TYPES} required>
                  <SelectTriggerGroup
                    className="w-full"
                    indicatorIcon={<ChevronsUpDownIcon />}
                    placeholder="Marketing Website"
                  />
                  <SelectContent>
                    {PROJECT_TYPES.map(({ label, value }) => (
                      <SelectItemContent key={value} value={value}>
                        {label}
                      </SelectItemContent>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError />
              </Field>
              <Field className="col-span-1" name="timelineWeeks">
                <FieldLabel>Timeline (Weeks)</FieldLabel>
                <NumberField defaultValue={4} max={52} min={1} required />
                <FieldError />
              </Field>
            </div>
            <Field name="budgetRange">
              <Fieldset>
                <FieldsetLegend>Budget Range</FieldsetLegend>
                <Slider
                  className="pt-2 w-full"
                  defaultValue={[5, 20]}
                  max={100}
                  min={1}
                  step={1}
                  thumbAlignment="edge"
                >
                  <SliderValue className="text-muted-foreground">
                    {(_, values) => {
                      const [min, max] = values;
                      const formatter = new Intl.NumberFormat("en-US", {
                        currency: "USD",
                        maximumFractionDigits: 0,
                        style: "currency",
                      });
                      return `${formatter.format(min * 1000)} – ${formatter.format(max * 1000)}`;
                    }}
                  </SliderValue>
                </Slider>
              </Fieldset>
            </Field>
            <Separator />
            <Field name="priority">
              <Fieldset
                render={
                  <RadioGroup
                    className="flex flex-col gap-3"
                    defaultValue="quality"
                  />
                }
              >
                <FieldsetLegend>Primary Priority</FieldsetLegend>
                <div className="flex gap-3">
                  {[
                    { id: "speed", label: "Speed" },
                    { id: "quality", label: "Quality" },
                    { id: "budget", label: "Cost" },
                  ].map((item) => (
                    <FieldItem key={item.id}>
                      <FieldLabel>
                        <Radio value={item.id} />
                        {item.label}
                      </FieldLabel>
                    </FieldItem>
                  ))}
                </div>
              </Fieldset>
            </Field>
            <Field name="additionalServices">
              <Fieldset render={<CheckboxGroup defaultValue={["design"]} />}>
                <FieldsetLegend>Included Services</FieldsetLegend>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "design", label: "UI/UX Design" },
                    { id: "seo", label: "SEO Setup" },
                    { id: "analytics", label: "Analytics" },
                    { id: "cms", label: "CMS Integration" },
                  ].map((s) => (
                    <FieldItem key={s.id}>
                      <FieldLabel>
                        <Checkbox value={s.id} />
                        {s.label}
                      </FieldLabel>
                    </FieldItem>
                  ))}
                </div>
              </Fieldset>
            </Field>
            <Field name="requireNda">
              <FieldLabel className="flex w-full justify-between items-center rounded-lg border p-3 shadow-sm">
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Require NDA</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Legal agreement before starting
                  </span>
                </span>
                <Switch />
              </FieldLabel>
            </Field>
            <Button className="mt-4 w-full" size="lg" type="submit">
              Calculate Estimate
            </Button>
          </Form>
        </TabsPanel>
        <TabsPanel value="values">
          <pre className="whitespace-pre-wrap font-mono">
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </TabsPanel>
      </Tabs>
    </div>
  );
}

const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "London, UK",
  "Berlin, DE",
  "Toronto, CA",
  "Shanghai, CN",
  "Singapore, SG",
  "Sydney, AU",
  "Remote (Worldwide)",
];

interface Framework {
  id: string;
  name: string;
  description: string;
}

const FRAMEWORKS: Framework[] = [
  { description: "Standard UI Library", id: "react", name: "React" },
  { description: "Full-stack React Framework", id: "nextjs", name: "Next.js" },
  { description: "Progressive Framework", id: "vue", name: "Vue.js" },
  { description: "Cybernetically enhanced apps", id: "svelte", name: "Svelte" },
  { description: "Enterprise-ready platform", id: "angular", name: "Angular" },
  { description: "Content-focused websites", id: "astro", name: "Astro" },
];

const PROJECT_TYPES = [
  { label: "Marketing Website", value: "marketing" },
  { label: "E-commerce Store", value: "ecommerce" },
  { label: "Web Application", value: "webapp" },
  { label: "Mobile App (iOS/Android)", value: "mobile" },
  { label: "Internal Dashboard", value: "dashboard" },
];
