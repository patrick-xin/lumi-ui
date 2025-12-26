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
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      filter={null}
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
    >
      <ComboboxInputGroup placeholder="Search..." className="w-64" />

      <ComboboxContent aria-busy={isPending || undefined}>
        <ComboboxStatus className="p-2">{getStatus()}</ComboboxStatus>

        <ComboboxEmpty className="p-2 text-left">
          {getEmptyMessage()}
        </ComboboxEmpty>

        <ComboboxList>
          {(user: DirectoryUser) => (
            <ComboboxItemContent key={user.id} value={user}>
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
    id: "michael-foster",
    name: "Michael Foster",
    username: "michael",
    email: "michael.foster@example.com",
    title: "Engineering Manager",
  },
  {
    id: "lindsay-walton",
    name: "Lindsay Walton",
    username: "lindsay",
    email: "lindsay.walton@example.com",
    title: "Product Designer",
  },
  {
    id: "tom-cook",
    name: "Tom Cook",
    username: "tom",
    email: "tom.cook@example.com",
    title: "Frontend Engineer",
  },
  {
    id: "whitney-francis",
    name: "Whitney Francis",
    username: "whitney",
    email: "whitney.francis@example.com",
    title: "Customer Success",
  },
  {
    id: "arlene-mccoy",
    name: "Arlene McCoy",
    username: "arlene",
    email: "arlene.mccoy@example.com",
    title: "Data Analyst",
  },
];
