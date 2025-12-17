"use client";

import { Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/ui/autocomplete";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";
import {
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/registry/ui/slider";
import { Switch } from "@/registry/ui/switch";

export function ProjectQuoteForm() {
  return (
    <Form
      aria-label="Request project quote"
      className="flex w-full max-w-md flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm"
      onFormSubmit={(formValues) => {
        toast({
          title: "Quote Request Sent",
          description: "We have received your project details:",
          data: {
            content: (
              <div className="mt-2 rounded-md bg-muted p-4 text-sm">
                {Object.entries(formValues).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-1 border-b border-white/10 last:border-0"
                  >
                    <span className="opacity-70 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="font-semibold text-right truncate max-w-[150px]">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ),
          },
        });
      }}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight">Project Inquiry</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your idea to get an estimated quote.
        </p>
      </div>

      <Field name="projectName">
        <FieldLabel>Project Title</FieldLabel>
        <FieldControl
          defaultValue=""
          placeholder="e.g. SaaS Dashboard Redesign"
          required
          minLength={5}
        />
        <FieldDescription>A short internal name for this job</FieldDescription>
        <FieldError />
      </Field>

      <Field name="clientLocation">
        <Combobox items={LOCATIONS} required>
          <FieldLabel>Headquarters Location</FieldLabel>
          <ComboboxInput placeholder="Select major city..." />

          <ComboboxContent>
            <ComboboxEmpty>No location found</ComboboxEmpty>
            <ComboboxList>
              {(location: string) => (
                <ComboboxItem key={location} value={location}>
                  {location}
                </ComboboxItem>
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
          <AutocompleteInput placeholder="e.g. Next.js" />
          <FieldDescription>
            The core technology you want us to use.
          </FieldDescription>

          <AutocompletePopup>
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
          </AutocompletePopup>
        </Autocomplete>
        <FieldError />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field name="projectType">
          <FieldLabel>Type</FieldLabel>
          <Select items={PROJECT_TYPES} required>
            <SelectTrigger>
              <SelectValue placeholder="Marketing Website" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TYPES.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError />
        </Field>

        <Field name="timelineWeeks">
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

      <Field name="priority">
        <Fieldset
          render={
            <RadioGroup
              className="grid grid-cols-3 gap-3"
              defaultValue="quality"
            />
          }
        >
          <FieldsetLegend className="mb-3">Primary Priority</FieldsetLegend>
          {[
            { id: "speed", label: "Speed" },
            { id: "quality", label: "Quality" },
            { id: "budget", label: "Cost" },
          ].map((item) => (
            <FieldItem key={item.id} className="flex-1">
              <FieldLabel>
                <RadioGroupItem value={item.id} />
                {item.label}
              </FieldLabel>
            </FieldItem>
          ))}
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

      <Field name="additionalServices">
        <Fieldset render={<CheckboxGroup defaultValue={["design"]} />}>
          <FieldsetLegend className="mb-3">Included Services</FieldsetLegend>
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

      <Button type="submit" size="lg" className="mt-4 w-full">
        Calculate Estimate
      </Button>
    </Form>
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
