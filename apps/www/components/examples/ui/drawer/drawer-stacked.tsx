"use client";

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  StackedDrawerContent,
  StackedDrawerInnerContent,
} from "@/registry/ui/drawer-stacked";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Textarea } from "@/registry/ui/textarea";

export function DrawerStackedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open drawer stack</DrawerTrigger>
      <StackedDrawerContent>
        <StackedDrawerInnerContent className="max-w-lg">
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Nested drawers can be styled to stack, while each drawer remains
            independently focus managed.
          </DrawerDescription>

          <Drawer>
            <DrawerTrigger render={<Button />}>Security settings</DrawerTrigger>
            <StackedDrawerContent>
              <StackedDrawerInnerContent className="max-w-lg">
                <DrawerTitle>Security</DrawerTitle>
                <DrawerDescription>
                  Review sign-in activity and update your security preferences.
                </DrawerDescription>

                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Passkeys enabled</li>
                  <li>2FA via authenticator app</li>
                  <li>3 signed-in devices</li>
                </ul>

                <div className="flex items-center justify-end gap-4">
                  <div className="mr-auto">
                    <Drawer>
                      <DrawerTrigger render={<Button />}>
                        Advanced options
                      </DrawerTrigger>
                      <StackedDrawerContent>
                        <StackedDrawerInnerContent className="max-w-lg">
                          <DrawerTitle>Advanced</DrawerTitle>
                          <DrawerDescription>
                            This drawer is taller to demonstrate variable-height
                            stacking.
                          </DrawerDescription>

                          <div className="grid gap-1.5 mb-4">
                            <Label htmlFor="device-name">Device name</Label>
                            <Input
                              defaultValue="Personal laptop"
                              id="device-name"
                            />
                          </div>

                          <div className="grid gap-1.5 mb-6">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              defaultValue="Rotate recovery codes and revoke older sessions."
                              id="notes"
                              rows={10}
                            />
                          </div>

                          <div className="flex justify-end">
                            <DrawerClose
                              render={<Button variant="outline">Done</Button>}
                            />
                          </div>
                        </StackedDrawerInnerContent>
                      </StackedDrawerContent>
                    </Drawer>
                  </div>

                  <DrawerClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </div>
              </StackedDrawerInnerContent>
            </StackedDrawerContent>
          </Drawer>

          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </StackedDrawerInnerContent>
      </StackedDrawerContent>
    </Drawer>
  );
}
