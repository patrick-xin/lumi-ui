import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsSolidVerticalDemo() {
  return (
    <Tabs
      className="w-full gap-4"
      defaultValue="account"
      orientation="vertical"
      variant="ghost"
    >
      <TabsList>
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
        <TabsTab value="contact">Contact us</TabsTab>
      </TabsList>
      <TabsPanel value="account">
        <div>
          <div>
            <div>Account</div>
            <p>
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input defaultValue="Pedro Duarte" id="tabs-demo-name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input defaultValue="@peduarte" id="tabs-demo-username" />
            </div>
          </div>
          <div>
            <Button>Save changes</Button>
          </div>
        </div>
      </TabsPanel>
      <TabsPanel value="password">
        <div>
          <div>
            <div>Password</div>
            <p>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </div>
          <div>
            <Button>Save password</Button>
          </div>
        </div>
      </TabsPanel>
      <TabsPanel value="contact">
        <div>
          <div>
            <div>We're here to help!</div>
            <p>Submit your request</p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-subject">Subject</Label>
              <Input id="tabs-demo-subject" placeholder="e.g. Billing issue" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-message">Message</Label>
              <Input
                id="tabs-demo-message"
                placeholder="Please describe your issue in detail."
              />
            </div>
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
