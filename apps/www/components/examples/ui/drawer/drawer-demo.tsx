"use client";

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";

const fakeNotifications = [
  "Design handoff completed",
  "Build pipeline failed on main",
  "3 new comments on Landing Page",
  "Billing invoice is ready",
  "New signups: +18 since yesterday",
  "A/B test reached significance",
];

export function DrawerDemo() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-sm">
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Sides</div>
        <div className="flex flex-wrap gap-2">
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Bottom Sheet
            </DrawerTrigger>
            <DrawerContent showCloseButton side="bottom">
              <DrawerHeader>
                <DrawerTitle>Today&apos;s Inbox</DrawerTitle>
                <DrawerDescription>
                  Quick triage list with realistic scroll depth.
                </DrawerDescription>
              </DrawerHeader>
              <div className="space-y-3">
                {fakeNotifications.map((item) => (
                  <div
                    className="rounded-lg border bg-card p-3 text-sm text-card-foreground"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Dismiss
                </DrawerClose>
                <Button>Review All</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Right Panel
            </DrawerTrigger>
            <DrawerContent
              showCloseButton
              showHandle={false}
              side="right"
              size="lg"
            >
              <DrawerHeader>
                <DrawerTitle>Workspace Settings</DrawerTitle>
                <DrawerDescription>
                  Fake controls to validate side drawer spacing and overflow.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-3">
                {[
                  "Project Name",
                  "Custom Domain",
                  "Staging URL",
                  "Webhook Endpoint",
                  "Retention Policy",
                ].map((field) => (
                  <Label className="grid gap-1" key={field}>
                    <span className="text-xs font-medium text-muted-foreground">
                      {field}
                    </span>
                    <Input
                      className="h-9 rounded-md border bg-background px-3"
                      defaultValue={`Example ${field}`}
                    />
                  </Label>
                ))}
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
                <Button>Save Changes</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Left Inset
            </DrawerTrigger>
            <DrawerContent
              showCloseButton
              showHandle={false}
              side="left"
              size="sm"
            >
              <DrawerHeader>
                <DrawerTitle>Projects</DrawerTitle>
                <DrawerDescription>
                  Compact left panel with dense navigation items.
                </DrawerDescription>
              </DrawerHeader>
              <div className="space-y-2">
                {[
                  "Website Redesign",
                  "Growth Experiments",
                  "Q3 Reporting",
                  "Mobile App Refresh",
                  "Ops Migration",
                  "Partner Integrations",
                ].map((project) => (
                  <button
                    className="w-full rounded-md border px-3 py-2 text-left hover:bg-accent"
                    key={project}
                    type="button"
                  >
                    {project}
                  </button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Top
            </DrawerTrigger>
            <DrawerContent align="centered" showCloseButton side="top">
              <DrawerHeader>
                <DrawerTitle>Release Summary</DrawerTitle>
                <DrawerDescription>
                  Top drawer with centered body content.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-2">
                {[
                  "7 feature flags enabled",
                  "2 schema migrations pending",
                  "0 critical incidents",
                ].map((line) => (
                  <div className="rounded-md border bg-muted/30 p-2" key={line}>
                    {line}
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-semibold">Behavior</div>
        <div className="flex flex-wrap gap-2">
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Snap Sheet
            </DrawerTrigger>
            <DrawerContent behavior="snap" showCloseButton>
              <DrawerHeader>
                <DrawerTitle>Activity Feed</DrawerTitle>
                <DrawerDescription>
                  Drag the sheet to test snap behavior and scroll handoff.
                </DrawerDescription>
              </DrawerHeader>
              <div className="space-y-2">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div
                    className="rounded-md border bg-card p-3 text-card-foreground"
                    key={`activity-${index + 1}`}
                  >
                    Feed item #{index + 1}
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
