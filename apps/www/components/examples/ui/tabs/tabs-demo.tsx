import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Switch } from "@/registry/ui/switch";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@/registry/ui/tabs";
import { Textarea } from "@/registry/ui/textarea";

export function TabsDemo() {
  return (
    <Tabs className="w-96 max-w-[400px] min-h-[520px]" defaultValue="profile">
      <TabsListContent>
        <TabsTab value="profile">Profile</TabsTab>
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="notifications">Notifications</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
      </TabsListContent>

      <TabsPanel value="profile">
        <div className="p-4 space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
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
          <Button className="self-end">Save changes</Button>
        </div>
      </TabsPanel>

      <TabsPanel value="account">
        <div className="p-4 space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
          <div className="space-y-2">
            <div className="font-semibold">Account Security</div>
            <p className="text-muted-foreground text-sm">
              Manage your email and password settings.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                defaultValue="alex@example.com"
                id="email"
                inputSize="sm"
                type="email"
                variant="transparent"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                inputSize="sm"
                type="password"
                variant="transparent"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                inputSize="sm"
                type="password"
                variant="transparent"
              />
            </div>
          </div>
          <Button>Update account</Button>
        </div>
      </TabsPanel>

      <TabsPanel value="notifications">
        <div className="p-4 space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
          <div className="space-y-2">
            <div className="font-semibold">Notification Preferences</div>
            <p className="text-muted-foreground text-sm">
              Choose what updates you want to receive.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch defaultChecked id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Product news and offers
                </p>
              </div>
              <Switch id="marketing" />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="frequency">Email Frequency</Label>
              <Select defaultValue="Weekly">
                <SelectTriggerGroup className="w-12" id="frequency" />
                <SelectContent alignItemWithTrigger>
                  <SelectItemContent value="Daily">Daily</SelectItemContent>
                  <SelectItemContent value="Weekly">Weekly</SelectItemContent>
                  <SelectItemContent value="Monthly">Monthly</SelectItemContent>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Save preferences</Button>
        </div>
      </TabsPanel>

      <TabsPanel value="billing">
        <div className="p-4 space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
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
          <Button>Update payment</Button>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
