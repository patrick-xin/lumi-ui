"use client";

import { Loader2 } from "lucide-react";
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
  ComboboxStatus,
  ComboboxValue,
  useComboboxFilter,
} from "@/registry/ui/combobox";

export function ComboboxAsyncMultipleDemo() {
  const id = React.useId();

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<DirectoryUser[]>(
    [],
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [blockStartStatus, setBlockStartStatus] = React.useState(false);

  const [isPending, startTransition] = React.useTransition();

  const { contains } = useComboboxFilter();

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const selectedValuesRef = React.useRef<DirectoryUser[]>([]);

  const trimmedSearchValue = searchValue.trim();

  const items = React.useMemo(() => {
    if (selectedValues.length === 0) {
      return searchResults;
    }

    const merged = [...searchResults];

    selectedValues.forEach((user) => {
      if (!searchResults.some((result) => result.id === user.id)) {
        merged.push(user);
      }
    });

    return merged;
  }, [searchResults, selectedValues]);

  function getStatus() {
    if (isPending) {
      return (
        <React.Fragment>
          <Loader2 className=" h-4 w-4 animate-spin" />
          Searching...
        </React.Fragment>
      );
    }

    if (error) {
      return error;
    }

    if (trimmedSearchValue === "" && !blockStartStatus) {
      return selectedValues.length > 0
        ? null
        : "Start typing to search people...";
    }

    if (searchResults.length === 0 && !blockStartStatus) {
      return `No matches for "${trimmedSearchValue}".`;
    }

    return null;
  }

  function getEmptyMessage() {
    if (
      trimmedSearchValue === "" ||
      isPending ||
      searchResults.length > 0 ||
      error
    ) {
      return null;
    }

    return "Try a different search term.";
  }

  return (
    <Combobox
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      multiple
      filter={null}
      onOpenChangeComplete={(open) => {
        if (!open) {
          setSearchResults(selectedValuesRef.current);
          setBlockStartStatus(false);
        }
      }}
      onValueChange={(nextSelectedValues) => {
        selectedValuesRef.current = nextSelectedValues;
        setSelectedValues(nextSelectedValues);
        setSearchValue("");
        setError(null);

        if (nextSelectedValues.length === 0) {
          setSearchResults([]);
          setBlockStartStatus(false);
        } else {
          setBlockStartStatus(true);
        }
      }}
      onInputValueChange={(nextSearchValue, { reason }) => {
        setSearchValue(nextSearchValue);

        const controller = new AbortController();
        abortControllerRef.current?.abort();
        abortControllerRef.current = controller;

        if (nextSearchValue === "") {
          setSearchResults(selectedValuesRef.current);
          setError(null);
          setBlockStartStatus(false);
          return;
        }

        if (reason === "item-press") {
          return;
        }

        startTransition(async () => {
          setError(null);

          const result = await searchUsers(nextSearchValue, contains);

          if (controller.signal.aborted) {
            return;
          }

          startTransition(() => {
            setSearchResults(result.users);
            setError(result.error);
          });
        });
      }}
    >
      <ComboboxChips ref={containerRef} className="w-[16rem] md:w-[20rem]">
        <ComboboxValue>
          {(value: DirectoryUser[]) => (
            <React.Fragment>
              {value.length > 0 &&
                value.map((user) => (
                  <ComboboxChip key={user.id} aria-label={user.name}>
                    {user.name}
                  </ComboboxChip>
                ))}

              <ComboboxInputGroup
                id={id}
                placeholder={value.length > 0 ? "" : "e.g. Michael"}
                variant="ghost"
                className="min-w-24"
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent
        aria-busy={isPending || undefined}
        sideOffset={8}
        positionerAnchor={containerRef}
      >
        <ComboboxStatus className="p-2">{getStatus()}</ComboboxStatus>
        <ComboboxEmpty className="text-left p-2">
          {getEmptyMessage()}
        </ComboboxEmpty>
        <ComboboxList>
          {(user: DirectoryUser) => (
            <ComboboxItemContent key={user.id} value={user}>
              <div className="flex flex-col gap-1">
                <div className="font-medium">{user.name}</div>
                <div className="flex flex-wrap gap-2 text-sm ">
                  <span className="opacity-80">@{user.username}</span>
                  <span>{user.title}</span>
                </div>
              </div>
            </ComboboxItemContent>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

interface DirectoryUser {
  id: string;
  name: string;
  username: string;
  email: string;
  title: string;
}

async function searchUsers(
  query: string,
  filter: (item: string, query: string) => boolean,
): Promise<{ users: DirectoryUser[]; error: string | null }> {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 500 + 100);
  });

  // Simulate occasional network errors (1% chance)
  if (Math.random() < 0.01 || query === "will_error") {
    return {
      users: [],
      error: "Failed to fetch people. Please try again.",
    };
  }

  const users = allUsers.filter((user) => {
    return (
      filter(user.name, query) ||
      filter(user.username, query) ||
      filter(user.email, query) ||
      filter(user.title, query)
    );
  });

  return {
    users,
    error: null,
  };
}

const allUsers: DirectoryUser[] = [
  {
    id: "leslie-alexander",
    name: "Leslie Alexander",
    username: "leslie",
    email: "leslie.alexander@example.com",
    title: "Product Manager",
  },
  {
    id: "kathryn-murphy",
    name: "Kathryn Murphy",
    username: "kathryn",
    email: "kathryn.murphy@example.com",
    title: "Marketing Lead",
  },
  {
    id: "courtney-henry",
    name: "Courtney Henry",
    username: "courtney",
    email: "courtney.henry@example.com",
    title: "Design Systems",
  },
  {
    id: "michael-foster",
    name: "Michael Foster",
    username: "michael",
    email: "michael.foster@example.com",
    title: "Engineering Manager",
  },
];
