"use client";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Button } from "@/registry/ui/button";
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
} from "@/registry/ui/dialog";
import { ScrollArea } from "@/registry/ui/scroll-area";

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
                actionLabel: "Dismiss",
                body: (
                  <div className="py-4 space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        className="flex items-center gap-4 p-3 border border-dashed rounded-lg"
                        key={i}
                      >
                        <div className="size-8 rounded-full" />
                        <div className="text-sm">
                          <div className="font-medium">Update {i}</div>
                          <div className="text-muted-foreground text-xs">
                            System update completed.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                description: "You are all caught up.",
                layout: "responsive",
                showCancel: false,
                title: "Notifications",
              }}
              render={<Button>Responsive</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Save Changes",
                body: (
                  <div className="h-32 rounded-md grid place-items-center text-sm text-muted-foreground border border-dashed">
                    Form Inputs Go Here
                  </div>
                ),
                description: "Make changes to your profile here.",
                layout: "top",
                title: "Edit Profile",
              }}
              render={<Button>Top</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Close",
                description: "You are all caught up.",
                layout: "center",
                title: "Notifications",
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
                actionLabel: "Accept",
                body: (
                  <div className="space-y-4">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        className="flex h-32 w-full shrink-0 items-center justify-center rounded-md bg-accent/30 border"
                        key={i}
                      >
                        <span className="font-medium text-sm text-muted-foreground">
                          Clause {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
                description: "Please read carefully before proceeding.",
                layout: "scrollable",
                title: "Terms of Service",
              }}
              render={<Button>Scrollable</Button>}
            />
            <DialogTrigger
              handle={mainDialogHandle}
              payload={{
                actionLabel: "Complete",
                body: <NestedDialog />,
                description:
                  "This is the parent dialog. Interaction with it is active until you open the child.",
                layout: "stacked",
                title: "Level 1: Configuration",
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
      <DialogTrigger
        render={
          <Button className="w-fit" variant="secondary">
            Open Level 2 (Nested)
          </Button>
        }
      />
      <DialogContent layout="stacked">
        <DialogHeader>
          <DialogTitle>Level 2: Confirmation</DialogTitle>
        </DialogHeader>
        <div>The parent dialog scales down behind this one.</div>
        <DialogFooter>
          <DialogClose render={<Button>Close Level 2</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
