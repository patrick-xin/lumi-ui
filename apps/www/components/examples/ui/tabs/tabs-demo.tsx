import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs className="w-86" defaultValue="account">
      <TabsListContent className="rounded-sm bg-accent dark:bg-accent/50 text-accent-foreground data-[orientation=vertical]:h-48">
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
      </TabsListContent>
      <TabsPanel value="account">
        <div className="p-4 bg-card space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
          <div className="space-y-2">
            <div className="font-semibold">Account</div>
            <p className="text-muted-foreground text-sm">
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input defaultValue="Pedro Duarte" id="tabs-demo-name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input defaultValue="@peduarte" id="tabs-demo-username" />
            </div>
          </div>

          <Button className="self-end">Save changes</Button>
        </div>
      </TabsPanel>
      <TabsPanel value="password">
        <div className="p-4 bg-card space-y-4 rounded-md outline outline-1 outline-border dark:-outline-offset-1">
          <div className="space-y-2">
            <div className="font-semibold">Password</div>
            <p className="text-muted-foreground text-sm">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </div>
          <Button>Save password</Button>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
