"use client";

import {
  ArrowDownIcon,
  ArrowRightLeft,
  ArrowUpIcon,
  BarChart3,
  Bell,
  CornerDownLeftIcon,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  PieChart,
  Plus,
  PlusCircle,
  Receipt,
  Settings,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandMenu,
  CommandMenuContent,
  CommandMenuFooter,
  CommandMenuTrigger,
  CommandScrollArea,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/ui/command-menu";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";

export function DashboardCommand() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "l") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <CommandMenu onOpenChange={setIsOpen} open={isOpen}>
      <CommandMenuTrigger
        render={<Button className="w-fit px-1.5" size="sm" variant="glow" />}
      >
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>L</Kbd>
        </KbdGroup>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <Command items={groupedItems}>
          <CommandInput
            autoFocus
            className="caret-primary"
            inputSize="lg"
            placeholder="Search accounts, transactions, reports..."
            showClear
            variant="ghost"
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandScrollArea gradientScrollFade noScrollBar>
            <CommandList>
              {(group: Group) => (
                <React.Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => {
                        const Icon = item.icon;
                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => setIsOpen(false)}
                            value={item}
                          >
                            <Icon className="size-4 text-muted-foreground group-data-highlighted/command-item:text-foreground" />
                            {item.label}
                            {item.shortcut && (
                              <CommandShortcut className="hidden md:block">
                                {item.shortcut}
                              </CommandShortcut>
                            )}
                          </CommandItem>
                        );
                      }}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              )}
            </CommandList>
          </CommandScrollArea>
        </Command>

        <CommandMenuFooter className="hidden md:flex">
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd>
                <ArrowUpIcon />
              </Kbd>
              <Kbd>
                <ArrowDownIcon />
              </Kbd>
            </KbdGroup>
            <span>Navigate</span>
          </div>

          <div className="flex items-center gap-2">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
            <span>Activate</span>
          </div>
        </CommandMenuFooter>
      </CommandMenuContent>
    </CommandMenu>
  );
}

interface Item {
  value: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
}

interface Group {
  value: string;
  items: Item[];
}

const finance: Item[] = [
  { icon: Wallet, label: "Accounts", shortcut: "⌘A", value: "accounts" },
  {
    icon: ArrowRightLeft,
    label: "Transactions",
    shortcut: "⌘T",
    value: "transactions",
  },
  { icon: FileText, label: "Invoices", value: "invoices" },
  { icon: Receipt, label: "Expenses", shortcut: "⌘E", value: "expenses" },
  { icon: DollarSign, label: "Payments", value: "payments" },
];

const analytics: Item[] = [
  {
    icon: BarChart3,
    label: "Performance",
    shortcut: "⌘P",
    value: "performance",
  },
  { icon: TrendingUp, label: "Revenue Analysis", value: "revenue" },
  { icon: TrendingDown, label: "Spending Habits", value: "spending" },
  { icon: PieChart, label: "Asset Allocation", value: "assets" },
];

const actions: Item[] = [
  {
    icon: Plus,
    label: "New Transaction",
    shortcut: "⌘N",
    value: "new-transaction",
  },
  { icon: PlusCircle, label: "Add Bank Account", value: "add-account" },
  {
    icon: Download,
    label: "Export Statement (PDF)",
    shortcut: "⌘S",
    value: "export-json",
  },
  { icon: CreditCard, label: "Manage Cards", value: "manage-cards" },
];

const system: Item[] = [
  { icon: Bell, label: "Notifications", value: "notifications" },
  {
    icon: Settings,
    label: "General Settings",
    shortcut: "⌘,",
    value: "settings",
  },
];

const groupedItems: Group[] = [
  { items: finance, value: "Finance" },
  { items: analytics, value: "Analytics" },
  { items: actions, value: "Actions" },
  { items: system, value: "System" },
];
