import { Button } from "@/registry/ui/button";

import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsSolidDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Tabs className="w-full" defaultValue="account">
        <TabsList className="p-1 gap-1 rounded-md bg-card data-[orientation=vertical]:gap-1.5 data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-1.5">
          <TabsTab
            className="hover:bg-accent data-[active]:bg-accent/70"
            value="account"
          >
            Account
          </TabsTab>
          <TabsTab
            className="hover:bg-accent data-[active]:bg-accent/70"
            value="password"
          >
            Password
          </TabsTab>
        </TabsList>
        <TabsPanel value="account">
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
        </TabsPanel>
        <TabsPanel value="password">
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
        </TabsPanel>
      </Tabs>
    </div>
  );
}
