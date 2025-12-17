"use client";
import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
  useComboboxFilter,
} from "@/registry/ui/combobox";

export default function ExampleAsyncMultipleCombobox() {
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
          <span
            aria-hidden
            className="inline-block size-3 animate-[spin_0.75s_linear_infinite] rounded-full border border-current border-r-transparent rtl:border-r-current rtl:border-l-transparent"
          />
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
      <div className="flex flex-col gap-2 w-80">
        <label className="inline-flex text-inherit" htmlFor={id}>
          Assign reviewers
        </label>
        <ComboboxChips ref={containerRef}>
          <ComboboxValue>
            {(value: DirectoryUser[]) => (
              <React.Fragment>
                {value.map((user) => (
                  <ComboboxChip key={user.id} aria-label={user.name}>
                    {user.name}
                  </ComboboxChip>
                ))}

                <ComboboxInput
                  id={id}
                  placeholder={value.length > 0 ? "" : "e.g. Michael"}
                  multiple
                />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </div>

      <ComboboxContent aria-busy={isPending || undefined} sideOffset={8}>
        <ComboboxStatus>{getStatus()}</ComboboxStatus>
        <ComboboxEmpty>{getEmptyMessage()}</ComboboxEmpty>
        <ComboboxList>
          {(user: DirectoryUser) => (
            <ComboboxItem key={user.id} value={user}>
              <div className="col-start-2 flex flex-col gap-1">
                <div className="font-medium">{user.name}</div>
                <div className="flex flex-wrap gap-2 text-[0.8125rem] ">
                  <span className="opacity-80">@{user.username}</span>
                  <span>{user.title}</span>
                </div>
              </div>
            </ComboboxItem>
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
];
