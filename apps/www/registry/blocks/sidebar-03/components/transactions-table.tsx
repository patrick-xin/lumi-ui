"use client";

import {
  AlertTriangle,
  CreditCard,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Share,
  Sparkles,
  X,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";
import {
  createPopoverHandle,
  Popover,
  PopoverBackdrop,
  PopoverClose,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
} from "@/registry/ui/popover";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import {
  createSheetHandle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/registry/ui/sheet";
import { Textarea } from "@/registry/ui/textarea";
import { toast } from "@/registry/ui/toast";
import { ShareForm } from "./share-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const actionHandle = createDropdownMenuHandle<Txn>();
const shareInvoicePopoverHandle = createPopoverHandle<Txn>();
const reportIssueSheetHandle = createSheetHandle<Txn>();

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, {
    currency: "USD",
    style: "currency",
  });
}

function StatusBadge({ status }: { status: TxnStatus }) {
  if (status === "paid")
    return (
      <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
        Paid
      </Badge>
    );
  if (status === "pending")
    return (
      <Badge
        className="bg-muted text-foreground hover:bg-muted"
        variant="secondary"
      >
        Pending
      </Badge>
    );
  return (
    <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/15">
      Failed
    </Badge>
  );
}

type TransactionsTableProps = {
  onExport?: () => void;
};

export function TransactionsTable({ onExport }: TransactionsTableProps) {
  const [query, setQuery] = React.useState("");
  const [showPaid, setShowPaid] = React.useState(true);
  const [showPending, setShowPending] = React.useState(true);
  const [showFailed, setShowFailed] = React.useState(true);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      const statusOk =
        (t.status === "paid" && showPaid) ||
        (t.status === "pending" && showPending) ||
        (t.status === "failed" && showFailed);

      const queryOk =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q);

      return statusOk && queryOk;
    });
  }, [query, showPaid, showPending, showFailed]);

  const totalRevenue = transactions.reduce(
    (acc, t) => acc + (t.status === "paid" ? t.amount : 0),
    0,
  );
  const paidCount = transactions.filter((t) => t.status === "paid").length;
  const pendingCount = transactions.filter(
    (t) => t.status === "pending",
  ).length;
  const failedCount = transactions.filter((t) => t.status === "failed").length;

  return (
    <>
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-base">
              Transactions Table using Normal Table
            </CardTitle>
            <CardDescription>
              Recent invoices and payment attempts.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2"
              onClick={onExport}
              size="sm"
              variant="outline"
            >
              <Download className="size-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input
                className="pl-8"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by invoice, customer, email…"
                value={query}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className="gap-2" size="sm" variant="outline">
                    <Filter className="size-4" />
                    Filter
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>Statuses</DropdownMenuGroupLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItemContent
                    checked={showPaid}
                    indicatorPlacement="end"
                    onCheckedChange={(value) => setShowPaid(Boolean(value))}
                  >
                    Paid ({paidCount})
                  </DropdownMenuCheckboxItemContent>
                  <DropdownMenuCheckboxItemContent
                    checked={showPending}
                    indicatorPlacement="end"
                    onCheckedChange={(value) => setShowPending(Boolean(value))}
                  >
                    Pending ({pendingCount})
                  </DropdownMenuCheckboxItemContent>
                  <DropdownMenuCheckboxItemContent
                    checked={showFailed}
                    indicatorPlacement="end"
                    onCheckedChange={(value) => setShowFailed(Boolean(value))}
                  >
                    Failed ({failedCount})
                  </DropdownMenuCheckboxItemContent>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-left">Amount</TableHead>
                  <TableHead className="w-20 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((transaction) => (
                  <TableRow
                    className="even:bg-primary/5 hover:bg-card even:hover:bg-primary/5 border-0"
                    key={transaction.id}
                  >
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{transaction.customer}</span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {transaction.method}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell className="text-left tabular-nums">
                      {formatMoney(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="relative inline-flex">
                        <PopoverTrigger
                          className="pointer-events-none absolute inset-0"
                          disabled
                          handle={shareInvoicePopoverHandle}
                          id={`share-anchor-${transaction.id}`}
                          nativeButton={false}
                          payload={transaction}
                          render={<span aria-hidden />}
                        />
                        <DropdownMenuTrigger
                          handle={actionHandle}
                          payload={transaction}
                          render={
                            <Button size="icon-xs" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      className="py-10 text-center text-sm text-muted-foreground"
                      colSpan={7}
                    >
                      No results. Try another search or filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Paid revenue:</span>
              <span className="font-medium text-foreground tabular-nums">
                {formatMoney(totalRevenue)}
              </span>
            </div>
            <Separator className="h-5" orientation="vertical" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Conversion uplift:</span>
              <span className="font-medium text-foreground">+1.7%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <DropdownMenu handle={actionHandle}>
        {({ payload: transaction }) => (
          <DropdownMenuContent align="end" matchAnchorWidth={false}>
            <DropdownMenuItem disabled>
              <Eye />
              View invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!transaction}
              onClick={() => {
                if (!transaction) return;
                shareInvoicePopoverHandle.open(
                  `share-anchor-${transaction.id}`,
                );
              }}
            >
              <Share /> Share invoice
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (!transaction) return;
                reportIssueSheetHandle.openWithPayload(transaction);
              }}
              variant="destructive"
            >
              <AlertTriangle /> Report issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <Popover handle={shareInvoicePopoverHandle}>
        {({ payload: transaction }) => (
          <PopoverPortal>
            <PopoverBackdrop className="animate-fade bg-black/20 backdrop-blur-[2px] fixed inset-0" />
            <PopoverPositioner
              align="end"
              disableAnchorTracking
              side="left"
              sideOffset={12}
            >
              <PopoverPopup
                className="relative rounded-md bg-popover p-4 text-popover-foreground shadow-md overlay-outline animate-popup"
                data-slot="popover-content"
              >
                <PopoverClose
                  render={
                    <Button
                      className="absolute right-2 top-2"
                      size="icon-xs"
                      variant="ghost"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  }
                />
                <ShareForm invoiceId={transaction?.id} />
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
      <Sheet handle={reportIssueSheetHandle}>
        {({ payload: transaction }) => (
          <SheetContent
            className="flex flex-col max-w-lg mx-auto"
            inset
            showCloseButton
            side="top"
          >
            <SheetHeader className="flex-none">
              <SheetTitle>Report Issue</SheetTitle>
              <SheetDescription>
                Report an issue for{" "}
                <span className="font-medium text-foreground">
                  {transaction?.id}
                </span>
                .
              </SheetDescription>
            </SheetHeader>
            <Form
              className="flex flex-col justify-between"
              onFormSubmit={(values) => {
                toast.success({
                  description: `Issue type: ${values.issueType}, Issue description: ${values.issueDescription}`,
                  title: "Form submitted",
                });
                reportIssueSheetHandle.close();
              }}
            >
              <div className="flex-1 space-y-4">
                <Field name="issueType">
                  <FieldLabel>Issue Type</FieldLabel>
                  <Select items={issueTypeOptions} required>
                    <SelectTriggerGroup placeholder="Select issue type" />

                    <SelectContent>
                      {issueTypeOptions.map((option) => (
                        <SelectItemContent
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItemContent>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError />
                </Field>
                <Field name="issueDescription">
                  <FieldLabel>Issue Description</FieldLabel>
                  <FieldControl
                    minLength={10}
                    placeholder="Describe the issue"
                    render={
                      <Textarea className="min-h-[100px] bg-transparent!" />
                    }
                    required
                  />
                  <FieldError />
                </Field>
              </div>
              <SheetFooter className="mt-auto">
                <Button type="submit">Submit</Button>
              </SheetFooter>
            </Form>
          </SheetContent>
        )}
      </Sheet>
    </>
  );
}

type TxnStatus = "paid" | "pending" | "failed";
type Txn = {
  id: string;
  date: string;
  customer: string;
  email: string;
  amount: number;
  status: TxnStatus;
  method: "Card" | "Bank" | "Wallet";
};

export const transactions: Txn[] = [
  {
    amount: 18420,
    customer: "Aster Labs",
    date: "Jan 30, 2026",
    email: "billing@asterlabs.com",
    id: "INV-10492",
    method: "Card",
    status: "paid",
  },
  {
    amount: 3920,
    customer: "Northwind",
    date: "Jan 30, 2026",
    email: "ap@northwind.io",
    id: "INV-10491",
    method: "Bank",
    status: "pending",
  },
  {
    amount: 1299,
    customer: "Kairo Studio",
    date: "Jan 29, 2026",
    email: "finance@kairo.studio",
    id: "INV-10490",
    method: "Wallet",
    status: "paid",
  },
  {
    amount: 8420,
    customer: "Veridian",
    date: "Jan 29, 2026",
    email: "ops@veridian.co",
    id: "INV-10489",
    method: "Card",
    status: "failed",
  },
  {
    amount: 2190,
    customer: "Orbital",
    date: "Jan 28, 2026",
    email: "accounts@orbital.app",
    id: "INV-10488",
    method: "Bank",
    status: "paid",
  },
  {
    amount: 5600,
    customer: "Helios Systems",
    date: "Jan 28, 2026",
    email: "billing@helios.systems",
    id: "INV-10487",
    method: "Card",
    status: "paid",
  },
  {
    amount: 980,
    customer: "Monoform",
    date: "Jan 27, 2026",
    email: "finance@monoform.design",
    id: "INV-10486",
    method: "Wallet",
    status: "paid",
  },
  {
    amount: 14750,
    customer: "Polaris Tech",
    date: "Jan 27, 2026",
    email: "ap@polaristech.ai",
    id: "INV-10485",
    method: "Bank",
    status: "pending",
  },
  {
    amount: 3200,
    customer: "NovaWorks",
    date: "Jan 26, 2026",
    email: "billing@novaworks.dev",
    id: "INV-10484",
    method: "Card",
    status: "paid",
  },
];

const issueTypeOptions: Array<{ label: string; value: string }> = [
  { label: "Billing", value: "billing" },
  { label: "Technical", value: "technical" },
  { label: "Other", value: "other" },
];
