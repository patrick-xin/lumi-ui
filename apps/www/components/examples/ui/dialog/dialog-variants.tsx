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
  DialogScrollArea,
  DialogScrollableContent,
  DialogStackedContent,
  DialogTitle,
  DialogTrigger,
  type popupVariants,
} from "@/registry/ui/dialog";

type DialogLayout = VariantProps<typeof popupVariants>["layout"];

interface DialogPayload {
  layout: DialogLayout;
  title: string;
  description: string;
  intent?: VariantProps<typeof popupVariants>["intent"];
  body?: React.ReactNode;
  actionLabel?: string;
  showCancel?: boolean;
}

const mainDialogHandle = createDialogHandle<DialogPayload>();

export function DialogVariantsDemo() {
  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <div className="space-y-6 mb-4">
        <div className="flex flex-wrap gap-3 max-w-3xl text-sm">
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
              layout: "optical",
              title: "Edit Profile",
            }}
            render={<Button variant="default">Open Optical</Button>}
          />

          <DialogTrigger
            handle={mainDialogHandle}
            payload={{
              actionLabel: "Dismiss",
              body: (
                <div className="py-4 space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      className="flex items-center gap-4 p-3 border rounded-lg"
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
              layout: "sheet",
              showCancel: false,
              title: "Notifications",
            }}
            render={<Button variant="outline">Open Sheet</Button>}
          />
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
            render={<Button variant="outline">Open Scrollable</Button>}
          />
          <DialogTrigger
            handle={mainDialogHandle}
            payload={{
              actionLabel: "Delete Account",
              description:
                "This action cannot be undone. This will permanently delete your data.",
              intent: "destructive",
              layout: "center",
              title: "Delete Account",
            }}
            render={<Button variant="destructive">Delete Account</Button>}
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
            render={<Button variant="secondary">Open Stacked Context</Button>}
          />
        </div>
      </div>

      <Dialog handle={mainDialogHandle}>
        {({ payload }) => {
          if (!payload) return null;

          const header = (
            <DialogHeader>
              <DialogTitle
                className={
                  payload.intent === "destructive" ? "text-destructive" : ""
                }
              >
                {payload.title}
              </DialogTitle>
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
                render={
                  <Button variant={payload.intent || "default"}>
                    {payload.actionLabel || "Continue"}
                  </Button>
                }
              />
            </DialogFooter>
          );

          if (payload.layout === "scrollable") {
            return (
              <DialogScrollableContent showCloseButton>
                {header}
                <DialogScrollArea>{payload.body}</DialogScrollArea>
                {footer}
              </DialogScrollableContent>
            );
          }

          if (payload.layout === "stacked") {
            return (
              <DialogStackedContent>
                {header}
                {payload.body}
                {footer}
              </DialogStackedContent>
            );
          }

          return (
            <DialogContent
              intent={payload.intent}
              layout={payload.layout as "optical" | "sheet" | "center"}
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
      <DialogStackedContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Level 2: Confirmation</DialogTitle>
          <DialogDescription>
            Notice the parent dialog scales down behind this one.
          </DialogDescription>
        </DialogHeader>
        <div className="h-24 rounded border border-dashed p-4 text-sm flex items-center justify-center">
          Critical Action Zone
        </div>
        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Close Level 2</Button>}
          />
          <DialogClose render={<Button>Confirm Action</Button>} />
        </DialogFooter>
      </DialogStackedContent>
    </Dialog>
  );
}
