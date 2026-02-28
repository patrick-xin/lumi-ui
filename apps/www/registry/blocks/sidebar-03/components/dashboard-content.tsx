"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BookIcon,
  CreditCard,
  Download,
  DownloadCloud,
  FileIcon,
  Filter,
  Loader2,
  MoreHorizontal,
  Receipt,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import * as React from "react";
import { DataTable } from "@/components/blocks/data-table";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
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
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Input } from "@/registry/ui/input";
import { Progress } from "@/registry/ui/progress";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@/registry/ui/tabs";
import { toast } from "@/registry/ui/toast";
import { ChartMixedAxes } from "./chart-mixed-axes";
import { KpiSparkGrid } from "./kpi-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { TeamManagement } from "./team-management";

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

type Activity = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  tag?: "alert" | "info" | "success";
};

const transactions: Txn[] = [
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

const topCustomers = [
  { change: 8.2, mrr: 18420, name: "Aster Labs", plan: "Enterprise" },
  { change: 2.1, mrr: 3920, name: "Northwind", plan: "Business" },
  { change: -1.8, mrr: 2190, name: "Orbital", plan: "Pro" },
  { change: 0.6, mrr: 1299, name: "Kairo Studio", plan: "Pro" },
  { change: -4.7, mrr: 8420, name: "Veridian", plan: "Business" },
];

const activity: Activity[] = [
  {
    id: "a1",
    subtitle: "Bank transfer • $12,840",
    tag: "info",
    time: "3m ago",
    title: "Payout initiated",
  },
  {
    id: "a2",
    subtitle: "Aster Labs • INV-10492",
    tag: "success",
    time: "18m ago",
    title: "Invoice paid",
  },
  {
    id: "a3",
    subtitle: "Veridian • INV-10489",
    tag: "alert",
    time: "2h ago",
    title: "Failed payment",
  },
  {
    id: "a4",
    subtitle: "Northwind • Business plan",
    tag: "success",
    time: "6h ago",
    title: "New subscription",
  },
  {
    id: "a5",
    subtitle: "3 disputes pending review",
    tag: "info",
    time: "1d ago",
    title: "Chargeback window",
  },
  {
    id: "a7",
    subtitle: "Waiting for approval",
    tag: "info",
    time: "1d ago",
    title: "Subscription",
  },
  {
    id: "a8",
    subtitle: "Subscription",
    tag: "alert",
    time: "1d ago",
    title: "Subscription",
  },
  {
    id: "a9",
    subtitle: "Ready for payout",
    tag: "info",
    time: "1d ago",
    title: "Payout",
  },
  {
    id: "a10",
    subtitle: "Weekly report",
    tag: "success",
    time: "1d ago",
    title: "Report",
  },
];

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

function Delta({ value, trend }: { value: string; trend: "up" | "down" }) {
  const Icon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm",
        trend === "up"
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{value}</span>
    </div>
  );
}

function ActivityTag({ tag }: { tag?: Activity["tag"] }) {
  if (!tag) return null;
  const map: Record<
    NonNullable<Activity["tag"]>,
    { label: string; className: string }
  > = {
    alert: {
      className: "bg-destructive/15 text-destructive",
      label: "Attention",
    },
    info: { className: "bg-muted text-foreground", label: "Info" },
    success: { className: "bg-primary/15 text-primary", label: "Success" },
  };
  const t = map[tag];
  return <Badge className={cn("font-normal", t.className)}>{t.label}</Badge>;
}

const fakeApiCall = async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      Math.random() > 0.3 ? resolve() : reject(new Error("Network error"));
    }, 2000);
  });
};

const dialogHandle = createDialogHandle<{
  title: string;
  description: string;
  icon: React.ReactNode;
}>();

type DashboardContentProps = {
  showOnboarding?: boolean;
};

export function DashboardContent({
  showOnboarding = true,
}: DashboardContentProps) {
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

  async function handleGenerateInsights() {
    const toastId = toast.add({
      customContent: (
        <div className="flex items-center gap-2 bg-popover p-4 shadow-lg rounded-md text-sm text-popover-foreground border">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing data...</span>
        </div>
      ),
      timeout: 0,
    });

    try {
      await fakeApiCall();
      toast.update(toastId, {
        actionProps: {
          children: "See details",
          onClick: () => {
            toast.close(toastId);
            dialogHandle.openWithPayload({
              description: "Insights generated successfully.",
              icon: <FileIcon className="h-4 w-4 text-primary" />,
              title: "Success!",
            });
          },
        },
        description: "Insights generated successfully.",
        timeout: 0,
        title: "Success!",
        type: "success",
      });
    } catch {
      toast.update(toastId, {
        actionProps: {
          children: "Retry",
          onClick: () => {
            toast.close(toastId);
            handleGenerateInsights();
          },
        },
        description: "Operation failed. Please try again.",
        timeout: 5000,
        title: "Error!",
        type: "error",
      });
    }
  }

  async function handleCreateInvoice() {
    const toastId = toast.add({
      customContent: (
        <div className="flex items-center gap-2 bg-popover p-4 shadow-lg rounded-md text-sm text-popover-foreground border">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Creating invoice...</span>
        </div>
      ),
      timeout: 0,
    });

    try {
      await new Promise((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.5;
        setTimeout(() => {
          if (shouldSucceed) {
            resolve("operation completed");
          } else {
            reject(new Error("operation failed"));
          }
        }, 2000);
      });

      toast.update(toastId, {
        actionProps: {
          children: "View invoice",
          onClick: () => {
            toast.close(toastId);
            dialogHandle.openWithPayload({
              description: "Invoice created successfully!",
              icon: <BookIcon className="h-4 w-4 text-primary" />,
              title: "Invoice",
            });
          },
        },
        description: "Invoice created successfully!",
        timeout: 0,
        title: "Success!",
        type: "success",
      });
    } catch {
      toast.update(toastId, {
        actionProps: {
          children: "Retry",
          onClick: () => {
            toast.close(toastId);
            handleCreateInvoice();
          },
        },
        description: "Failed to create invoice",
        timeout: 5000,
        title: "Error!",
        type: "error",
      });
    }
  }

  function handleExport() {
    let currentProgress = 0;

    const getContent = (val: number) => (
      <div className="flex flex-col gap-2 bg-accent py-3 px-2 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <DownloadCloud className="h-4 w-4" />
          <span
            className={cn(
              "text-sm",
              val < 100 ? "text-foreground" : "text-primary",
            )}
          >
            {val < 100 ? "Exporting..." : "Complete!"}
          </span>
        </div>
        <Progress className="w-full" value={val} />
      </div>
    );

    const toastId = toast.add({
      customContent: getContent(0),
      timeout: 0,
    });

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        toast.update(toastId, { customContent: getContent(100) });
        setTimeout(() => {
          toast.close(toastId);
        }, 1000);

        return;
      }

      toast.update(toastId, {
        customContent: getContent(currentProgress),
      });
    }, 1000);
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 xl:gap-6">
        <div className="h-120 2xl:h-150">
          <ChartMixedAxes />
        </div>
        <KpiSparkGrid />
        <DataTable />
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">Transactions</CardTitle>
                <CardDescription>
                  Recent invoices and payment attempts.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button className="gap-2" size="sm" variant="secondary">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  className="gap-2"
                  onClick={handleExport}
                  size="sm"
                  variant="outline"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    }
                  ></DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuGroupLabel>Statuses</DropdownMenuGroupLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItemContent
                        checked={showPaid}
                        indicatorPlacement="end"
                        onCheckedChange={(v) => setShowPaid(!!v)}
                      >
                        Paid ({paidCount})
                      </DropdownMenuCheckboxItemContent>
                      <DropdownMenuCheckboxItemContent
                        checked={showPending}
                        indicatorPlacement="end"
                        onCheckedChange={(v) => setShowPending(!!v)}
                      >
                        Pending ({pendingCount})
                      </DropdownMenuCheckboxItemContent>
                      <DropdownMenuCheckboxItemContent
                        checked={showFailed}
                        indicatorPlacement="end"
                        onCheckedChange={(v) => setShowFailed(!!v)}
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
                      <TableHead className="hidden md:table-cell">
                        Method
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[40px]" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map((t) => (
                      <TableRow
                        className="even:bg-primary/5 hover:bg-card even:hover:bg-primary/5 border-0"
                        key={t.id}
                      >
                        <TableCell className="font-medium">{t.id}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.date}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{t.customer}</span>
                            <span className="text-xs text-muted-foreground">
                              {t.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {t.method}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={t.status} />
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatMoney(t.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  className="hover:bg-accent data-popup-open:bg-accent"
                                  size="icon-xs"
                                  variant="unstyled"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              }
                            />

                            <DropdownMenuContent
                              align="end"
                              matchAnchorWidth={false}
                            >
                              <DropdownMenuItem>View invoice</DropdownMenuItem>
                              <DropdownMenuItem>Copy link</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                Report issue
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

          {/* Right rail */}
          <div className="flex flex-col gap-4">
            {/* Health */}
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base">Revenue health</CardTitle>
                <CardDescription>Goal tracking and churn risk.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly goal</span>
                    <span className="tabular-nums">$160,000</span>
                  </div>
                  <Progress className="h-2" value={72} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>72% achieved</span>
                    <span className="tabular-nums">$31,570 remaining</span>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/20 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Forecast</p>
                      <p className="text-xs text-muted-foreground">
                        Projected to hit{" "}
                        <span className="text-foreground font-medium">
                          $168k
                        </span>{" "}
                        if trend holds.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Churn risk</span>
                    <Badge
                      className="bg-destructive/15 text-destructive"
                      variant="secondary"
                    >
                      <AlertTriangle className="h-4 w-4" /> High
                    </Badge>
                  </div>
                  <Progress
                    className="h-2"
                    indicatorClassName="bg-destructive"
                    value={90}
                  />
                  <p className="text-xs text-muted-foreground">
                    Top driver: payment failures increased over the last 7 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base">Activity</CardTitle>
                <CardDescription>Latest operational events.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64" gradientScrollFade noScrollBar>
                  <div className="space-y-3">
                    {activity.map((a) => (
                      <div className="rounded-lg border p-3" key={a.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{a.title}</p>
                              <ActivityTag tag={a.tag} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {a.subtitle}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {a.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="w-full">
          <Card className="xl:col-span-2 ">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">Top customers</CardTitle>
                <CardDescription>
                  Highest MRR accounts this month.
                </CardDescription>
              </div>
              <Button
                className="gap-2"
                onClick={handleExport}
                size="sm"
                variant="outline"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {topCustomers.map((c) => (
                  <div className="rounded-xl border p-4" key={c.name}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{c.name}</p>
                          <Badge
                            className="bg-muted text-foreground"
                            variant="secondary"
                          >
                            {c.plan}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Monthly recurring revenue
                        </p>
                      </div>
                      <Delta
                        trend={c.change >= 0 ? "up" : "down"}
                        value={`${c.change > 0 ? "+" : ""}${c.change.toFixed(1)}%`}
                      />
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-2xl font-semibold tabular-nums">
                        {formatMoney(c.mrr)}
                      </p>
                      <p className="text-xs text-muted-foreground">MRR</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <Tabs className="w-full" defaultValue="pipeline">
                <div className="flex items-center justify-between gap-2">
                  <TabsListContent className="bg-muted">
                    <TabsTab value="pipeline">Pipeline</TabsTab>
                    <TabsTab value="cohorts">Cohorts</TabsTab>
                    <TabsTab value="notes">Notes</TabsTab>
                  </TabsListContent>
                  <Button
                    className="gap-2"
                    onClick={handleCreateInvoice}
                    size="sm"
                    variant="secondary"
                  >
                    <Receipt className="h-4 w-4" />
                    Create invoice
                  </Button>
                </div>

                <TabsPanel className="mt-4" value="pipeline">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Qualified</CardTitle>
                        <CardDescription>Potential deals</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-2xl font-semibold tabular-nums">
                          $42,800
                        </div>
                        <Progress className="h-2" value={58} />
                        <p className="text-xs text-muted-foreground">
                          8 deals • 58% probability
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Negotiation</CardTitle>
                        <CardDescription>Late-stage</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-2xl font-semibold tabular-nums">
                          $18,400
                        </div>
                        <Progress className="h-2" value={34} />
                        <p className="text-xs text-muted-foreground">
                          3 deals • 34% probability
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Closed</CardTitle>
                        <CardDescription>This month</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-2xl font-semibold tabular-nums">
                          $27,900
                        </div>
                        <Progress className="h-2" value={78} />
                        <p className="text-xs text-muted-foreground">
                          5 wins • 78% target
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsPanel>

                <TabsPanel className="mt-4" value="cohorts">
                  <div className="rounded-xl border p-4">
                    <p className="text-sm font-medium">Retention (mock)</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Simulated cohort retention for the last 6 weeks.
                    </p>
                    <div className="mt-4 grid grid-cols-6 gap-2">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          className="h-10 rounded-md border bg-muted/40"
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                </TabsPanel>

                <TabsPanel className="mt-4" value="notes">
                  <div className="rounded-xl border p-4 space-y-2">
                    <p className="text-sm font-medium">Operator notes</p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>
                        Payment failure rate spiked on Jan 29, 2026 due to
                        issuer timeouts.
                      </li>
                      <li>
                        High-MRR accounts show stable renewal intent; focus on
                        mid-tier churn prevention.
                      </li>
                      <li>
                        Next: add dunning automation and real-time webhook
                        retries.
                      </li>
                    </ul>
                  </div>
                </TabsPanel>
              </Tabs>
            </CardContent>
          </Card>
        </section>
        <section className="grid grid-cols-2 gap-6">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-base">Account owners</CardTitle>
              <CardDescription>Who’s on point for renewals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  img: "",
                  initials: "MP",
                  load: 78,
                  name: "Mina Park",
                  role: "Enterprise",
                },
                {
                  img: "",
                  initials: "JT",
                  load: 52,
                  name: "Jon Tan",
                  role: "Business",
                },
                {
                  img: "",
                  initials: "SK",
                  load: 34,
                  name: "Sara Kim",
                  role: "SMB",
                },
                {
                  img: "",
                  initials: "IR",
                  load: 61,
                  name: "Ishan Rao",
                  role: "Support",
                },
              ].map((p) => (
                <div className="rounded-xl border p-3" key={p.name}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage alt={p.name} src={p.img} />
                        <AvatarFallback className="bg-muted text-foreground">
                          {p.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-none">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className="bg-muted text-foreground"
                      variant="secondary"
                    >
                      {p.load}%
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Progress className="h-2" value={p.load} />
                  </div>
                </div>
              ))}

              <Button className="w-full gap-2" variant="secondary">
                <Users className="h-4 w-4" />
                Manage assignments
              </Button>
            </CardContent>
          </Card>
          <TeamManagement />
        </section>
        <section className="w-full">
          <Card className="">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">Insights</CardTitle>
                <CardDescription>
                  Automated highlights (mock content).
                </CardDescription>
              </div>
              <Button
                className="gap-2"
                onClick={handleGenerateInsights}
                size="sm"
                variant="outline"
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border p-4">
                <p className="text-sm font-medium">Anomaly</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Failure rate peaked on Jan 29, 2026. Consider retries + issuer
                  fallback.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/15">
                    High
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Payments
                  </span>
                </div>
              </div>

              <div className="rounded-xl border p-4 h-full flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium">Opportunity</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    6 accounts nearing usage limit — upsell to Business tier.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                    Growth
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Expansion
                  </span>
                </div>
              </div>

              <div className="rounded-xl border p-4 flex flex-col h-full justify-between">
                <div>
                  <p className="text-sm font-medium">Cashflow</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pending invoices total{" "}
                    {formatMoney(
                      transactions
                        .filter((t) => t.status === "pending")
                        .reduce((a, b) => a + b.amount, 0),
                    )}
                    .
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge
                    className="bg-muted text-foreground hover:bg-muted"
                    variant="secondary"
                  >
                    Monitor
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Collections
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <Dialog handle={dialogHandle}>
        {({ payload }) => {
          return (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {payload?.icon}
                  {payload?.title}
                </DialogTitle>
                <DialogDescription>{payload?.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DialogFooter>
            </DialogContent>
          );
        }}
      </Dialog>
    </>
  );
}
