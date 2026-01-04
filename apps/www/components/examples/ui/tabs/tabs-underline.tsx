import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function TabsUnderlineDemo() {
  return (
    <Tabs className="gap-6 w-full" defaultValue="account" variant="underline">
      <TabsList className="w-full">
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
        <TabsTab value="contact">Contact us</TabsTab>
      </TabsList>
      <TabsPanel className="flex" value="account">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input defaultValue="Pedro Duarte" id="tabs-demo-name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input defaultValue="@peduarte" id="tabs-demo-username" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsPanel>
      <TabsPanel value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsPanel>
      <TabsPanel value="contact">
        <Card>
          <CardHeader>
            <CardTitle>We're here to help!</CardTitle>
            <CardDescription>Submit your request</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
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
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </TabsPanel>
    </Tabs>
  );
}
