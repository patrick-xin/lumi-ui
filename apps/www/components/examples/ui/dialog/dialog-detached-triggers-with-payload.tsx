"use client";

import { Button } from "@lumi-ui/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lumi-ui/ui/dialog";
import { Input } from "@lumi-ui/ui/input";
import { Label } from "@lumi-ui/ui/label";

type User = {
  id: number;
  name: string;
  email: string;
};

const editUserDialogHandle = createDialogHandle<User>();

const USERS: User[] = [
  { email: "alice@company.com", id: 1, name: "Alice Smith" },
  { email: "bob@company.com", id: 2, name: "Bob Jones" },
  { email: "charlie@company.com", id: 3, name: "Charlie Day" },
];

export default function UserManagementDemo() {
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {USERS.map((user) => (
          <DialogTrigger
            handle={editUserDialogHandle}
            key={user.id}
            payload={user}
            render={<Button variant="outline">Edit {user.name}</Button>}
          />
        ))}
      </div>
      <Dialog handle={editUserDialogHandle}>
        {({ payload }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update profile details for{" "}
                <span className="font-semibold text-primary">
                  {payload?.name}.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input defaultValue={payload?.name} id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input defaultValue={payload?.email} id="email" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button>Save Changes</Button>} />
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
