"use client";

import { ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteTrigger,
} from "@/registry/ui/autocomplete";

export default function AutocompleteWithClearTrigger() {
  const [inputValue, setInputValue] = React.useState("");
  const selectedItem =
    movies.find(
      (m) => m.title.toLowerCase() === inputValue.toLowerCase().trim(),
    ) || null;

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">
        {selectedItem?.title
          ? `Selected movie: ${selectedItem?.title}`
          : "Nothing selected"}
      </div>

      <Autocomplete
        mode="both"
        items={movies}
        value={inputValue}
        onValueChange={setInputValue}
        itemToStringValue={(item) => item.title}
      >
        <div className="relative [&>input]:pr-[calc(0.5rem+1.5rem)] has-[data-slot=autocomplete-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)] w-64">
          <AutocompleteInput placeholder="e.g. The Shawshank Redemption" />
          <div className="absolute right-2 bottom-0 flex h-full items-center justify-center">
            <AutocompleteClear className="flex w-6 bg-transparent items-center justify-center rounded p-0 -mt-0.5">
              <XIcon className="size-4" />
            </AutocompleteClear>
            <AutocompleteTrigger className="flex w-6 items-center justify-center rounded bg-transparent p-0">
              <ChevronDownIcon className="size-4" />
            </AutocompleteTrigger>
          </div>
        </div>
        <AutocompletePopup>
          <AutocompleteEmpty>No movies found.</AutocompleteEmpty>
          <AutocompleteList>
            {(movie) => (
              <AutocompleteItem key={movie.id} value={movie}>
                {movie.title}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}

interface Movie {
  id: string;
  title: string;
  year: number;
}

const movies: Movie[] = [
  { id: "1", title: "The Shawshank Redemption", year: 1994 },
  { id: "2", title: "The Godfather", year: 1972 },
  { id: "3", title: "The Dark Knight", year: 2008 },
  { id: "4", title: "Pulp Fiction", year: 1994 },
  { id: "5", title: "Inception", year: 2010 },
];
