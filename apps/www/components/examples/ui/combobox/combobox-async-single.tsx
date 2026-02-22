"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItemContent,
  ComboboxList,
  ComboboxStatus,
  useComboboxFilter,
} from "@/registry/ui/combobox";

export function ComboboxAsyncSingleDemo() {
  const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]);
  const [selectedValue, setSelectedValue] =
    React.useState<DirectoryUser | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const { contains } = useComboboxFilter();

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const trimmedSearchValue = searchValue.trim();

  const items = React.useMemo(() => {
    if (
      !selectedValue ||
      searchResults.some((user) => user.id === selectedValue.id)
    ) {
      return searchResults;
    }

    return [...searchResults, selectedValue];
  }, [searchResults, selectedValue]);

  function getStatus() {
    if (isPending) {
      return (
        <React.Fragment>
          <span
            aria-hidden
            className="inline-block size-3 animate-spin rounded-full border border-current border-r-transparent rtl:border-r-current rtl:border-l-transparent"
          />
          Searching...
        </React.Fragment>
      );
    }

    if (error) {
      return error;
    }

    if (trimmedSearchValue === "") {
      return selectedValue ? null : "Start typing to search people...";
    }

    if (searchResults.length === 0) {
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
      filter={null}
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      onInputValueChange={(nextSearchValue, { reason }) => {
        setSearchValue(nextSearchValue);

        if (nextSearchValue === "") {
          setSearchResults([]);
          setError(null);
          return;
        }

        if (reason === "item-press") {
          return;
        }

        const controller = new AbortController();
        abortControllerRef.current?.abort();
        abortControllerRef.current = controller;

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
      onOpenChangeComplete={(open) => {
        if (!open && selectedValue) {
          setSearchResults([selectedValue]);
        }
      }}
      onValueChange={(nextSelectedValue) => {
        setSelectedValue(nextSelectedValue);
        setSearchValue("");
        setError(null);
      }}
    >
      <ComboboxInputGroup className="w-64" placeholder="Search..." />

      <ComboboxContent aria-busy={isPending || undefined}>
        <ComboboxStatus className="p-2">{getStatus()}</ComboboxStatus>

        <ComboboxEmpty className="p-2 text-left">
          {getEmptyMessage()}
        </ComboboxEmpty>

        <ComboboxList>
          {(user: DirectoryUser) => (
            <ComboboxItemContent
              className="items-start"
              key={user.id}
              value={user}
            >
              <div className="flex flex-col gap-1">
                <div className="font-medium">{user.name}</div>
                <div className="flex flex-wrap gap-3">
                  <span className="opacity-80">@{user.username}</span>
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
      error: "Failed to fetch people. Please try again.",
      users: [],
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
    error: null,
    users,
  };
}

const allUsers: DirectoryUser[] = [
  {
    email: "michael.foster@example.com",
    id: "michael-foster",
    name: "Michael Foster",
    title: "Engineering Manager",
    username: "michael",
  },
  {
    email: "lindsay.walton@example.com",
    id: "lindsay-walton",
    name: "Lindsay Walton",
    title: "Product Designer",
    username: "lindsay",
  },
  {
    email: "tom.cook@example.com",
    id: "tom-cook",
    name: "Tom Cook",
    title: "Frontend Engineer",
    username: "tom",
  },
  {
    email: "whitney.francis@example.com",
    id: "whitney-francis",
    name: "Whitney Francis",
    title: "Customer Success",
    username: "whitney",
  },
  {
    email: "arlene.mccoy@example.com",
    id: "arlene-mccoy",
    name: "Arlene McCoy",
    title: "Data Analyst",
    username: "arlene",
  },
];
