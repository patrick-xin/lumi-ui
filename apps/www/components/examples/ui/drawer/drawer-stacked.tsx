"use client";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
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
import { Label } from "@/registry/ui/label";

const billingItems = [
  "Team plan renewal on Aug 30",
  "3 seats pending assignment",
  "Usage spike: +22% in API requests",
  "Invoice #2026-0811 generated",
];

export function DrawerStackedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Stacked Drawers
      </DrawerTrigger>
      <DrawerContent align="centered" showCloseButton stacked>
        <DrawerHeader>
          <DrawerTitle>Workspace Account</DrawerTitle>
          <DrawerDescription>
            Parent drawer keeps context while children layer above it.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-3">
          {billingItems.map((item) => (
            <div className="rounded-md border p-3" key={item}>
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <SecurityDrawer />
          <DangerZoneDrawer />
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          <Button>Save Account</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SecurityDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button size="sm" variant="secondary" />}>
        Security
      </DrawerTrigger>
      <DrawerContent align="centered" showCloseButton stacked>
        <DrawerHeader>
          <DrawerTitle>Security Controls</DrawerTitle>
          <DrawerDescription>
            Nested drawer for 2FA and session management.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2">
          {[
            "Enforce two-factor authentication",
            "Rotate API keys every 90 days",
            "Require SSO for all members",
          ].map((rule) => (
            <Label
              className="flex items-start gap-2 rounded-md border p-3"
              key={rule}
            >
              <Checkbox className="mt-1" defaultChecked />
              <span>{rule}</span>
            </Label>
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Back</DrawerClose>
          <Button>Apply Rules</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DangerZoneDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button size="sm" variant="destructive" />}>
        Danger Zone
      </DrawerTrigger>
      <DrawerContent align="centered" showCloseButton stacked>
        <DrawerHeader>
          <DrawerTitle>Danger Zone</DrawerTitle>
          <DrawerDescription>
            Simulate a high-risk nested flow before permanent actions.
          </DrawerDescription>
        </DrawerHeader>

        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
          Deleting this workspace removes projects, members, and audit history.
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
          <Button variant="destructive">Delete Workspace</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
