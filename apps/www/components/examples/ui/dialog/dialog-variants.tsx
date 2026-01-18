"use client";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Button } from "@lumi-ui/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type popupVariants,
} from "@lumi-ui/ui/dialog";
import { Input } from "@lumi-ui/ui/input";
import { Label } from "@lumi-ui/ui/label";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@lumi-ui/ui/select";
import { Textarea } from "@lumi-ui/ui/textarea";

type DialogLayout = VariantProps<typeof popupVariants>["layout"];

interface DialogPayload {
  layout: DialogLayout;
  title: string;
  description: string;
  body?: React.ReactNode;
  actionLabel?: string;
  showCancel?: boolean;
}

const mainDialogHandle = createDialogHandle<DialogPayload>();

export function DialogVariantsDemo() {
  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-6 text-sm mx-auto">
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Positions</div>
          <div className="flex gap-2 flex-wrap">
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Send Invite",
                body: (
                  <div className="py-4 space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" placeholder="colleague@company.com" />
                    </div>
                    <div className="flex flex-col gap-3 pt-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        People with access
                      </Label>
                      {[
                        {
                          initials: "OM",
                          name: "Olivia Martin",
                          role: "Admin",
                        },
                        {
                          initials: "IN",
                          name: "Isabella Nguyen",
                          role: "Member",
                        },
                      ].map((user) => (
                        <div
                          className="flex items-center justify-between"
                          key={user.name}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-muted text-xs font-medium">
                              {user.initials}
                            </div>
                            <div className="text-sm">
                              <div className="font-medium leading-none">
                                {user.name}
                              </div>
                              <div className="text-muted-foreground text-xs mt-1">
                                {user.role}
                              </div>
                            </div>
                          </div>
                          <Button
                            className="text-muted-foreground h-8"
                            size="sm"
                            variant="ghost"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
                description:
                  "Invite team members to collaborate on this project.",
                layout: "responsive",
                showCancel: true,
                title: "Share Project",
              }}
              render={<Button>Responsive</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Submit Feedback",
                body: (
                  <Textarea
                    className="h-32"
                    placeholder="Enter your feedback"
                  />
                ),
                description: "Let us know what went wrong.",
                layout: "top",
                title: "Report an Issue",
              }}
              render={<Button>Top</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Save Changes",
                body: (
                  <div className="py-2 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select items={categories}>
                        <SelectTriggerGroup placeholder="Select a category" />
                        <SelectContent className="w-32">
                          {categories.map((category) => (
                            <SelectItemContent
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItemContent>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        className="min-h-[100px]"
                        id="message"
                        placeholder="Describe the issue in detail..."
                      />
                    </div>
                  </div>
                ),
                description: "Help us improve by sending your feedback.",
                layout: "center",
                title: "Contact Support",
              }}
              render={<Button>Center</Button>}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Behaviors</div>
          <div className="flex gap-2 flex-wrap">
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Accept Terms",
                body: (
                  <div className="space-y-4">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        className="flex h-32 w-full shrink-0 items-center justify-center rounded-md bg-muted/50 border border-dashed"
                        key={i}
                      >
                        <span className="font-medium text-sm text-muted-foreground">
                          Agreement Section {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
                description: "Please read the updated terms of service.",
                layout: "scrollable",
                title: "Terms & Conditions",
              }}
              render={<Button>Scrollable</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Done",
                body: <NestedDialog />,
                description: "Manage your active third-party integrations.",
                layout: "stacked",
                showCancel: false,
                title: "Integrations",
              }}
              render={<Button>Stacked</Button>}
            />
          </div>
        </div>
      </div>
      <Dialog handle={mainDialogHandle}>
        {({ payload }) => {
          if (!payload) return null;

          const header = (
            <DialogHeader>
              <DialogTitle>{payload.title}</DialogTitle>
              <DialogDescription>{payload.description}</DialogDescription>
            </DialogHeader>
          );

          const footer = (
            <DialogFooter>
              {(payload.showCancel ?? true) && (
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
              )}
              <DialogClose
                render={<Button>{payload.actionLabel || "Continue"}</Button>}
              />
            </DialogFooter>
          );

          if (payload.layout === "scrollable") {
            return (
              <DialogContent layout="scrollable" showCloseButton>
                {header}
                <ScrollArea className="pr-4">{payload.body}</ScrollArea>
                {footer}
              </DialogContent>
            );
          }

          if (payload.layout === "stacked") {
            return (
              <DialogContent layout="stacked">
                {header}
                {payload.body}
                {footer}
              </DialogContent>
            );
          }

          return (
            <DialogContent
              layout={payload.layout as "top" | "responsive" | "center"}
              showCloseButton
            >
              {header}
              {payload.body}
              {footer}
            </DialogContent>
          );
        }}
      </Dialog>
    </div>
  );
}

function NestedDialog() {
  return (
    <Dialog>
      <div className="flex flex-col gap-3 py-2">
        {["GitHub", "Slack", "Linear"].map((app) => (
          <div
            className="flex items-center justify-between p-3 border rounded-lg bg-card"
            key={app}
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-primary/10 grid place-items-center">
                <span className="text-xs font-bold text-primary">{app[0]}</span>
              </div>
              <div className="text-sm font-medium">{app}</div>
            </div>
            <DialogTrigger
              render={
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              }
            />
          </div>
        ))}
      </div>
      <DialogContent layout="stacked">
        <DialogHeader>
          <DialogTitle>Configure Integration</DialogTitle>
          <DialogDescription>
            Enter your API key to connect this service.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            readOnly
            type="password"
            value="sk_test_123456789"
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Back</Button>} />
          <DialogClose render={<Button>Save Configuration</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const categories = [
  { label: "Bug Report", value: "bug-report" },
  { label: "Feature Request", value: "feature-request" },
  { label: "Billing Issue", value: "billing-issue" },
];
