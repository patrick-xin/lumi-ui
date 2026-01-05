"use client";
import { useState } from "react";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";
import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/registry/ui/tabs";
import { Textarea } from "@/registry/ui/textarea";

export function TabsUnderline() {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical",
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-end">
        <Label className="capitalize font-semibold">{orientation}</Label>
        <Switch
          checked={orientation === "vertical"}
          onCheckedChange={(checked) => {
            setOrientation(checked ? "vertical" : "horizontal");
          }}
        />
      </div>

      <Tabs
        className="lg:w-[600px] min-h-[540px] rounded-md bg-accent/20"
        defaultValue="profile"
        orientation={orientation}
      >
        <TabsList className="gap-4 bg-transparent py-2 border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l data-[orientation=vertical]:h-fit data-[orientation=vertical]:py-0">
          <TabsTab value="profile">Profile</TabsTab>
          <TabsTab value="billing">Billing</TabsTab>
          <TabIndicator
            className="bg-foreground bottom-0 left-0 h-0.5 translate-x-(--active-tab-left) translate-y-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:-left-[1.5px] data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:translate-y-0"
            key={orientation}
          />
        </TabsList>
        <TabsPanel
          className="p-6 data-[orientation=vertical]:pt-4"
          value="profile"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="font-semibold">Profile Settings</div>
              <p className="text-muted-foreground text-sm">
                Update your public profile information.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  defaultValue="Alex Rivera"
                  id="display-name"
                  inputSize="sm"
                  variant="transparent"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  defaultValue="Product designer passionate about creating intuitive experiences."
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows={3}
                  variant="transparent"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="location">Location</Label>
                <Input
                  defaultValue="San Francisco, CA"
                  id="location"
                  inputSize="sm"
                  variant="transparent"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save changes</Button>
            </div>
          </div>
        </TabsPanel>

        <TabsPanel
          className="p-6 data-[orientation=vertical]:pt-4"
          value="billing"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="font-semibold">Billing Information</div>
              <p className="text-muted-foreground text-sm">
                Manage your subscription and payment details.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Pro Plan</span>
                  <span className="text-xl font-semibold">$29/mo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Next billing date: December 5, 2026
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  defaultValue="Alex Rivera"
                  id="card-name"
                  inputSize="sm"
                  variant="transparent"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  inputSize="sm"
                  placeholder="•••• •••• •••• 4242"
                  variant="transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    inputSize="sm"
                    placeholder="MM/YY"
                    variant="transparent"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    inputSize="sm"
                    maxLength={3}
                    placeholder="•••"
                    variant="transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Update payment</Button>
            </div>
          </div>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
