"use client";

import { useState } from "react";
import { Button } from "@lumi-ui/ui/button";
import { Checkbox } from "@lumi-ui/ui/checkbox";
import { CheckboxGroup } from "@lumi-ui/ui/checkbox-group";
import { Field, FieldItem, FieldLabel } from "@lumi-ui/ui/field";
import { Fieldset, FieldsetLegend } from "@lumi-ui/ui/fieldset";
import { Input } from "@lumi-ui/ui/input";
import { Label } from "@lumi-ui/ui/label";
import { Radio, RadioGroup } from "@lumi-ui/ui/radio";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { Separator } from "@lumi-ui/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@lumi-ui/ui/sheet";
import { Slider } from "@lumi-ui/ui/slider";

export function SheetDemo() {
  return (
    <div className="flex flex-col gap-6 text-sm mx-auto">
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Positions</div>
        <div className="flex gap-2 flex-wrap">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Right
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-6">
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <FilterOptions />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Left
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 overflow-y-auto pr-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                    key={String(i)}
                  />
                ))}
              </div>
              <SheetFooter>
                <Button>Close</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Top
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Hello from top</SheetTitle>
              </SheetHeader>
              <div className="h-32 w-full items-center justify-center rounded-md bg-accent/30" />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Inset Bottom
            </SheetTrigger>
            <SheetContent
              className="max-w-xl mx-auto"
              inset
              showCloseButton
              side="bottom"
            >
              <SheetHeader>
                <SheetTitle>Bottom</SheetTitle>
                <SheetDescription>Bottom of the screen.</SheetDescription>
              </SheetHeader>

              <FilterOptions />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Inset</div>
        <div className="flex gap-2 flex-wrap">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Inset Right
            </SheetTrigger>
            <SheetContent inset side="right">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>Apply filters here</SheetDescription>
              </SheetHeader>
              <FilterOptions />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Inset Left
            </SheetTrigger>
            <SheetContent inset side="left">
              <SheetHeader>
                <SheetTitle>Inset Left</SheetTitle>
                <SheetDescription>With ScrollArea</SheetDescription>
              </SheetHeader>
              <ScrollArea className="pr-4" gradientScrollFade noScrollBar>
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                      key={String(i)}
                    />
                  ))}
                </div>
              </ScrollArea>
              <SheetFooter>
                <SheetClose render={<Button />}>Close</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Inset Top
            </SheetTrigger>
            <SheetContent className="max-w-xl mx-auto" inset side="top">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Courtney Henry" type="text" />
                </Field>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input defaultValue="courtney.henry" type="text" />
                </Field>
              </div>
              <SheetFooter>
                <SheetClose render={<Button variant="ghost" />}>
                  Cancel
                </SheetClose>
                <Button type="submit">Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Bottom
            </SheetTrigger>
            <SheetContent
              backdropClassName="backdrop-blur-none bg-transparent"
              className="bg-popover text-popover-foreground"
              showCloseButton
              side="bottom"
            >
              <SheetHeader>
                <SheetTitle>Bottom</SheetTitle>
                <SheetDescription>Bottom of the screen.</SheetDescription>
              </SheetHeader>
              <div className="h-48 w-full items-center justify-center rounded-md bg-accent/30" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function FilterOptions() {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "home", label: "Home & Garden" },
    { id: "books", label: "Books" },
    { id: "sports", label: "Sports & Outdoors" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-semibold">Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          className="w-full"
          max={1000}
          min={0}
          onValueChange={(val) => setPriceRange(val as number[])}
          step={10}
          thumbAlignment="edge"
          value={priceRange}
        />
      </div>
      <Separator />
      <Field name="categories">
        <Fieldset
          render={<CheckboxGroup defaultValue={["electronics", "clothing"]} />}
        >
          <FieldsetLegend>Categories</FieldsetLegend>
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <FieldItem key={category.id}>
                <FieldLabel>
                  <Checkbox value={category.id} />
                  {category.label}
                </FieldLabel>
              </FieldItem>
            ))}
          </div>
        </Fieldset>
      </Field>
      <Separator />
      <Field name="sortBy">
        <Fieldset render={<RadioGroup defaultValue="relevance" />}>
          <FieldsetLegend>Sort By</FieldsetLegend>
          <div className="flex flex-col gap-3">
            <FieldItem>
              <Radio value="relevance" />
              <FieldLabel>Relevance</FieldLabel>
            </FieldItem>
            <FieldItem>
              <Radio value="price-low" />
              <FieldLabel>Price: Low to High</FieldLabel>
            </FieldItem>
            <FieldItem>
              <Radio value="price-high" />
              <FieldLabel>Price: High to Low</FieldLabel>
            </FieldItem>
            <FieldItem>
              <Radio value="rating" />
              <FieldLabel>Customer Rating</FieldLabel>
            </FieldItem>
          </div>
        </Fieldset>
      </Field>
      <div className="flex gap-3 pt-4 mt-auto">
        <Button className="flex-1" variant="outline">
          Reset
        </Button>
        <Button className="flex-1">Apply Filters</Button>
      </div>
    </div>
  );
}
