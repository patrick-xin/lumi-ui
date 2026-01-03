"use client";

import { BookHeart, ChevronsUpDownIcon, Minus, Plus } from "lucide-react";
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
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/ui/number-field";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/registry/ui/slider";
import { Switch } from "@/registry/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function ProjectQuoteForm() {
  const [value, setValue] = useState("form");
  const [formValues, setFormValues] = useState({});
  return (
    <div className="mx-auto w-[500px]">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTab value="form">Form</TabsTab>
          <TabsTab value="values" disabled={value === "form"}>
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
                  defaultValue=""
                  placeholder="e.g. SaaS Dashboard Redesign"
                  required
                  className="pl-9"
                  minLength={5}
                />
              </div>

              <FieldDescription>A short name for this project</FieldDescription>
              <FieldError />
            </Field>

            <Field name="clientLocation">
              <Combobox items={LOCATIONS} required>
                <FieldLabel>Headquarters Location</FieldLabel>
                <ComboboxInputGroup
                  placeholder="Select major city..."
                  className="w-80"
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
                mode="both"
                itemToStringValue={(item: Framework) => item.name}
                required
              >
                <FieldLabel>Preferred Framework</FieldLabel>
                <AutocompleteInputGroup
                  className="w-80"
                  showClear
                  placeholder="e.g. Next.js"
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
              <Field name="projectType" className="col-span-2">
                <FieldLabel>Type</FieldLabel>
                <Select items={PROJECT_TYPES} required>
                  <SelectTriggerGroup
                    className="w-full"
                    placeholder="Marketing Website"
                    indicatorIcon={<ChevronsUpDownIcon />}
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

              <Field name="timelineWeeks" className="col-span-1">
                <FieldLabel>Timeline (Weeks)</FieldLabel>
                <NumberField defaultValue={4} min={1} max={52} required>
                  <NumberFieldGroup>
                    <NumberFieldDecrement>
                      <Minus className="size-3.5" />
                    </NumberFieldDecrement>
                    <NumberFieldInput />
                    <NumberFieldIncrement>
                      <Plus className="size-3.5" />
                    </NumberFieldIncrement>
                  </NumberFieldGroup>
                </NumberField>
                <FieldError />
              </Field>
            </div>

            <Field name="budgetRange">
              <Fieldset
                className="w-full gap-y-3 grid grid-cols-2 items-center"
                render={
                  <SliderRoot
                    defaultValue={[5, 20]}
                    thumbAlignment="edge"
                    min={1}
                    max={100}
                    step={1}
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                  />
                }
              >
                <FieldsetLegend>Budget Range (Thousands)</FieldsetLegend>
                <SliderValue className="text-end col-start-2 text-sm font-mono text-muted-foreground" />
                <SliderControl className="col-span-2 pt-2">
                  <SliderTrack className="h-2">
                    <SliderIndicator />
                    <SliderThumb index={0} />
                    <SliderThumb index={1} />
                  </SliderTrack>
                </SliderControl>
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
                        <RadioGroupItem value={item.id} />
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
            <Button type="submit" size="lg" className="mt-4 w-full">
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
  { id: "react", name: "React", description: "Standard UI Library" },
  { id: "nextjs", name: "Next.js", description: "Full-stack React Framework" },
  { id: "vue", name: "Vue.js", description: "Progressive Framework" },
  { id: "svelte", name: "Svelte", description: "Cybernetically enhanced apps" },
  { id: "angular", name: "Angular", description: "Enterprise-ready platform" },
  { id: "astro", name: "Astro", description: "Content-focused websites" },
];

const PROJECT_TYPES = [
  { label: "Marketing Website", value: "marketing" },
  { label: "E-commerce Store", value: "ecommerce" },
  { label: "Web Application", value: "webapp" },
  { label: "Mobile App (iOS/Android)", value: "mobile" },
  { label: "Internal Dashboard", value: "dashboard" },
];
